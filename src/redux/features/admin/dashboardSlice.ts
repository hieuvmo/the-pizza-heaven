import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrder, IOrderDetail } from 'common/types/order.model';
import { IRating } from 'common/types/rating.model';
import { IUser } from 'common/types/user.model';
import appService from 'services/appService';

export const getAverageRating = createAsyncThunk(
  'admin/dashboard/getAverageRating',
  async () => {
    const response = await appService.getRatingList();
    return response;
  },
);

export const getTotalOrderAndIncome = createAsyncThunk(
  'admin/dashboard/getTotalOrderAndIncome',
  async () => {
    const response = await appService.getOrderList();
    return response;
  },
);

export const getTotalProductSold = createAsyncThunk(
  'admin/dashboard/getTotalProductSold',
  async () => {
    const response = await appService.getOrderDetailList();
    return response;
  },
);

export const getLatestUserList = createAsyncThunk(
  'admin/dashboard/getLatestUserList',
  async () => {
    const response = await appService.getLatestUserList();
    return response;
  },
);

export const getLatestOrderList = createAsyncThunk(
  'admin/dashboard/getLatestOrderList',
  async () => {
    const response = await appService.getLatestOrderList();
    return response;
  },
);

export interface DashboardState {
  averageRating: number;
  totalOrders: number;
  productSold: number;
  totalIncome: number;
  latestUserList: IUser[];
  latestOrderList: IOrder[];
  isLoading: boolean;
}

const initialState: DashboardState = {
  averageRating: 0,
  totalOrders: 0,
  productSold: 0,
  totalIncome: 0,
  latestUserList: [],
  latestOrderList: [],
  isLoading: true,
};

export const dashboardSlice = createSlice({
  name: 'admin/dashboard',
  initialState,
  reducers: {},
  extraReducers: {
    //getAverageRating
    [getAverageRating.pending.toString()]: (state: DashboardState) => {
      state.isLoading = true;
    },
    [getAverageRating.fulfilled.toString()]: (
      state: DashboardState,
      action: PayloadAction<IRating[]>,
    ) => {
      const ratingList = action.payload;
      const ratingSum = ratingList.reduce(
        (prevValue, currValue) => prevValue + currValue.star,
        0,
      );
      const average = Number((ratingSum / ratingList.length).toFixed(2));
      state.averageRating = average;

      state.isLoading = false;
    },
    [getAverageRating.rejected.toString()]: (state: DashboardState) => {
      state.isLoading = false;
    },

    //getTotalOrderAndIncome
    [getTotalOrderAndIncome.pending.toString()]: (state: DashboardState) => {
      state.isLoading = true;
    },
    [getTotalOrderAndIncome.fulfilled.toString()]: (
      state: DashboardState,
      action: PayloadAction<IOrder[]>,
    ) => {
      state.totalOrders = action.payload.length;
      state.totalIncome = action.payload.reduce(
        (prevValue, currValue) => prevValue + currValue.totalPrice,
        0,
      );

      state.isLoading = false;
    },
    [getTotalOrderAndIncome.rejected.toString()]: (state: DashboardState) => {
      state.isLoading = false;
    },

    //getTotalProductSold
    [getTotalProductSold.pending.toString()]: (state: DashboardState) => {
      state.isLoading = true;
    },
    [getTotalProductSold.fulfilled.toString()]: (
      state: DashboardState,
      action: PayloadAction<IOrderDetail[]>,
    ) => {
      state.productSold = action.payload.length;

      state.isLoading = false;
    },
    [getTotalProductSold.rejected.toString()]: (state: DashboardState) => {
      state.isLoading = false;
    },

    //getLatestUserList
    [getLatestUserList.pending.toString()]: (state: DashboardState) => {
      state.isLoading = true;
    },
    [getLatestUserList.fulfilled.toString()]: (
      state: DashboardState,
      action: PayloadAction<IUser[]>,
    ) => {
      state.latestUserList = [...action.payload];

      state.isLoading = false;
    },
    [getLatestUserList.rejected.toString()]: (state: DashboardState) => {
      state.isLoading = false;
    },

    //getLatestOrderList
    [getLatestOrderList.pending.toString()]: (state: DashboardState) => {
      state.isLoading = true;
    },
    [getLatestOrderList.fulfilled.toString()]: (
      state: DashboardState,
      action: PayloadAction<IOrder[]>,
    ) => {
      state.latestOrderList = [...action.payload];

      state.isLoading = false;
    },
    [getLatestOrderList.rejected.toString()]: (state: DashboardState) => {
      state.isLoading = false;
    },
  },
});

export default dashboardSlice.reducer;
