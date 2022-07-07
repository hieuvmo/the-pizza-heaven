import { Search } from '@mui/icons-material';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'common/hooks/ReduxHook';
import { searchProductFullText } from 'redux/features/app/searchSlice';
import { routerPath } from 'common/config/router/router.path';
import {
  CustomSearch,
  SearchIconWrapper,
  StyledInputBase,
} from './NavSearch.style';

interface NavSearchProps {
  isAdminPage: boolean;
}

export const NavSearch: FC<NavSearchProps> = ({ isAdminPage }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>('');

  const handleChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClickSearchProductBtn = (e: MouseEvent<HTMLInputElement>) => {
    dispatch(searchProductFullText(searchValue));
    searchValue && navigate(routerPath.app.SEARCH);
  };

  return (
    <>
      {!isAdminPage && (
        <CustomSearch onClick={handleClickSearchProductBtn}>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Enter the food you want…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={handleChangeSearchBar}
          />
        </CustomSearch>
      )}
    </>
  );
};
