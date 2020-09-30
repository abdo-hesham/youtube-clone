import { axiosInstance, apiKey } from "../index";
// single video API
export const getDuration = async id => {
  return await axiosInstance.get("/videos", {
    params: {
      part: "contentDetails",
      key: apiKey,
      id
    }
  });
};
