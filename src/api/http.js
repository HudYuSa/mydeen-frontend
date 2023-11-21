import axios from "axios";
import masterService from "./services/masterService";
import adminService from "./services/adminService";
import { fetchUrls } from "../app/firestore";

const http = axios.create({
  headers: {
    "Content-type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
  withCredentials: true,
  timeout: 10000,
});

export async function initializeAxios() {
  try {
    const url = await fetchUrls();
    console.log(url);
    const mainURL = `${url}`;
    http.defaults.baseURL = mainURL;
  } catch (error) {
    console.error("Error initializing Axios:", error);
  }
}

function createRetryInterceptor(maxRetries = 3, retryDelay = 500) {
  let retries = 0;

  return async (err) => {
    console.log(err);
    if (retries >= maxRetries) {
      console.log("max retry");
      return Promise.reject(err);
    }

    if (err.code === "ERR_NETWORK") {
      console.log("inside err network");
      retries++;
      await initializeAxios();
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
        try {
          await masterService.refreshToken();
          return http({ ...err.config, baseURL: http.defaults.baseURL });
        } catch (err) {
          return Promise.reject(err);
        }
      } else if (adminLogged === "true") {
        try {
          await adminService.refreshToken();
          return http({ ...err.config, baseURL: http.defaults.baseURL });
        } catch (err) {
          return Promise.reject(err);
        }
      }
      // else{
      // user
      // }
      else {
        retries = maxRetries;
      }
    }
    return Promise.reject(err);
  };
}

http.interceptors.response.use(
  async (res) => res,
  createRetryInterceptor(3, 3000),
);

export default http;
