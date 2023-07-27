import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";

import "../styles/components/map.css";
import { MapPinIcon } from "@heroicons/react/24/outline";
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
          zIndex: 10,
        });
        userMarkerOverlay.setMap(newMap);

        // 충전소 data fetching
        fetchStationList(mapRef.current);

        // 카카오지도 이벤트 등록
        window.kakao.maps.event.addListener(newMap, "idle", function () {
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

    const overlayContent = `
    <div class="overlay__container">
      <div class="title__wrapper">
        <h1 class="overlay-title">${statNm}</h1>
        <button id="overlay-close">
          <svg width="24px" height="24px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
           <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="content__wrapper">
        <ul class="content-list__wrapper">
          <li class="content-list__item">
            <span class="list-icon">
              <svg width="24px" height="24px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"></path>
              </svg>
            </span>
            <span class="list-description">${addr}</span>
          </li>
          <li class="content-list__item">
            <span class="list-icon">
              <svg width="24px" height="24px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
              </svg>
            </span>
            <span class="list-description">${
              location ? location : "상세주소가 없습니다."
            }</span>
          </li>
          <li class="content-list__item">
            <span class="list-icon">
              <svg width="24px" height="24px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path>
              </svg>
            </span>
            <span class="list-description">${busiCall}</span>
          </li>
          <li class="content-list__item">
            <span class="list-icon">
              <svg width="24px" height="24px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </span>
            <span class="list-description">${useTime}</span>
          </li>
          <li class="content-list__item">
            <span class="list-icon">
              <svg width="24px" height="24px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"></path>
              </svg>
            </span>
            <span class="list-description">${busiNm}</span>
          </li>
          <li class="content-list__item">
            <span class="list-icon">
              <svg width="24px" height="24px" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
              </svg>
            </span>
            <span class="list-description">
              ${Chargers.filter((item) => item.stat === "2").length} / ${
      Chargers.length
    }
            </span>
          </li>
        </ul>
      </div>
    </div>
    `;

    const position = new window.kakao.maps.LatLng(lat, lng);
    const newStationOverlay = new window.kakao.maps.CustomOverlay({
      clickable: true,
      position,
      content: overlayContent,
      yAnchor: 1.2,
      zIndex: 100,
    });

    newStationOverlay.id = statId;

    newStationOverlay.setMap(mapRef.current);
    stationOverlayRef.current = newStationOverlay;

    const closeButton = document.querySelector("#overlay-close");
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
