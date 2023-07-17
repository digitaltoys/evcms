import React from "react";
import Image from "next/image";

import { CHARGER_STAT, CHARGER_TYPE } from "../constants";
import AC3 from "./svg/ac3";
import ACFullCharge from "./svg/acFullCharge";
import DCChademo from "./svg/dcChademo";
import DCCombo from "./svg/dcCombo";

const STAT_COLOR = {
  1: "text-red-500", // 통신이상
  2: "text-green-500", // 충전대기
  3: "text-yellow-500", // 충전중
  4: "text-black", // 운영중지
  5: "text-gray-500", // 점검중
  9: "text-gray-500", // 상태미확인
};

const ChargerListItem = ({ charger }) => {
  const { stat, chgerType } = charger;
  return (
    <li className="flex w-full h-20 mb-3  rounded-xl bg-white">
      <div
        className={`flex grow justify-center items-center font-bold ${STAT_COLOR[stat]}`}
      >
        <span>{CHARGER_STAT[stat]}</span>
      </div>
      <div className="flex flex-col max-w-[64px] grow justify-center items-center">
        <AC3
          fill={
            CHARGER_TYPE[chgerType].includes("AC3상") ? "black" : "gainsboro"
          }
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            CHARGER_TYPE[chgerType].includes("AC3상")
              ? "text-black"
              : "text-gray-300"
          }`}
        >
          AC3상
        </span>
      </div>
      <div className="flex flex-col max-w-[64px] grow justify-center items-center">
        <ACFullCharge
          fill={
            CHARGER_TYPE[chgerType].includes("AC완속") ? "black" : "gainsboro"
          }
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            CHARGER_TYPE[chgerType].includes("AC완속")
              ? "text-black"
              : "text-gray-300"
          }`}
        >
          AC완속
        </span>
      </div>
      <div className="flex flex-col max-w-[64px] grow justify-center items-center">
        <DCChademo
          fill={
            CHARGER_TYPE[chgerType].includes("DC차데모") ? "black" : "gainsboro"
          }
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            CHARGER_TYPE[chgerType].includes("DC차데모")
              ? "text-black"
              : "text-gray-300"
          }`}
        >
          DC차데모
        </span>
      </div>
      <div className="flex flex-col max-w-[64px] grow justify-center items-center">
        <DCCombo
          fill={
            CHARGER_TYPE[chgerType].includes("DC콤보") ? "black" : "gainsboro"
          }
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            CHARGER_TYPE[chgerType].includes("DC콤보")
              ? "text-black"
              : "text-gray-300"
          }`}
        >
          DC콤보
        </span>
      </div>
    </li>
  );
};

export default ChargerListItem;
