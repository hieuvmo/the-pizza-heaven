import { Dispatch, FC, SetStateAction, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export interface RatingLabelProps {
  [index: string]: string;
}

export interface RatingProps {
  starValue: number | null;
  setStarValue: Dispatch<SetStateAction<number | null>>;
}

const labels: RatingLabelProps = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const ControlledRating: FC<RatingProps> = ({
  starValue,
  setStarValue,
}) => {
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={starValue}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setStarValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {starValue !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : starValue]}</Box>
      )}
    </Box>
  );
};
