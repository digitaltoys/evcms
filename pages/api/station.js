// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

/**
 * @swagger
 * /api/station:
 *   get:
 *     description: 충전소 목록
 *     responses:
 *       200:
 *         description: 충전소 정보의 배열
 */
export default async function handler(req, res) {
  const { id } = req.query
  const { zcode, zscode, kind, kindDetail, dataType } = req.query;
  console.log("req:",req.query);

  const db = await  open({
    filename:  './db.sqlite' ,
    driver: sqlite3.Database
  })

  let condition = zcode?` and zcode="${zcode}"`:"";
  condition += zscode?` and zscode="${zscode}"`:"";
  condition += kind?` and kind="${kind}"`:"";
  condition += kindDetail?` and kindDetail="${kindDetail}"`:"";
  condition += dataType?` and dataType="${dataType}"`:"";
  console.log(`select * from Station where ""="" ${condition}`);

  const Chargers = await db.all(`select * from Station where 1=1 ${condition}`);
  // const Chargers = await db.all('select * from Station')
  res.status(200).json(Chargers);
}