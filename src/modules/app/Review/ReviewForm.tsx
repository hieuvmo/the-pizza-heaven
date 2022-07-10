import { Grid, Switch } from '@mui/material';
import { ConfirmButton } from 'components/MuiStyling/ConfirmButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { ControlledRating } from 'components/Rating/ControlledRating/ControlledRating';
import { FC, useState } from 'react';
import './ReviewForm.style.scss';

interface ReviewFormProps {
  foodId: number;
}

export const ReviewForm: FC<ReviewFormProps> = ({ foodId }) => {
  console.log('foodId', foodId);
  const [checkedAnonymousMode, setCheckedAnonymousMode] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(5);

  const handleChangeAnonymousModeChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckedAnonymousMode(e.target.checked);
  };
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      spacing={2}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          className="review_form-thumbnail"
          src="https://res.cloudinary.com/duitozhul/image/upload/v1655548150/the-pizza-heaven/product/pizza/0002705_seafood-peach_300_dq8vg3.png"
          alt="abc"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="review_form-line"></div>
        <h3 className="review_form-heading">Pizza Hải Sản Đào"</h3>
        <p className="review_form-description">
          Tôm, Giăm bông, Đào hoà quyện bùng nổ cùng sốt Thousand Island
        </p>
        <div className="review_form-rating">
          <div className="rating-title">Your rating: </div>
          <ControlledRating
            starValue={ratingValue}
            setStarValue={setRatingValue}
          />
        </div>
        <CustomTextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          id="review"
          name="review"
          label="You review"
          type="text"
          placeholder="Enter your review here"
          variant="outlined"
        />
        <div className="review_form-anonymous_mode">
          <div className="mode-title">Anonymous mode: </div>
          <Switch
            checked={checkedAnonymousMode}
            onChange={handleChangeAnonymousModeChecked}
          />
        </div>
        <div className="mt-8">
          <ConfirmButton
            fullWidth
            type="submit"
            variant="contained"
            // onClick={() => handleClickAddToCartBtn(productById)}
          >
            Submit
          </ConfirmButton>
        </div>
      </Grid>
    </Grid>
  );
};
