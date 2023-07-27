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

-- 충전소의 충전기 상태
    select count(case when stat="2" then 1 end),count(chgerId), statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode
    from Charger
    where statId="CGA00001";

    select stat, statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode
    from Charger
    where statId="CGA00001";

select * from Station 
where "37.55" < lat and lat < "37.60";

select max(stat), * from Charger where ""=""  and lat>"37.56687331506491" and lng>"126.97633183666672" and lat<"37.57466829739018" and lng<"126.98463842886599" group by statId;
select stat, * from Charger where ""=""  and lat>"37.56687331506491" and lng>"126.97633183666672" and lat<"37.57466829739018" and lng<"126.98463842886599";
select * FROM commonCode where category="chgerStat" ;

chgerStat	0	알수없음	91
chgerStat	1	통신이상	40
chgerStat	2	사용가능	10
chgerStat	3	충전중	    20
chgerStat	4	운영중지	50
chgerStat	5	점검중	    30
chgerStat	9	알수없음	90
select min(comment), * FROM Charger join commonCode on Charger.stat= commonCode.code 
where category="chgerStat" and lat>"37.56687331506491" and lng>"126.97633183666672" and lat<"37.57466829739018" and lng<"126.98463842886599" 
group by statId;