import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cartSlice';
import categorySlice from './features/categorySlice';
import foodSlice from './features/foodSlice';
import orderDetailSlice from './features/orderDetailSlice';
import orderSlice from './features/orderSlice';
import searchSlice from './features/searchSlice';

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
