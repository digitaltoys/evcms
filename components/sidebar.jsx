import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { selectedMarkerDetailAtom } from "../atoms/atom";

const Sidebar = () => {
  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);

  return (
    <>
      <div className={`inline-block w-[390px] relative h-full p-4`}>
        {selectedMarkerDetail && <h1>{selectedMarkerDetail.statNm}</h1>}
      </div>
    </>
  );
};

export default Sidebar;
