import React from 'react';
import { Typography } from '@mui/material';
import { routerPath } from '../../common/config/router/router.path';

interface PizzaLogoProps {
  customDisplay: {};
}

export const PizzaLogo: React.FC<PizzaLogoProps> = ({ customDisplay }) => {
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
      <img alt="Pizza Logo" width={48} src="https://thepizzaheaven.com/wp-content/uploads/2019/09/Untitled-1.png" />
      <div className="ml-2">
        <div className="text-xl tracking-normal">The Pizza Heaven</div>
        <p className="text-sm font-light tracking-tight">Tất cả mọi thứ về pizza</p>
      </div>
    </Typography>
  );
};
