import { IRoute } from '../../types/router.model';
import { routerPath } from './router.path';
import { TestPage } from '../../../pages/test/TestPage';
import { SignUpPage } from '../../../pages/auth/SignUp/SignUpPage';
import { LoginPage } from 'pages/auth/Login/LoginPage';
import { CategoryListPage } from 'pages/admin/CategoryManagement/CategoryListPage';
import { CategoryDetailPage } from 'pages/admin/CategoryManagement/CategoryDetailPage';
import { NewCategoryPage } from 'pages/admin/CategoryManagement/NewCategoryPage';
import { AccountPage } from 'pages/app/Account/AccountPage';
import { getLocalStorageItem } from 'common/helper/storage';
import { ProductSearchPage } from 'pages/app/Search/ProductSearchPage';
import { ProductListPage } from 'pages/admin/ProductManagement/FoodProductPage';
import { ProductDetailPage } from 'pages/admin/ProductManagement/ProductDetailPage';
import { NewProductPage } from 'pages/admin/ProductManagement/NewProductPage';
import { CartPage } from 'pages/app/Cart/CartPage';
import { PageNotFound } from 'pages/error/PageNotFound';
import { HomePage } from 'pages/home/PageHome';

const staticRoute: IRoute[] = [
  //common

  {
    path: routerPath.common.HOME,
    element: <HomePage />,
  },
  {
    path: routerPath.common.NOT_FOUND,
    element: <PageNotFound />,
  },
  {
    path: routerPath.app.SEARCH,
    element: <ProductSearchPage />,
  },
  {
    path: routerPath.app.CART,
    element: <CartPage />,
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
    element: <ProductListPage />,
  },
  {
    path: routerPath.admin.FOOD_DETAIL,
    element: <ProductDetailPage />,
  },
  {
    path: routerPath.admin.FOOD_NEW,
    element: <NewProductPage />,
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
