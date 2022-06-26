import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import React from 'react';

interface NavCartProps {
  isAdminPage: boolean;
}

export const NavCart: React.FC<NavCartProps> = ({ isAdminPage }) => {
  return (
    <>
      {!isAdminPage && (
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCart fontSize="medium" />
          </Badge>
        </IconButton>
      )}
    </>
  );
};
