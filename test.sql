-- SQLite
SELECT *
FROM Station;

select * 
from Charger 
where statId = "ME174040";

-- UPDATE Station SET id = '10000'  WHERE id = '10001'

-- 충전기에서 충전소 정보만 빼서 충전소 테이블에 넣기
INSERT OR REPLACE INTO Station(statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode)
    select statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode
    from Charger
    where statNm not null
    group by statId;

select * from Station ;