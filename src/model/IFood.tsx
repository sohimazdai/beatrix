export interface IFoodNutrients {
  proteins?: number,
  fat?: number,
  carbohydrates?: number,
  energy?: number,
  energyKJ?: number,
}

export interface IFoodListItem {
  id: string
  image?: string
  name?: string
  genericName?: string
  code?: string
  brandName?: string
  nutrients?: IFoodNutrients
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
