-- Up
CREATE TABLE Charger (
    chgerId TEXT,
    chgerType TEXT,
    statNm TEXT,
    statId TEXT,
    addr TEXT,
    location TEXT,
    useTime TEXT,
    lat TEXT,
    lng TEXT,
    busiId TEXT,
    bnm TEXT,
    busiNm TEXT,
    busiCall TEXT,
    stat TEXT,
    statUpdDt TEXT,
    lastTsdt TEXT,
    lastTedt TEXT,
    nowTsdt TEXT,
    powerType TEXT,
    output TEXT,
    method TEXT,
    zcode TEXT,
    zscode TEXT,
    kind TEXT,
    kindDetail TEXT,
    parkingFree TEXT,
    note TEXT,
    limitYn TEXT,
    limitDetail TEXT,
    delYn TEXT,
    delDetail TEXT,
    trafficYn TEXT,

    stat TEXT,
    statUpdDt TEXT,
    lastTsdt TEXT,
    lastTedt TEXT,
    nowTsdt TEXT,

    PRIMARY KEY(chgerId, statId)
);


CREATE TABLE Station (
    statNm TEXT PRIMARY KEY,
    statId TEXT,
    addr TEXT,
    location TEXT,
    useTime TEXT,
    lat TEXT,
    lng TEXT,
    busiId TEXT,
    bnm TEXT,
    busiNm TEXT,
    busiCall TEXT,
    stat TEXT,
    statUpdDt TEXT,
    lastTsdt TEXT,
    lastTedt TEXT,
    nowTsdt TEXT,
    powerType TEXT,
    output TEXT,
    method TEXT,
    zcode TEXT,
    zscode TEXT,
    kind TEXT,
    kindDetail TEXT,
    parkingFree TEXT,
    note TEXT,
    limitYn TEXT,
    limitDetail TEXT,
    delYn TEXT,
    delDetail TEXT,
    trafficYn TEXT
);

CREATE TABLE commonCode (
    category TEXT,
    code TEXT,
    name TEXT,
    comment TEXT,
    PRIMARY KEY(category, code)
);

