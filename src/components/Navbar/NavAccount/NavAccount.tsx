import { AccountCircle, NoAccounts } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { routerPath } from 'common/config/router/router.path';
import React from 'react';
import { Link } from 'react-router-dom';

interface AccountProps {
  isLogged: boolean;
}

export const NavAccount: React.FC<AccountProps> = ({ isLogged }) => {
  const [anchorElAccount, setAnchorElAccount] =
    React.useState<null | HTMLElement>(null);

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };
  return (
    <>
      {isLogged ? (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenAccountMenu}
            color="inherit"
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
            <MenuItem onClick={handleCloseAccountMenu}>My Account</MenuItem>
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
              <Link to={routerPath.auth.LOGIN}>Login</Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};
