import React from "react";
import { useAtomValue } from "jotai";

import ChargerListItem from "./chargerListItem";
import { selectedMarkerDetailAtom } from "../../atoms/atom";

const ChargerList = () => {
  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);
  return (
    <div>
      <div className="w-full h-60 mb-3 bg-white rounded-2xl"></div>
      <div className="h-[calc(100%-240px)] overflow-y-scroll no-scrollbar">
        <ul>
          {selectedMarkerDetail.Chargers.map((charger) => (
            <ChargerListItem key={charger.chgerId} charger={charger} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChargerList;