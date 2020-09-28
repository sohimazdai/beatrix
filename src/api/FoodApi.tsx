import { IFoodListItem, IFoodList, FoodDatabase } from '../model/IFood';
import { createQueryString } from '../utils/create-query-string';
import { oFFMapper } from './mappers/oFFMapper';
import { api } from './api';
import { fatSecretSearchMapper } from './mappers/fatSecretSearchMapper';
import { handleErrorSilently } from '../app/ErrorHandler';
import { oFFBarcodeMapper } from './mappers/oFFBarcodeMapper';

export interface SearchReturn {
  foods: IFoodList,
  total: number,
}

export class FoodApi {
  static async getFoodIdsFromFavorites(userId: string) {
    return api.post('favorites/get', { userId });
  }

  static async removeFoodIdFromFavorites(userId: string, foodIds: string[]) {
    return api.post('favorites/remove', { userId, foodIds });
  }

  static async addFoodIdToFavorites(userId: string, foodId: string) {
    return api.post('favorites/add', { userId, foodId });
  }

  static async getFoodItemById(foodId: string): Promise<IFoodListItem | null> {
    try {
      const response = await api.post('food/get', { foodId });

      if (!response.data) {
        return null;
      }

      const foodItem = response.data;

      return foodItem;
    } catch (error) {
      handleErrorSilently(error, 'FoodApi getFoodItemById')
      return null;
    }
  }

  static async getByBarcodeFromLocalDB(barcode: string): Promise<IFoodListItem | null> {
    try {
      const response = await api.post('food/get/barcode', { barcode });

      if (!response.data) {
        return null;
      }

      const food = response.data;

      return food;
    } catch (error) {
      handleErrorSilently(error, 'FoodApi getByBarcodeFromLocalDB')
      return null;
    }
  }

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
      handleErrorSilently(error, 'FoodApi searchOpenFoodFacts')
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
    } catch (error) {
      handleErrorSilently(error, 'FoodApi searchFatSecret')
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
      handleErrorSilently(error, 'FoodApi getOFFProductByBarcode')
      return null;
    }
  }

}
