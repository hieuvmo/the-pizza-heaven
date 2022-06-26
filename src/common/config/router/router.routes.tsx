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
  //admin
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
  //app
  {
    path: routerPath.app.MY_ACCOUNT,
    element: <AccountPage />,
  },
  //test
  {
    path: routerPath.test.TEST,
    element: <TestPage />,
  },
];
