import React, { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getSearchAutocomplete } from "../apis/kakaoRestApi";
import { useAtomValue } from "jotai";
import { currentGpsAtom } from "../atoms/atom";

const SearchBar = () => {
  const currentGps = useAtomValue(currentGpsAtom);

  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchAutocompleteList, setSearchAutocompleteList] = useState(null);

  useEffect(() => {
    if (!searchText.trim()) {
      console.log(searchText);
      setSearchAutocompleteList(null);
      return;
    }
    fetchSearchAutocomplete(searchText, currentGps);
  }, [searchText]);

  useEffect(() => {
    console.log(searchAutocompleteList);
  }, [searchAutocompleteList]);

  // handler
  const handleFocusInput = (e) => {
    console.log(e);
    setIsSearchInputFocus(e.type === "focus");
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await getSearchAutocomplete(searchText, currentGps);
      console.log(data);
    } catch (err) {
      throw err;
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  // helper
  const fetchSearchAutocomplete = async (keyword, gps) => {
    try {
      if (!keyword) return;
      const data = await getSearchAutocomplete(keyword, gps);
      if (searchText.length) setSearchAutocompleteList(data);
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="relative w-[390px] h-12">
      <div className="flex w-full h-full px-4 py-2 border-r-2 border-y-2">
        <form className="w-11/12 h-full" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="주소 검색"
            className="h-full w-full focus:outline-none"
            onChange={handleInputChange}
            onFocus={handleFocusInput}
            onBlur={handleFocusInput}
            value={searchText}
          />
        </form>
        <span className="inline-flex justify-center items-center w-1/12 h-full">
          <MagnifyingGlassIcon width={24} height={24} />
        </span>
      </div>
      {searchAutocompleteList && isSearchInputFocus && searchText.length && (
        <div className="absolute top-12 w-full z-10 p-4 bg-white shadow-md">
          <ul className="flex flex-col gap-4">
            {searchAutocompleteList.documents.map((item) => (
              <li key={item.id} className="">
                <div>
                  <SearchHighlightText
                    text={item.place_name}
                    searchText={searchText}
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-sm">{item.address_name}</span>
                  <span className="w-px bg-gray-400 h-4 inline-block mx-2" />
                  <span className="text-sm">{item.distance}m</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

// 자동완성 하이라이팅 helper component
const SearchHighlightText = ({ text, searchText }) => {
  const regex = new RegExp(`(${searchText})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="text-green-500 font-bold">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};
