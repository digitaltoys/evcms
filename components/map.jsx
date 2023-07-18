import { useCallback, useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";

import "../styles/components/map.css";
import { getBoundStationList, getStationDetail } from "../apis/evApi";
import { selectedMarkerDetailAtom } from "../atoms/atom";

const Map = () => {
  const [gps, setGps] = useState({ lat: null, lng: null });
  const [stationList, setStationList] = useState(null);
  const [markerList, setMarkerList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const stationOverlayRef = useRef(null);
  const mapRef = useRef(null);

  const setSelectedMarkerDetail = useSetAtom(selectedMarkerDetailAtom);

  const KAKAOMAP_API_KEY = "213d725ddb120155aa57f8ae612ed6d4";

  // 카카오맵 Init
  useEffect(() => {
    console.log("%c Init useEffect", "color:blue");
    const script = document.createElement("script");

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;

    document.head.appendChild(script);

    // 카카오맵 load 시 실행
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(async () => {
        // 현재 위치 받아오기
        const { lat, lng } = await getGps();
        setGps({ lat, lng });

        // 카카오지도 생성
        const container = document.querySelector("#map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 2,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        mapRef.current = newMap;

        // 충전소 data fetching
        fetchStationList(mapRef.current);

        // 카카오지도 이벤트 등록
        window.kakao.maps.event.addListener(
          newMap,
          "zoom_changed",
          function () {
            reFetchStationList(mapRef.current);
          }
        );

        window.kakao.maps.event.addListener(newMap, "dragend", function () {
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
      chgerCnt,
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
    liAddressDetail.innerText = `상세주소 : ${location}`;
    const liTel = document.createElement("li");
    liTel.innerText = `전화번호 : ${busiCall}`;
    const liTime = document.createElement("li");
    liTime.innerText = `운영시간 : ${useTime}`;
    const liCompany = document.createElement("li");
    liCompany.innerText = `운영기관 : ${busiNm}`;
    const liCharger = document.createElement("li");
    liCharger.innerText = `충전기 수 : ${chgerCnt}`;

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

  return <div id="map" className="w-[calc(100%-390px)]"></div>;
};

export default Map;
