import axios, { AxiosRequestConfig } from 'axios';
import oFFMapper from './mappers/oFFMapper';
import qs from 'qs';
import { IFoodList } from '../model/IFood';
import { logger } from '../app/Logger';

const OFF_BASE_URL = `https://world.openfoodfacts.org/cgi/search.pl`;

export default async function searchOpenFoodFacts(key: string): Promise<IFoodList> {
  const query = qs.stringify({
    search_terms: key,
    search_simple: 1,
    action: 'process',
    json: 1,
  });
  const url = `${OFF_BASE_URL}?${query}`;


  const getOptions: AxiosRequestConfig = {
    method: "GET",
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios(getOptions);

    return oFFMapper(data.products);
  } catch (e) {
    throw e
  }
}
