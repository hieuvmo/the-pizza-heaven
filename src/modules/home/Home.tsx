import { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

import { FoodMenu } from '../app/FoodMenu/FoodMenu';
import { BannerSlider } from 'components/Slider/BannerSlider';

export const Home = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { hashSet } = useOutletContext<{
    hashSet: string;
  }>();

  useEffect(() => {
    if (hashSet === 'menu') {
      menuRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hashSet]);

  return (
    <div>
      <div ref={divRef}>
        <BannerSlider />
      </div>
      <div ref={menuRef}>
        <FoodMenu />
      </div>
    </div>
  );
};
