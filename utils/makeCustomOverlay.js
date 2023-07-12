const makeStationOverlay = (lat, lng, stationOverlay, setStationOverlay) => {
  //   const content = `
  //       <div class="overlay__container">
  //         <div class="title__wrapper">
  //           <h1>충전소 이름</h1>
  //           <button onclick = "() => console.log('hi')">닫기</button>
  //         </div>
  //         <div class="content__wrapper">
  //           <ul class="content-list__wrapper">
  //             <li>주소</li>
  //             <li>상세 주소</li>
  //             <li>전화번호</li>
  //             <li>운영 시간</li>
  //             <li>운영사</li>
  //             <li>충전 가능 갯수</li>
  //          </ul>
  //         </div>
  //       </div>
  //       `;

  const overlayContainer = document.createElement("div");
  overlayContainer.className = "overlay__container";
  const titleWrapper = document.createElement("div");
  titleWrapper.className = "title__wrapper";
  const title = document.createElement("h1");
  title.innerText = "충전소 이름";
  const closeButton = document.createElement("button");
  closeButton.innerText = "닫기";
  closeButton.onclick = closeOverlay;

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "content__wrapper";
  const contentListWrapper = document.createElement("ul");
  contentListWrapper.className = "content-list__wrapper";

  const listArray = [
    "주소",
    "상세 주소",
    "전화번호",
    "운영시간",
    "운영사",
    "충전 가능 갯수",
  ];
  listArray.forEach((string) => {
    const li = document.createElement("li");
    li.innerText = string;
    contentListWrapper.appendChild(li);
  });

  contentWrapper.appendChild(contentListWrapper);

  titleWrapper.appendChild(title);
  titleWrapper.appendChild(closeButton);

  overlayContainer.appendChild(titleWrapper);
  overlayContainer.appendChild(contentWrapper);

  const position = new window.kakao.maps.LatLng(lat, lng);
  const newStationOverlay = new window.kakao.maps.CustomOverlay({
    position,
    content: overlayContainer,
    yAnchor: 1.2,
  });

  function closeOverlay() {
    // stationOverlay.setMap(null);
    setStationOverlay(null);
  }

  return newStationOverlay;
};

export default makeStationOverlay;