INSERT INTO commonCode (category, code, name) VALUES("zcode", "11", "서울특별시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "26", "부산광역시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "27", "대구광역시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "28", "인천광역시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "29", "광주광역시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "30", "대전광역시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "31", "울산광역시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "36", "세종특별자치시");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "41", "경기도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "42", "강원도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "43", "충청북도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "44", "충청남도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "45", "전라북도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "46", "전라남도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "47", "경상북도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "48", "경상남도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "50", "제주특별자치도");
INSERT INTO commonCode (category, code, name) VALUES("zcode", "51", "강원특별자치도");

SELECT * FROM commonCode;

INSERT INTO commonCode (category, code, name) VALUES("zscode", "11110", "종로구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11140", "중구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11170", "용산구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11200", "성동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11215", "광진구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11230", "동대문구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11260", "중랑구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11290", "성북구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11305", "강북구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11320", "도봉구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11350", "노원구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11380", "은평구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11410", "서대문구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11440", "마포구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11470", "양천구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11500", "강서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11530", "구로구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11545", "금천구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11560", "영등포구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11590", "동작구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11620", "관악구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11650", "서초구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11680", "강남구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11710", "송파구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "11740", "강동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26110", "중구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26140", "서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26170", "동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26200", "영도구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26230", "부산진구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26260", "동래구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26290", "남구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26320", "북구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26350", "해운대구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26380", "사하구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26410", "금정구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26440", "강서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26470", "연제구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26500", "수영구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26530", "사상구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "26710", "기장군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27110", "중구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27140", "동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27170", "서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27200", "남구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27230", "북구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27260", "수성구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27290", "달서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "27710", "달성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28110", "중구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28140", "동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28177", "미추홀구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28185", "연수구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28200", "남동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28237", "부평구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28245", "계양구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28260", "서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28710", "강화군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "28720", "옹진군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "29110", "동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "29140", "서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "29155", "남구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "29170", "북구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "29200", "광산구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "30110", "동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "30140", "중구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "30170", "서구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "30200", "유성구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "30230", "대덕구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "31110", "중구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "31140", "남구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "31170", "동구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "31200", "북구");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "31710", "울주군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "36110", "세종특별자치시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41110", "수원시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41130", "성남시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41150", "의정부시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41170", "안양시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41190", "부천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41210", "광명시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41220", "평택시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41250", "동두천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41270", "안산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41280", "고양시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41290", "과천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41310", "구리시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41360", "남양주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41370", "오산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41390", "시흥시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41410", "군포시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41430", "의왕시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41450", "하남시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41460", "용인시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41480", "파주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41500", "이천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41550", "안성시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41570", "김포시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41590", "화성시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41610", "광주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41630", "양주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41650", "포천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41670", "여주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41800", "연천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41820", "가평군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "41830", "양평군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42110", "춘천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42130", "원주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42150", "강릉시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42170", "동해시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42190", "태백시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42210", "속초시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42230", "삼척시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42720", "홍천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42730", "횡성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42750", "영월군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42760", "평창군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42770", "정선군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42780", "철원군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42790", "화천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42800", "양구군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42810", "인제군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42820", "고성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "42830", "양양군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43110", "청주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43130", "충주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43150", "제천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43720", "보은군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43730", "옥천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43740", "영동군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43745", "증평군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43750", "진천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43760", "괴산군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43770", "음성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "43800", "단양군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44130", "천안시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44150", "공주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44180", "보령시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44200", "아산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44210", "서산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44230", "논산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44250", "계룡시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44270", "당진시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44710", "금산군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44760", "부여군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44770", "서천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44790", "청양군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44800", "홍성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44810", "예산군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "44825", "태안군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45110", "전주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45130", "군산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45140", "익산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45180", "정읍시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45190", "남원시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45210", "김제시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45710", "완주군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45720", "진안군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45730", "무주군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45740", "장수군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45750", "임실군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45770", "순창군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45790", "고창군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "45800", "부안군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46110", "목포시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46130", "여수시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46150", "순천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46170", "나주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46230", "광양시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46710", "담양군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46720", "곡성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46730", "구례군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46770", "고흥군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46780", "보성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46790", "화순군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46800", "장흥군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46810", "강진군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46820", "해남군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46830", "영암군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46840", "무안군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46860", "함평군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46870", "영광군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46880", "장성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46890", "완도군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46900", "진도군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "46910", "신안군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47110", "포항시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47130", "경주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47150", "김천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47170", "안동시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47190", "구미시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47210", "영주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47230", "영천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47250", "상주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47280", "문경시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47290", "경산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47720", "군위군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47730", "의성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47750", "청송군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47760", "영양군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47770", "영덕군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47820", "청도군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47830", "고령군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47840", "성주군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47850", "칠곡군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47900", "예천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47920", "봉화군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47930", "울진군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "47940", "울릉군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48120", "창원시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48170", "진주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48220", "통영시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48240", "사천시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48250", "김해시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48270", "밀양시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48310", "거제시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48330", "양산시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48720", "의령군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48730", "함안군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48740", "창녕군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48820", "고성군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48840", "남해군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48850", "하동군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48860", "산청군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48870", "함양군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48880", "거창군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "48890", "합천군");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "50110", "제주시");
INSERT INTO commonCode (category, code, name) VALUES("zscode", "50130", "서귀포시");

SELECT * FROM commonCode;

INSERT INTO commonCode (category, code, name) VALUES("busid", "AM", "아마노코리아");
INSERT INTO commonCode (category, code, name) VALUES("busid", "BA", "부안군");
INSERT INTO commonCode (category, code, name) VALUES("busid", "BG", "비긴스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "BK", "비케이에너지");
INSERT INTO commonCode (category, code, name) VALUES("busid", "BN", "블루네트웍스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "BT", "보타리에너지");
INSERT INTO commonCode (category, code, name) VALUES("busid", "CB", "참빛이브이씨");
INSERT INTO commonCode (category, code, name) VALUES("busid", "CP", "캐스트프로");
INSERT INTO commonCode (category, code, name) VALUES("busid", "CS", "한국EV충전서비스센터");
INSERT INTO commonCode (category, code, name) VALUES("busid", "CT", "씨티카");
INSERT INTO commonCode (category, code, name) VALUES("busid", "CU", "씨어스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "CV", "대영채비");
INSERT INTO commonCode (category, code, name) VALUES("busid", "DE", "대구환경공단");
INSERT INTO commonCode (category, code, name) VALUES("busid", "DG", "대구시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "DP", "대유플러스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "E0", "에너지플러스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EA", "에바");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EC", "이지차저");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EG", "에너지파트너즈");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EH", "이앤에이치에너지");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EK", "이노케이텍");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EM", "evmost");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EN", "이엔");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EP", "이카플러그");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EV", "에버온");
INSERT INTO commonCode (category, code, name) VALUES("busid", "EZ", "차지인");
INSERT INTO commonCode (category, code, name) VALUES("busid", "G1", "광주시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "G2", "광주시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "GN", "지커넥트");
INSERT INTO commonCode (category, code, name) VALUES("busid", "GP", "군포시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "GS", "GS칼텍스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "HB", "에이치엘비생명과학");
INSERT INTO commonCode (category, code, name) VALUES("busid", "HD", "현대자동차");
INSERT INTO commonCode (category, code, name) VALUES("busid", "HE", "한국전기차충전서비스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "HL", "에이치엘비일렉");
INSERT INTO commonCode (category, code, name) VALUES("busid", "HM", "휴맥스이브이");
INSERT INTO commonCode (category, code, name) VALUES("busid", "HS", "홈앤서비스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "HW", "한화솔루션");
INSERT INTO commonCode (category, code, name) VALUES("busid", "IK", "익산시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JA", "중앙제어");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JC", "제주에너지공사");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JD", "제주도청");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JE", "제주전기자동차서비스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JH", "종하아이앤씨");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JJ", "전주시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JN", "제이앤씨플랜");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JT", "제주테크노파크");
INSERT INTO commonCode (category, code, name) VALUES("busid", "JU", "정읍시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KA", "기아자동차");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KC", "한국컴퓨터");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KE", "한국전기차인프라기술");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KI", "기아자동차");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KL", "클린일렉스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KM", "카카오모빌리티");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KN", "한국환경공단");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KO", "이브이파트너스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KP", "한국전력");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KS", "한국전기차솔루션");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KT", "케이티");
INSERT INTO commonCode (category, code, name) VALUES("busid", "KU", "한국충전연합");
INSERT INTO commonCode (category, code, name) VALUES("busid", "LD", "롯데정보통신");
INSERT INTO commonCode (category, code, name) VALUES("busid", "LH", "LG헬로비전");
INSERT INTO commonCode (category, code, name) VALUES("busid", "MA", "맥플러스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "ME", "환경부");
INSERT INTO commonCode (category, code, name) VALUES("busid", "MO", "매니지온");
INSERT INTO commonCode (category, code, name) VALUES("busid", "MT", "모던텍");
INSERT INTO commonCode (category, code, name) VALUES("busid", "NB", "남부솔루션");
INSERT INTO commonCode (category, code, name) VALUES("busid", "NE", "에너넷");
INSERT INTO commonCode (category, code, name) VALUES("busid", "NJ", "나주시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "NT", "한국전자금융");
INSERT INTO commonCode (category, code, name) VALUES("busid", "OB", "현대오일뱅크");
INSERT INTO commonCode (category, code, name) VALUES("busid", "PC", "파킹클라우드");
INSERT INTO commonCode (category, code, name) VALUES("busid", "PI", "차지비");
INSERT INTO commonCode (category, code, name) VALUES("busid", "PL", "플러그링크");
INSERT INTO commonCode (category, code, name) VALUES("busid", "PS", "이브이파킹서비스");
INSERT INTO commonCode (category, code, name) VALUES("busid", "PW", "파워큐브");
INSERT INTO commonCode (category, code, name) VALUES("busid", "RE", "레드이엔지");
INSERT INTO commonCode (category, code, name) VALUES("busid", "S1", "에스이피");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SA", "설악에너텍");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SB", "소프트베리");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SC", "삼척시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SD", "스칼라데이터");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SE", "서울시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SF", "스타코프");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SG", "SK시그넷");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SJ", "세종시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SK", "SK에너지");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SM", "성민기업");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SN", "서울에너지공사");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SO", "선광시스템");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SP", "스마트포트테크놀로지");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SR", "SK렌터카");
INSERT INTO commonCode (category, code, name) VALUES("busid", "SS", "삼성EVC");
INSERT INTO commonCode (category, code, name) VALUES("busid", "ST", "에스트래픽");
INSERT INTO commonCode (category, code, name) VALUES("busid", "TB", "태백시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "TD", "타디스테크놀로지");
INSERT INTO commonCode (category, code, name) VALUES("busid", "TL", "티엘컴퍼니");
INSERT INTO commonCode (category, code, name) VALUES("busid", "TM", "티맵");
INSERT INTO commonCode (category, code, name) VALUES("busid", "UN", "유니이브이");
INSERT INTO commonCode (category, code, name) VALUES("busid", "US", "울산시");
INSERT INTO commonCode (category, code, name) VALUES("busid", "YY", "양양군");

SELECT * FROM commonCode where category = "busid";

INSERT INTO commonCode (category, code, name) VALUES("chgerStat", "0", "알수없음");
INSERT INTO commonCode (category, code, name) VALUES("chgerStat", "1", "통신이상");
INSERT INTO commonCode (category, code, name) VALUES("chgerStat", "2", "사용가능");
INSERT INTO commonCode (category, code, name) VALUES("chgerStat", "3", "충전중");
INSERT INTO commonCode (category, code, name) VALUES("chgerStat", "4", "운영중지");
INSERT INTO commonCode (category, code, name) VALUES("chgerStat", "5", "점검중");
INSERT INTO commonCode (category, code, name) VALUES("chgerStat", "9", "알수없음");

SELECT * FROM commonCode where category = "chgerStat";

INSERT INTO commonCode (category, code, name) VALUES("chgerType", "01", "DC차데모");
INSERT INTO commonCode (category, code, name) VALUES("chgerType", "02", "AC완속");
INSERT INTO commonCode (category, code, name) VALUES("chgerType", "03", "DC차데모+AC3상");
INSERT INTO commonCode (category, code, name) VALUES("chgerType", "04", "DC콤보");
INSERT INTO commonCode (category, code, name) VALUES("chgerType", "05", "DC차데모+DC콤보");
INSERT INTO commonCode (category, code, name) VALUES("chgerType", "06", "DC차데모+AC3상+DC콤보");
INSERT INTO commonCode (category, code, name) VALUES("chgerType", "07", "AC3상");
INSERT INTO commonCode (category, code, name) VALUES("chgerType", "89", "H2");

SELECT * FROM commonCode where category = "chgerType";

INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "A0", "공공시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "B0", "주차시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "C0", "휴게시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "D0", "관광시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "E0", "상업시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "F0", "차량정비시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "G0", "기타시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKind", "H0", "공동주택시설");

