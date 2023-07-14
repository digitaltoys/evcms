// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from "sqlite3";
import { open } from "sqlite";
// import { useAtom, useAtomValue } from "jotai";
// import { commonCodeAtom } from "/atoms/atom";
// const [commonCode, setCommonCode] = useAtom(commonCodeAtom);

/**
 * @swagger
 * /api/me/station/{zcode}/{pageNo}/{numOfRows}:
 *   get:
 *     description: 환경부의 충전기 정보를 가져와 db에 업데이트한다
 *     parameters:
 *       - name: zcode
 *         in: path
 *         description: 행정구역
 *         example: 11
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: pageNo
 *         in: path
 *         description: 페이지 넘버
 *         example: 1
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: numOfRows
 *         in: path
 *         description: 페이지당 출력 레코드수
 *         example: 10
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: 성공
 */
export default async function handler(req, res) {
  const { opt } = req.query;
  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  console.log("opt:",opt);
  // if (!Number.isInteger(opt?.[0])) {
  //   let zcode = commonCode;
  //   console.log("zcode 11:",zcode);
  //   console.log("zcode 11:",zcode?.["서울특별시"]);
  // }
  fetch(
    `https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=ePl3xmtBQOwludl%2F1SJOyCoLr5qw7CK1283BV36XPMTxXYhleaSB5g%2BWEzmFW%2F4fVkWpQ52UuA6iY0hgcgh4wA%3D%3D&dataType=JSON&zcode=${opt?.[0] || 11}&pageNo=${opt?.[1] || 1}&numOfRows=${opt?.[2] || 9999}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      if (result?.resultCode == "00" && result?.items?.item != undefined) {
        let arr = result?.items?.item;
        arr.forEach((el) => {
          let keys = Object.keys(el)
            .map((e) => (e == "null" ? e : "'" + e + "'"))
            .join(",");
          let values = Object.values(el)
            .map((e) => (e == "null" ? e : "'" + e + "'"))
            .join(",");
          // console.log("keys", keys);
          // console.log("values", values);
          let sql = `INSERT OR REPLACE INTO Charger(${keys}) VALUES(${values})`;
          // console.log(sql);
          db.run(sql, function (err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          });
        });

        // 충전소 정보 생성
        let sql2 = `INSERT OR REPLACE INTO Station(chgerCnt, statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode)
          select count(chgerId), statNm, statId, addr, location, useTime, lat, lng, busiId, bnm, busiNm, busiCall, stat, zcode, zscode
          from Charger
          where statNm not null
          group by statId;`
        db.run(sql, function (err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        });

        res.status(200).json(result);
      }
    })
    .catch((error) => console.log("error", error));
}
