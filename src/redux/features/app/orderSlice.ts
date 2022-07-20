import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IOrder, IOrderStatus } from 'common/types/order.model';

export interface OrderState {
  totalPrice: number;
  orderValue: IOrder;
}

const initialState: OrderState = {
  totalPrice: 0,
  orderValue: {
    id: 0,
    userId: 0,
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    totalPrice: 0,
    status: IOrderStatus.NEW,
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addNewOrder: (state: OrderState, action: PayloadAction<IOrder>) => {
      state.orderValue = action.payload;
    },
    setTotalPriceForOrder: (
      state: OrderState,
      action: PayloadAction<number>,
    ) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { addNewOrder, setTotalPriceForOrder } = orderSlice.actions;

export default orderSlice.reducer;
