import { axiosInstance, apiKey } from "../index";
// video/ channel statistics API
export const getStats = async (type, id) => {
  return await axiosInstance.get(`/${type}`, {
    params: {
      part: "statistics",
      key: apiKey,
      id
    }
  });
};
