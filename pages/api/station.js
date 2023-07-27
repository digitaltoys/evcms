// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * @swagger
 * /api/station:
 *   get:
 *     description: 충전소 목록
 *     parameters:
 *       - name: zcode
 *         in: query
 *         description: 행정구역
 *         example: 11
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: zscode
 *         in: query
 *         description: 행정구역
 *         example: 11110
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: kind
 *         in: query
 *         description: 충전소 구분코드
 *         example: F0
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: kindDetail
 *         in: query
 *         description: 충전소 구분 상세코드
 *         example: F002
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: s
 *         in: query
 *         description: 지도영역 GPS좌표 (남쪽)
 *         example: 37.55
 *         schema:
 *           type: string
 *           format: int64
 *       - name: w
 *         in: query
 *         description: 지도영역 GPS좌표 (서쪽)
 *         example: 126.00
 *         schema:
 *           type: string
 *           format: int64
 *       - name: n
 *         in: query
 *         description: 지도영역 GPS좌표 (북쪽)
 *         example: 37.57
 *         schema:
 *           type: string
 *           format: int64
 *       - name: e
 *         in: query
 *         description: 지도영역 GPS좌표 (동쪽)
 *         example: 127.1
 *         schema:
 *           type: string
 *           format: int64
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
  console.log(`select min(comment), * FROM Charger join commonCode on Charger.stat= commonCode.code where commonCode.category="chgerStat" ${condition}`);

  const Chargers = await db.all(`select * from Station where 1=1 ${condition}`);
  // const Chargers = await db.all('select * from Station')
  console.log(Chargers);
  res.status(200).json(Chargers);
}
