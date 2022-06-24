import { CLOUDINARY_ENDPOINT } from 'common/constants/pathAPI';
import { axiosAdmin } from './axiosConnection';

class AdminService {
  async uploadImageToCloudinary(params: FormData) {
    const response = await axiosAdmin.post(
      `${CLOUDINARY_ENDPOINT.UPLOAD_IMAGE}`,
      params,
    );
    return response?.data?.url;
  }
}

export default new AdminService();
