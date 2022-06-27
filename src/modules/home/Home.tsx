import React from 'react';
import './Home.style.scss';
import { FoodMenu } from '../app/FoodMenu/FoodMenu';
import { BannerSlider } from 'components/Slider/BannerSlider';

export const Home = () => {
  return (
    <>
      <BannerSlider />
      <FoodMenu />;
    </>
  );
};
