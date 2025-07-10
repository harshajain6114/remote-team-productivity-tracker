// 📍 src/api/axiosInstance.js
import axios from 'axios';

// ✅ Simple access token getter from localStorage to avoid circular Redux import
const getAccessToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
  } catch {
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// ✅ Add access token to request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Refresh token logic (can be handled inside component instead if needed)
export default axiosInstance;
