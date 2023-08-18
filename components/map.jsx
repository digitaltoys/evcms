import { forwardRef, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MapPinIcon } from "@heroicons/react/24/outline";

import Filter from "./filter";
import LoadingSpinner from "./common/loadingSpinner";
import { getBoundStationList, getStationDetail } from "../apis/evApi";
import {
  agencyFilterOptionAtom,
  currentGpsAtom,
  searchPlaceListAtom,
  selectedMarkerDetailAtom,
  speedFilterOptionAtom,
  typeFilterOptionAtom,
} from "../atoms/atom";
import {
  CHARGER_LOGO_STAT_CONVERTER,
  CHARGER_TYPE,
  EXIST_CHARGER_LOGO,
} from "../constants";
import { getOcubeBoundStationList } from "../apis/ocubeApi";

const Map = forwardRef((props, ref) => {
  const [currentGps, setCurrentGps] = useAtom(currentGpsAtom);
  const setSelectedMarkerDetail = useSetAtom(selectedMarkerDetailAtom);
  const setSearchPlaceList = useSetAtom(searchPlaceListAtom);
  const speedFilterOption = useAtomValue(speedFilterOptionAtom);
  const typeFilterOption = useAtomValue(typeFilterOptionAtom);
  const agencyFilterOption = useAtomValue(agencyFilterOptionAtom);

  const [stationList, setStationList] = useState(null);
  const [filteredStationList, setFilteredStationList] = useState(null);
  const [markerList, setMarkerList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const stationOverlayRef = useRef(null);
  const mapRef = useRef(null);
  const bigLogoMarkerRef = useRef(null);

  const KAKAOMAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

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

        // 지도 축소 레벨 설정
        mapRef.current.setMaxLevel(11);

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
        window.kakao.maps.event.addListener(newMap, "dragend", function () {
          fetchStationList(mapRef.current);
        });
        window.kakao.maps.event.addListener(
          newMap,
          "zoom_changed",
          function () {
            fetchStationList(mapRef.current);
          }
        );

        // OCUBE API TEST
        const ocubeFetchStationList = async (map) => {
          try {
            const {
              ha: lngSW,
              qa: latSW,
              oa: lngNE,
              pa: latNE,
            } = map.getBounds();
            const params = {
              s: String(latSW),
              w: String(lngSW),
              n: String(latNE),
              e: String(lngNE),
            };

            const data = await getOcubeBoundStationList(params);
            console.log(data);
          } catch (err) {
            throw err;
          }
        };

        // ocubeFetchStationList(mapRef.current);
      });
    };

    script.addEventListener("load", onLoadKakaoMap);

    return () => script.removeEventListener("load", onLoadKakaoMap);
  }, []);

  // 충전소 data fetch 이후 필터링
  useEffect(() => {
    if (stationList) {
      const filtered = getFilteredStationList(stationList);
      setFilteredStationList(filtered);
    }
  }, [stationList]);

  // 필터 옵션이 변경됐을 때 -> markerList와 stationList에 filter 적용
  useEffect(() => {
    if (stationOverlayRef.current) {
      stationOverlayRef.current.setMap(null);
      stationOverlayRef.current = null;
    }
    setSelectedMarker(null);
    setSelectedMarkerDetail(null);

    if (stationList) {
      const existFilteredMarker = markerList.filter((item) => {
        const isFiltered = filterMarker(item);
        if (isFiltered) return true;
        else {
          item.setMap(null);
          return false;
        }
      });

      setMarkerList(existFilteredMarker);

      const filteredStationList = getFilteredStationList(stationList);
      setFilteredStationList(filteredStationList);
    }
  }, [speedFilterOption, typeFilterOption, agencyFilterOption]);

  // 필터링된 충전소 data에 따라 마커 생성
  useEffect(() => {
    if (filteredStationList) {
      // 화면 이동 후에도 영역에 표시되는 marker는 리렌더링 X
      // 현재 화면영역 안 marker 목록
      let inBoundsMarker = markerList.filter((mk) => {
        const pos = mk.getPosition();
        const bounds = mapRef.current.getBounds();

        if (!bounds.contain(pos)) {
          mk.setMap(null);
          return false;
        }

        return true;
      });

      // fetching 및 filtering한 데이터에서 추가로 marker 렌더링 해줘야할 충전소 목록
      let additionalStations = filteredStationList.filter((st) => {
        if (inBoundsMarker.find((mk) => mk.id === st.statId)) {
          return false;
        } else {
          return true;
        }
      });

      for (let station of additionalStations) {
        const { lat, lng, statId, statNm, busiId, busiNm, stat, chgerType } =
          station;
        const markerImage = makeLogoMarker(busiId, stat, 48, 48);
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const logoMarker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: mapRef.current,
          title: statNm,
          image: markerImage,
        });
        logoMarker.id = statId;
        logoMarker.stat = stat;
        logoMarker.busiId = busiId;
        logoMarker.chgerType = chgerType;
        logoMarker.busiNm = busiNm;

        window.kakao.maps.event.addListener(logoMarker, "click", () =>
          handleLogoMarkerClick(logoMarker)
        );

        inBoundsMarker.push(logoMarker);
      }

      setMarkerList(inBoundsMarker);
    }
  }, [filteredStationList]);

  /*
  selectedMarker 변경시 
  1. 기존 overlay 닫기
  2. 해당 마커 좌표를 중심으로 지도 이동
  3. 해당 충전소 정보 fetch 및 overlay 열기
  */
  useEffect(() => {
    if (selectedMarker) {
      if (
        stationOverlayRef.current &&
        selectedMarker.id === stationOverlayRef.current.id
      )
        return;
      if (stationOverlayRef.current) stationOverlayRef.current.setMap(null);
      if (bigLogoMarkerRef.current) {
        const { busiId, stat } = bigLogoMarkerRef.current;
        const normalLogoMarker = makeLogoMarker(busiId, stat, 48, 48);
        bigLogoMarkerRef.current.setImage(normalLogoMarker);
        bigLogoMarkerRef.current.setZIndex(0);
      }

      const { Ma: lat, La: lng } = selectedMarker.getPosition();
      const moveLocation = new window.kakao.maps.LatLng(lat, lng);
      mapRef.current.panTo(moveLocation);

      const { id, busiId, stat } = selectedMarker;
      const bigLogoMarker = makeLogoMarker(busiId, stat, 64, 64);
      selectedMarker.setImage(bigLogoMarker);
      selectedMarker.setZIndex(5);
      bigLogoMarkerRef.current = selectedMarker;

      fetchStationDetail(id);
    }
  }, [selectedMarker]);

  // Functions
  // 현재 위치 받아오기
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

  // 충전소 리스트 받아오기
  const fetchStationList = async (map) => {
    try {
      setIsLoading(true);
      const { ha: lngSW, qa: latSW, oa: lngNE, pa: latNE } = map.getBounds();
      const params = {
        s: latSW,
        w: lngSW,
        n: latNE,
        e: lngNE,
      };

      const data = await getBoundStationList(params);
      setStationList(data);
      setIsLoading(false);
    } catch (err) {
      throw err;
    }
  };

  // 충전소 상세 정보 받아오기
  const fetchStationDetail = async (id) => {
    try {
      const data = await getStationDetail(id);
      console.log(data);
      makeOverlay(data);
      setSelectedMarkerDetail(data);
    } catch (err) {
      throw err;
    }
  };

  // 충전소 목록 필터링하여 반환
  const getFilteredStationList = (list) => {
    const filtered = list.filter((item) => {
      const { busiNm, chgerType } = item;
      if (!agencyFilterOption[busiNm]) return false;
      if (!CHARGER_TYPE[chgerType].some((item) => typeFilterOption[item]))
        return false;

      return true;
    });

    return filtered;
  };

  // 마커 필터링 검증
  const filterMarker = (marker) => {
    const { chgerType, busiNm } = marker;
    if (!agencyFilterOption[busiNm]) {
      return false;
    }

    if (!CHARGER_TYPE[chgerType].some((item) => typeFilterOption[item])) {
      return false;
    }

    return true;
  };

  // 마커 클릭 오버레이 생성
  const makeOverlay = (detail) => {
    const { addr, useTime, busiNm, statId, statNm, lat, lng, Chargers } =
      detail;

    const overlayContent = `
    <div class="overlay__container">
      <div class="title__wrapper">
        <h1 class="overlay-title">${statNm}</h1>
        <button id="overlay-close" aria-label="overlay-close">
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
              충전가능 ${
                Chargers.filter((item) => item.stat === "2").length
              } / ${Chargers.length}
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
      yAnchor: 1.3,
      zIndex: 100,
    });

    newStationOverlay.id = statId;

    newStationOverlay.setMap(mapRef.current);
    stationOverlayRef.current = newStationOverlay;

    const closeButton = document.querySelector("#overlay-close");
    closeButton.addEventListener("click", () => {
      const { busiId, stat } = bigLogoMarkerRef.current;
      const normalLogoMarker = makeLogoMarker(busiId, stat, 48, 48);
      bigLogoMarkerRef.current.setImage(normalLogoMarker);
      bigLogoMarkerRef.current.setZIndex(0);
      bigLogoMarkerRef.current = null;

      stationOverlayRef.current.setMap(null);
      stationOverlayRef.current = null;

      setSelectedMarker(null);
      setSelectedMarkerDetail(null);
    });
  };

  // 충전소 로고 마커 생성
  const makeLogoMarker = (id, stat, width, height) => {
    const statNumber = CHARGER_LOGO_STAT_CONVERTER[stat];
    const size = new kakao.maps.Size(width, height);

    if (EXIST_CHARGER_LOGO.includes(id)) {
      const logoMarkerImage = new kakao.maps.MarkerImage(
        `/marker_icons/in_map_${id}${statNumber}.png`,
        size
      );

      return logoMarkerImage;
    }

    if (!EXIST_CHARGER_LOGO.includes(id)) {
      const logoMarkerImage = new kakao.maps.MarkerImage(
        `/marker_icons/in_map_ECT${statNumber}.png`,
        size
      );

      return logoMarkerImage;
    }
  };

  // handler
  const handleClickMyLocation = () => {
    const { lat, lng } = currentGps;
    const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
    mapRef.current.panTo(moveLatLng);
  };

  const handleLogoMarkerClick = (logoMarker) => {
    setSelectedMarker(logoMarker);
    setSearchPlaceList(null);
  };

  return (
    <section className="relative w-[calc(100%-390px)] h-full">
      <div id="map" className="w-full h-full"></div>
      {mapRef && <Filter />}
      <div className="absolute right-4 bottom-4 z-10">
        <button
          className="w-10 h-10 flex justify-center items-center rounded-lg shadow-md bg-white hover:text-green-600 transition-all ease-linear duration-100"
          onClick={handleClickMyLocation}
          aria-label="my-location"
        >
          <span>
            <MapPinIcon width={24} height={24} />
          </span>
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
    </section>
  );
});

Map.displayName = "Map";

export default Map;
