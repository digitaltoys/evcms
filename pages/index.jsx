import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";

import Map from "../components/map";
import Sidebar from "../components/sidebar";
import { mapAtom, selectedMarkerAtom } from "../atoms/atom";
import { getGeo2Addr } from "../apis/evApi";

export default function Home() {
  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const map = useAtomValue(mapAtom);

  const LATITUDE = 37.569;
  const LONGITUDE = 126.98;

  console.log("index------------------------");
  // let addr = {};
  useEffect(() => {
    console.log("mount------------------------");
    let fetchAddr = async () => {
      let addr = await getGeo2Addr(126.98, 37.569)
      console.log("addr", addr);
      let zcode = addr.code.substr(0,2)
      let zscode = addr.code.substr(0,5)
      console.log("zscode", zscode);
    }
    fetchAddr();
  }, []);

  return (
    <div className="relative inline-flex w-full h-full">
      <Sidebar />
      <Map latitude={LATITUDE} longitude={LONGITUDE} />
    </div>
  );
}
