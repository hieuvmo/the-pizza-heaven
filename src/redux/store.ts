import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './features/categorySlice';
import foodSlice from './features/foodSlice';
import searchSlice from './features/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    category: categorySlice,
    food: foodSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
