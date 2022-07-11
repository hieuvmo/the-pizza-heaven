import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

import { handleCalculateAverageRating } from 'common/helper/averageRating';
import { IRating } from 'common/types/rating.model';
import RatingStatisticBars from 'components/Rating/RatingStatisticBar/RatingStatisticBar';
import { ReadOnlyRating } from 'components/Rating/ReadOnlyRating/ReadOnlyRating';
import { useParams } from 'react-router-dom';
import appService from 'services/appService';
import { FoodDetail } from '../FoodDetail/FoodDetail';
import './FoodDetailReview.style.scss';

export const FoodDetailReview = () => {
  const { id } = useParams();
  const [latestRatingByFoodId, setLatestRatingByFoodId] = useState<IRating[]>(
    [],
  );

  useEffect(() => {
    const fetchLatestRatingByFoodIdAPI = async () => {
      try {
        const response = await appService.getLatestReviewByFoodId(
          parseInt(id as string),
        );
        setLatestRatingByFoodId(response);
      } catch (error) {
        console.log('Error when getLatestReviewByFoodId', error);
      }
    };

    fetchLatestRatingByFoodIdAPI();
  }, [id]);

  return (
    <Container maxWidth="lg">
      <div className="food_review-container">
        <FoodDetail
          foodId={parseInt(id as string)}
          randomNumberOfStock={Math.floor(Math.random() * 1000)}
          averageStar={handleCalculateAverageRating(latestRatingByFoodId)}
        />

        <div className="food_review-content">
          <Grid container spacing={2} className="box-vote">
            <Grid item xs={12} md={5} className="chart-rating">
              <div className="rating-average">
                {handleCalculateAverageRating(latestRatingByFoodId)}/5
              </div>
              <div className="rating-point">
                <ReadOnlyRating
                  starQuantity={handleCalculateAverageRating(
                    latestRatingByFoodId,
                  )}
                  showStarQuantity={false}
                />
              </div>
              <div className="rating-total">
                <span>{latestRatingByFoodId.length}</span>rating & review
              </div>
            </Grid>
            <Grid item xs={12} md={7} className="chart-statistic">
              <RatingStatisticBars ratingList={latestRatingByFoodId} />
            </Grid>
          </Grid>
          <Grid container spacing={2} className="box-review">
            <Grid item xs={12} className="review-item">
              {latestRatingByFoodId.map((item) => (
                <div className="review-content" key={item.id}>
                  <div className="review-title">
                    {item.isAnonymous ? (
                      <div className="customer-name">Anonymous</div>
                    ) : (
                      <div className="customer-name">{`${item.firstName} ${item.lastName}`}</div>
                    )}
                    <div className="submitted-time">{item.date}</div>
                  </div>
                  <div className="review-description">
                    <div className="feedback-rating">
                      <h6>Rating:</h6>
                      <ReadOnlyRating
                        starQuantity={item.star}
                        showStarQuantity={false}
                      />
                    </div>
                    <div className="feedback-content">
                      Review: <span>{item.review}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};
