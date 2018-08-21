import axios from 'axios';
import * as Config from './../constants/Config';

export default function callApi_S(endpoint, method = 'GET', body) {
    return axios({
        url: `${Config.API_URL_S}/${endpoint}`,
        method,
        data: body
    }).catch(err => {
        console.log(err);
    });
}