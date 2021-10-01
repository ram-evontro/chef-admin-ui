import axios from "axios";
import * as axiosURLS from "./endpoints";
import { store } from "../redux/store";
import { loginUserSuccess, logoutUser } from "../redux/actions";
const api = axios.create({
  baseURL: axiosURLS.BASE_URL,
});
const refreshAccessToken = async () => {
  const state = store.getState();
  let currentUser = state.authUser.currentUser;
  if (currentUser && currentUser.tokens) {
    try {
      const { data } = await axios({
        method: "POST",
        url: axiosURLS.BASE_URL + axiosURLS.REFRESH_TOKEN,
        data: { refreshToken: currentUser.tokens.refresh.token },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
      });
      let loginUser = { ...currentUser };
      loginUser["tokens"] = data;
      store.dispatch(loginUserSuccess(loginUser));
    } catch (err) {
      // store.dispatch(logoutUser())
      console.log('error in refresh token',err);
    }

    console.log("call to refresh access token");
  }
};
api.interceptors.request.use(
  async (config) => {
    const state = store.getState();

    let currentUser = state.authUser.currentUser;
    if (currentUser && currentUser.tokens) {
      console.log(config, "config is");
      config.headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        Authorization: "Bearer " + currentUser.tokens.access.token,
      };

      if (config.url === axiosURLS.LOGOUT) {
        config.data["refreshToken"] = currentUser.tokens.refresh.token;
      }
    } else {
      config.headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response && (error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return api(originalRequest);
    }
    else if(error.response && (error.response.status === 403 || error.response.status === 401) && originalRequest._retry)
    {
      console.log(error);
    }
    return Promise.reject(error);
  }
);
export default api;
