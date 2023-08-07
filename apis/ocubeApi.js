import { ocubeApiInstance } from "./instance";

export const getOcubeBoundStationList = async (payload) => {
  try {
    const response = await ocubeApiInstance.post("/v1/station", payload);

    return response.data;
  } catch (err) {
    throw err;
  }
};
