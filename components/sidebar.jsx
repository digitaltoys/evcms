import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { selectedMarkerDetailAtom } from "../atoms/atom";
import ChargerListItem from "./chargerListItem";
import SearchBar from "./searchBar";

const Sidebar = () => {
  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);

  return (
    <>
      <section className="flex flex-col w-[390px]">
        <SearchBar />
        <div
          className={`inline-block relative h-[calc(100%-3rem)] p-4 bg-gray-200 overflow-hidden`}
        >
          {selectedMarkerDetail ? (
            <>
              <div className="w-full h-60 mb-3 bg-white rounded-2xl"></div>
              <div className="h-[calc(100%-240px)] overflow-y-scroll no-scrollbar">
                <ul>
                  {selectedMarkerDetail.Chargers.map((charger) => (
                    <ChargerListItem key={charger.chgerId} charger={charger} />
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <span>충전소를 선택해주세요!</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
