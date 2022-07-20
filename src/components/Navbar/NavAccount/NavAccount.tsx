import { FC, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, NoAccounts } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

import { ACCOUNT_ATTRIBUTE } from 'common/constants';
import { destroyLocalStorageItem } from 'common/helper/storage';

interface AccountProps {
  isLogged: boolean;
  isAdminAccount: boolean;
}

export const NavAccount: FC<AccountProps> = ({ isLogged, isAdminAccount }) => {
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(
    null,
  );

  const handleOpenAccountMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };

  const handleLogOutAccount = () => {
    destroyLocalStorageItem('user-info');
    destroyLocalStorageItem('access-token');
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenAccountMenu}
        color="inherit"
      >
        {!isLogged ? (
          <NoAccounts fontSize="large" />
        ) : (
          <AccountCircle fontSize="large" />
        )}
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
        {!isLogged
          ? ACCOUNT_ATTRIBUTE.NOT_LOGIN.map((item, index) => (
              <Link to={item.path} key={index}>
                <MenuItem onClick={handleCloseAccountMenu}>
                  {item.attribute}
                </MenuItem>
              </Link>
            ))
          : !isAdminAccount
          ? ACCOUNT_ATTRIBUTE.CLIENT_ACCOUNT.map((item, index) => {
              if (item.attribute === 'Log out') {
                return (
                  <Link
                    to={item.path}
                    key={index}
                    onClick={handleLogOutAccount}
                  >
                    <MenuItem onClick={handleCloseAccountMenu}>
                      {item.attribute}
                    </MenuItem>
                  </Link>
                );
              }
              return (
                <Link to={item.path} key={index}>
                  <MenuItem onClick={handleCloseAccountMenu}>
                    {item.attribute}
                  </MenuItem>
                </Link>
              );
            })
          : ACCOUNT_ATTRIBUTE.ADMIN_ACCOUNT.map((item, index) => {
              if (item.attribute === 'Log out') {
                return (
                  <Link
                    to={item.path}
                    key={index}
                    onClick={handleLogOutAccount}
                  >
                    <MenuItem onClick={handleCloseAccountMenu}>
                      {item.attribute}
                    </MenuItem>
                  </Link>
                );
              }
              return (
                <Link to={item.path} key={index}>
                  <MenuItem onClick={handleCloseAccountMenu}>
                    {item.attribute}
                  </MenuItem>
                </Link>
              );
            })}
      </Menu>
    </>
  );
};
