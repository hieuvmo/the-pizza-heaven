import { MouseEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container/';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

import { PizzaLogo } from '../Logo/PizzaLogo';
import { NavAccount } from './NavAccount/NavAccount';
import { NavSearch } from './NavSearch/NavSearch';
import { NAVBAR_ATTRIBUTE } from 'common/constants';
import { NavCart } from './NavCart/NavCart';
import { getLocalStorageItem } from 'common/helper/storage';

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  let location = useLocation();

  const token: string = getLocalStorageItem('access-token');
  const userId: number = getLocalStorageItem('user-info')?.id;

  const isAdminPage: boolean = location.pathname.includes('/admin');
  const isLogged: boolean = token !== undefined;
  const isAdminAccount: boolean = userId === 1;

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <PizzaLogo customDisplay={{ xs: 'none', lg: 'flex' }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', lg: 'none' },
                }}
              >
                {!isAdminPage
                  ? NAVBAR_ATTRIBUTE.APP.map((item, index) => (
                      <Link to={item.path} key={index} className="uppercase">
                        <MenuItem onClick={handleCloseNavMenu}>
                          {item.name}
                        </MenuItem>
                      </Link>
                    ))
                  : NAVBAR_ATTRIBUTE.ADMIN.map((item, index) => (
                      <Link to={item.path} key={index} className="uppercase">
                        <MenuItem onClick={handleCloseNavMenu}>
                          {item.name}
                        </MenuItem>
                      </Link>
                    ))}
              </Menu>
              <PizzaLogo customDisplay={{ xs: 'flex', lg: 'none' }} />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
              {!isAdminPage
                ? NAVBAR_ATTRIBUTE.APP.map((item, index) => (
                    <Link to={item.path} key={index} className="uppercase">
                      <MenuItem onClick={handleCloseNavMenu}>
                        {item.name}
                      </MenuItem>
                    </Link>
                  ))
                : NAVBAR_ATTRIBUTE.ADMIN.map((item, index) => (
                    <Link to={item.path} key={index} className="uppercase">
                      <MenuItem onClick={handleCloseNavMenu}>
                        {item.name}
                      </MenuItem>
                    </Link>
                  ))}
            </Box>

            <NavSearch isAdminPage={isAdminPage} />

            <NavCart isAdminPage={isAdminPage} />

            <NavAccount isLogged={isLogged} isAdminAccount={isAdminAccount} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
