import { ENDPOINT_API } from 'common/constants/pathAPI';
import { ICategory } from 'common/types/category.model';
import { IFood } from 'common/types/food.model';
import { IOrder, IOrderDetail } from 'common/types/order.model';
import { IRating } from 'common/types/rating.model';
import { IUser } from 'common/types/user.model';
import { axiosClient } from './axiosConnection';

class AppService {
  //CATEGORY
  async getCategoryList(): Promise<ICategory[]> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.CATEGORY}`);
    return data;
  }
  async getCategoryDetailById(id: number): Promise<ICategory> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.CATEGORY}/${id}`);
    return data;
  }
  async deleteCategoryById(id: number): Promise<ICategory[]> {
    const { data } = await axiosClient.delete(`${ENDPOINT_API.CATEGORY}/${id}`);
    return data;
  }
  async updateCategoryById(
    params: ICategory,
    id: number,
  ): Promise<ICategory[]> {
    const { data } = await axiosClient.put(
      `${ENDPOINT_API.CATEGORY}/${id}`,
      params,
    );
    return data;
  }
  async addNewCategory(params: ICategory): Promise<ICategory[]> {
    const { data } = await axiosClient.post(`${ENDPOINT_API.CATEGORY}`, params);
    return data;
  }
  //PRODUCT
  async getFoodList(): Promise<IFood[]> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.FOOD}`);
    return data;
  }
  async getFoodDetailById(id: number): Promise<IFood> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.FOOD}/${id}`);
    return data;
  }
  async getFoodDetailByCategoryId(categoryId: number): Promise<IFood[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.FOOD}/?categoryId=${categoryId}`,
    );
    return data;
  }
  async deleteFoodById(id: number): Promise<IFood[]> {
    const { data } = await axiosClient.delete(`${ENDPOINT_API.FOOD}/${id}`);
    return data;
  }
  async updateFoodById(params: IFood, id: number): Promise<IFood[]> {
    const { data } = await axiosClient.put(
      `${ENDPOINT_API.FOOD}/${id}`,
      params,
    );
    return data;
  }
  async addNewFood(params: IFood): Promise<IFood[]> {
    const { data } = await axiosClient.post(`${ENDPOINT_API.FOOD}`, params);
    return data;
  }
  async filterAndOrderProductById(
    categoryId: number,
    filterValue: string,
    orderByValue: string,
  ): Promise<IFood[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.CATEGORY}/${categoryId}${ENDPOINT_API.FOOD}?_sort=${filterValue}&_order=${orderByValue}`,
    );
    return data;
  }

  //USERS
  async getUserList(): Promise<IUser[]> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.USER}`);
    return data;
  }
  async getLatestUserList(): Promise<IUser[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.USER}?_sort=id&_order=desc&_limit=4`,
    );
    return data;
  }
  async getUserById(id: number): Promise<IUser> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.USER}/${id}`);
    return data;
  }
  async updateUserById(params: IUser, id: number): Promise<IUser> {
    const { data } = await axiosClient.patch(
      `${ENDPOINT_API.USER}/${id}`,
      params,
    );
    return data;
  }

  //SEARCH
  async searchProductFullText(searchValue: string): Promise<IFood[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.FOOD}?q=${searchValue}`,
    );
    return data;
  }

  //ORDER
  async getOrderList(): Promise<IOrder[]> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.ORDER}`);
    return data;
  }
  async getLatestOrderList(): Promise<IOrder[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.ORDER}?_sort=id&_order=desc&_limit=3`,
    );
    return data;
  }
  async addNewOrderToDB(params: IOrder): Promise<IOrder> {
    const { data } = await axiosClient.post(`${ENDPOINT_API.ORDER}`, params);
    return data;
  }
  async getOrderById(id: number): Promise<IOrder> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.ORDER}/${id}`);
    return data;
  }
  async changeOrderStatusById(id: number, params: IOrder): Promise<IOrder> {
    const { data } = await axiosClient.patch(
      `${ENDPOINT_API.ORDER}/${id}`,
      params,
    );
    return data;
  }
  async getOrderByUserId(userId: number): Promise<IOrder[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.ORDER}?userId=${userId}`,
    );
    return data;
  }
  async getOrderByStatus(status: string, orderBy: string): Promise<IOrder[]> {
    if (status === 'all') {
      const { data } = await axiosClient.get(
        `${ENDPOINT_API.ORDER}?_sort=id&_order=${orderBy}`,
      );
      return data;
    }
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.ORDER}?_sort=id&_order=${orderBy}&status=${status}`,
    );
    return data;
  }

  //ORDER-DETAIL
  async getOrderDetailList(): Promise<IOrderDetail[]> {
    const { data } = await axiosClient.get(`${ENDPOINT_API.ORDER_DETAIL}`);
    return data;
  }
  async addNewOrderDetailToDB(params: IOrderDetail): Promise<IOrderDetail> {
    const { data } = await axiosClient.post(
      `${ENDPOINT_API.ORDER_DETAIL}`,
      params,
    );
    return data;
  }
  async getOrderDetailByOrderId(orderId: number): Promise<IOrderDetail[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.ORDER_DETAIL}?orderId=${orderId}`,
    );
    return data;
  }
  async ratedOrderDetailItem(
    id: number,
    params: IOrderDetail,
  ): Promise<IOrderDetail> {
    const { data } = await axiosClient.patch(
      `${ENDPOINT_API.ORDER_DETAIL}/${id}`,
      params,
    );
    return data;
  }

  //RATINGS
  async addNewRatingToDB(params: IRating): Promise<IRating> {
    const { data } = await axiosClient.post(`${ENDPOINT_API.RATING}`, params);
    return data;
  }
  async getLatestReviewByFoodId(foodId: number): Promise<IRating[]> {
    const { data } = await axiosClient.get(
      `${ENDPOINT_API.RATING}?_sort=id&_order=desc&foodId=${foodId}`,
    );
    return data;
  }
}

export default new AppService();
