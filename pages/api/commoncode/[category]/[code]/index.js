// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

/**
 * @swagger
 * /api/commoncode/{category}/{code}:
 *   get:
 *     description: 해당 코드의 값을 리턴
 *     responses:
 *       200:
 *         description: 해당 코드와 값 json
 */
export default async function handler(req, res) {
  const { category, code } = req.query
  const db = await  open({
    filename:  './db.sqlite' ,
    driver: sqlite3.Database
  })

  const Chargers = await db.all(`select * from commonCode where category = '${category}' and code = '${code}'`);
  res.status(200).json(Chargers);
}