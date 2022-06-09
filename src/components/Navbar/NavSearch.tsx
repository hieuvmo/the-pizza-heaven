import { Search } from '@mui/icons-material';
import React from 'react';
import { CustomSearch, SearchIconWrapper, StyledInputBase } from '../MuiStyling/MuiStyling';

export const NavSearch = () => {
  return (
    <CustomSearch>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
    </CustomSearch>
  );
};
