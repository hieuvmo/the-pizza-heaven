import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Grid, Skeleton, Switch } from '@mui/material';

import { convertDateNowToDayMonthYear } from 'common/helper/convertDate';
import { IFood } from 'common/types/food.model';
import { IOrder, IOrderDetail } from 'common/types/order.model';
import { IRating } from 'common/types/rating.model';
import { ConfirmButton } from 'components/MuiStyling/ConfirmButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { ControlledRating } from 'components/Rating/ControlledRating/ControlledRating';
import appService from 'services/appService';
import './ReviewForm.style.scss';

interface ReviewFormProps {
  foodId: number;
  ordinaryNumber: number;
  orderById: IOrder;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  orderDetailByOrderId: IOrderDetail[];
  setOrderDetailByOrderId: Dispatch<SetStateAction<IOrderDetail[]>>;
}

export const ReviewForm: FC<ReviewFormProps> = ({
  foodId,
  ordinaryNumber,
  orderById,
  setOpenModal,
  orderDetailByOrderId,
  setOrderDetailByOrderId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedAnonymousMode, setCheckedAnonymousMode] =
    useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(5);
  const [reviewTextArea, setReviewTextArea] = useState<string>('');
  const [productById, setProductById] = useState<IFood>();

  useEffect(() => {
    const fetchProductByIdAPI = async () => {
      try {
        setIsLoading(true);
        const response = await appService.getFoodDetailById(foodId);
        setProductById(response);
      } catch (error) {
        console.log('Error when getFoodDetailById', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductByIdAPI();
  }, [foodId]);

  const handleChangeAnonymousModeChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckedAnonymousMode(e.target.checked);
  };

  const handleChangeReviewTextArea = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setReviewTextArea(e.target.value);
  };

  const renderReviewFormSkeletonLoading = () => {
    return (
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
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
            paddingRight: '1rem',
          }}
        >
          <div className="w-[21rem]">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="15rem"
              height="15rem"
              sx={{ margin: 'auto' }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="review_form-line"></div>
          <h3 className="review_form-heading w-full">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height="2rem"
            />
          </h3>
          <p className="review_form-description w-full">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height="1.5rem"
            />
          </p>
          <div className="review_form-rating w-full">
            <Skeleton
              animation="wave"
              variant="text"
              width="6rem"
              height="1.5rem"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="12.5rem"
              height="1.5rem"
            />
          </div>
          <div className="w-full">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="6.375rem"
            />
          </div>
          <div className="review_form-anonymous_mode w-full">
            <div>
              <Skeleton
                animation="wave"
                variant="text"
                width="8.5rem"
                height="3rem"
              />
            </div>
            <Skeleton
              animation="wave"
              variant="text"
              width="2.5rem"
              height="3rem"
            />
          </div>
          <div className="mt-4 w-full">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height="3.5rem"
            />
          </div>
        </Grid>
      </Grid>
    );
  };

  const changeOrderDetailIsRatedAPI = async () => {
    const newOrderDetail: IOrderDetail = {
      ...orderDetailByOrderId[ordinaryNumber - 1],
      isRated: true,
    };
    try {
      const response = await appService.ratedOrderDetailItem(
        orderDetailByOrderId[ordinaryNumber - 1].id as number,
        newOrderDetail,
      );
      const res = orderDetailByOrderId.map((item, index) => {
        if (index === ordinaryNumber - 1) return response;
        return item;
      });
      setOrderDetailByOrderId(res);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClickSubmitReviewForm = async () => {
    const newReviewForm: IRating = {
      userId: orderById.userId,
      firstName: orderById.firstName,
      lastName: orderById.lastName,
      foodId,
      star: ratingValue as number,
      review: reviewTextArea,
      isAnonymous: checkedAnonymousMode,
      date: convertDateNowToDayMonthYear(Date.now()),
    };
    try {
      await appService.addNewRatingToDB(newReviewForm);
    } catch (error) {
      console.log('Error when addNewRatingToDB', error);
    }
    changeOrderDetailIsRatedAPI();
    setOpenModal(false);
  };

  return (
    <>
      {isLoading ? (
        renderReviewFormSkeletonLoading()
      ) : (
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
              src={productById?.thumbnail}
              alt={productById?.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="review_form-line"></div>
            <h3 className="review_form-heading">{productById?.name}</h3>
            <p className="review_form-description">
              {productById?.description}
            </p>
            <div className="review_form-rating">
              <div className="rating-title">Your rating: </div>
              <ControlledRating
                starValue={ratingValue}
                setStarValue={setRatingValue}
              />
            </div>
            <CustomTextField
              required
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
              value={reviewTextArea}
              onChange={handleChangeReviewTextArea}
            />
            <div className="review_form-anonymous_mode">
              <div className="mode-title">Anonymous mode: </div>
              <Switch
                checked={checkedAnonymousMode}
                onChange={handleChangeAnonymousModeChecked}
              />
            </div>
            <div className="mt-4">
              <ConfirmButton
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleClickSubmitReviewForm}
              >
                Submit
              </ConfirmButton>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};
