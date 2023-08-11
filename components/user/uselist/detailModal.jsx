import { XMarkIcon } from "@heroicons/react/24/outline";

const DetailModal = ({ handleCloseModal }) => {
  function handleClickModalBackground() {
    handleCloseModal();
  }

  function handleClickModalClose() {
    handleCloseModal();
  }
  return (
    <div
      className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black/20"
      onClick={handleClickModalBackground}
    >
      <div
        className="flex flex-col w-[480px] bg-white rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="relative h-32 border-b-2">
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-bold">삼화석유(주) 법환주유소</h1>
          </div>
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-md"
            onClick={handleClickModalClose}
          >
            <XMarkIcon />
          </button>
        </header>
        <div className="border-b-2">
          <ul>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">가맹점정보</span>
              <span>SK에너지(wn)</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">충전소정보</span>
              <span>제주특별자치도 서귀포시 일주동로 9173</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">충전기번호</span>
              <span>SKS1234567890</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">충전량</span>
              <span>0.320kWh</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">단가</span>
              <span>347.2원</span>
            </li>
            <li className="flex justify-between my-4 px-4">
              <span className="text-gray-500">사업자등록번호</span>
              <span>1018660120</span>
            </li>
          </ul>
        </div>
        <div className="border-b-2">
          <ul>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">승인일시</span>
              <span>2023.07.26 10:53:24</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">결제방법</span>
              <span>OCUBE 결제</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">결제카드</span>
              <span>비씨</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">카드번호</span>
              <span>1234-****-****-5678</span>
            </li>
            <li className="flex justify-between mt-4 px-4">
              <span className="text-gray-500">충전금액</span>
              <span>101원</span>
            </li>
            <li className="flex justify-between my-4 px-4">
              <span className="text-gray-500">부가세</span>
              <span>10원</span>
            </li>
          </ul>
        </div>
        <div className="flex justify-between p-4 text-2xl font-bold">
          <span>총 결제금액</span>
          <span>111원</span>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
