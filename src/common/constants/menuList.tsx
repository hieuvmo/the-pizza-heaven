import FastfoodIcon from '@mui/icons-material/Fastfood';
import IcecreamIcon from '@mui/icons-material/Icecream';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import { ReactNode } from 'react';

export interface MenuProductProps {
  name: string;
  iconName: ReactNode;
  categoryId: number;
}

export const MENU_PRODUCT_NAME: MenuProductProps[] = [
  {
    name: 'Pizza',
    iconName: <LocalPizzaIcon sx={{ fontSize: '2rem' }} />,
    categoryId: 1,
  },
  {
    name: 'Khai vị',
    iconName: <FastfoodIcon sx={{ fontSize: '2rem' }} />,
    categoryId: 2,
  },
  {
    name: 'Mỳ Ý',
    iconName: <RamenDiningIcon sx={{ fontSize: '2rem' }} />,
    categoryId: 3,
  },
  {
    name: 'Nui bỏ lò',
    iconName: <SoupKitchenIcon sx={{ fontSize: '2rem' }} />,
    categoryId: 4,
  },
  {
    name: 'Salad',
    iconName: <RiceBowlIcon sx={{ fontSize: '2rem' }} />,
    categoryId: 5,
  },
  {
    name: 'Thức uống',
    iconName: <LocalBarIcon sx={{ fontSize: '2rem' }} />,
    categoryId: 6,
  },
  {
    name: 'Kem hộp',
    iconName: <IcecreamIcon sx={{ fontSize: '2rem' }} />,
    categoryId: 7,
  },
];
