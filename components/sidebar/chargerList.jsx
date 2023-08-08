import React from "react";
import { useAtomValue } from "jotai";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import ChargerListItem from "./chargerListItem";
import { selectedMarkerDetailAtom } from "../../atoms/atom";
import { BUS_ID } from "../../constants";

const ChargerList = () => {
  const selectedMarkerDetail = useAtomValue(selectedMarkerDetailAtom);
  const {
    addr,
    location,
    useTime,
    limitYn,
    limitDetail,
    statNm,
    busiId,
    busiCall,
    note,
  } = selectedMarkerDetail;

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="w-full mb-4 rounded-2xl border-[1px]">
        <div className="px-4 py-2 rounded-t-2xl bg-green-400">
          <h2 className="font-bold">{statNm}</h2>
        </div>
        <div className="p-4">
          <p className="flex items-center mb-2">
            <span className="basis-16 shrink-0 text-center">주소</span>
            <span className="h-6 mx-2 border-l border-gray-200" />
            <span>{addr}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="basis-16 shrink-0 text-center">상세위치</span>
            <span className="h-6 mx-2 border-l border-gray-200" />
            <span>{location ? location : "상세위치가 없습니다"}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="basis-16 shrink-0 text-center">제한여부</span>
            <span className="h-6 mx-2 border-l border-gray-200" />
            <span>{limitYn === "Y" ? "이용자 제한" : "제한 없음"}</span>
          </p>
          {limitDetail && (
            <p className="flex items-center mb-2">
              <span className="basis-16 shrink-0 text-center">제한사유</span>
              <span className="h-6 mx-2 border-l border-gray-200" />
              <span>{limitDetail}</span>
            </p>
          )}
          <p className="flex items-center mb-2">
            <span className="basis-16 shrink-0 text-center">운영시간</span>
            <span className="h-6 mx-2 border-l border-gray-200" />
            <span>{useTime}</span>
          </p>
          <p className="flex items-center mb-2 last:mb-0">
            <span className="basis-16 shrink-0 text-center">운영기관</span>
            <span className="h-6 mx-2 border-l border-gray-200" />
            <span>{BUS_ID[busiId]}</span>
          </p>
          <p className="flex items-center mb-2 last:mb-0">
            <span className="basis-16 shrink-0 text-center">전화번호</span>
            <span className="h-6 mx-2 border-l border-gray-200" />
            <span>{busiCall}</span>
          </p>
          {note && (
            <p className="flex items-center mb-2">
              <span className="basis-16 shrink-0 text-center">특이사항</span>
              <span className="h-6 mx-2 border-l border-gray-200" />
              <span>{note}</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <SimpleBar className="h-full">
          <ul>
            {selectedMarkerDetail.Chargers.map((charger) => (
              <ChargerListItem key={charger.chgerId} charger={charger} />
            ))}
          </ul>
        </SimpleBar>
      </div>
    </div>
  );
};

export default ChargerList;
