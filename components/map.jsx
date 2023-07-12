import { useEffect, useRef, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import "../styles/components/map.css";

import { getStationDetail, getStationList } from "../apis/evApi";
import {
  mapAtom,
  selectedMarkerAtom,
  selectedMarkerDetailAtom,
} from "../atoms/atom";
import makeStationOverlay from "../utils/makeCustomOverlay";

const Map = ({ latitude, longitude }) => {
  const [stationList, setStationList] = useState(null);
  const [markerList, setMarkerList] = useState(null);
  const stationOverlayRef = useRef(null);

  const [map, setMap] = useAtom(mapAtom);
  const [selectedMarker, setSelectedMarker] = useAtom(selectedMarkerAtom);
  const [selectedMarkerDetail, setSelectedMarkerDetail] = useAtom(
    selectedMarkerDetailAtom
  );

  const KAKAOMAP_API_KEY = "213d725ddb120155aa57f8ae612ed6d4";

  // 카카오맵 Load
  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;

    document.head.appendChild(script);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.querySelector("#map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 2,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);
      });
    };

    script.addEventListener("load", onLoadKakaoMap);

    return () => script.removeEventListener("load", onLoadKakaoMap);
  }, []);

  // 충전소 data fetching
  useEffect(() => {
    if (map) {
      const fetchEvStationList = async () => {
        try {
          const data = await getStationList();
          setStationList(data);
        } catch (err) {
          throw err;
        }
      };
      fetchEvStationList();

      // test: 커스텀 오버레이
      // const content = `
      // <div class="overlay__container">
      //   <div class="title__wrapper">
      //     <h1>충전소 이름</h1>
      //     <button>닫기</button>
      //   </div>
      //   <div class="content__wrapper">
      //     <ul class="content-list__wrapper">
      //       <li>주소</li>
      //       <li>상세 주소</li>
      //       <li>전화번호</li>
      //       <li>운영 시간</li>
      //       <li>운영사</li>
      //       <li>충전 가능 갯수</li>
      //    </ul>
      //   </div>
      // </div>
      // `;
      // const position = new window.kakao.maps.LatLng(37.569, 126.98);
      // const customOverlay = new kakao.maps.CustomOverlay({
      //   position,
      //   content,
      // });

      // customOverlay.setMap(map);
    }
  }, [map]);

  // 충전소 data에 따라 마커 생성
  useEffect(() => {
    if (stationList) {
      if (markerList) {
        for (let mk of markerList) {
          mk.setMap(null);
        }
      }

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
          console.log("selectedMarker 확인", selectedMarker);
          if (stationOverlayRef.current) stationOverlayRef.current.setMap(null);

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
  }, [stationList]);

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
    console.log("selectedMarkerDetail", selectedMarkerDetail);

    // 오버레이 생성
    if (selectedMarker && selectedMarkerDetail) {
      const { Ma: lat, La: lng } = selectedMarker.getPosition();
      const { addr, busiCall, useTime, busiNm } = selectedMarkerDetail;

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

      newStationOverlay.setMap(map);
      stationOverlayRef.current = newStationOverlay;

      closeButton.addEventListener("click", () => {
        newStationOverlay.setMap(null);
        stationOverlayRef.current.setMap(null);
      });
    }
  }, [selectedMarkerDetail]);

  return <div id="map" className="w-[calc(100%-390px)]"></div>;
};

export default Map;
