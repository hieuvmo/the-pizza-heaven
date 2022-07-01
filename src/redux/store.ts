import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/app/cartSlice';
import categorySlice from './features/admin/categorySlice';
import foodSlice from './features/admin/foodSlice';
import orderDetailSlice from './features/app/orderDetailSlice';
import orderSlice from './features/app/orderSlice';
import searchSlice from './features/app/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    cart: cartSlice,
    order: orderSlice,
    orderDetail: orderDetailSlice,
    category: categorySlice,
    food: foodSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
