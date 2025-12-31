import axios from "axios";

// Centralized API base URL for the app.
// Use Vite env `VITE_API_BASE_URL` in development/production; fall back to Render URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://edu-bac-3.onrender.com";

// Admin and User API roots are based on the main base URL
const Admin_BASE_URL = `${API_BASE_URL}/rk/admin`;
const User_BASE_URL = `${API_BASE_URL}/rk/user`;

const admin_api = axios.create({
  baseURL: Admin_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1500000,
});

const user_api = axios.create({
  baseURL: User_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1500000,
});

export { API_BASE_URL, admin_api, user_api };


//will do secueity later





// /* ----------------------------
//       JWT TOKEN HANDLING
// ----------------------------- */

// // store tokens in memory for better security (fallback to localStorage)
// let accessToken = localStorage.getItem("accessToken") || null;
// let refreshToken = localStorage.getItem("refreshToken") || null;

// api.setAuthToken = (token, refresh) => {
//   accessToken = token || null;
//   refreshToken = refresh || null;

//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     localStorage.setItem("accessToken", token);
//     if (refresh) localStorage.setItem("refreshToken", refresh);
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   }
// };

// // Immediately load existing access token
// if (accessToken) {
//   api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// }

// /* ----------------------------
//      REQUEST INTERCEPTOR
// ----------------------------- */
// api.interceptors.request.use(
//   (config) => {
//     // Automatically attach access token to every request
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ----------------------------
//      RESPONSE INTERCEPTOR
//      + AUTO REFRESH TOKEN
// ----------------------------- */
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((p) => {
//     if (error) p.reject(error);
//     else p.resolve(token);
//   });

//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config;

//     // If token expired → refresh
//     if (error.response?.status === 401 && !original._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           original.headers.Authorization = `Bearer ${token}`;
//           return api(original);
//         });
//       }

//       original._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
//           refreshToken,
//         });

//         const newToken = res.data?.accessToken;

//         api.setAuthToken(newToken, refreshToken);

//         processQueue(null, newToken);
//         isRefreshing = false;

//         original.headers.Authorization = `Bearer ${newToken}`;
//         return api(original);
//       } catch (refreshErr) {
//         processQueue(refreshErr, null);
//         isRefreshing = false;

//         // logout user
//         api.setAuthToken(null, null);
//         return Promise.reject(refreshErr);
//       }
//     }

//     return Promise.reject(error);
//   }
// );


// //export default api;
