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

export const getOrderListByStatus = createAsyncThunk(
  'admin/order/getOrderListByStatus',
  async (params: { status: string; orderBy: string }) => {
    const response = await appService.getOrderByStatus(
      params.status,
      params.orderBy,
    );
    return response;
  },
);

export const changeOrderStatusById = createAsyncThunk(
  'admin/order/changeOrderStatusById',
  async (params: { updatedOrder: IOrder; id: number }) => {
    const response = await appService.changeOrderStatusById(
      params.id,
      params.updatedOrder,
    );
    return response;
  },
);

export const getTotalPriceInOrderTable = createAsyncThunk(
  'admin/order/getTotalPriceInOrderTable',
  async (id: number) => {
    const response = await appService.getOrderById(id);
    return response;
  },
);

export interface OrderAdminState {
  orderList: IOrder[];
  isLoading: boolean;
  totalPrice: number;
}

const initialState: OrderAdminState = {
  orderList: [],
  isLoading: true,
  totalPrice: 0,
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

    //getOrderListByStatus
    [getOrderListByStatus.pending.toString()]: (state: OrderAdminState) => {
      state.isLoading = true;
    },
    [getOrderListByStatus.fulfilled.toString()]: (
      state: OrderAdminState,
      action: PayloadAction<IOrder[]>,
    ) => {
      state.orderList = [...action.payload];
      state.isLoading = false;
    },
    [getOrderListByStatus.rejected.toString()]: (state: OrderAdminState) => {
      state.isLoading = false;
    },

    //getTotalPriceInOrderTable
    [getTotalPriceInOrderTable.pending.toString()]: (
      state: OrderAdminState,
    ) => {
      state.isLoading = true;
    },
    [getTotalPriceInOrderTable.fulfilled.toString()]: (
      state: OrderAdminState,
      action: PayloadAction<IOrder>,
    ) => {
      state.totalPrice = action.payload.totalPrice;
      state.isLoading = false;
    },
    [getTotalPriceInOrderTable.rejected.toString()]: (
      state: OrderAdminState,
    ) => {
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
