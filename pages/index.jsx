import { useRef } from "react";

import Map from "../components/map";
import { Sidebar } from "../components/sidebar";

export default function Home() {
  const mapRef = useRef(null);

  return (
    <div className="relative inline-flex w-full h-full">
      <Sidebar ref={mapRef} />
      <Map ref={mapRef} />
    </div>
  );
}