SELECT * FROM commonCode where category = "chgerKind";

INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "A001", "관공서");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "A002", "주민센터");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "A003", "공공기관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "A004", "지자체시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "B001", "공영주차장");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "B002", "공원주차장");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "B003", "환승주차장");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "B004", "일반주차장");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "C001", "고속도로 휴게소");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "C002", "지방도로 휴게소");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "C003", "쉼터");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D001", "공원");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D002", "전시관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D003", "민속마을");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D004", "생태공원");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D005", "홍보관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D006", "관광안내소");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D007", "관광지");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D008", "박물관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "D009", "유적지");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E001", "마트(쇼핑몰)");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E002", "백화점");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E003", "숙박시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E004", "골프장(CC)");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E005", "카페");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E006", "음식점");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E007", "주유소");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "E008", "영화관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "F001", "서비스센터");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "F002", "정비소");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "G001", "군부대");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "G002", "야영장");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "G003", "공중전화부스");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "G004", "기타");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "G005", "오피스텔");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "G006", "단독주택");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "H001", "아파트");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "H002", "빌라");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "H003", "사업장(사옥)");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "H004", "기숙사");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "H005", "연립주택");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I001", "병원");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I002", "종교시설");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I003", "보건소");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I004", "경찰서");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I005", "도서관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I006", "복지관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I007", "수련원");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "I008", "금융기관");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "J001", "학교");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "J002", "교육원");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "J003", "학원");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "J004", "공연장");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "J005", "관람장");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "J006", "동식물원");
INSERT INTO commonCode (category, code, name) VALUES("chgerKindDetail", "J007", "경기장");
SELECT * FROM commonCode where category = "chgerKindDetail";




-- Down
DROP TABLE Charger;
DROP TABLE Station;
DROP TABLE Zcode;
DROP TABLE Zscode;
