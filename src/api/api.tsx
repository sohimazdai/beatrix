import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { appConfig } from '../config/appConfig';

class Api {
    post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: appConfig.protocol + '://' + appConfig.apiAddress,
        });
        this.post = (url, data = {}, config = {}) => this.axios.post(
            url + '?key=h4NIt1NS',
            data,
            config,
        )
    };

}

export const api = new Api();
