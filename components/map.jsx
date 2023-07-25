import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";

import { MapPinIcon } from "@heroicons/react/24/outline";
import "../styles/components/map.css";
import { getBoundStationList, getStationDetail } from "../apis/evApi";
import {
  currentGpsAtom,
  searchPlaceListAtom,
  selectedMarkerDetailAtom,
} from "../atoms/atom";
import Filter from "./filter";

const Map = forwardRef((props, ref) => {
  const [currentGps, setCurrentGps] = useAtom(currentGpsAtom);
  const setSelectedMarkerDetail = useSetAtom(selectedMarkerDetailAtom);
  const setSearchPlaceList = useSetAtom(searchPlaceListAtom);

  const [stationList, setStationList] = useState(null);
  const [markerList, setMarkerList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const stationOverlayRef = useRef(null);
  const mapRef = useRef(null);

  const KAKAOMAP_API_KEY = "213d725ddb120155aa57f8ae612ed6d4";

  // 카카오맵 Init
  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;

    document.head.appendChild(script);

    // 카카오맵 load 시 실행
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(async () => {
        // 현재 위치 받아오기
        const { lat, lng } = await getGps();
        setCurrentGps({ lat, lng });

        // 카카오지도 생성
        const container = document.querySelector("#map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 2,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        mapRef.current = newMap;
        ref.current = newMap;

        // 사용자 gps 위치에 marker (오버레이) 생성
        const content = `<div class="pin"></div><div class="pulse"></div>`;
        const userPosition = new window.kakao.maps.LatLng(lat, lng);
        const userMarkerOverlay = new window.kakao.maps.CustomOverlay({
          position: userPosition,
          content,
          yAnchor: 0.9,
          xAnchor: 0.7,
        });
        userMarkerOverlay.setMap(newMap);

        // 충전소 data fetching
        fetchStationList(mapRef.current);

        // 카카오지도 이벤트 등록
        window.kakao.maps.event.addListener(newMap, "idle", function () {
          console.log("idle!");
          reFetchStationList(mapRef.current);
        });
      });
    };

    script.addEventListener("load", onLoadKakaoMap);

    return () => script.removeEventListener("load", onLoadKakaoMap);
  }, []);

  // 충전소 data에 따라 마커 생성
  useEffect(() => {
    console.log("%c stationList useEffect", "color: blue");
    if (stationList) {
      // 화면 이동 후에도 영역에 표시되는 마커는 리렌더링 X
      let existMarkers = markerList.filter((mk) => {
        const pos = mk.getPosition();
        const bounds = mapRef.current.getBounds();

        if (!bounds.contain(pos)) {
          mk.setMap(null);
          return false;
        }

        return true;
      });

      let additionalStations = stationList.filter((st) => {
        if (existMarkers.find((mk) => mk.id === st.statId)) {
          return false;
        } else {
          return true;
        }
      });

      for (let station of additionalStations) {
        const { lat, lng, statId, statNm } = station;
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: mapRef.current,
          title: statNm,
        });
        marker.id = statId;

        window.kakao.maps.event.addListener(marker, "click", () => {
          if (
            stationOverlayRef.current &&
            marker.id === stationOverlayRef.current.id
          )
            return;
          if (stationOverlayRef.current) stationOverlayRef.current.setMap(null);
          const { Ma: lat, La: lng } = marker.getPosition();
          const moveLocation = new window.kakao.maps.LatLng(lat, lng);
          mapRef.current.panTo(moveLocation);
          setSelectedMarker(marker);
          setSearchPlaceList(null);
        });

        existMarkers.push(marker);
      }

      setMarkerList(existMarkers);
    }
  }, [stationList]);

  // selectedMarker 변경시 충전소 세부 내용 data 요청
  useEffect(() => {
    console.log("%c selectedMarker useEffect", "color:blue");
    if (selectedMarker) {
      const statId = selectedMarker.id;

      const fetchStationDetail = async (id) => {
        try {
          const data = await getStationDetail(id);
          makeOverlay(data);
          setSelectedMarkerDetail(data);
        } catch (err) {
          throw err;
        }
      };

      fetchStationDetail(statId);
    }
  }, [selectedMarker]);

  // Functions
  const getGps = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          res({ lat: latitude, lng: longitude });
        },
        () => {
          console.log("failed to get GPS");
          res({ lat: 37.5696304, lng: 126.9821706 });
        },
        { enableHighAccuracy: true }
      );
    });
  };

  const fetchStationList = async (map) => {
    try {
      const { ha: lngSW, qa: latSW, oa: lngNE, pa: latNE } = map.getBounds();
      const params = {
        s: latSW,
        w: lngSW,
        n: latNE,
        e: lngNE,
      };

      const data = await getBoundStationList(params);
      setStationList(data);
    } catch (err) {
      throw err;
    }
  };

  const reFetchStationList = useCallback(
    async (map) => {
      if (stationList !== null) {
        stationList.forEach((item) => item.setMap(null));
      }
      fetchStationList(map);
    },
    [stationList]
  );

  const makeOverlay = (detail) => {
    console.log(detail);
    const {
      addr,
      location,
      busiCall,
      useTime,
      busiNm,
      statId,
      statNm,
      lat,
      lng,
      Chargers,
    } = detail;

    const overlayContainer = document.createElement("div");
    overlayContainer.className = "overlay__container";
    const titleWrapper = document.createElement("div");
    titleWrapper.className = "title__wrapper";
    const title = document.createElement("h1");
    title.innerText = statNm;
    const closeButton = document.createElement("button");
    closeButton.innerText = "닫기";

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "content__wrapper";
    const contentListWrapper = document.createElement("ul");
    contentListWrapper.className = "content-list__wrapper";

    const liAddress = document.createElement("li");
    liAddress.innerText = `주소 : ${addr}`;
    const liAddressDetail = document.createElement("li");
    liAddressDetail.innerText = `상세주소 : ${
      location ? location : "정보가 없습니다."
    }`;
    const liTel = document.createElement("li");
    liTel.innerText = `전화번호 : ${busiCall}`;
    const liTime = document.createElement("li");
    liTime.innerText = `운영시간 : ${useTime}`;
    const liCompany = document.createElement("li");
    liCompany.innerText = `운영기관 : ${busiNm}`;
    const liCharger = document.createElement("li");
    liCharger.innerText = `충전현황 : ${
      Chargers.filter((item) => item.stat === "2").length
    } / ${Chargers.length}`;

    contentListWrapper.appendChild(liAddress);
    contentListWrapper.appendChild(liAddressDetail);
    contentListWrapper.appendChild(liTel);
    contentListWrapper.appendChild(liTime);
    contentListWrapper.appendChild(liCompany);
    contentListWrapper.appendChild(liCharger);

    contentWrapper.appendChild(contentListWrapper);

    titleWrapper.appendChild(title);
    titleWrapper.appendChild(closeButton);

    overlayContainer.appendChild(titleWrapper);
    overlayContainer.appendChild(contentWrapper);

    const position = new window.kakao.maps.LatLng(lat, lng);
    const newStationOverlay = new window.kakao.maps.CustomOverlay({
      clickable: true,
      position,
      content: overlayContainer,
      yAnchor: 1.2,
      zIndex: 100,
    });

    newStationOverlay.id = statId;

    newStationOverlay.setMap(mapRef.current);
    stationOverlayRef.current = newStationOverlay;

    closeButton.addEventListener("click", () => {
      stationOverlayRef.current.setMap(null);
      stationOverlayRef.current = null;
      setSelectedMarker(null);
      setSelectedMarkerDetail(null);
    });
  };

  const handleClickMyLocation = () => {
    const { lat, lng } = currentGps;
    const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
    mapRef.current.panTo(moveLatLng);
  };

  return (
    <section className="w-[calc(100%-390px)] h-full">
      <div id="map" className="w-full h-full"></div>
      {mapRef && <Filter />}
      <div className="absolute right-4 bottom-4 z-10">
        <button
          className="w-10 h-10 flex justify-center items-center rounded-lg shadow-md bg-white hover:text-green-600 transition-all ease-linear duration-100"
          onClick={handleClickMyLocation}
        >
          <span>
            <MapPinIcon width={24} height={24} />
          </span>
        </button>
      </div>
    </section>
  );
});

export default Map;
