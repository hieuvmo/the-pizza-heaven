import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IOrderDetail } from 'common/types/order.model';

export interface OrderDetailState {
  orderDetailValue: IOrderDetail[];
}

const initialState: OrderDetailState = {
  orderDetailValue: [],
};

export const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    addNewOrderDetail: (
      state: OrderDetailState,
      action: PayloadAction<IOrderDetail[]>,
    ) => {
      state.orderDetailValue = action.payload;
    },
  },
});

export const { addNewOrderDetail } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
