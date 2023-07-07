// sqlite 연결 하기 위한 라이브러리 import
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function handler(req, res) {
  const { id } = req.query
  const db = await  open({
    filename:  './db.sqlite' ,
    driver: sqlite3.Database
  })

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://apis.data.go.kr/B552584/EvCharger/getChargerStatus?serviceKey=ePl3xmtBQOwludl%2F1SJOyCoLr5qw7CK1283BV36XPMTxXYhleaSB5g%2BWEzmFW%2F4fVkWpQ52UuA6iY0hgcgh4wA%3D%3D&dataType=JSON", requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(data);
    if (result?.resultCode == "00" && result?.items?.item != undefined) {
      let arr = result?.items?.item;
      arr.forEach(el => {
        let keys = Object.keys(el).map(e=>(e=="null")?e:"'"+e+"'").join(",");
        let values = Object.values(el).map(e=>(e=="null")?e:"'"+e+"'").join(",");
        // console.log("keys", keys);
        // console.log("values", values);
        let sql = `INSERT OR REPLACE INTO Charger(${keys}) VALUES(${values})`
        console.log(sql);
        db.run(sql, function (err) {
          if (err) {
              return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        })
      });
    }
    res.status(200).json(result);
  })
  .catch(error => console.log('error', error));
}