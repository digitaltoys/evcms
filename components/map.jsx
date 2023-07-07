import { useEffect, useState } from "react";

const Map = ({ latitude, longitude, setIsSidebarOpen }) => {
  const [map, setMap] = useState(null);

  const KAKAOMAP_API_KEY = "213d725ddb120155aa57f8ae612ed6d4";
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
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(newMap);
        window.kakao.maps.event.addListener(marker, "click", () => {
          setIsSidebarOpen(true);
        });
      });
    };

    script.addEventListener("load", onLoadKakaoMap);

    return () => script.removeEventListener("load", onLoadKakaoMap);
  }, []);

  return <div id="map" className="w-full h-full"></div>;
};

export default Map;
