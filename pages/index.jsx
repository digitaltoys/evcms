import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import Map from "../components/map";
import Sidebar from "../components/sidebar";
import { mapAtom, selectedMarkerAtom } from "../atoms/atom";

export default function Home() {
  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const map = useAtomValue(mapAtom);

  const LATITUDE = 37.569;
  const LONGITUDE = 126.98;

  return (
    <div className="relative inline-flex w-full h-full">
      <Sidebar />
      <Map latitude={LATITUDE} longitude={LONGITUDE} />
    </div>
  );
}
