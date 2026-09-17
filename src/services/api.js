import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // "http://localhost:5000/api"
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["auth-token"] = token;
  }

  return config;
});

// Handle expires/Invalid token
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href("/login");
    }

    return Promise.reject(error);
  },
);

export default API;
