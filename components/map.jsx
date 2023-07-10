import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";

import { getStationDetail, getStationList } from "../apis/evApi";
import {
  mapAtom,
  selectedMarkerAtom,
  selectedMarkerDetailAtom,
} from "../atoms/atom";

const Map = ({ latitude, longitude }) => {
  const [stationList, setStationList] = useState(null);
  const [markerList, setMarkerList] = useState(null);

  const [map, setMap] = useAtom(mapAtom);
  const [selectedMarker, setSelectedMarker] = useAtom(selectedMarkerAtom);
  const setSelectedMarkerDetail = useSetAtom(selectedMarkerDetailAtom);

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
    }
  }, [map]);

  // 충전소 data에 따라 마커 생성
  useEffect(() => {
    if (stationList) {
      if (markerList) {
        for (let mk of markerList) {
          mk.setMap(null);
        }
        setMarkerList(null);
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
        window.kakao.maps.event.addListener(marker, "click", function () {
          const { Ma: lat, La: lng } = this.getPosition();
          const moveLocation = new window.kakao.maps.LatLng(lat, lng);
          map.panTo(moveLocation);
          setSelectedMarker(marker);
        });

        if (markerList) {
          setMarkerList((prev) => [...prev, marker]);
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

  return <div id="map" className="w-[calc(100%-390px)]"></div>;
};

export default Map;
