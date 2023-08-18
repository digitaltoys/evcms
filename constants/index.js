// map
export const BUS_ID = {
  AM: "아마노코리아",
  BA: "부안군",
  BG: "비긴스",
  BK: "비케이에너지",
  BN: "블루네트웍스",
  BT: "보타리에너지",
  CB: "참빛이브이씨",
  CP: "캐스트프로",
  CS: "한국EV충전서비스센터",
  CT: "씨티카",
  CU: "씨어스",
  CV: "대영채비",
  DE: "대구환경공단",
  DG: "대구시",
  DP: "대유플러스",
  OC: "오큐브EV",
  E0: "에너지플러스",
  EA: "에바",
  EC: "이지차저",
  EG: "에너지파트너즈",
  EH: "이앤에이치에너지",
  EK: "이노케이텍",
  EM: "evmost",
  EN: "이엔",
  EP: "이카플러그",
  EV: "에버온",
  EZ: "차지인",
  G1: "광주시",
  G2: "광주시",
  GN: "지커넥트",
  GP: "군포시",
  GS: "GS칼텍스",
  HB: "에이치엘비생명과학",
  HD: "현대자동차",
  HE: "한국전기차충전서비스",
  HL: "에이치엘비일렉",
  HM: "휴맥스이브이",
  HS: "홈앤서비스",
  HW: "한화솔루션",
  IK: "익산시",
  JA: "중앙제어",
  JC: "제주에너지공사",
  JD: "제주도청",
  JE: "제주전기자동차서비스",
  JH: "종하아이앤씨",
  JJ: "전주시",
  JN: "제이앤씨플랜",
  JT: "제주테크노파크",
  JU: "정읍시",
  KA: "기아자동차",
  KC: "한국컴퓨터",
  KE: "한국전기차인프라기술",
  KI: "기아자동차",
  KL: "클린일렉스",
  KM: "카카오모빌리티",
  KN: "한국환경공단",
  KO: "이브이파트너스",
  KP: "한국전력",
  KS: "한국전기차솔루션",
  KT: "케이티",
  KU: "한국충전연합",
  LD: "롯데정보통신",
  LH: "LG헬로비전",
  MA: "맥플러스",
  ME: "환경부",
  MO: "매니지온",
  MT: "모던텍",
  NB: "남부솔루션",
  NE: "에너넷",
  NJ: "나주시",
  NT: "한국전자금융",
  OB: "현대오일뱅크",
  PC: "파킹클라우드",
  PI: "차지비",
  PL: "플러그링크",
  PS: "이브이파킹서비스",
  PW: "파워큐브",
  RE: "레드이엔지",
  S1: "에스이피",
  SA: "설악에너텍",
  SB: "소프트베리",
  SC: "삼척시",
  SD: "스칼라데이터",
  SE: "서울시",
  SF: "스타코프",
  SG: "SK시그넷",
  SJ: "세종시",
  SK: "SK에너지",
  SM: "성민기업",
  SN: "서울에너지공사",
  SO: "선광시스템",
  SP: "스마트포트테크놀로지",
  SR: "SK렌터카",
  SS: "삼성EVC",
  ST: "에스트래픽",
  TB: "태백시",
  TD: "타디스테크놀로지",
  TL: "티엘컴퍼니",
  TM: "티맵",
  UN: "유니이브이",
  US: "울산시",
  YY: "양양군",
};

export const CHARGER_STAT = {
  0: "상태미확인",
  1: "통신이상",
  2: "사용가능",
  3: "충전중",
  4: "운영중지",
  5: "점검중",
  9: "상태미확인",
};

export const CHARGER_LOGO_STAT_CONVERTER = {
  0: 4,
  1: 4,
  2: 1,
  3: 2,
  4: 3,
  5: 3,
  9: 4,
};

export const EXIST_CHARGER_LOGO = [
  "BT",
  "CV",
  "EP",
  "EV",
  "GN",
  "HE",
  "JD",
  "KP",
  "ME",
  "PI",
  "ST",
];

