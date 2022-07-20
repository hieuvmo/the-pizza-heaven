import { IRating } from 'common/types/rating.model';

export const handleCalculateAverageRating = (ratingList: IRating[]) => {
  if (ratingList.length === 0) return 0;
  const ratingSum = ratingList.reduce(
    (prevValue, currValue) => prevValue + currValue.star,
    0,
  );
  const averageRating = ratingSum / ratingList.length;
  return Number(averageRating.toFixed(2));
};
