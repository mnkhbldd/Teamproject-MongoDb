import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://teamproject-mongodb.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenRes = await fetch("/api/webhooks/clerk");
    const { token } = await tokenRes.json();

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
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
