import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import React from 'react';

export const NavCart = () => {
  return (
    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
      <Badge badgeContent={4} color="error">
        <ShoppingCart fontSize="medium" />
      </Badge>
    </IconButton>
  );
};
