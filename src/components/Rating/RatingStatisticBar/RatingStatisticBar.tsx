import * as React from 'react';
import { styled } from '@mui/material/styles';

import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { ColorSchema } from 'common/types/color.model';
import { Star } from '@mui/icons-material';
import './RatingStatisticBar.style.scss';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === 'light' ? ColorSchema.LightGreen : '#308fe8',
  },
}));

export default function RatingStatisticBars() {
  return (
    <>
      <div className="custom-rating-bar">
        <div className="star-quantity">
          <span>5</span>
          <Star sx={{ fontSize: '1.25rem', marginBottom: '0.25rem' }} />
        </div>
        <div className="rating-bar">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="rating-quantity">4</div>
      </div>
      <div className="custom-rating-bar">
        <div className="star-quantity">
          <span>5</span>
          <Star sx={{ fontSize: '1.25rem', marginBottom: '0.25rem' }} />
        </div>
        <div className="rating-bar">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="rating-quantity">4</div>
      </div>
      <div className="custom-rating-bar">
        <div className="star-quantity">
          <span>5</span>
          <Star sx={{ fontSize: '1.25rem', marginBottom: '0.25rem' }} />
        </div>
        <div className="rating-bar">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="rating-quantity">4</div>
      </div>
      <div className="custom-rating-bar">
        <div className="star-quantity">
          <span>5</span>
          <Star sx={{ fontSize: '1.25rem', marginBottom: '0.25rem' }} />
        </div>
        <div className="rating-bar">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="rating-quantity">4</div>
      </div>
      <div className="custom-rating-bar">
        <div className="star-quantity">
          <span>5</span>
          <Star sx={{ fontSize: '1.25rem', marginBottom: '0.25rem' }} />
        </div>
        <div className="rating-bar">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="rating-quantity">4</div>
      </div>
      <div className="custom-rating-bar">
        <div className="star-quantity">
          <span>5</span>
          <Star sx={{ fontSize: '1.25rem', marginBottom: '0.25rem' }} />
        </div>
        <div className="rating-bar">
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
        <div className="rating-quantity">4</div>
      </div>
    </>
  );
}
