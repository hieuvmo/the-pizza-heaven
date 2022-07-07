import { useState } from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import Select, { SingleValue } from 'react-select';

import { MENU_PRODUCT_NAME } from 'common/constants/menuList';
import { FoodItem } from '../FoodItem/FoodItem';
import {
  ISelect,
  PRODUCT_FILTER_ATTRIBUTE,
  PRODUCT_ORDER_BY_ATTRIBUTE,
} from 'common/constants';
import { ColorSchema } from 'common/types/color.model';
import './FoodMenu.style.scss';

export const FoodMenu = () => {
  const [renderFoods, setRenderFoods] = useState<number>(1);
  const [filterSelect, setFilterSelect] = useState<SingleValue<ISelect>>(
    PRODUCT_FILTER_ATTRIBUTE[0],
  );
  const [orderBySelect, setOrderBySelect] = useState<SingleValue<ISelect>>(
    PRODUCT_ORDER_BY_ATTRIBUTE[0],
  );

  const handleClickSetActiveFood = (foodName: number) => {
    setRenderFoods(foodName);
  };

  const handleChangeProductFilerSelect = (
    productFilterValue: SingleValue<ISelect>,
  ) => {
    setFilterSelect(productFilterValue);
  };
  const handleChangeProductOrderBySelect = (
    productOrderByValue: SingleValue<ISelect>,
  ) => {
    setOrderBySelect(productOrderByValue);
  };

  return (
    <div className="menu-container" id="menu">
      <div className="menu-heading">
        <h2 className="menu-title">
          <span className="menu-title-description">Our menu</span>
        </h2>
      </div>

      <ul className="menu-tabs">
        {MENU_PRODUCT_NAME.map((item) => (
          <li
            key={item.categoryId}
            className={`menu-tabs-item ${
              renderFoods === item.categoryId ? 'active' : ''
            } }`}
            onClick={() => handleClickSetActiveFood(item.categoryId)}
          >
            <div className="menu-tabs-icon">{item.iconName}</div>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          spacing={4}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              paddingTop: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div className="font-bold my-auto min-w-[5rem]">Filter by:</div>
            <div className="w-full">
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: '#e0e0e0',
                    primary: ColorSchema.LightGreen,
                  },
                })}
                options={PRODUCT_FILTER_ATTRIBUTE}
                placeholder="Sort by"
                value={filterSelect}
                onChange={(newValue: SingleValue<ISelect>) =>
                  handleChangeProductFilerSelect(newValue)
                }
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              paddingTop: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div className="font-bold my-auto min-w-[5rem]">Order by:</div>
            <div className="w-full">
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: '#e0e0e0',
                    primary: ColorSchema.LightGreen,
                  },
                })}
                options={PRODUCT_ORDER_BY_ATTRIBUTE}
                placeholder="Oder by"
                value={orderBySelect}
                onChange={(newValue: SingleValue<ISelect>) =>
                  handleChangeProductOrderBySelect(newValue)
                }
              />
            </div>
          </Grid>
        </Grid>
      </Container>

      <FoodItem
        categoryId={renderFoods}
        filterValue={filterSelect?.value as string}
        orderByValue={orderBySelect?.value as string}
      />
    </div>
  );
};
