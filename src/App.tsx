import { FC, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { renderRoute } from 'common/config/router/router.routes';
import { theme } from 'common/config/theme/theme';
import AppLayout from 'layouts/AppLayout';
import { routerPath } from './common/config/router/router.path';
import { IRoute } from './common/types/router.model';
import './/common/sass/App.scss';

const ListRoute: FC = () => {
  const location = useLocation();
  const routeList = useMemo(() => {
    return renderRoute();
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {routeList.map((route: IRoute, index: number) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to={routerPath.common.NOT_FOUND} />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ListRoute />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
