import React, { forwardRef, useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  searchPlaceListAtom,
  selectedMarkerDetailAtom,
} from "../../atoms/atom";
import SearchBar from "./searchBar";
import ChargerList from "./chargerList";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = forwardRef((props, ref) => {
  // const [searchPlaceList, setSearchPlaceList] = useState(null);

  const [searchPlaceList, setSearchPlaceList] = useAtom(searchPlaceListAtom);
  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);

  const handleSetPlaceList = (list) => {
    setSearchPlaceList(list);
  };

  const handlePlaceResultItemClick = (lat, lng) => {
    ref.current.panTo(new window.kakao.maps.LatLng(lat, lng));
  };
  console.log(searchPlaceList);
  return (
    <>
      <section className="flex flex-col w-[390px] border-[1px] border-solid border-gray-200">
        <SearchBar handleSetPlaceList={handleSetPlaceList} />
        <div
          className={`inline-block relative h-[calc(100%-3rem)] overflow-hidden`}
        >
          {searchPlaceList ? (
            <div className="h-full">
              <div className="flex h-16 justify-between items-center p-4 shadow">
                <h2 className="text-lg font-bold">검색 결과</h2>
                <button onClick={() => setSearchPlaceList(null)}>
                  <span>
                    <XMarkIcon
                      width={24}
                      height={24}
                      className="hover:text-gray-400"
                    />
                  </span>
                </button>
              </div>
              <div className="h-[calc(100%-4rem)] overflow-y-scroll no-scrollbar">
                <ul>
                  {searchPlaceList
                    .sort((a, b) => a.distance - b.distance)
                    .map((item) => (
                      <li
                        key={item.id}
                        className="p-4 border-b-[1px] cursor-pointer hover:bg-green-100"
                        onClick={() => {
                          handlePlaceResultItemClick(item.y, item.x);
                        }}
                      >
                        <div className="font-bold">{item.place_name}</div>
                        <div className="flex items-center">
                          <span className="text-xs">
                            {item.road_address_name}
                          </span>
                          <span className="w-px bg-gray-400 h-4 inline-block mx-2" />
                          <span className="text-xs">{item.distance}m</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ) : selectedMarkerDetail ? (
            <ChargerList />
          ) : (
            <div className="w-full h-full p-4 flex justify-center items-center">
              <span>충전소를 선택해주세요!</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
});

export default Sidebar;
