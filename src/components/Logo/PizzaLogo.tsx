import { FC } from 'react';
import Typography from '@mui/material/Typography';

import { routerPath } from '../../common/config/router/router.path';
import './PizzaLogo.style.scss';

interface PizzaLogoProps {
  customDisplay: {};
  colorText: string;
}

export const PizzaLogo: FC<PizzaLogoProps> = ({ customDisplay, colorText }) => {
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
      <div className={`logo-container ${colorText}`}>
        <div className="logo-title">The Pizza Heaven</div>
        <p className="logo-description">Everything about pizza</p>
      </div>
    </Typography>
  );
};
