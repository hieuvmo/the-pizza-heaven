export enum IOrderStatus {
  NEW = 'new',
  CONFIRM = 'confirmed',
  COMPLETE = 'completed',
  CANCEL = 'canceled',
}

export interface IOrder {
  id: number;
  userId: number | null;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  totalPrice: number;
  status: IOrderStatus;
}

export interface IOrderDetail {
  id: number;
  orderId: number;
  foodId: number;
  quantity: number;
}
