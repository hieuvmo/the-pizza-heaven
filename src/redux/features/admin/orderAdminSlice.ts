import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import appService from 'services/appService';
import { IOrder } from 'common/types/order.model';

export const getOrderList = createAsyncThunk(
  'admin/order/getOrderList',
  async () => {
    const response = await appService.getOrderList();
    return response;
  },
);

export const changeOrderStatusById = createAsyncThunk(
  'admin/order/changeOrderStatusById',
  async (params: { updatedOrder: IOrder; id: number }) => {
    console.log('updatedOrder', params.updatedOrder, params.id);
    const response = await appService.changeOrderStatusById(
      params.id,
      params.updatedOrder,
    );
    return response;
  },
);

export interface OrderAdminState {
  orderList: IOrder[];
  isLoading: boolean;
}

const initialState: OrderAdminState = {
  orderList: [],
  isLoading: true,
};

export const orderAdminSlice = createSlice({
  name: 'admin/order',
  initialState,
  reducers: {},
  extraReducers: {
    //getOrderList
    [getOrderList.pending.toString()]: (state: OrderAdminState) => {
      state.isLoading = true;
    },
    [getOrderList.fulfilled.toString()]: (
      state: OrderAdminState,
      action: PayloadAction<IOrder[]>,
    ) => {
      state.orderList = [...action.payload];
      state.isLoading = false;
    },
    [getOrderList.rejected.toString()]: (state: OrderAdminState) => {
      state.isLoading = false;
    },

    //changeOrderStatusById
    [changeOrderStatusById.pending.toString()]: (state: OrderAdminState) => {
      state.isLoading = true;
    },
    [changeOrderStatusById.fulfilled.toString()]: (
      state: OrderAdminState,
      action: PayloadAction<IOrder>,
    ) => {
      const newOrderList = state.orderList.map((orderItem: IOrder) => {
        if (orderItem.id === action.payload.id) return action.payload;
        return orderItem;
      });
      state.orderList = newOrderList;
      state.isLoading = false;
    },
    [changeOrderStatusById.rejected.toString()]: (state: OrderAdminState) => {
      state.isLoading = false;
    },
  },
});

export default orderAdminSlice.reducer;
