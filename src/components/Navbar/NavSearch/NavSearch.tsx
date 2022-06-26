import { Search } from '@mui/icons-material';
import {
  CustomSearch,
  SearchIconWrapper,
  StyledInputBase,
} from './NavSearch.style';

interface NavSearchProps {
  isAdminPage: boolean;
}

export const NavSearch: React.FC<NavSearchProps> = ({ isAdminPage }) => {
  return (
    <>
      {!isAdminPage && (
        <CustomSearch>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Nhập đồ ăn bạn muốn…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </CustomSearch>
      )}
    </>
  );
};
