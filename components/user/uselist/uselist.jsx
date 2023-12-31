import { useState } from "react";
import UselistItem from "./uselistItem";

const Uselist = () => {
  const [filterOption, setFilterOption] = useState({
    sortPeriod: "1m",
    sortResult: "total",
    sortOrder: "newest",
  });

  function handleChangeSelect(e) {
    const { name, value } = e.target;
    setFilterOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col justify-center min-h-full">
      <header className="w-full h-60">
        <div className="flex justify-center items-center w-[1200px] h-full m-auto">
          <h1 className="text-4xl font-extrabold">이용 내역</h1>
        </div>
      </header>
      <div className="w-full grow">
        <div className="flex flex-col justify-center items-center w-[1200px] h-full m-auto">
          <div className="flex justify-end gap-2 w-full">
            <form>
              <select
                className="inline w-24 text-center"
                name="sortPeriod"
                value={filterOption.sortPeriod}
                onChange={handleChangeSelect}
              >
                <option value="1m">1개월</option>
                <option value="3m">3개월</option>
                <option value="6m">6개월</option>
                <option value="1y">1년</option>
              </select>
              <select
                className="inline w-24 text-center"
                name="sortResult"
                value={filterOption.sortResult}
                onChange={handleChangeSelect}
              >
                <option value="total">전체</option>
                <option value="fail">결제실패</option>
              </select>
              <select
                className="inline w-24 text-center"
                name="sortOrder"
                value={filterOption.sortOrder}
                onChange={handleChangeSelect}
              >
                <option value="newest">최신순</option>
                <option value="oldest">과거순</option>
              </select>
            </form>
          </div>
          <div className="flex justify-center items-center w-full h-10 mt-4 border-y-[1px]">
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
