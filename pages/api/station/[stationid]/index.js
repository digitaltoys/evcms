// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

/**
 * @swagger
 * /api/station/{statid}:
 *   get:
 *     description: statid 충전소 정보
 *     responses:
 *       200:
 *         description: 충전소 정보
 */
export default async function handler(req, res) {
  const { stationid, zcode, zscode, kind, kindDetail, dataType } = req.query;
  console.log("req:",req);

  const db = await  open({
    filename:  './db.sqlite' ,
    driver: sqlite3.Database
  });

  let condition = stationid?` and statid = "${stationid}"`:"";
  condition += zcode?` and zcode=${zcode}`:"";
  condition += zscode?` and zscode=${zscode}`:"";
  condition += kind?` and kind=${kind}`:"";
  condition += kindDetail?` and kindDetail=${kindDetail}`:"";
  condition += dataType?` and dataType=${dataType}`:"";
  console.log("condition:", condition);
  const Chargers = await db.all(`select * from Station where 1=1 ${condition}`);
  res.status(200).json(Chargers?.[0]);
}