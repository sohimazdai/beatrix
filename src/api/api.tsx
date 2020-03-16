import axios, { AxiosInstance } from 'axios';
import { appConfig } from '../config/appConfig';

class Api {
    axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: appConfig.protocol + '://' + appConfig.apiAddress,
        })
    }
}

export const api = new Api();
