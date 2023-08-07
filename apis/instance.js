import axios from "axios";

const EV_API_SERVER = "/api";
const KAKAO_REST_API_SERVER = "https://dapi.kakao.com/v2/local/search";

export const ocubeApiInstance = axios.create({
  baseURL: "/app",
});

export const evApiInstance = axios.create({
  baseURL: EV_API_SERVER,
});

export const kakaoRestApiInstance = axios.create({
  baseURL: KAKAO_REST_API_SERVER,
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
  },
});
