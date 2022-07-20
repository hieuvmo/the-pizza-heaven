import { AUTH_ENDPOINT, SERVICE_API } from 'common/constants/pathAPI';
import { ILogin, ISignUp } from 'common/types/auth.model';
import { axiosClient } from './axiosConnection';

class authService {
  async registerClientAccount(params: ISignUp) {
    const { data } = await axiosClient.post(
      `${SERVICE_API}${AUTH_ENDPOINT.SIGN_UP}`,
      params,
    );
    return data;
  }

  async loginAccount(params: ILogin) {
    const { data } = await axiosClient.post(
      `${SERVICE_API}${AUTH_ENDPOINT.LOG_IN}`,
      params,
    );
    return data;
  }
}

export default new authService();
