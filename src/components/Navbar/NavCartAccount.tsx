import { AccountCircle, NoAccounts, ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { routerPath } from '../../common/config/router/router.path';

interface CartAccountProps {
  isLogged: boolean;
}

export const NavCartAccount: React.FC<CartAccountProps> = ({ isLogged }) => {
  const [anchorElAccount, setAnchorElAccount] = React.useState<null | HTMLElement>(null);

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };
  return (
    <>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{ color: 'black' }}>
        <Badge badgeContent={4} color="error">
          <ShoppingCart fontSize="medium" />
        </Badge>
      </IconButton>
      {isLogged ? (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenAccountMenu}
            color="inherit"
            sx={{ color: 'black' }}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElAccount}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElAccount)}
            onClose={handleCloseAccountMenu}
          >
            <MenuItem onClick={handleCloseAccountMenu}>Logout</MenuItem>
            <MenuItem onClick={handleCloseAccountMenu}>My account</MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenAccountMenu}
            color="inherit"
            sx={{ color: 'black' }}
          >
            <NoAccounts fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElAccount}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElAccount)}
            onClose={handleCloseAccountMenu}
          >
            <MenuItem onClick={handleCloseAccountMenu}>
              <Link to={routerPath.auth.USER_REGISTER}>Sign up</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseAccountMenu}>
              <Link to={routerPath.auth.LOGIN}>Sign in</Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};
