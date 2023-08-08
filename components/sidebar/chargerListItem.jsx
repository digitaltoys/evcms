import React from "react";

import { CHARGER_STAT, CHARGER_TYPE } from "../../constants";
import AC3 from "../svg/ac3";
import ACStandardCharge from "../svg/ACStandardCharge";
import DCChademo from "../svg/dcChademo";
import DCCombo from "../svg/dcCombo";

const STAT_COLOR = {
  0: "text-gray-500", // 상태미확인
  1: "text-red-500", // 통신이상
  2: "text-green-500", // 충전대기
  3: "text-yellow-500", // 충전중
  4: "text-black", // 운영중지
  5: "text-gray-500", // 점검중
  9: "text-gray-500", // 상태미확인
};

const ChargerListItem = ({ charger }) => {
  // date: yyyymmddhhmmss 형식
  // const { stat, chgerType, output, lastTedt, nowTsdt, statUpdDt } = charger;
  const statColor = STAT_COLOR[charger.stat];
  const statText = CHARGER_STAT[charger.stat];
  const outputText = charger.output;
  const dateText = getDateText(charger);
  const chgerType = charger.chgerType;

  function convertToTimestamp(time) {
    const year = parseInt(time.substring(0, 4));
    const month = parseInt(time.substring(4, 6)) - 1; // 월은 0부터 시작하므로 1을 빼줌
    const day = parseInt(time.substring(6, 8));
    const hour = parseInt(time.substring(8, 10));
    const minute = parseInt(time.substring(10, 12));
    const second = parseInt(time.substring(12, 14));

    const date = new Date(year, month, day, hour, minute, second);

    return date.getTime();
  }

  function getDateDifference(date) {
    const now = Date.now();
    const convertedDate = convertToTimestamp(date);

    const timeDifferenceInMilliseconds = now - convertedDate;

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerMonth = millisecondsPerDay * 30; // 단순 예시, 실제 월의 길이에 따라 다름
    const millisecondsPerYear = millisecondsPerDay * 365; // 단순 예시, 윤년 등을 고려하지 않음

    const years = Math.floor(
      timeDifferenceInMilliseconds / millisecondsPerYear
    );
    const remainingTimeAfterYears =
      timeDifferenceInMilliseconds % millisecondsPerYear;

    const months = Math.floor(remainingTimeAfterYears / millisecondsPerMonth);
    const remainingTimeAfterMonths =
      remainingTimeAfterYears % millisecondsPerMonth;

    const days = Math.floor(remainingTimeAfterMonths / millisecondsPerDay);
    const remainingTimeAfterDays =
      remainingTimeAfterMonths % millisecondsPerDay;

    const hours = Math.floor(remainingTimeAfterDays / millisecondsPerHour);
    const remainingTimeAfterHours =
      remainingTimeAfterDays % millisecondsPerHour;

    const minutes = Math.floor(remainingTimeAfterHours / millisecondsPerMinute);
    const remainingTimeAfterMinutes =
      remainingTimeAfterHours % millisecondsPerMinute;

    const seconds = Math.floor(
      remainingTimeAfterMinutes / millisecondsPerSecond
    );

    return {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function findFirstNonZeroDate(date) {
    const { years, months, days, hours, minutes, seconds } = date;

    if (years) return `${years}년`;
    if (months) return `${months}개월`;
    if (days) return `${days}일`;
    if (hours) return `${hours}시`;
    if (minutes) return `${minutes}분`;
    if (seconds) return `${seconds}초`;
  }

  function getDateText(charger) {
    const { stat, lastTedt, nowTsdt, statUpdDt } = charger;

    // 충전대기일 경우 latstTedt(마지막 충전종료일시) 사용
    if (stat === "2") {
      if (!lastTedt) return null;
      const date = getDateDifference(lastTedt);
      const value = findFirstNonZeroDate(date);
      return `${value} 전 마지막 충전`;
    }

    // 충전중일 경우 nowTsdt(충전중 시작일시) 사용
    if (stat === "3") {
      if (!nowTsdt) return null;
      const date = getDateDifference(nowTsdt);
      const value = findFirstNonZeroDate(date);
      return `${value} 경과`;
    }

    return null;
  }

  return (
    <li className="flex w-full h-20 mb-4 rounded-2xl select-none border-[1px] last:mb-0">
      <div
        className={`flex flex-col grow justify-center items-center font-bold text-sm ${statColor}`}
      >
        {/* <span>{CHARGER_STAT[stat]}</span>
        {output && <span className="text-sm">{output} kW</span>} */}
        <span>
          <span>{statText} </span>
          {outputText && <span>({outputText}kW)</span>}
        </span>
        {dateText && <span className="text-xs text-gray-400">{dateText}</span>}
      </div>
      <div className="flex flex-col max-w-[56px] grow justify-center items-center">
        <AC3
          fill={chgerType.includes("AC3상") ? "black" : "gainsboro"}
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            chgerType.includes("AC3상") ? "text-black" : "text-gray-300"
          }`}
        >
          AC3상
        </span>
      </div>
      <div className="flex flex-col max-w-[56px] grow justify-center items-center">
        <ACStandardCharge
          fill={chgerType.includes("AC완속") ? "black" : "gainsboro"}
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            chgerType.includes("AC완속") ? "text-black" : "text-gray-300"
          }`}
        >
          AC완속
        </span>
      </div>
      <div className="flex flex-col max-w-[56px] grow justify-center items-center">
        <DCChademo
          fill={chgerType.includes("DC차데모") ? "black" : "gainsboro"}
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            chgerType.includes("DC차데모") ? "text-black" : "text-gray-300"
          }`}
        >
          DC차데모
        </span>
      </div>
      <div className="flex flex-col max-w-[56px] grow justify-center items-center">
        <DCCombo
          fill={chgerType.includes("DC콤보") ? "black" : "gainsboro"}
          width={32}
          height={32}
        />
        <span
          className={`text-[8px] font-bold ${
            chgerType.includes("DC콤보") ? "text-black" : "text-gray-300"
          }`}
        >
          DC콤보
        </span>
      </div>
    </li>
  );
};

export default ChargerListItem;
