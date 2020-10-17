import { LocaleType, RegionType } from '../localisation/Translate';

export interface IFoodNutrients {
  proteins?: number,
  fats?: number,
  carbohydrates?: number,
  calories?: number,
  energy?: number,

  weight?: number
}

export interface IFoodListItem {
  id: string
  sourceId: string
  barcode?: string | number
  image?: string
  name: string
  dbId: number
  categoryId?: number
  description?: string
  code?: string
  brandName?: string
  nutrients?: IFoodNutrients
  locale?: LocaleType
  region?: RegionType
  dateAdded?: number
}

export interface IFoodList {
  [id: string]: IFoodListItem
}

export interface IFood {
  history?: IFoodList
  search?: IFoodList
  favorites?: IFoodList

  searchTotal?: number

  loading?: boolean
  error?: any
}

export enum FoodDatabase {
  USDA_SR_27_PORTNOV = 100,
  OPEN_FOOD_FACTS = 200,
  FAT_SECRET_US = 300,
  USERS_DB = 400,
  USERS_LOCAL_DB = 800,
  USERS_FAST_LOCAL_DB = 800,
}
