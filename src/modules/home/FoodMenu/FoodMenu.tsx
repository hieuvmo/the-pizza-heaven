import React, { useState } from 'react';
import './FoodMenu.style.scss';
import { MENU_PRODUCT_NAME } from 'common/constants/menuList';
import { FoodItem } from './FoodItem';

export const FoodMenu = () => {
  const [renderFoods, setRenderFoods] = useState<number>(1);

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
      <FoodItem categoryID={renderFoods} />
    </div>
  );
};
