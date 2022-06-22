import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './features/categorySlice';
import foodSlice from './features/foodSlice';

export const store = configureStore({
  reducer: {
    category: categorySlice,
    food: foodSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
