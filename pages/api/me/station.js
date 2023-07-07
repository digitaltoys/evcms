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

  const res2 = await fetch("https://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=ePl3xmtBQOwludl%2F1SJOyCoLr5qw7CK1283BV36XPMTxXYhleaSB5g%2BWEzmFW%2F4fVkWpQ52UuA6iY0hgcgh4wA%3D%3D&pageNo=1&numOfRows=10&dataType=JSON", requestOptions)
  const data = await res2.json();
  if (res2.ok) {
    console.log(data);
    res.status(200).json(data);
  } else {
    throw Error(data);
  }
}