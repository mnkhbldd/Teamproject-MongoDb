import axios from "axios";
import { getClerkToken } from "@/lib/server/clerk";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${await getClerkToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
