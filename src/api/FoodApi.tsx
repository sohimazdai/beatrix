import { barcodeFoodMapper } from './mappers/barcodeFoodMapper';
import { IFoodListItem, IFoodList } from '../model/IFood';
import { createQueryString } from '../utils/create-query-string';
import { searchFoodMapper } from './mappers/searchFoodMapper';
import { api } from './api';
import { fatSecretSearchMapper } from './mappers/fatSecretSearchMapper';
import { handleErrorSilently } from '../app/ErrorHandler';

export interface SearchReturn {
  foods: IFoodList,
  total: number,
}

export class FoodApi {
  static async searchProductsByKey(key: string): Promise<(SearchReturn)> {
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

      const { products, count } = await response.json();

      const search = searchFoodMapper(products);

      return {
        foods: search,
        total: count,
      };
    } catch (error) {
      handleErrorSilently(error, 'Ошибка запроса на поиск в Open Food Facts');
      return {
        foods: {},
        total: 0,
      };
    }
  }

  static async searchFatSecret(searchString: string = ''): Promise<SearchReturn> {
    try {
      const { data } = await api.post('food/search', { searchString });

      const foods = fatSecretSearchMapper(data.foods);

      return {
        total: data.total,
        foods,
      }
    } catch (e) {
      handleErrorSilently(e, 'Ошибка запроса на поиск в Open Food Facts');

      return {
        foods: {},
        total: 0,
      };
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

}
