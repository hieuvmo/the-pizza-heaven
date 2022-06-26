import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

import { IMAGE_BANNER_SLIDER } from 'common/constants';

export const BannerSlider = () => {
  return (
    <SimpleImageSlider
      width={'100%'}
      height={550}
      images={IMAGE_BANNER_SLIDER}
      showBullets={true}
      showNavs={true}
      autoPlay={true}
      autoPlayDelay={5}
      slideDuration={1}
    />
  );
};
