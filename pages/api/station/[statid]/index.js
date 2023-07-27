// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from "sqlite3";
import { open } from "sqlite";

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
  const { statid, zcode, zscode, kind, kindDetail, dataType } = req.query;
  // console.log("req:",req);

  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  let condition = statid ? ` and statid = "${statid}"` : "";
  condition += zcode ? ` and zcode=${zcode}` : "";
  condition += zscode ? ` and zscode=${zscode}` : "";
  condition += kind ? ` and kind=${kind}` : "";
  condition += kindDetail ? ` and kindDetail=${kindDetail}` : "";
  condition += dataType ? ` and dataType=${dataType}` : "";
  // console.log("condition:", condition);
  const Chargers = await db.all(`select * from Charger where 1=1 ${condition}`);
  // console.log(Chargers);
  let Station = {};
  if (Chargers?.[0]) {
    Station = { ...Chargers?.[0], Chargers };
    // Station.chgerId = undefined;
    // Station.chgerType = undefined;
    delete Station.chgerId;
    delete Station.chgerType;
  }
  console.log(Station);

  res.status(200).json(Station);
}
