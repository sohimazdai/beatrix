import { IFoodListItem, IFoodList, FoodDatabase } from '../model/IFood';
import { api } from './api';
import { handleErrorSilently } from '../app/ErrorHandler';
import { oFFBarcodeMapper } from './mappers/oFFBarcodeMapper';

export interface SearchReturn {
  foods: IFoodList,
  total: number,
}

export class FoodApi {
  static async searchProducts(searchString: string, regionGroup: string) {
    return api.post('food/search/region', { searchString, regionGroup });
  }

  static async getFoodItemById(foodId: string): Promise<IFoodListItem | null> {
    return api.post('food/get', { foodId });
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
    return api.post('food/add', { foodId: product.id, product });
  }

  static async searchProductsInLocalDb(dbs: FoodDatabase[], name: string): Promise<SearchReturn> {
    return api.post('food/search/dbs', { dbs, searchOptions: { name } });
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

  static async getFoodIdsFromFavorites(userId: string) {
    return api.post('favorites/get', { userId });
  }

  static async removeFoodIdFromFavorites(userId: string, foodId: string) {
    return api.post('favorites/remove', { userId, foodId });
  }

  static async addFoodIdToFavorites(userId: string, foodId: string) {
    return api.post('favorites/add', { userId, foodId });
  }

  static async syncFavoriteFood(userId: string, favorites: string[]): Promise<any> {
    return api.post('favorites/sync', { userId, favorites });
  }
}
