-- SQLite
SELECT id, name
FROM Station;

-- UPDATE Station SET id = '10000'  WHERE id = '10001'
UPDATE Charger SET stationid = '10000'  WHERE stationid = '10001'
UPDATE Charger SET stationid = '20000'  WHERE id = '00004'

select * from Charger where stationid = "10000"