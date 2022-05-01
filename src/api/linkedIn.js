import axios from "axios";
import { LINKEDIN_API_URL } from "../constants/config";

const instance = axios.create({
  baseURL: LINKEDIN_API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("linkedIn_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
