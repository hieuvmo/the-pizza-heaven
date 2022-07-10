import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import RatingStatisticBars from 'components/Rating/RatingStatisticBar/RatingStatisticBar';
import { ReadOnlyRating } from 'components/Rating/ReadOnlyRating/ReadOnlyRating';
import { useParams } from 'react-router-dom';
import { FoodDetail } from '../FoodDetail/FoodDetail';
import './FoodDetailReview.style.scss';

export const FoodDetailReview = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg">
      <div className="food_review-container">
        <FoodDetail
          foodId={parseInt(id as string)}
          randomNumberOfStock={Math.floor(Math.random() * 1000)}
        />

        <div className="food_review-content">
          <Grid container spacing={2} className="box-vote">
            <Grid item xs={12} md={5} className="chart-rating">
              <div className="rating-average">4.7/5</div>
              <div className="rating-point">
                <ReadOnlyRating starQuantity={4.7} showStarQuantity={false} />
              </div>
              <div className="rating-total">
                <span>4</span>rating & review
              </div>
            </Grid>
            <Grid item xs={12} md={7} className="chart-statistic">
              <RatingStatisticBars />
            </Grid>
          </Grid>

          <Grid container spacing={2} className="box-review">
            <Grid item xs={12} className="review-item">
              <div className="review-content">
                <div className="review-title">
                  <div className="customer-name">Thomas Partey</div>
                  <div className="submitted-time">11:31 08/07/2022</div>
                </div>
                <div className="review-description">
                  <div className="feedback-rating">
                    <h6>Rating:</h6>
                    <ReadOnlyRating starQuantity={4} showStarQuantity={false} />
                  </div>
                  <div className="feedback-content">
                    Review: <span>This food is so delicious</span>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};
