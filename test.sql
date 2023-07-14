-- SQLite
SELECT *
FROM Station;

select * 
from Charger 
where statId = "ME174040";

ALTER TABLE 테이블명 ADD COLUMN 컬럼명 [데이터 타입];
ALTER TABLE Station ADD COLUMN chgerCnt;

-- UPDATE Station SET id = '10000'  WHERE id = '10001'

-- 충전기에서 충전소 정보만 빼서 충전소 테이블에 넣기
INSERT OR REPLACE INTO Station(chgerCnt, statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode)
    select count(chgerId), statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode
    from Charger
    where statNm not null
    group by statId;

select * from Station 
where "37.55" < lat and lat < "37.60";
