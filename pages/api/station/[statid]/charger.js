// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * @swagger
 * /api/station/{statid}/charger:
 *   get:
 *     description: 충전소의 충전기 목록
 *     responses:
 *       200:
 *         description: 충전기 정보의 배열
 */
export default async function handler(req, res) {
  const { statid } = req.query;
  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  const Chargers = await db.all(
    `select * from Charger where statid = "${statid}"`
  );
  console.log(Chargers);
  res.status(200).json(Chargers);
}
