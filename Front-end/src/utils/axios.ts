import axios from "axios";
import { auth } from "@clerk/nextjs/server";

// Get the Clerk token from cookies
const GetClerkToken = async () => {
  try {
    const { getToken } = await auth();
    return getToken();
  } catch (error) {
    console.error("Error getting Clerk token:", error);
    return null;
  }
};

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await GetClerkToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
