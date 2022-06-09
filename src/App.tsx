import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './/common/sass/App.scss';
import { routerPath } from './common/config/router/router.path';
import { routerList } from './common/config/router/router.routes';
import { IRoute } from './common/types/RouterModel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routerList.map((route: IRoute, index: number) => {
          return <Route path={route.path} element={route.element} key={index} />;
        })}
        <Route path="*" element={<Navigate to={routerPath.common.HOME} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
