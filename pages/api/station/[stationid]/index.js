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
  const { stationid } = req.query
  const db = await  open({
    filename:  './db.sqlite' ,
    driver: sqlite3.Database
  })

  const Chargers = await db.all(`select * from Station where statid = "${stationid}"`)
  res.status(200).json(Chargers?.[0]);
}