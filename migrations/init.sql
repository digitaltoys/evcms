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

-- INSERT INTO Charger (chargerid,stationid,name) values('00001', '10000', 'C1');
-- INSERT INTO Charger (chargerid,stationid,name) values('00002', '10000', 'C2');
-- INSERT INTO Charger (chargerid,stationid,name) values('00003', '10000', 'C3');
-- INSERT INTO Charger (chargerid,stationid,name) values('00004', '20000', 'C4');

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

-- INSERT INTO Station (stationid,name) values('10000', 'SK충전소');
-- INSERT INTO Station (stationid,name) values('20000', '영풍충전소');

-- select * from Charger
-- select * from Station

-- Down
DROP TABLE Charger;
DROP TABLE Station;