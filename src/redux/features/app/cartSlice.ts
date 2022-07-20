import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  destroyLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItem,
} from 'common/helper/storage';
import { ICart } from 'common/types/cart.model';

interface ChangeProductQuantityProps {
  changeValue: string;
  productIndex: number;
}

export interface CartState {
  productsInCart: ICart[];
  snackbarRes: string;
}

const initialState: CartState = {
  productsInCart: getLocalStorageItem('cart-items')
    ? getLocalStorageItem('cart-items')
    : [],
  snackbarRes: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<ICart>) => {
      const productIndex = state.productsInCart.findIndex(
        (item) => item.id === action.payload.id, //return -1 when item.id !== action.payload.id
      );
      if (productIndex >= 0) {
        state.productsInCart[productIndex].quantity += action.payload.quantity;
        state.snackbarRes = `Increasing ${action.payload.quantity} quantity ${action.payload.name} in cart`;
      } else {
        state.productsInCart.push(action.payload);
        state.snackbarRes = `${action.payload.name} is added to cart`;
      }
      setLocalStorageItem('cart-items', state.productsInCart);
    },
    changeProductQuantityInCart: (
      state: CartState,
      action: PayloadAction<ChangeProductQuantityProps>,
    ) => {
      state.productsInCart[action.payload.productIndex].quantity = parseInt(
        action.payload.changeValue,
      );
      setLocalStorageItem('cart-items', state.productsInCart);
    },
    deleteProductInCart: (state: CartState, action: PayloadAction<number>) => {
      const newProductInCart = state.productsInCart.filter(
        (item, index) => index !== action.payload,
      );
      state.snackbarRes = `${
        state.productsInCart[action.payload].name
      } is removed from cart`;
      state.productsInCart = newProductInCart;
      setLocalStorageItem('cart-items', state.productsInCart);
    },
    deleteAllCart: (state: CartState) => {
      state.productsInCart = [];
      destroyLocalStorageItem('cart-items');
    },
  },
});

export const {
  addToCart,
  changeProductQuantityInCart,
  deleteProductInCart,
  deleteAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
