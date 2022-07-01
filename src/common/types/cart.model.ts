export interface ICart {
  id: number;
  categoryId: number;
  name: string;
  thumbnail: string;
  description: string;
  price: number;
  isStock: boolean;
  quantity: number;
}
