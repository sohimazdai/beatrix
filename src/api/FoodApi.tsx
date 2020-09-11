import { api } from './api';
import { INoteListNote } from '../model/INoteList';
import Axios, { AxiosRequestConfig } from 'axios';

const CLIENT_SECRET = 'b3e60656e3954222adece95dc5e9b88e';
const CLIENT_SECRET_2 = 'b3e60656e3954222adece95dc5e9b88e';
const CIENT_ID = 'd84709d0262e4f86817ad2d2da7183f5';
const CONSUMER_KEY = 'd84709d0262e4f86817ad2d2da7183f5';
const CONSUMER_SECRET = '0c00acdc27b1422d9d0f57862104260f';

export class FoodApi {
  static searchBread() {
    return Axios.post(
      'https://platform.fatsecret.com/rest/server.api',
      {
        method: 'food.get.v2&food_id=33691&format=json'
      },
      {
        headers: { 'content-type': 'application/json' },
        params: {

        }
      }
    )
  }

  static auth() {
    const opts: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://oauth.fatsecret.com/connect/token',
      auth: {
        username: CIENT_ID,
        password: CLIENT_SECRET
      },
      headers: { 'content-type': 'application/json' },
      // form: {
      //   'grant_type': 'client_credentials',
      //   'scope': 'basic'
      // },
      // json: true
    }
    return Axios(opts).catch(e => console.log('🤖🤖🤖🤖 e', e))
  }
}
