import React, { useCallback, useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getSearchAutocomplete } from "../apis/kakaoRestApi";
import { useAtomValue } from "jotai";
import { currentGpsAtom } from "../atoms/atom";

const SearchBar = () => {
  const currentGps = useAtomValue(currentGpsAtom);

  const [isInputTyping, setIsInputTyping] = useState(false);
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  const [searchInputText, setSearchInputText] = useState("");
  const [searchAutocompleteList, setSearchAutocompleteList] = useState(null);
  const [highlightText, setHighlightText] = useState("");
  const [autocompleteIndex, setAutocompleteIndex] = useState(-1);

  useEffect(() => {
    if (!searchInputText.trim()) {
      setSearchAutocompleteList(null);
      return;
    }

    if (isInputTyping) {
      fetchSearchAutocomplete(searchInputText, currentGps);
    }
  }, [searchInputText]);

  // handler
  const handleFocusInput = (e) => {
    setIsSearchInputFocus(e.type === "focus");
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await getSearchAutocomplete(searchInputText, currentGps);
    } catch (err) {
      throw err;
    }
  };

  const handleInputChange = (e) => {
    setIsInputTyping(true);
    setSearchInputText(e.target.value);
    setHighlightText(e.target.value);
    setAutocompleteIndex(-1);
  };

  const handleKeydownInput = (e) => {
    if (searchAutocompleteList.documents.length) {
      const lastIndex = searchAutocompleteList.documents.length - 1;
      if (e.key === "ArrowUp") {
        e.preventDefault();

        setIsInputTyping(false);
        const curIndex = Math.max(autocompleteIndex - 1, -1);
        setAutocompleteIndex(curIndex);

        if (curIndex >= 0) {
          setSearchInputText(
            searchAutocompleteList.documents[curIndex].place_name
          );
        }
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsInputTyping(false);
        const curIndex = Math.min(autocompleteIndex + 1, lastIndex);
        setAutocompleteIndex(curIndex);
        setSearchInputText(
          searchAutocompleteList.documents[curIndex].place_name
        );
      }
    }
  };

  const handleMouseenterInput = (e) => {
    setIsInputTyping(false);
    setAutocompleteIndex(Number(e.currentTarget.dataset.index));

    setSearchInputText(e.currentTarget.dataset.name);
  };

  // helper
  const fetchSearchAutocomplete = async (keyword, gps) => {
    try {
      if (!keyword) return;
      const data = await getSearchAutocomplete(keyword, gps);
      setSearchAutocompleteList(data);
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
            onKeyDown={handleKeydownInput}
            value={searchInputText}
          />
        </form>
        <span className="inline-flex justify-center items-center w-1/12 h-full">
          <MagnifyingGlassIcon width={24} height={24} />
        </span>
      </div>
      {searchAutocompleteList && !!searchInputText.trim() && (
        <div className="absolute top-12 w-full z-10 py-4 bg-white shadow-md">
          <ul className="flex flex-col gap-2 select-none">
            {searchAutocompleteList.documents.map((item, idx) => (
              <li
                key={item.id}
                className={`${
                  idx === autocompleteIndex && "bg-gray-200"
                } py-2 px-4 cursor-pointer`}
                data-index={idx}
                data-name={item.place_name}
                onMouseEnter={handleMouseenterInput}
              >
                <div>
                  <SearchHighlightText
                    text={item.place_name}
                    searchInputText={highlightText}
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
const SearchHighlightText = ({ text, searchInputText }) => {
  const regex = new RegExp(`(${searchInputText})`, "gi");
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
