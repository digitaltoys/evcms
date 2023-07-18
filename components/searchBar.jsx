import React from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="flex w-[390px] h-full px-4 py-2 border-r-2 border-t-2">
      <form className="inline-block w-11/12 h-full" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="주소 검색"
          className="h-full w-full focus:outline-none"
          onChange={handleInputChange}
        />
      </form>
      <span className="inline-flex justify-center items-center w-1/12 h-full">
        <MagnifyingGlassIcon width={24} height={24} />
      </span>
    </div>
  );
};

export default SearchBar;
