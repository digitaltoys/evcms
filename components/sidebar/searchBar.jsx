import React, { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  getSearchAutocomplete,
  getSearchResult,
} from "../../apis/kakaoRestApi";
import { currentGpsAtom } from "../../atoms/atom";

const SearchBar = ({ handleSetPlaceList }) => {
  const currentGps = useAtomValue(currentGpsAtom);

  const [isInputTyping, setIsInputTyping] = useState(false);
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  const [searchInputText, setSearchInputText] = useState("");
  const [searchAutocompleteList, setSearchAutocompleteList] = useState(null);
  const [highlightText, setHighlightText] = useState("");
  const [autocompleteIndex, setAutocompleteIndex] = useState(-1);

  const inputRef = useRef(null);

  // inputText를 입력했을 때만 자동완성 fetch. 마우스나 키보드로 자동완성 이동으로 생기는 inputText 변경시엔 fetch 안함.
  useEffect(() => {
    if (!searchInputText.trim()) {
      setSearchAutocompleteList(null);
      return;
    }

    if (isInputTyping) {
      fetchSearchAutocomplete(searchInputText, currentGps);
    }
  }, [searchInputText]);

  // input 바깥 클릭시 focus blur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsSearchInputFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isSearchInputFocus) inputRef.current.blur();
  }, [isSearchInputFocus]);

  // handler
  const handleFocusInput = (e) => {
    setIsSearchInputFocus(e.type === "focus");
  };

  const handleFormSubmit = async (e) => {
    try {
      // event가 존재할 경우 -> enter로 submit 이벤트 발생했으므로 preventDefault()
      if (e) e.preventDefault();
      if (searchInputText.trim().length === 0) return;
      const data = await getSearchResult(searchInputText, currentGps);
      console.log(data);
      handleSetPlaceList(data.documents);
      setIsSearchInputFocus(false);
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

  const handleInputKeydown = (e) => {
    if (searchAutocompleteList && searchAutocompleteList.length) {
      const lastIndex = searchAutocompleteList.length - 1;
      if (e.key === "ArrowUp") {
        e.preventDefault();

        setIsInputTyping(false);
        const curIndex = Math.max(autocompleteIndex - 1, -1);
        setAutocompleteIndex(curIndex);

        if (curIndex >= 0) {
          setSearchInputText(searchAutocompleteList[curIndex].place_name);
        }
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsInputTyping(false);
        const curIndex = Math.min(autocompleteIndex + 1, lastIndex);
        setAutocompleteIndex(curIndex);
        setSearchInputText(searchAutocompleteList[curIndex].place_name);
      }
    }
  };

  const handleMouseenterListItem = (e) => {
    setAutocompleteIndex(Number(e.currentTarget.dataset.index));
  };

  const handleMouseDownListItem = (e) => {
    setSearchInputText(e.currentTarget.dataset.name);
    setHighlightText(e.currentTarget.dataset.name);
    handleFormSubmit();
  };

  // helper
  const fetchSearchAutocomplete = async (keyword, gps) => {
    try {
      if (!keyword) return;
      const { documents } = await getSearchAutocomplete(keyword, gps);
      setSearchAutocompleteList(documents);
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="relative w-[390px] h-12">
      <div className="flex w-full h-full px-4 py-2 border-b-[1px]">
        <form className="w-11/12 h-full" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="주소 검색"
            className="h-full w-full focus:outline-none"
            name="keyword"
            autoComplete="off"
            onChange={handleInputChange}
            onFocus={handleFocusInput}
            onBlur={handleFocusInput}
            onKeyDown={handleInputKeydown}
            value={searchInputText}
            ref={inputRef}
          />
        </form>
        <span className="inline-flex justify-center items-center w-1/12 h-full">
          <MagnifyingGlassIcon width={24} height={24} />
        </span>
      </div>
      {searchAutocompleteList &&
        isSearchInputFocus &&
        !!searchInputText.trim() && (
          <div className="absolute top-12 w-full z-10 py-4 bg-white shadow-md">
            <ul className="flex flex-col gap-2 select-none">
              {searchAutocompleteList.length ? (
                searchAutocompleteList
                  .sort((a, b) => a.distance - b.distance)
                  .map((item, idx) => (
                    <li
                      key={item.id}
                      className={`${
                        idx === autocompleteIndex && "bg-gray-200"
                      } py-2 px-4 cursor-pointer`}
                      data-index={idx}
                      data-name={item.place_name}
                      onMouseEnter={handleMouseenterListItem}
                      onMouseDown={handleMouseDownListItem}
                    >
                      <div>
                        <SearchHighlightText
                          text={item.place_name}
                          searchInputText={highlightText}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">
                          {item.road_address_name}
                        </span>
                        <span className="w-px bg-gray-400 h-4 inline-block mx-2" />
                        <span className="text-sm">{item.distance}m</span>
                      </div>
                    </li>
                  ))
              ) : (
                <li>
                  <div className="py-2 px-4">검색 결과가 없습니다.</div>
                </li>
              )}
            </ul>
          </div>
        )}
    </div>
  );
};

export default SearchBar;

// 자동완성 하이라이팅 component
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
