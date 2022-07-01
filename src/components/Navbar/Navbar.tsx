import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { PizzaLogo } from '../Logo/PizzaLogo';
import { NavAccount } from './NavAccount/NavAccount';
import { NavSearch } from './NavSearch/NavSearch';
import { Outlet, useLocation } from 'react-router-dom';
import { NAVBAR_ATTRIBUTE } from 'common/constants';
import { NavCart } from './NavCart/NavCart';
import { getLocalStorageItem } from 'common/helper/storage';
import { routerPath } from 'common/config/router/router.path';
import { FooterTop } from 'components/Footer/FooterTop/FooterTop';
import { FooterBottom } from 'components/Footer/FooterBottom/FooterBottom';

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  let location = useLocation();
  const isAdminPage: boolean = location.pathname.includes('/admin');
  const isHomePage: boolean = location.pathname === routerPath.common.HOME;
  const isSearchPage: boolean = location.pathname === routerPath.app.SEARCH;
  const isLoginPage: boolean = location.pathname === routerPath.auth.LOGIN;
  const isSignInPage: boolean =
    location.pathname === routerPath.auth.USER_REGISTER;

  const token: string = getLocalStorageItem('access-token');
  const isLogged: boolean = token !== undefined;

  const userId: number = getLocalStorageItem('user-info')?.id;
  const isAdminAccount: boolean = userId === 1;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderFooter = () => {
    if (isHomePage || isSearchPage) {
      return (
        <>
          <FooterTop />
          <FooterBottom />
        </>
      );
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <PizzaLogo
              customDisplay={{ xs: 'none', md: 'flex' }}
              colorText="text-white"
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {!isAdminPage
                  ? NAVBAR_ATTRIBUTE.APP.map((item, index) => (
                      <MenuItem key={index} onClick={handleCloseNavMenu}>
                        <Typography
                          component="a"
                          href={item.path}
                          textAlign="center"
                          sx={{
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.name}
                        </Typography>
                      </MenuItem>
                    ))
                  : NAVBAR_ATTRIBUTE.ADMIN.map((item, index) => (
                      <MenuItem key={index} onClick={handleCloseNavMenu}>
                        <Typography
                          component="a"
                          href={item.path}
                          textAlign="center"
                          sx={{
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.name}
                        </Typography>
                      </MenuItem>
                    ))}
              </Menu>
              <PizzaLogo
                customDisplay={{ xs: 'flex', md: 'none' }}
                colorText="text-white"
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {!isAdminPage
                ? NAVBAR_ATTRIBUTE.APP.map((item, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography
                        component="a"
                        href={item.path}
                        textAlign="center"
                        sx={{
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </MenuItem>
                  ))
                : NAVBAR_ATTRIBUTE.ADMIN.map((item, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography
                        component="a"
                        href={item.path}
                        textAlign="center"
                        sx={{
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </MenuItem>
                  ))}
            </Box>

            <NavSearch isAdminPage={isAdminPage} />

            <NavCart isAdminPage={isAdminPage} />

            <NavAccount isLogged={isLogged} isAdminAccount={isAdminAccount} />
          </Toolbar>
        </Container>
      </AppBar>
      <div className={`${!isLoginPage && !isSignInPage && 'pt-14'}`}>
        <Outlet />
      </div>
      {renderFooter()}
    </>
  );
};
