import {
  Fastfood,
  Icecream,
  LocalBar,
  LocalPizza,
  RamenDining,
  RiceBowl,
  SoupKitchen,
} from '@mui/icons-material';
import React, { ReactNode } from 'react';

interface MenuProductProps {
  name: string;
  iconName: ReactNode;
  categoryId: number;
}

export const MENU_PRODUCT_NAME: MenuProductProps[] = [
  {
    name: 'Pizza',
    iconName: <LocalPizza sx={{ fontSize: '2rem' }} />,
    categoryId: 1,
  },
  {
    name: 'Khai vị',
    iconName: <Fastfood sx={{ fontSize: '2rem' }} />,
    categoryId: 2,
  },
  {
    name: 'Mỳ Ý',
    iconName: <RamenDining sx={{ fontSize: '2rem' }} />,
    categoryId: 3,
  },
  {
    name: 'Nui bỏ lò',
    iconName: <SoupKitchen sx={{ fontSize: '2rem' }} />,
    categoryId: 4,
  },
  {
    name: 'Salad',
    iconName: <RiceBowl sx={{ fontSize: '2rem' }} />,
    categoryId: 5,
  },
  {
    name: 'Thức uống',
    iconName: <LocalBar sx={{ fontSize: '2rem' }} />,
    categoryId: 6,
  },
  {
    name: 'Kem hộp',
    iconName: <Icecream sx={{ fontSize: '2rem' }} />,
    categoryId: 7,
  },
];