export const CHARGER_TYPE = {
  "01": ["DC차데모"],
  "02": ["AC완속"],
  "03": ["DC차데모", "AC3상"],
  "04": ["DC콤보"],
  "05": ["DC차데모", "DC콤보"],
  "06": ["DC차데모", "AC3상", "DC콤보"],
  "07": ["AC3상"],
  89: ["H2"],
};

export const STATION_KIND = {
  A0: "공공시설",
  B0: "주차시설",
  C0: "휴게시설",
  D0: "관광시설",
  E0: "상업시설",
  F0: "차량정비시설",
  G0: "기타시설",
  H0: "공동주택시설",
  I0: "근린생활시설",
  J0: "교육문화시설",
};

export const CLUSTERER_STYLES = [
  {
    width: "50px",
    height: "50px",
    lineHeight: "50px",
    fontSize: "25px",
    fontWeight: "700",
    background: "#00b894",
    color: "white",
    textAlign: "center",
    borderRadius: "50%",
    opacity: "0.9",
  },
  {
    width: "75px",
    height: "75px",
    lineHeight: "75px",
    fontSize: "25px",
    fontWeight: "700",
    background: "#f9ca24",
    color: "white",
    textAlign: "center",
    borderRadius: "50%",
    opacity: "0.9",
  },
  {
    width: "100px",
    height: "100px",
    lineHeight: "100px",
    fontSize: "25px",
    fontWeight: "700",
    background: "#f39c12",
    color: "white",
    textAlign: "center",
    borderRadius: "50%",
    opacity: "0.9",
  },
  {
    width: "125px",
    height: "125px",
    lineHeight: "125px",
    fontSize: "25px",
    fontWeight: "700",
    background: "#e74c3c",
    color: "white",
    textAlign: "center",
    borderRadius: "50%",
    opacity: "0.9",
  },
  {
    width: "150px",
    height: "150px",
    lineHeight: "150px",
    fontSize: "25px",
    fontWeight: "700",
    background: "#9b59b6",
    color: "white",
    textAlign: "center",
    borderRadius: "50%",
    opacity: "0.9",
  },
];

export const CLUSTERER_CALCULATOR = [50, 100, 500, 1000, 2000];

// filter
export const CHARGING_SPEED = ["완속", "급속", "초급속"];
export const CHARGING_TYPE = ["AC완속", "AC3상", "DC차데모", "DC콤보"];
export const OPERATING_AGENCY = [
  "GS칼텍스",
  "LG헬로비전",
  "SK렌터카",
  "SK시그넷",
  "SK에너지",
  "evmost",
  "광주시",
  // "광주시",
  "군포시",
  "기아자동차",
  // "기아자동차",
  "나주시",
  "남부솔루션",
  "대구시",
  "대구환경공단",
  "대영채비",
  "대유플러스",
  "레드이엔지",
  "롯데정보통신",
  "매니지온",
  "맥플러스",
  "모던텍",
  "보타리에너지",
  "부안군",
  "블루네트웍스",
  "비긴스",
  "비케이에너지",
  "삼성EVC",
  "삼척시",
  "서울시",
  "서울에너지공사",
  "선광시스템",
  "설악에너텍",
  "성민기업",
  "세종시",
  "소프트베리",
  "스마트포트테크놀로지",
  "스칼라데이터",
  "스타코프",
  "씨어스",
  "씨티카",
  "아마노코리아",
  "양양군",
  "에너넷",
  "에너지파트너즈",
  "에너지플러스",
  "에바",
  "에버온",
  "에스이피",
  "에스트래픽",
  "에이치엘비생명과학",
  "에이치엘비일렉",
  "오큐브EV",
  "울산시",
  "유니이브이",
  "이노케이텍",
  "이브이파킹서비스",
  "이브이파트너스",
  "이앤에이치에너지",
  "이엔",
  "이지차저",
  "이카플러그",
  "익산시",
  "전주시",
  "정읍시",
  "제이앤씨플랜",
  "제주도청",
  "제주에너지공사",
  "제주전기자동차서비스",
  "제주테크노파크",
  "종하아이앤씨",
  "중앙제어",
  "지커넥트",
  "차지비",
  "차지인",
  "참빛이브이씨",
  "카카오모빌리티",
  "캐스트프로",
  "케이티",
  "클린일렉스",
  "타디스테크놀로지",
  "태백시",
  "티맵",
  "티엘컴퍼니",
  "파워큐브",
  "파킹클라우드",
  "플러그링크",
  "한국EV충전서비스센터",
  "한국전기차솔루션",
  "한국전기차인프라기술",
  "한국전기차충전서비스",
  "한국전력",
  "한국전자금융",
  "한국충전연합",
  "한국컴퓨터",
  "한국환경공단",
  "한화솔루션",
  "현대오일뱅크",
  "현대자동차",
  "홈앤서비스",
  "환경부",
  "휴맥스이브이",
];

