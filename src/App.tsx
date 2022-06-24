import { ThemeProvider } from '@mui/material';
import { theme } from 'common/config/theme/theme';
import { Navbar } from 'components/Navbar/Navbar';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './/common/sass/App.scss';
import { routerPath } from './common/config/router/router.path';
import { routerList } from './common/config/router/router.routes';
import { IRoute } from './common/types/router.model';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {routerList.map((route: IRoute, index: number) => (
            <Route path={route.path} element={<Navbar />} key={index}>
              <Route path={route.path} element={route.element} />;
            </Route>
          ))}
          <Route path="*" element={<Navigate to={routerPath.common.HOME} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
