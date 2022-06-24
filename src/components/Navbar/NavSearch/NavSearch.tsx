import { Search } from '@mui/icons-material';
import {
  CustomSearch,
  SearchIconWrapper,
  StyledInputBase,
} from './NavSearch.style';

export const NavSearch = () => {
  return (
    <CustomSearch>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Nhập đồ ăn bạn muốn…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </CustomSearch>
  );
};
