import React, { useEffect, useRef, useState } from "react";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

import {
  AGENCY_FILTER_DEFAULT,
  CHARGING_SPEED,
  CHARGING_TYPE,
  OPERATING_AGENCY,
  SPEED_FILTER_DEFAULT,
  SPEED_TYPE_MATCHING,
  TYPE_FILTER_DEFAULT,
} from "../constants";
import { useAtom } from "jotai";
import {
  agencyFilterOptionAtom,
  speedFilterOptionAtom,
  typeFilterOptionAtom,
} from "../atoms/atom";

const Filter = () => {
  const [speedFilterOption, setSpeedFilterOption] = useAtom(
    speedFilterOptionAtom
  );
  const [typeFilterOption, setTypeFilterOption] = useAtom(typeFilterOptionAtom);
  const [agencyFilterOption, setAgencyFilterOption] = useAtom(
    agencyFilterOptionAtom
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelectAllToggleClick, setIsSelectAllToggleClick] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterRef = useRef(null);

  // 필터창 바깥 클릭 시 필터 닫힘
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 운영기관 전체 선택 / 전체 해제
  useEffect(() => {
    if (isSelectAllToggleClick) {
      const updatedOptions = {};

      for (let option of OPERATING_AGENCY) {
        updatedOptions[option] = isSelectAll;
      }

      setAgencyFilterOption(updatedOptions);
      setIsSelectAllToggleClick(false);
    }
  }, [isSelectAll]);

  // 운영기관 변경시 전체 선택 on off
  useEffect(() => {
    const allSelected = Object.values(agencyFilterOption).every(
      (value) => value
    );

    if (allSelected !== isSelectAll) {
      setIsSelectAll(allSelected);
    }
  }, [agencyFilterOption]);

  // 충전속도 변경시 충전타입 변경
  // 1. 급속 선택 상태에서 완속 선택 해제 시 AC3상 선택 유지
  // 2-1. 초급속 선택 상태에서 급속 선택 해제 시 DC콤보, 슈퍼차저 선택 유지
  // 2-2. 완속 선택 상태에서 급속 선택 해제 시 AC3상 선택 유지
  // 3. 급속 선택 상태에서 초급속 선택 해제 시 DC콤보, 슈퍼차저 선택값 처리 유지.
  useEffect(() => {
    if (selectedFilter === "speed") {
      const newTypeOption = typeFilterOption;
      const filterTrueKey = Object.keys(speedFilterOption).filter(
        (key) => speedFilterOption[key]
      );

      Object.keys(newTypeOption).forEach((key) => (newTypeOption[key] = false));

      filterTrueKey.forEach((key) => {
        SPEED_TYPE_MATCHING[key].forEach((type) => {
          newTypeOption[type] = true;
        });
      });

      setTypeFilterOption(newTypeOption);
    }
  }, [speedFilterOption]);

  // 타입 변경시 해당하는 속도 필터가 없다면 속도 필터 해제
  useEffect(() => {
    if (selectedFilter === "type") {
      const speedFilterKey = Object.keys(speedFilterOption);
      const newSpeedOption = Object.assign({}, speedFilterOption);
      speedFilterKey.forEach((key) => {
        const result = SPEED_TYPE_MATCHING[key].every(
          (item) => typeFilterOption[item]
        );
        newSpeedOption[key] = result;
      });

      setSpeedFilterOption(newSpeedOption);
    }
  }, [typeFilterOption]);

  // 필터 옵션 핸들러
  const handleClickFilterDefault = () => {
    setSpeedFilterOption(SPEED_FILTER_DEFAULT);
    setTypeFilterOption(TYPE_FILTER_DEFAULT);
    setAgencyFilterOption(AGENCY_FILTER_DEFAULT);
  };

  const handleClickFilterButton = () => {
    setIsFilterOpen(true);
  };

  const handleSpeedFilterChange = (e) => {
    const { name, checked } = e.target;
    setSpeedFilterOption((prev) => ({ ...prev, [name]: checked }));
    setSelectedFilter("speed");
  };

  const handleTypeFilterChange = (e) => {
    const { name, checked } = e.target;
    setTypeFilterOption((prev) => ({ ...prev, [name]: checked }));
    setSelectedFilter("type");
  };

  const handleAgencyFilterChange = (e) => {
    const { name, checked } = e.target;
    setAgencyFilterOption((prev) => ({ ...prev, [name]: checked }));
    setSelectedFilter("agency");
  };

  const handleToggleSwitch = () => {
    setIsSelectAll((prev) => !prev);
    setIsSelectAllToggleClick(true);
  };

  return (
    <div
      className={`inline-block absolute top-4 right-4 z-10 ${
        isFilterOpen ? "w-[32rem]" : "w-10 h-10"
      } rounded-lg bg-white shadow-lg transition-all ease-in-out duration-300`}
    >
      {isFilterOpen ? (
        <div
          className="flex flex-col w-full h-full px-4 select-none"
          ref={filterRef}
        >
          <div className="flex justify-center items-center relative p-4 border-b-2">
            <h3 className="text-xl font-bold">필터설정</h3>
            <button
              className="absolute top-5 right-0"
              onClick={handleClickFilterDefault}
              aria-label="filter-reset"
            >
              초기화
            </button>
          </div>
          <div className="py-4 border-b-2">
            <h3 className="mb-4 text-xl font-bold">속도</h3>
            <div className="flex gap-2">
              {CHARGING_SPEED.map((speed) => (
                <label
                  key={speed}
                  className={`border-[1px] py-1 px-3 rounded-2xl cursor-pointer transition-all ease-in-out duration-150 ${
                    speedFilterOption[speed] &&
                    "bg-green-50 border-solid border-1 border-green-600 text-green-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={speed}
                    className="appearance-none"
                    checked={speedFilterOption[speed]}
                    onChange={handleSpeedFilterChange}
                  />
                  <span>{speed}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="py-4 border-b-2">
            <h3 className="mb-4 text-xl font-bold">충전기 타입</h3>
            <div className="flex gap-2">
              {CHARGING_TYPE.map((type) => (
                <label
                  key={type}
                  className={`border-[1px] py-1 px-3 rounded-2xl cursor-pointer transition-all ease-in-out duration-150 ${
                    typeFilterOption[type] &&
                    "bg-green-50 border-solid border-1 border-green-600 text-green-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={type}
                    className="appearance-none"
                    checked={typeFilterOption[type]}
                    onChange={handleTypeFilterChange}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="relative py-4 overflow-hidden">
            <h3 className="text-xl font-bold mb-2">운영기관</h3>
            <div className="flex justify-center items-center absolute top-4 right-0">
              <span className="mr-2 font-bold">전체</span>
              <label
                className={`relative inline-block w-14 h-6 rounded-full ${
                  isSelectAll ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="absolute w-0 h-0 opacity-0"
                  checked={isSelectAll}
                  onChange={handleToggleSwitch}
                />
                <span
                  className={`absolute left-1 top-1 w-4 h-4 transform transition-all duration-200 ease-in-out rounded-full ${
                    isSelectAll
                      ? "bg-white translate-x-[200%]"
                      : "bg-gray-400 translate-x-0"
                  }`}
                />
              </label>
            </div>
            <div className="flex flex-wrap py-2 gap-2 h-96 overflow-y-scroll no-scrollbar">
              {OPERATING_AGENCY.map((agency) => (
                <label
                  key={agency}
                  className={`border-[1px] py-1 px-3 rounded-2xl cursor-pointer transition-all ease-in-out duration-150 ${
                    agencyFilterOption[agency] &&
                    "bg-green-50 border-solid border-1 border-green-600 text-green-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={agency}
                    className="appearance-none"
                    checked={agencyFilterOption[agency]}
                    onChange={handleAgencyFilterChange}
                  />
                  <span>{agency}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button
          className="w-10 h-10 flex justify-center items-center rounded-lg shadow-md bg-white hover:text-green-600 transition-all ease-linear duration-100"
          onClick={handleClickFilterButton}
          aria-label="filter-open"
        >
          <span>
            <AdjustmentsVerticalIcon width={24} height={24} />
          </span>
        </button>
      )}
    </div>
  );
};

export default Filter;
