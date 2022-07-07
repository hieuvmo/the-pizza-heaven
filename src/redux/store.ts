import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './features/app/cartSlice';
import categorySlice from './features/admin/categorySlice';
import foodSlice from './features/admin/foodSlice';
import orderDetailSlice from './features/app/orderDetailSlice';
import orderSlice from './features/app/orderSlice';
import searchSlice from './features/app/searchSlice';
import orderAdminSlice from './features/admin/orderAdminSlice';
import orderDetailAdminSlice from './features/admin/orderDetailAdminSlice';
import dashboardSlice from './features/admin/dashboardSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    cart: cartSlice,
    order: orderSlice,
    orderDetail: orderDetailSlice,
    adminDashboard: dashboardSlice,
    adminCategory: categorySlice,
    adminFood: foodSlice,
    adminOrder: orderAdminSlice,
    adminOrderDetail: orderDetailAdminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
