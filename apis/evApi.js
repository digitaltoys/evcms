import axiosInstance from "./instance";

/**
 * 전기차 충전소 목록을 가져옵니다.
 * @returns {Promise<Array<Object>>} 전기차 충전소 목록을 담은 배열을 반환하는 프로미스
 */
export const getStationList = async () => {
  try {
    const response = await axiosInstance("/station");
    return response.data;
  } catch (err) {
    throw err;
  }
};

/**
 * 단일 전기차 충전소 정보를 가져옵니다.
 * @param {number} statid - 충전소의 ID
 * @returns {Promise<Object>} 전기차 충전소의 정보
 */
export const getStationInfo = async (statid) => {
  try {
    const response = await axiosInstance(`/station/${statid}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
