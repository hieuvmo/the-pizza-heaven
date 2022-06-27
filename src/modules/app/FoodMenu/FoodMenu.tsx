import React, { useState } from 'react';
import './FoodMenu.style.scss';
import { MENU_PRODUCT_NAME } from 'common/constants/menuList';
import { FoodItem } from '../FoodItem/FoodItem';
import Select, { SingleValue } from 'react-select';
import {
  FILTER_ATTRIBUTE,
  ISelect,
  ORDER_BY_ATTRIBUTE,
} from 'common/constants';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

export const FoodMenu = () => {
  const [renderFoods, setRenderFoods] = useState<number>(1);
  const [filterSelect, setFilterSelect] = useState<SingleValue<ISelect>>(
    FILTER_ATTRIBUTE[0],
  );
  const [oderBySelect, setOderBySelect] = useState<SingleValue<ISelect>>(
    ORDER_BY_ATTRIBUTE[0],
  );

  const handleClickSetActiveFood = (foodName: number) => {
    setRenderFoods(foodName);
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
          spacing={2}
        >
          <Grid item xs={12} sm={6} sx={{ paddingTop: '0.5rem' }}>
            <div className="font-bold mb-2">Filter by:</div>
            <Select
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#e0e0e0',
                  primary: '#008c7a',
                },
              })}
              options={FILTER_ATTRIBUTE}
              placeholder="Sort by"
              value={filterSelect}
              onChange={(newValue: SingleValue<ISelect>) =>
                setFilterSelect(newValue)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ paddingTop: '0.5rem' }}>
            <div className="font-bold mb-2">Order by:</div>
            <Select
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#e0e0e0',
                  primary: '#008c7a',
                },
              })}
              options={ORDER_BY_ATTRIBUTE}
              placeholder="Oder by"
              value={oderBySelect}
              onChange={(newValue: SingleValue<ISelect>) =>
                setOderBySelect(newValue)
              }
            />
          </Grid>
        </Grid>
      </Container>

      <FoodItem
        categoryId={renderFoods}
        filterValue={filterSelect?.value as string}
        orderByValue={oderBySelect?.value as string}
      />
    </div>
  );
};
