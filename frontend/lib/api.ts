import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export const updateProfile = async (data:any)=>{
  const res = await api.put("/auth/update/profile",data)
  return res.data;
}

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};
