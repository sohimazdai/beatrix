import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { logger } from '../app/Logger';
import { appConfig } from '../config/appConfig';
import { appAnalytics } from '../app/Analytics';

type ApiPost = (url: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;
const client: AxiosInstance = axios.create({
    baseURL: appConfig.protocol + '://' + appConfig.apiAddress,
});

axiosRetry(client, {
    retries: 3,
    retryDelay: (retryCount) => {
        logger(`🤖 retry attempt: ${retryCount}`);
        appAnalytics.sendEventWithProps(
            appAnalytics.events.REQUEST_AXIOS_RETRY,
            { retryCount },
        );

        return retryCount * 2000;
    },
    retryCondition: (error) => {
        logger('🤖 ERROEOROEORO:', error);

        return !!error;
    },
});

const post: ApiPost = (url, data = {}, config = {}) => client.post(
    url + '?key=h4NIt1NS',
    data,
    config,
);


export const api = {
    post,
}
