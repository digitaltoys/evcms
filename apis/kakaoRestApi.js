import { kakaoRestApiInstance } from "./instance";

export const getSearchAutocomplete = async (text, gps) => {
  try {
    const { lat, lng } = gps;
    const response = await kakaoRestApiInstance("/keyword", {
      params: {
        query: text,
        // analyze_type: "exact",
        x: lng,
        y: lat,
        size: 5,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
