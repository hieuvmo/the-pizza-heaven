import { IRoute } from '../../types/router.model';
import { routerPath } from './router.path';
import { TestPage } from '../../../pages/test/TestPage';
import { SignUpPage } from '../../../pages/auth/SignUp/SignUpPage';
import { HomePage } from '../../../pages/home/HomePage';
import { LoginPage } from 'pages/auth/Login/LoginPage';
import { CategoryListPage } from 'pages/admin/CategoryManagement/CategoryListPage';
import { CategoryDetailPage } from 'pages/admin/CategoryManagement/CategoryDetailPage';
import { NewCategoryPage } from 'pages/admin/CategoryManagement/NewCategoryPage';
import { FoodListPage } from 'pages/admin/ProductManagement/FoodListPage';
import { FoodDetailPage } from 'pages/admin/ProductManagement/FoodDetailPage';
import { NewFoodPage } from 'pages/admin/ProductManagement/NewFoodPage';
import { AccountPage } from 'pages/app/Account/AccountPage';
import { getLocalStorageItem } from 'common/helper/storage';

const staticRoute: IRoute[] = [
  //common
  {
    path: routerPath.common.HOME,
    element: <HomePage />,
  },

  //test
  {
    path: routerPath.test.TEST,
    element: <TestPage />,
  },
];

const deletedRoute: IRoute[] = [
  {
    path: routerPath.auth.USER_REGISTER,
    element: <SignUpPage />,
  },
  {
    path: routerPath.auth.LOGIN,
    element: <LoginPage />,
  },
];

const clientRoute: IRoute[] = [
  {
    path: routerPath.app.MY_ACCOUNT,
    element: <AccountPage />,
  },
];

const adminRoute: IRoute[] = [
  {
    path: routerPath.admin.CATEGORY_LIST,
    element: <CategoryListPage />,
  },
  {
    path: routerPath.admin.CATEGORY_DETAIL,
    element: <CategoryDetailPage />,
  },
  {
    path: routerPath.admin.CATEGORY_NEW,
    element: <NewCategoryPage />,
  },
  {
    path: routerPath.admin.FOOD_LIST,
    element: <FoodListPage />,
  },
  {
    path: routerPath.admin.FOOD_DETAIL,
    element: <FoodDetailPage />,
  },
  {
    path: routerPath.admin.FOOD_NEW,
    element: <NewFoodPage />,
  },
];

export const renderRoute = (): IRoute[] => {
  const existedToken: boolean =
    getLocalStorageItem('access-token') !== undefined;
  const isAdminAccount: boolean = getLocalStorageItem('user-info')?.id === 1;

  if (!existedToken) {
    return [...staticRoute, ...deletedRoute];
  }
  if (!isAdminAccount) {
    return [...staticRoute, ...clientRoute];
  }
  return [...staticRoute, ...adminRoute];
};
