export type IdCategoryType = 'id' | 'name';

export interface ICategoryColumn {
  id: IdCategoryType;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface ICategoryDataTable {
  id: number;
  name: string;
}

export type IdFoodType =
  | 'id'
  | 'categoryName'
  | 'name'
  | 'thumbnail'
  | 'description'
  | 'price'
  | 'isStock';

export interface IFoodColumn {
  id: IdFoodType;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface IFoodDataTable {
  id: number;
  categoryName: string;
  thumbnail: string;
  name: string;
  description: string;
  price: string;
  isStock: boolean;
}

export type IdProductInCartType =
  | 'thumbnail'
  | 'name'
  | 'price'
  | 'quantity'
  | 'calculation';

export interface IProductInCartColumn {
  id: IdProductInCartType;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface IProductInCartDataTable {
  thumbnail: string;
  name: string;
  price: string;
  quantity: string;
  calculation: string;
}
