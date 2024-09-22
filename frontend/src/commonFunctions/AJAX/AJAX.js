import axios from "axios";
import {BASE_API, BASE_URL_DEV} from "../constants.js";

export const AJAX = (params) => {
    axios.defaults.withCredentials = true
    const {method, data, url} = params
    const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
    return axios({url: `${BASE_URL_DEV}${BASE_API}${url}`, headers: headers, method: method, data: data});
}
