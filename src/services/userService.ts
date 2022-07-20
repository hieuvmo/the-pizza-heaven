import { ADDRESS_ENDPOINT } from 'common/constants/pathAPI';
import { IDistrict, IProvince, IWard } from 'common/types/user.model';
import { axiosUser } from './axiosConnection';

class userService {
  async getListProvince(): Promise<IProvince[]> {
    const response = await axiosUser.get(ADDRESS_ENDPOINT.PROVINCE);
    return response.data.results;
  }
  async getListDistrict(provinceId: string): Promise<IDistrict[]> {
    const response = await axiosUser.get(
      `${ADDRESS_ENDPOINT.DISTRICT}/${provinceId}`,
    );
    return response.data.results;
  }
  async getListWard(districtId: string): Promise<IWard[]> {
    const response = await axiosUser.get(
      `${ADDRESS_ENDPOINT.WARD}/${districtId}`,
    );
    return response.data.results;
  }
}

export default new userService();
