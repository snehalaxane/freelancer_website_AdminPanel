import axios from "axios";

// Create axios instance with baseURL from env
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add request interceptor to log all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add Bearer token
  }
  console.log("➡️ Axios Request:", config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Axios Response:", response.data);
    return response;
  },
  (error) => {
    console.log("❌ Axios Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
