import React from 'react';
import { Typography } from '@mui/material';
import { routerPath } from '../../common/config/router/router.path';

interface PizzaLogoProps {
  customDisplay: {};
  colorText: string;
}

export const PizzaLogo: React.FC<PizzaLogoProps> = ({ customDisplay, colorText }) => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href={routerPath.common.HOME}
      sx={{
        mr: 4,
        display: customDisplay,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'black',
        textDecoration: 'none',
      }}
    >
      <img
        alt="Pizza Logo"
        width={48}
        src="https://res.cloudinary.com/duitozhul/image/upload/v1655806771/the-pizza-heaven/logo/pizza-logo.png"
      />
      <div className={`ml-2 ${colorText}`}>
        <div className="text-xl tracking-normal">The Pizza Heaven</div>
        <p className="text-sm font-light tracking-tight">Everything about pizza</p>
      </div>
    </Typography>
  );
};
