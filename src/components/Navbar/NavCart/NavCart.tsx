import { FC } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import { routerPath } from 'common/config/router/router.path';
import { useAppSelector } from 'common/hooks/ReduxHook';
import { RootState } from 'redux/store';

interface NavCartProps {
  isAdminPage: boolean;
}

export const NavCart: FC<NavCartProps> = ({ isAdminPage }) => {
  const productQuantityInCart = useAppSelector(
    (state: RootState) => state.cart.productsInCart.length,
  );

  return (
    <>
      {!isAdminPage && (
        <Link to={routerPath.app.CART}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={productQuantityInCart} color="error">
              <ShoppingCart fontSize="medium" />
            </Badge>
          </IconButton>
        </Link>
      )}
    </>
  );
};
