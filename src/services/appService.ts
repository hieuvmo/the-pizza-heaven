import { ENDPOINT_API } from 'common/constants/pathAPI';
import { ICategory } from 'common/types/category.model';
import AxiosClient from './axiosConnection';

class AppService {
  //CATEGORY
  async getCategoryList(): Promise<ICategory[]> {
    const { data } = await AxiosClient.get(`${ENDPOINT_API.CATEGORY}`);
    return data;
  }
}

export default new AppService();
