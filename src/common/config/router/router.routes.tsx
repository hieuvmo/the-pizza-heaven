import { IRoute } from '../../types/router.model';
import { routerPath } from './router.path';
import { TestPage } from '../../../pages/test/TestPage';
import { SignUpPage } from '../../../pages/auth/SignUp/SignUpPage';
import { HomePage } from '../../../pages/home/HomePage';
import { LoginPage } from 'pages/auth/Login/LoginPage';

export const routerList: IRoute[] = [
  //common
  {
    path: routerPath.common.HOME,
    element: <HomePage />,
  },
  //auth
  {
    path: routerPath.auth.USER_REGISTER,
    element: <SignUpPage />,
  },
  {
    path: routerPath.auth.LOGIN,
    element: <LoginPage />,
  },
  //test
  {
    path: routerPath.test.TEST,
    element: <TestPage />,
  },
];
