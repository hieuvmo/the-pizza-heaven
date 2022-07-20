import { FC, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Star } from '@mui/icons-material';

import { ColorSchema } from 'common/types/color.model';
import './RatingStatisticBar.style.scss';
import { IRating } from 'common/types/rating.model';

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

interface RatingStatisticProps {
  ratingList: IRating[];
}

interface RatingStarQuantityProps {
  [index: number]: number;
}

interface RatingInfo {
  startName: number;
  starQuantity: number;
  totalStar: number;
}

const RatingStatisticBars: FC<RatingStatisticProps> = ({ ratingList }) => {
  const [countStar, setCountStar] = useState<RatingStarQuantityProps>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [ratingInfo, setRatingInfo] = useState<RatingInfo[]>([]);

  useEffect(() => {
    ratingList.forEach((item) => {
      setCountStar({ ...countStar, [item.star]: ++countStar[item.star] });
    });

    const res: RatingInfo[] = [];
    for (const [key, value] of Object.entries(countStar)) {
      res.push({
        startName: parseInt(key),
        starQuantity: value,
        totalStar: ratingList.length,
      });
    }
    setRatingInfo(res);
  }, [ratingList.length]);

  return (
    <>
      {ratingInfo.map((item) => (
        <div className="custom-rating-bar" key={item.startName}>
          <div className="star-quantity">
            <span>{item.startName}</span>
            <Star sx={{ fontSize: '1.25rem', marginBottom: '0.25rem' }} />
          </div>
          <div className="rating-bar">
            {ratingList.length === 0 ? (
              <BorderLinearProgress variant="determinate" value={0} />
            ) : (
              <BorderLinearProgress
                variant="determinate"
                value={(item.starQuantity / item.totalStar) * 100}
              />
            )}
          </div>
          <div className="rating-quantity">{item.starQuantity}</div>
        </div>
      ))}
    </>
  );
};

export default RatingStatisticBars;
