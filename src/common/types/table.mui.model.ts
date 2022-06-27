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
  | 'categoryId'
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
  categoryId: number;
  thumbnail: string;
  name: string;
  description: string;
  price: number;
  isStock: boolean;
}
