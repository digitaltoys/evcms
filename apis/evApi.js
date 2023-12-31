import axios from "axios";
import { useSetAtom } from "jotai";

import { evApiInstance } from "./instance";
import { commonCodeAtom } from "../atoms/atom";

/**
 * 전기차 충전소 목록을 가져옵니다.
 * @returns {Promise<Array<Object>>} 전기차 충전소 목록을 담은 배열을 반환하는 프로미스
 */
export const getStationList = async () => {
  try {
    const response = await { evApiInstance }("/station");
    // const response = await evApiInstance("/station?zscode=11110");
    return response.data;
  } catch (err) {
    throw err;
  }
};

/**
 * 지도 화면 내 충전소 목록을 가져옵니다.
 * @param {Object} params - Query parameters.
 * @param {string} [params.zcode] - Zcode parameter.
 * @param {string} [params.zscode] - Zscode parameter.
 * @param {string} [params.kind] - Kind parameter.
 * @param {string} [params.kindDetail] - KindDetail parameter.
 * @param {string} [params.dataType] - DataType parameter.
 * @param {string} [params.s] - S parameter.
 * @param {string} [params.w] - W parameter.
 * @param {string} [params.n] - N parameter.
 * @param {string} [params.e] - E parameter.
 * @returns {Promise<Object>} - Response data.
 * @throws {Error} - If an error occurs during the API call.
 */
export const getBoundStationList = async (params) => {
  try {
    const response = await evApiInstance("/station", { params });
    return response.data;
  } catch (err) {
    throw err;
  }
};

/**
 * 단일 전기차 충전소 정보를 가져옵니다.
 * @param {number} statId - 충전소의 ID
 * @returns {Promise<Object>} 전기차 충전소의 정보
 */
export const getStationDetail = async (statId) => {
  try {
    const response = await evApiInstance(`/station/${statId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getChargerList = async (statId) => {
  try {
    const response = await evApiInstance(`/station/${statId}/charger`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getCommonCode = async (category) => {
  // const [commonCode, setCommonCode] = useAtom(commonCodeAtom);
  const setCommonCode = useSetAtom(commonCodeAtom);

  return new Promise((res, rej) => {
    axios
      .request({
        method: "GET",
        url: `api/commoncode/${category}`,
        headers: {
          // "Content-Type": "application/json",
        },
        params: {},
        data: {},
      })
      .then((response) => {
        console.log("commonCode:", response.data);
        // setCommonCode(response.data);
      })
      .catch((err) => {
        console.log("commonCode error:", err.message);
      });
  });
};

export const getGeo2Addr = async (x, y) => {
  return new Promise((res, rej) => {
    axios
      .request({
        method: "GET",
        url: `/api/kakao/address?x=${x}&y=${y}`,
        headers: {
          // "Content-Type": "application/json",
        },
        params: {},
        data: {},
      })
      .then((response) => {
        // console.log("address:", response.data);
        // setCommonCode(response.data);
        res(response.data);
      })
      .catch((err) => {
        console.log("commonCode error:", err.message);
        rej(err);
      });
  });
};
