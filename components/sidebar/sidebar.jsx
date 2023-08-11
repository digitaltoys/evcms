import React, { forwardRef, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import SimpleBar from "simplebar-react";

import {
  searchPlaceListAtom,
  selectedMarkerDetailAtom,
} from "../../atoms/atom";
import SearchBar from "./searchBar";
import ChargerList from "./chargerList";
import { BoltIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = forwardRef((props, mapRef) => {
  const [searchPlaceList, setSearchPlaceList] = useAtom(searchPlaceListAtom);
  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);

  const placeMarkerRef = useRef(null);

  const handleSetPlaceList = (list) => {
    setSearchPlaceList(list);
  };

  const handlePlaceResultItemClick = (lat, lng) => {
    const content = `<div class="pin place" id="place-marker"></div>`;
    const placePosition = new window.kakao.maps.LatLng(lat, lng);
    const placeMarkerOverlay = new window.kakao.maps.CustomOverlay({
      position: placePosition,
      content,
      zIndex: 10,
    });

    mapRef.current.setLevel(2);
    mapRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));

    if (placeMarkerRef.current) {
      placeMarkerRef.current.setMap(null);
    }

    placeMarkerOverlay.setMap(mapRef.current);
    placeMarkerRef.current = placeMarkerOverlay;

    const placeMarkerElement = document.querySelector("#place-marker");
    placeMarkerElement.addEventListener("click", () => {
      placeMarkerOverlay.setMap(null);
      placeMarkerRef.current = null;
    });
  };

  return (
    <>
      <section className="flex flex-col w-[390px] border-[1px] border-solid border-gray-200">
        <SearchBar handleSetPlaceList={handleSetPlaceList} />
        <div
          className={`inline-block relative h-[calc(100%-3rem)] overflow-hidden`}
        >
          {searchPlaceList ? (
            <div className="flex flex-col h-full">
              <div className="flex h-16 justify-between items-center p-4 shadow">
                <h2 className="text-lg font-bold">검색 결과</h2>
                <button
                  onClick={() => setSearchPlaceList(null)}
                  aria-label="search-close"
                >
                  <span>
                    <XMarkIcon
                      width={24}
                      height={24}
                      className="hover:text-gray-400"
                    />
                  </span>
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                {searchPlaceList.length ? (
                  <SimpleBar className="h-full">
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
                  </SimpleBar>
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <p className="text-center">
                      검색결과가 없습니다.
                      <br />
                      검색어를 다시 한번 확인해 주세요.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : selectedMarkerDetail ? (
            <ChargerList />
          ) : (
            <div className="w-full h-full p-4 flex justify-center items-center">
              <span>
                <BoltIcon className="w-64 h-64 text-gray-100" />
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
