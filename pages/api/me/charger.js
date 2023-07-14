// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from "sqlite3";
import { open } from "sqlite";

/**
 * @swagger
 * /api/me/charger:
 *   get:
 *     description: 환경부의 충전기 정보를 가져와 db에 업데이트한다
 *     responses:
 *       200:
 *         description: 성공
 */
export default async function handler(req, res) {
  const query = req.query;
  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let qs = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');
  qs = qs?"&"+qs:"";
  console.log("query string:", qs);
  fetch(
    `https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=ePl3xmtBQOwludl%2F1SJOyCoLr5qw7CK1283BV36XPMTxXYhleaSB5g%2BWEzmFW%2F4fVkWpQ52UuA6iY0hgcgh4wA%3D%3D&dataType=JSON${qs}`,
    // `/api/me/charger/11`,
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
        db.run(sql2, function (err) {
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
