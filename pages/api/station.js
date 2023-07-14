// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from "sqlite3";
import { open } from "sqlite";

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
  // s: 좌측하단 위도, w: 좌측하단 경도, n: 우측상단 위도, e: 우측상단 경도
  const { zcode, zscode, kind, kindDetail, dataType, s, w, n, e } = req.query;
  console.log("req:", req.query);

  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  let condition = zcode ? ` and zcode="${zcode}"` : "";
  condition += zscode ? ` and zscode="${zscode}"` : "";
  condition += kind ? ` and kind="${kind}"` : "";
  condition += kindDetail ? ` and kindDetail="${kindDetail}"` : "";
  condition += dataType ? ` and dataType="${dataType}"` : "";
  condition += s ? ` and lat>"${s}"` : "";
  condition += w ? ` and lng>"${w}"` : "";
  condition += n ? ` and lat<"${n}"` : "";
  condition += e ? ` and lng<"${e}"` : "";
  console.log(`select * from Station where ""="" ${condition}`);

  const Chargers = await db.all(`select * from Station where 1=1 ${condition}`);
  // const Chargers = await db.all('select * from Station')
  console.log(Chargers);
  res.status(200).json(Chargers);
}
