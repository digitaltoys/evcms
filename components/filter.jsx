import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        console.log("handleclickoutside");
        console.log(filterRef.current.contains(e.target));
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickButton = (e) => {
    console.log("handlebuttonclick");
    setIsFilterOpen(true);
  };
  return (
    <div
      className={`inline-block absolute top-4 right-4 z-10 ${
        isFilterOpen ? "w-[24rem] h-[32rem]" : "w-10 h-10"
      } rounded-lg bg-white transition-all ease-in-out duration-100`}
      ref={filterRef}
    >
      {!isFilterOpen && (
        <button
          className="w-10 h-10 flex justify-center items-center rounded-lg shadow-md bg-white hover:text-green-600 transition-all ease-linear duration-100"
          onClick={handleClickButton}
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
