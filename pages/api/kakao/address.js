const KAKAO_API_KEY = "792ad08462edfbeef1370a9e70cae0c6";

/**
 * @swagger
 * /api/kakao/address:
 *   get:
 *     description: GPS 좌표로 주소를 가져온다
 *     responses:
 *       200:
 *         description: 주소정보
 */
export default async function handler(req, res) {
  const { x, y } = req.query;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `KakaoAK ${KAKAO_API_KEY}`);

  var requestOptions = {
    headers: myHeaders,
    method: "GET",
    redirect: "follow",
  };

  fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode?x=${x}&y=${y}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log("query:", req.query);
      // console.log("addr:", result);
      res.status(200).json(result?.documents?.find(obj => obj.region_type = "H"));
  });
}