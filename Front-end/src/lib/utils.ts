import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://teamproject-mongodb.onrender.com/",
});
