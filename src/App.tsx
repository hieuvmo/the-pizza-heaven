import { ThemeProvider } from '@mui/material';
import { renderRoute } from 'common/config/router/router.routes';
import { theme } from 'common/config/theme/theme';
import { Navbar } from 'components/Navbar/Navbar';
import React, { useMemo } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import './/common/sass/App.scss';
import { routerPath } from './common/config/router/router.path';
import { IRoute } from './common/types/router.model';

const ListRoute: React.FC = () => {
  const location = useLocation();
  const temp = useMemo(() => {
    return renderRoute();
  }, [location.pathname]);

  return (
    <Routes>
      {temp.map((route: IRoute, index: number) => (
        <Route path={route.path} element={<Navbar />} key={index}>
          <Route path={route.path} element={route.element} />;
        </Route>
      ))}
      <Route path="*" element={<Navigate to={routerPath.common.HOME} />} />
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
