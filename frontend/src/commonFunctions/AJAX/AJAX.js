import axios from "axios";
import {BASE_API, BASE_URL_DEV, BASE_URL_PROD} from "../constants.js";

export const AJAX = (params) => {
    const {method, data, url} = params
    return axios({
        url: `${BASE_URL_PROD}${BASE_API}${url}`,
        method: method,
        data: data,
        withCredentials: true
    });
}
