import { barcodeFoodMapper } from './mappers/barcodeFoodMapper';
import { IFoodListItem, IFoodList } from '../model/IFood';
import { createQueryString } from '../utils/create-query-string';
import { searchFoodMapper } from './mappers/searchFoodMapper';

export class FoodApi {
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
}
