-- Up
CREATE TABLE Charger (
    chargerid TEXT PRIMARY KEY,
    stationid TEXT,
    name TEXT
);

INSERT INTO Charger (chargerid,stationid,name) values('00001', '10000', 'C1');
INSERT INTO Charger (chargerid,stationid,name) values('00002', '10000', 'C2');
INSERT INTO Charger (chargerid,stationid,name) values('00003', '10000', 'C3');
INSERT INTO Charger (chargerid,stationid,name) values('00004', '20000', 'C4');

CREATE TABLE Station (
    stationid TEXT PRIMARY KEY,
    name TEXT
);

INSERT INTO Station (stationid,name) values('10000', 'SK충전소');
INSERT INTO Station (stationid,name) values('20000', '영풍충전소');

-- select * from Charger
-- select * from Station

-- Down
DROP TABLE Charger;
DROP TABLE Station;