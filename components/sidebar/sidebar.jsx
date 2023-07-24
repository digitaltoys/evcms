import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { selectedMarkerDetailAtom } from "../../atoms/atom";
import ChargerListItem from "./chargerListItem";
import SearchBar from "./searchBar";
import ChargerList from "./chargerList";

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
            <ChargerList />
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
