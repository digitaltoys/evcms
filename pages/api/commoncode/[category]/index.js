// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

/**
 * @swagger
 * /api/commoncode/{category}:
 *   get:
 *     description: 해당 카테고리의 코드들을 리턴
 *     responses:
 *       200:
 *         description: 해당 카테고리의 코드와 값 배열
 */
export default async function handler(req, res) {
  const { category } = req.query
  const db = await  open({
    filename:  './db.sqlite' ,
    driver: sqlite3.Database
  })

  const Chargers = await db.all(`select * from commonCode where category = '${category}'`);
  res.status(200).json(Chargers);
}