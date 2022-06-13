import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { routerPath } from '../../common/config/router/router.path';
import MenuIcon from '@mui/icons-material/Menu';
import { PizzaLogo } from '../Logo/PizzaLogo';
import { NavCartAccount } from './NavCartAccount';
import { NavSearch } from './NavSearch';
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/Footer/Footer';

const pages = [
  {
    name: 'Users',
    path: routerPath.admin.USER_LIST,
  },
];

// const appPages = [
//   {
//     name: 'Pizza',
//     path: routerPath.app.PIZZA,
//   },
// ];

export const Navbar = () => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLogged(event.target.checked);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <PizzaLogo customDisplay={{ xs: 'none', md: 'flex' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: 'black' }}
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
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography component="a" href={page.path} textAlign="center">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <PizzaLogo customDisplay={{ xs: 'flex', md: 'none' }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                component="a"
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: '1rem' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <NavSearch />
          <NavCartAccount isLogged={isLogged} />
        </Toolbar>
      </Container>
      <Outlet />
      <Footer />
    </AppBar>
  );
};
