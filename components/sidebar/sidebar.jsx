import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { selectedMarkerDetailAtom } from "../../atoms/atom";
import SearchBar from "./searchBar";
import ChargerList from "./chargerList";

const Sidebar = () => {
  const [placeList, setPlaceList] = useState(null);

  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);

  const handleSetPlaceList = (list) => {
    setPlaceList(list);
  };
  console.log(placeList);
  return (
    <>
      <section className="flex flex-col w-[390px] border-[1px] border-solid border-gray-200">
        <SearchBar handleSetPlaceList={handleSetPlaceList} />
        <div
          className={`inline-block relative h-[calc(100%-3rem)] p-4 overflow-hidden`}
        >
          {placeList ? (
            <div>
              <div className="flex justify-between items-center">
                <h2>검색 결과</h2>
                <button onClick={() => setPlaceList(null)}>닫기</button>
              </div>
              <div>
                <ul>
                  {placeList.map((item) => (
                    <li key={item.id}>
                      <div>{item.place_name}</div>
                      <div>
                        <span>{item.road_address_name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : selectedMarkerDetail ? (
            <ChargerList />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <span>충전소를 선택해주세요!</span>
            </div>
          )}
          {/* {selectedMarkerDetail ? (
            <ChargerList />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <span>충전소를 선택해주세요!</span>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
