import {
  ArrowDownIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import UselistItem from "./uselistItem";

const Uselist = () => {
  return (
    <div className="flex flex-col justify-center min-h-full">
      <header className="w-full h-60 ">
        <div className="flex justify-center items-center w-[1200px] h-full m-auto">
          <h1 className="text-4xl font-extrabold">이용 내역</h1>
        </div>
      </header>
      <div className="w-full grow">
        <div className="flex flex-col justify-center items-center w-[1200px] h-full m-auto">
          <div className="flex justify-center items-center w-full h-10 border-y-[1px]">
            <div className="w-28 text-center">이용일자</div>
            <div className="w-28 text-center">이용시간</div>
            <div className="grow">충전소명</div>
            <div className="w-28 text-center">결제금액</div>
            <div className="w-28 text-center">결제결과</div>
            <div className="w-14 text-center">내용</div>
          </div>
          <ul className="w-full">
            <UselistItem />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Uselist;
