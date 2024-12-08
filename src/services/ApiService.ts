import axios from "axios";
import { deleteToken, getToken } from "../utils/storage";
import { refreshToken } from "./AuthService";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2", // Placeholder URL
});

api.interceptors.request.use(async (config) => {
  let credentials = await getToken();

  if(credentials) {
    let { jwt, expiration } = JSON.parse(credentials);

    if(Date.now() > expiration) {
      const newToken = await refreshToken();
      config.headers.Authorization = `Bearer ${newToken}`;
    } else {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
  }

  console.log(config.headers.Authorization);

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if(error.response && error.response.status === 401) {
      deleteToken();
    }

    return Promise.reject(error);
  }
);

export default api;
