import { useEffect, useState } from "react";
import { getStationList } from "../apis/evApi";

const Map = ({ latitude, longitude, setIsSidebarOpen }) => {
  const [map, setMap] = useState(null);
  const [stationList, setStationList] = useState(null);
  const [markerList, setMarkerList] = useState(null);

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

  useEffect(() => {
    if (stationList) {
      if (markerList) {
        for (let mk of markerList) {
          mk.setMap(null);
        }
        setMarkerList(null);
      }

      for (let mk of stationList) {
        const markerPosition = new window.kakao.maps.LatLng();
      }
    }
  }, [stationList]);

  return <div id="map" className="w-full h-full"></div>;
};

export default Map;
