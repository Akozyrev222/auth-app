import axios from "axios";
import {BASE_API, BASE_URL_DEV, BASE_URL_PROD} from "../constants.js";

export const AJAX = (params) => {
    const {method, data, url} = params
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    }
    return axios({
        url: `${BASE_URL_PROD}${BASE_API}${url}`,
        headers: headers,
        method: method,
        data: data,
        withCredentials: true
    });
}
