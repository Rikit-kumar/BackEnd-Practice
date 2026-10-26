// import axios from "axios";

// const api = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let accessToken = null;
// let onAccessTokenChange = () => {};
// let onSessionExpired = () => {};
// let refreshPromise = null;

// // React Context ko connect karna
// export const setAuthHandlers = (handlers) => {
//   onAccessTokenChange = handlers.setAccessToken;
//   onSessionExpired: handlers.onSessionExpired;
// };

// export const setAccessToken = (token) => {
//   accessToken = token;
//   onAccessTokenChange(token);
// };

// api.interceptors.request.use((config) => {
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,

//   async (error) => {
//     const originalRequest = error.config;
//     const status = error.res?.status;
//     const url = originalRequest?.url || "";

//     const isAuthEndpoint =
//       url.includes("/auth/login") ||
//       url.includes("/auth/register") ||
//       url.includes("/auth/refresh");

//     if (
//       status !== 401 ||
//       !originalRequest ||
//       originalRequest._retry ||
//       isAuthEndpoint
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     try {
//       if (!refreshPromise) {
//         refreshPromise = api
//           .post("/auth/refresh")
//           .then((res) => {
//             const newToken = res.data.accessToken;

//             if (!newToken) {
//               throw new Error("Refresh response has no access token");
//             }

//             setAccessToken(newToken);
//             return newToken;
//           })
//           .finally(() => {
//             refreshPromise = null;
//           });
//       }

//       const newToken = await refreshPromise;
//       originalRequest.headers.Authorization = `Bearer ${newToken}`;
//       return api(originalRequest);
//     } catch (refreshError) {
//       setAccessToken(null);
//       onSessionExpired();

//       return Promise.reject(refreshError);
//     }
//   },
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const refreshAccessToken = async () => {
  const response = await axios.post(
    "/api/auth/refresh",
    {},
    { withCredentials: true },
  );
  const newAccessToken = response.data.data.accessToken;
  setAccessToken(newAccessToken);
  return newAccessToken;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = [
      "/auth/register",
      "/auth/login",
      "/auth/refresh",
    ].some((path) => originalRequest?.url?.includes(path));

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
