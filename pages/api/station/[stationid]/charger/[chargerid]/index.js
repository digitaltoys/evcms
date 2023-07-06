// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function handler(req, res) {
  const { stationid, chargerid } = req.query
  console.log("query", req.query);
  const db = await  open({
    filename:  './db.sqlite' ,
    driver: sqlite3.Database
  })

  const Chargers = await db.all(`select * from Charger where stationid = "${stationid}" and chargerid = "${chargerid}"`)
  res.status(200).json(Chargers?.[0]);
}