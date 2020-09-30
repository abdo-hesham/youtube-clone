import { axiosInstance, apiKey } from "../index";
// search API
export const searchVideos = async (searchQuery, type, maxResults = 20) => {
  return await axiosInstance.get("/search", {
    params: {
      part: "snippet",
      key: apiKey,
      maxResults,
      type,
      q: searchQuery
    }
  });
};
