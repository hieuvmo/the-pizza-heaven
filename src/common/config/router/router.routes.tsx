import { IRoute } from '../../types/RouterModel';
import { routerPath } from './router.path';
import { HomePage } from '../../../pages/home/HomePage';
import { TestPage } from '../../../pages/test/TestPage';

export const routerList: IRoute[] = [
  {
    path: routerPath.common.HOME,
    element: <HomePage />,
  },
  {
    path: routerPath.test.TEST,
    element: <TestPage />,
  },
];
