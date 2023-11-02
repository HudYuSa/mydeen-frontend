import axios from "axios";
import masterService from "./services/masterService";
import adminService from "./services/adminService";

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

function createRetryInterceptor(maxRetries = 3, retryDelay = 500) {
  let retries = 0;

  return async (err) => {
    console.log(err);
    if (retries >= maxRetries) {
      return Promise.reject(err);
    }

    if (err.code === "ERR_NETWORK") {
      console.log("Network error");
      retries++;
      // this is to delay the retry request
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      // this is retrying to request
      return http({ ...err.config, baseURL: http.defaults.baseURL });
    } else if (err.response.status === 401) {
      retries++;
      // refresh the token

      const masterLogged = sessionStorage.getItem("master_logged");
      const adminLogged = sessionStorage.getItem("admin_logged");

      if (masterLogged === "true") {
        await masterService.refreshToken();
      } else if (adminLogged === "true") {
        await adminService.refreshToken();
      }
      // else{
      // user
      // }

      // this is retrying to request
      return http({ ...err.config, baseURL: http.defaults.baseURL });
    }

    return Promise.reject(err);
  };
}

http.interceptors.response.use(
  async (res) => res,
  createRetryInterceptor(1, 3000),
);

export default http;
