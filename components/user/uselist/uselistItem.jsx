import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const UselistItem = () => {
  return (
    <li className=" border-b-[1px]">
      <div className="flex w-full h-16">
        <div className="flex justify-center items-center w-28 text-center">
          2023.08.09
        </div>
        <div className="flex justify-center items-center w-28 text-center">
          14:10
        </div>
        <div className="flex items-center grow">삼화석유(주) 법환주유소</div>
        <div className="flex justify-center items-center w-28 text-center">
          111원
        </div>
        <div className="flex justify-center items-center w-28 text-center">
          결제 실패
        </div>
        <div className="flex justify-center items-center w-14 text-center">
          <button className="w-6 h-6 text-blue-500">
            <MagnifyingGlassIcon />
          </button>
        </div>
      </div>
    </li>
  );
};

export default UselistItem;
