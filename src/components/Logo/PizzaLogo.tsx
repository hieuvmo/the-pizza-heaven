import { FC } from 'react';
import Typography from '@mui/material/Typography';

import { routerPath } from '../../common/config/router/router.path';
import './PizzaLogo.style.scss';
import { Link } from 'react-router-dom';

interface PizzaLogoProps {
  customDisplay: {};
}

export const PizzaLogo: FC<PizzaLogoProps> = ({ customDisplay }) => {
  return (
    <Typography
      variant="h6"
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
      <Link to={routerPath.common.HOME} className="flex">
        <img
          alt="Pizza Logo"
          width={48}
          src="https://res.cloudinary.com/duitozhul/image/upload/v1655806771/the-pizza-heaven/logo/pizza-logo.png"
        />
        <div className="logo-container">
          <div className="logo-title">The Pizza Heaven</div>
          <p className="logo-description">Everything about pizza</p>
        </div>
      </Link>
    </Typography>
  );
};
