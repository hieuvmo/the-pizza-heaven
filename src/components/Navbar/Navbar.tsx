import {
  AppBar,
  Box,
  Button,
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
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/Footer/Footer';
import { FooterTop } from 'components/Footer/FooterTop';
import { NAVBAR_ITEM_ARR } from 'common/constants';
import { NavCart } from './NavCart/NavCart';

export const Navbar = () => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

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
                {NAVBAR_ITEM_ARR.map((item, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography
                      component="a"
                      href={item.path}
                      textAlign="center"
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
              {NAVBAR_ITEM_ARR.map((item, index) => (
                <Button
                  key={index}
                  component="a"
                  href={item.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontSize: '1rem',
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            <NavSearch />

            <NavCart />

            <NavAccount isLogged={isLogged} />
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
      <FooterTop />
      <Footer />
    </>
  );
};
