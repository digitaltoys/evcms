import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import { selectedMarkerDetailAtom } from "../atoms/atom";
import { getChargerList } from "../apis/evApi";
import ChargerListItem from "./chargerListItem";

const Sidebar = () => {
  const [chargerList, setChargerList] = useState(null);

  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);

  useEffect(() => {
    // 오버레이 닫혔을 때 (선택 마커 상태가 null) chargerList 상태를 어떻게 업데이트 할 것인지?
    // 1. useEffect 안에서 selectedMarkerDetail 관찰 후 null값으로 상태 갱신
    // 2. selectedMarkerDetail 상태를 중앙 store로 옮긴 후 overlay 닫기 이벤트에 로직 추가
    if (!selectedMarkerDetail) {
      setChargerList(null);
    }
    if (selectedMarkerDetail) {
      const { statId } = selectedMarkerDetail;
      const fetchChargerList = async () => {
        try {
          const data = await getChargerList(statId);
          console.log(data);
          setChargerList(data);
        } catch (err) {
          throw err;
        }
      };

      fetchChargerList();
    }
  }, [selectedMarkerDetail]);

  return (
    <>
      <section
        className={`inline-block w-[390px] relative h-full p-4 bg-gray-200 overflow-hidden`}
      >
        {selectedMarkerDetail ? (
          <>
            <div className="w-full h-60 mb-3 bg-white rounded-xl"></div>
            <div className="h-[calc(100%-240px)] overflow-y-scroll no-scrollbar">
              <ul>
                {chargerList &&
                  chargerList.map((charger) => (
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
      </section>
    </>
  );
};

export default Sidebar;
