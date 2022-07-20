import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import appService from 'services/appService';
import { IOrderDetail } from 'common/types/order.model';
import { IFood } from 'common/types/food.model';

export const getOrderDetailByOrderId = createAsyncThunk(
  'admin/orderDetail/getOrderDetailByOrderId',
  async (orderId: number) => {
    const response = await appService.getOrderDetailByOrderId(orderId);
    return response;
  },
);

export const getFoodListByIdInOrderDetail = createAsyncThunk(
  'admin/orderDetail/getFoodListByIdInOrderDetail',
  async (foodID: number) => {
    const response = await appService.getFoodDetailById(foodID);
    return response;
  },
);

export interface OrderDetailAdminState {
  orderDetailById: IOrderDetail[];
  foodListInOrderDetail: IFood[];
  isLoading: boolean;
}

const initialState: OrderDetailAdminState = {
  orderDetailById: [],
  foodListInOrderDetail: [],
  isLoading: true,
};

export const orderDetailAdminSlice = createSlice({
  name: 'admin/orderDetail',
  initialState,
  reducers: {
    resetAdminOrderDetail: (detailState: OrderDetailAdminState) => {
      detailState.orderDetailById = [];
      detailState.foodListInOrderDetail = [];
    },
  },
  extraReducers: {
    //getOrderDetailByOrderId
    [getOrderDetailByOrderId.pending.toString()]: (
      state: OrderDetailAdminState,
    ) => {
      state.isLoading = true;
    },
    [getOrderDetailByOrderId.fulfilled.toString()]: (
      state: OrderDetailAdminState,
      action: PayloadAction<IOrderDetail[]>,
    ) => {
      state.orderDetailById = [...action.payload];
      state.isLoading = true;
    },
    [getOrderDetailByOrderId.rejected.toString()]: (
      state: OrderDetailAdminState,
    ) => {
      state.isLoading = false;
    },

    //getFoodListByIdInOrderDetail
    [getFoodListByIdInOrderDetail.pending.toString()]: (
      state: OrderDetailAdminState,
    ) => {
      // if (state.foodListInOrderDetail.length > 0) {
      //   state.foodListInOrderDetail = [];
      // }
      state.isLoading = true;
    },
    [getFoodListByIdInOrderDetail.fulfilled.toString()]: (
      state: OrderDetailAdminState,
      action: PayloadAction<IFood>,
    ) => {
      state.foodListInOrderDetail = [
        ...state.foodListInOrderDetail,
        action.payload,
      ];
      state.isLoading = false;
    },
    [getFoodListByIdInOrderDetail.rejected.toString()]: (
      state: OrderDetailAdminState,
    ) => {
      state.isLoading = false;
    },
  },
});

export const { resetAdminOrderDetail } = orderDetailAdminSlice.actions;

export default orderDetailAdminSlice.reducer;
