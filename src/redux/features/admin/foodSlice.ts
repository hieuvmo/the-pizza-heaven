import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFood } from 'common/types/food.model';
import appService from 'services/appService';

export const getFoodList = createAsyncThunk('food/getFoodList', async () => {
  const response = await appService.getFoodList();
  return response;
});

export const deleteFoodById = createAsyncThunk(
  'admin/food/deleteFoodById',
  async (foodID: number) => {
    const response = await appService.deleteFoodById(foodID);
    return response;
  },
);

export const getFoodDetailById = createAsyncThunk(
  'admin/food/getFoodDetailById',
  async (foodID: number) => {
    const response = await appService.getFoodDetailById(foodID);
    return response;
  },
);

export const updateFoodById = createAsyncThunk(
  'admin/food/updateFoodById',
  async (params: { updatedFood: IFood; foodID: number }) => {
    const response = await appService.updateFoodById(
      params.updatedFood,
      params.foodID,
    );
    return response;
  },
);

export const addNewFoodToDB = createAsyncThunk(
  'admin/food/addNewFoodToDB',
  async (newFood: IFood) => {
    const response = await appService.addNewFood(newFood);
    return response;
  },
);

export interface FoodState {
  foodList: IFood[];
  newFood: IFood | null;
  editedFood: IFood | null;
  foodDetail: IFood;
  isLoading: boolean;
}

const initialState: FoodState = {
  foodList: [],
  newFood: null,
  editedFood: null,
  foodDetail: {
    id: 0,
    categoryId: 0,
    name: '',
    thumbnail: '',
    description: '',
    price: 0,
    isStock: true,
  },
  isLoading: true,
};

export const foodSlice = createSlice({
  name: 'admin/food',
  initialState,
  reducers: {
    changeCategoryIdSelect: (
      state: FoodState,
      action: PayloadAction<number>,
    ) => {
      state.foodDetail.categoryId = action.payload;
    },
    changeIsStockSelect: (state: FoodState, action: PayloadAction<boolean>) => {
      state.foodDetail.isStock = action.payload;
    },
    changeFoodImageUrl: (state: FoodState, action: PayloadAction<string>) => {
      state.foodDetail.thumbnail = action.payload;
    },
  },
  extraReducers: {
    //getFoodList
    [getFoodList.pending.toString()]: (state: FoodState) => {
      state.isLoading = true;
    },
    [getFoodList.fulfilled.toString()]: (
      state: FoodState,
      action: PayloadAction<IFood[]>,
    ) => {
      if (state.newFood) {
        state.foodList = [state.newFood, ...action.payload];
        state.isLoading = false;
      }
      if (state.editedFood) {
        const updatedFoodList = state.foodList.map((foodItem: IFood) => {
          if (foodItem.id === state.editedFood?.id) return state.editedFood;
          return foodItem;
        });
        state.foodList = updatedFoodList;
        state.isLoading = false;
      }
      state.foodList = [...action.payload];
      state.isLoading = false;
    },
    [getFoodList.rejected.toString()]: (state: FoodState) => {
      state.isLoading = false;
    },

    //deleteFoodById
    [deleteFoodById.pending.toString()]: (state: FoodState) => {
      state.isLoading = true;
    },
    [deleteFoodById.fulfilled.toString()]: (
      state: FoodState,
      action: PayloadAction<number>,
    ) => {
      const foodListAfterDeleting = state.foodList.filter(
        (foodItem: IFood) => foodItem.id !== action.payload,
      );
      state.foodList = [...foodListAfterDeleting];
      state.isLoading = false;
    },
    [deleteFoodById.rejected.toString()]: (state: FoodState) => {
      state.isLoading = false;
    },

    //getFoodDetailById
    [getFoodDetailById.pending.toString()]: (state: FoodState) => {
      state.isLoading = true;
    },
    [getFoodDetailById.fulfilled.toString()]: (
      state: FoodState,
      action: PayloadAction<IFood>,
    ) => {
      state.foodDetail = { ...action.payload };
      state.isLoading = false;
    },
    [getFoodDetailById.rejected.toString()]: (state: FoodState) => {
      state.isLoading = false;
    },

    //updateFoodById
    [updateFoodById.pending.toString()]: (state: FoodState) => {
      state.isLoading = true;
    },
    [updateFoodById.fulfilled.toString()]: (
      state: FoodState,
      action: PayloadAction<IFood>,
    ) => {
      state.editedFood = { ...action.payload };
      state.isLoading = false;
    },
    [updateFoodById.rejected.toString()]: (state: FoodState) => {
      state.isLoading = false;
    },

    //addNewFoodToDB
    [addNewFoodToDB.pending.toString()]: (state: FoodState) => {
      state.isLoading = true;
    },
    [addNewFoodToDB.fulfilled.toString()]: (
      state: FoodState,
      action: PayloadAction<IFood>,
    ) => {
      state.newFood = { ...action.payload };
      state.isLoading = false;
    },
    [addNewFoodToDB.rejected.toString()]: (state: FoodState) => {
      state.isLoading = false;
    },
  },
});

export const {
  changeCategoryIdSelect,
  changeIsStockSelect,
  changeFoodImageUrl,
} = foodSlice.actions;

export default foodSlice.reducer;
