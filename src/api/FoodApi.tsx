import { barcodeFoodMapper } from './mappers/barcodeFoodMapper';
import { IFoodListItem, IFoodList } from '../model/IFood';
import { createQueryString } from '../utils/create-query-string';
import { searchFoodMapper } from './mappers/searchFoodMapper';
import Axios from 'axios';
import oauth from 'axios-oauth-client';

const FS_CLIENT_SECRET = '63fbbc6c774343b8a4a5506a03ee944d';
const FS_CLIENT_ID = 'd84709d0262e4f86817ad2d2da7183f5';
const FS_CONSUMER_KEY = 'd84709d0262e4f86817ad2d2da7183f5';
const FS_CONSUMER_SECRET = '0c00acdc27b1422d9d0f57862104260f';

const FC_GET_BASE_URL = 'https://platform.fatsecret.com/rest/server.api';
const FC_AUTH_TOKEN_URL = 'https://oauth.fatsecret.com/connect/token';

let accessToken = '';

export class FoodApi {
  static setToken(token: string) {
    accessToken = token
  };

  static getToken() {
    return accessToken;
  }

  static async searchProductsByKey(key: string): Promise<(IFoodList)> {
    const baseUrl = `https://world.openfoodfacts.org/cgi/search.pl`;
    const query = createQueryString({
      search_terms: key,
      search_simple: 1,
      action: 'process',
      json: 1,
    });
    const url = `${baseUrl}?${query}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { products } = await response.json();

      const search = searchFoodMapper(products);

      return search;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getProductByBarcode(id: string): Promise<(IFoodListItem | null)> {
    const url = `https://world.openfoodfacts.org/api/v0/product/${id}.json`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });

      const { product } = await response.json();

      if (!product || product.status === 0) {
        return null;
      }

      const food = barcodeFoodMapper(product);

      return food;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static getAuthorizationCode = oauth.client(Axios.create(), {
    method: 'POST',
    url: FC_AUTH_TOKEN_URL,
    grant_type: 'client_credentials',
    client_id: FS_CLIENT_ID,
    client_secret: FS_CLIENT_SECRET,
    scope: 'basic',
  });

  static getProductById = async (id: string) => {
    const baseUrl = FC_GET_BASE_URL;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    };
    const query = `method=food.get.v2&food_id=${id}&format=json`;
    const url = `${baseUrl}?${query}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
      });

      const food = await response.json();

      if (!food) {
        return null;
      }

      // const food = barcodeFoodMapper(product);

      return food;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
