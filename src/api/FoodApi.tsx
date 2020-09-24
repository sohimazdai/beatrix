import { oFFBarcodeMapper } from './mappers/oFFBarcodeMapper';
import { IFoodListItem, IFoodList, FoodDatabase } from '../model/IFood';
import { createQueryString } from '../utils/create-query-string';
import { oFFMapper } from './mappers/oFFMapper';
import { api } from './api';
import { fatSecretSearchMapper } from './mappers/fatSecretSearchMapper';
import { handleErrorSilently } from '../app/ErrorHandler';

export interface SearchReturn {
  foods: IFoodList,
  total: number,
}

export class FoodApi {
  static async addProduct(product: IFoodListItem): Promise<String> {
    return api.post('food/add', { product });
  }

  static async searchProductsInLocalDb(dbs: FoodDatabase[], name: string): Promise<SearchReturn> {
    return api.post('food/search/dbs', { dbs, searchOptions: { name } });
  }

  static async searchOpenFoodFacts(key: string): Promise<(SearchReturn)> {
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

      const search = oFFMapper(products);

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

  static async getOFFProductByBarcode(id: string): Promise<(IFoodListItem | null)> {
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

      const food = oFFBarcodeMapper(product);

      return food;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}
