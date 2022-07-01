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

export type IdCartType =
  | 'thumbnail'
  | 'name'
  | 'price'
  | 'quantity'
  | 'calculation';

export interface ICartColumn {
  id: IdCartType;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface ICartDataTable {
  thumbnail: string;
  name: string;
  price: string;
  quantity: string;
  calculation: string;
}

export type IdOrderDetailType =
  | 'ordinalNumber'
  | 'thumbnail'
  | 'name'
  | 'price'
  | 'quantity'
  | 'calculation';

export interface IOrderDetailColumn {
  id: IdOrderDetailType;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface IOrderDetailDataTable {
  ordinalNumber: number;
  thumbnail: string;
  name: string;
  price: string;
  quantity: number;
  calculation: string;
}
