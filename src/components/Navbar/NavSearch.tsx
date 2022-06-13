import { Search } from '@mui/icons-material';
import { CustomSearch, SearchIconWrapper, StyledInputBase } from './NavSearch.style';

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
