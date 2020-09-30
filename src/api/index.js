import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});

export const apiKey = "AIzaSyBA5NRibN635vYhf16_aZh9ufkyR3mOxQQ";

export * from "./search/search";
export * from "./videoStats/videoStats";
export * from "./videoDetails/videoDetails";
