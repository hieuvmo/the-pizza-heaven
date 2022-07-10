import { FC } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export interface ReadOnlyRatingProps {
  starQuantity: number;
  showStarQuantity: boolean;
}

export const ReadOnlyRating: FC<ReadOnlyRatingProps> = ({
  starQuantity,
  showStarQuantity,
}) => {
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating name="read-only" value={starQuantity} precision={0.1} readOnly />
      {showStarQuantity && <Box sx={{ ml: 2 }}>{starQuantity}</Box>}
    </Box>
  );
};