export const SPEED_TYPE_MATCHING = {
  완속: ["AC3상", "AC완속"],
  급속: ["AC3상", "DC콤보", "DC차데모"],
  초급속: ["DC콤보"],
};

export const SPEED_FILTER_DEFAULT = {
  완속: true,
  급속: true,
  초급속: true,
};

export const TYPE_FILTER_DEFAULT = {
  AC완속: true,
  AC3상: true,
  DC차데모: true,
  DC콤보: true,
};

export const AGENCY_FILTER_DEFAULT = {
  GS칼텍스: false,
  LG헬로비전: false,
  SK렌터카: false,
  SK시그넷: false,
  SK에너지: false,
  evmost: false,
  광주시: false,
  // 광주시: false,
  군포시: false,
  기아자동차: false,
  // 기아자동차: false,
  나주시: false,
  남부솔루션: false,
  대구시: false,
  대구환경공단: false,
  대영채비: false,
  대유플러스: false,
  레드이엔지: false,
  롯데정보통신: false,
  매니지온: false,
  맥플러스: false,
  모던텍: false,
  보타리에너지: false,
  부안군: false,
  블루네트웍스: false,
  비긴스: false,
  비케이에너지: false,
  삼성EVC: false,
  삼척시: false,
  서울시: false,
  서울에너지공사: false,
  선광시스템: false,
  설악에너텍: false,
  성민기업: false,
  세종시: false,
  소프트베리: false,
  스마트포트테크놀로지: false,
  스칼라데이터: false,
  스타코프: false,
  씨어스: false,
  씨티카: false,
  아마노코리아: false,
  양양군: false,
  에너넷: false,
  에너지파트너즈: false,
  에너지플러스: false,
  에바: false,
  에버온: false,
  에스이피: false,
  에스트래픽: false,
  에이치엘비생명과학: false,
  에이치엘비일렉: false,
  오큐브EV: true,
  울산시: false,
  유니이브이: false,
  이노케이텍: false,
  이브이파킹서비스: false,
  이브이파트너스: false,
  이앤에이치에너지: false,
  이엔: false,
  이지차저: false,
  이카플러그: false,
  익산시: false,
  전주시: false,
  정읍시: false,
  제이앤씨플랜: false,
  제주도청: false,
  제주에너지공사: false,
  제주전기자동차서비스: false,
  제주테크노파크: false,
  종하아이앤씨: false,
  중앙제어: false,
  지커넥트: false,
  차지비: false,
  차지인: false,
  참빛이브이씨: false,
  카카오모빌리티: false,
  캐스트프로: false,
  케이티: false,
  클린일렉스: false,
  타디스테크놀로지: false,
  태백시: false,
  티맵: false,
  티엘컴퍼니: false,
  파워큐브: false,
  파킹클라우드: false,
  플러그링크: false,
  한국EV충전서비스센터: false,
  한국전기차솔루션: false,
  한국전기차인프라기술: false,
  한국전기차충전서비스: false,
  한국전력: false,
  한국전자금융: false,
  한국충전연합: false,
  한국컴퓨터: false,
  한국환경공단: false,
  한화솔루션: false,
  현대오일뱅크: false,
  현대자동차: false,
  홈앤서비스: false,
  환경부: true,
  휴맥스이브이: false,
};
