import axios from 'axios';
import * as axiosURLS from "./endpoints";
const api = axios.create({
    baseURL: axiosURLS.BASE_URL
});

export default api;