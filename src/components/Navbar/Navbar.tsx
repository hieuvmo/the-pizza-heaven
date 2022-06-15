import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { routerPath } from '../../common/config/router/router.path';
import MenuIcon from '@mui/icons-material/Menu';
import { PizzaLogo } from '../Logo/PizzaLogo';
import { NavCartAccount } from './NavCartAccount';
import { NavSearch } from './NavSearch';
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/Footer/Footer';
import appService from 'services/appService';
import { ICategory } from 'common/types/category.model';
import { convertCategoryPath } from 'common/helper/convertPath';

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
  const [categoryAPI, setCategoryAPI] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategoryFromAPI = async () => {
      try {
        const response = await appService.getCategoryList();
        setCategoryAPI(response);
      } catch (error) {
        console.log('Error when fetch category API', error);
      }
    };
    fetchCategoryFromAPI();
  }, []);

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
              {categoryAPI.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography
                    component="a"
                    href={`${routerPath.app.FOOD}/${convertCategoryPath(page.categoryName)}`}
                    textAlign="center"
                  >
                    {page.categoryName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <PizzaLogo customDisplay={{ xs: 'flex', md: 'none' }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {categoryAPI.map((page, index) => (
              <Button
                key={index}
                component="a"
                href={`${routerPath.app.FOOD}/${convertCategoryPath(page.categoryName)}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', fontSize: '1rem' }}
              >
                {page.categoryName}
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
