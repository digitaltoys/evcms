import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";

import "../styles/components/map.css";
import { getStationDetail, getStationList } from "../apis/evApi";
import {
  mapAtom,
  selectedMarkerAtom,
  selectedMarkerDetailAtom,
} from "../atoms/atom";

const Map = () => {
  const [gps, setGps] = useState({ lat: null, lng: null });
  const [stationList, setStationList] = useState(null);
  const [markerList, setMarkerList] = useState(null);
  const stationOverlayRef = useRef(null);

  const [map, setMap] = useAtom(mapAtom);
  const [selectedMarker, setSelectedMarker] = useAtom(selectedMarkerAtom);
  const [selectedMarkerDetail, setSelectedMarkerDetail] = useAtom(
    selectedMarkerDetailAtom
  );

  const KAKAOMAP_API_KEY = "213d725ddb120155aa57f8ae612ed6d4";

  // 현재 위치 받아오기
  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setGps({ lat: latitude, lng: longitude });
        },
        () => {},
        { enableHighAccuracy: true }
      );
    } else {
      setGps({ lat: 37.5696304, lng: 126.9821706 });
    }
  }, []);

  // 카카오맵 Load
  useEffect(() => {
    console.log(gps);
    const script = document.createElement("script");

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;

    document.head.appendChild(script);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.querySelector("#map");
        const options = {
          // center: new window.kakao.maps.LatLng(latitude, longitude),
          center: new window.kakao.maps.LatLng(gps.lat, gps.lng),
          level: 2,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);
      });
    };

    script.addEventListener("load", onLoadKakaoMap);

    // 충전소 data fetching
    const fetchEvStationList = async () => {
      try {
        const data = await getStationList();
        setStationList(data);
      } catch (err) {
        throw err;
      }
    };
    fetchEvStationList();

    // 현재 위치 받아오기

    return () => script.removeEventListener("load", onLoadKakaoMap);
  }, [gps]);

  // 충전소 data에 따라 마커 생성
  useEffect(() => {
    if (stationList && map) {
      // 마커 생성 및 추가, 이벤트 바인딩
      for (let mk of stationList) {
        const { lat, lng, statId, statNm } = mk;
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map,
          title: statNm,
        });
        marker.id = statId;

        // 마커 클릭 이벤트 추가
        window.kakao.maps.event.addListener(marker, "click", () => {
          console.log("click");
          console.log(stationOverlayRef.current);
          if (
            stationOverlayRef.current &&
            stationOverlayRef.current.id === marker.id
          ) {
            console.log("early return");
            return;
          }
          if (stationOverlayRef.current) stationOverlayRef.current.setMap(null);
          console.log("if 통과");
          const { Ma: lat, La: lng } = marker.getPosition();
          const moveLocation = new window.kakao.maps.LatLng(lat, lng);
          map.panTo(moveLocation);
          setSelectedMarker(marker);
        });

        if (markerList) {
          setMarkerList((prev) => {
            return [...prev, marker];
          });
        } else {
          setMarkerList([marker]);
        }
      }
    }
  }, [stationList, map]);

  // selectedMarker 변경시 충전소 세부 내용 data 요청
  useEffect(() => {
    if (selectedMarker) {
      const statId = selectedMarker.id;

      const fetchStationDetail = async (id) => {
        try {
          const data = await getStationDetail(id);
          setSelectedMarkerDetail(data);
        } catch (err) {
          throw err;
        }
      };

      fetchStationDetail(statId);
    }
  }, [selectedMarker]);

  // 선택된 마커 상태 변경 시 데이터 렌더링
  useEffect(() => {
    // 오버레이 생성
    if (selectedMarker && selectedMarkerDetail) {
      const { addr, busiCall, useTime, busiNm, statId, lat, lng } =
        selectedMarkerDetail;

      const overlayContainer = document.createElement("div");
      overlayContainer.className = "overlay__container";
      const titleWrapper = document.createElement("div");
      titleWrapper.className = "title__wrapper";
      const title = document.createElement("h1");
      title.innerText = selectedMarkerDetail.statNm;
      const closeButton = document.createElement("button");
      closeButton.innerText = "닫기";

      const contentWrapper = document.createElement("div");
      contentWrapper.className = "content__wrapper";
      const contentListWrapper = document.createElement("ul");
      contentListWrapper.className = "content-list__wrapper";

      const liAddress = document.createElement("li");
      liAddress.innerText = `주소 : ${addr}`;
      const liAddressDetail = document.createElement("li");
      liAddressDetail.innerText = `상세주소 : ${addr}`;
      const liTel = document.createElement("li");
      liTel.innerText = `전화번호 : ${busiCall}`;
      const liTime = document.createElement("li");
      liTime.innerText = `운영시간 : ${useTime}`;
      const liCompany = document.createElement("li");
      liCompany.innerText = `운영기관 : ${busiNm}`;
      const liCharger = document.createElement("li");
      liCharger.innerText = `충전가능갯수 : `;

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
      });

      newStationOverlay.id = statId;

      newStationOverlay.setMap(map);
      stationOverlayRef.current = newStationOverlay;

      closeButton.addEventListener("click", () => {
        // newStationOverlay.setMap(null);
        stationOverlayRef.current.setMap(null);
        stationOverlayRef.current = null;
        setSelectedMarker(null);
        setSelectedMarkerDetail(null);
      });
    }
  }, [selectedMarkerDetail]);

  return <div id="map" className="w-[calc(100%-390px)]"></div>;
};

export default Map;
