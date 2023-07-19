import { useEffect } from "react";

import Map from "../components/map";
import Sidebar from "../components/sidebar";
import { getGeo2Addr } from "../apis/evApi";

export default function Home() {
  console.log("index------------------------");
  // let addr = {};
  useEffect(() => {
    console.log("mount------------------------");
    let fetchAddr = async () => {
      let addr = await getGeo2Addr(126.98, 37.569);
      let zcode = addr.code.substr(0, 2);
      let zscode = addr.code.substr(0, 5);
    };
    fetchAddr();
  }, []);

  return (
    <div className="relative inline-flex w-full h-full">
      <Sidebar />
      <Map />
    </div>
  );
}
