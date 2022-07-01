import { Search } from '@mui/icons-material';
import { routerPath } from 'common/config/router/router.path';
import { useAppDispatch } from 'common/hooks/ReduxHook';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProductFullText } from 'redux/features/app/searchSlice';
import {
  CustomSearch,
  SearchIconWrapper,
  StyledInputBase,
} from './NavSearch.style';

interface NavSearchProps {
  isAdminPage: boolean;
}

export const NavSearch: React.FC<NavSearchProps> = ({ isAdminPage }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>('');

  const handleChangeSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClickSearchProductBtn = (
    e: React.MouseEvent<HTMLInputElement>,
  ) => {
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
