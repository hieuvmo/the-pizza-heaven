import { ReactNode } from 'react';

export interface IRoute {
  path: string;
  element: ReactNode;
}

export interface IParams {
  id: string;
}
