import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { AlertColor, Button, Grid, Skeleton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { convertNumberToVND } from 'common/helper/convertMoney';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { IFood } from 'common/types/food.model';
import { ConfirmButton } from 'components/MuiStyling/ConfirmButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import { addToCart } from 'redux/features/app/cartSlice';
import { RootState } from 'redux/store';
import appService from 'services/appService';
import { ReadOnlyRating } from 'components/Rating/ReadOnlyRating/ReadOnlyRating';
import { routerPath } from 'common/config/router/router.path';
import './FoodDetail.style.scss';

interface FoodDetailProps {
  foodId: number;
  randomNumberOfStock: number;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  averageStar: number;
}

export const FoodDetail: FC<FoodDetailProps> = ({
  foodId,
  randomNumberOfStock,
  setOpenModal,
  averageStar,
}) => {
  const dispatch = useAppDispatch();
  const { snackbarRes } = useAppSelector((state: RootState) => state.cart);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>();
  const [isLoading, setIsLoading] = useState(false);
  const [productById, setProductById] = useState<IFood>({
    categoryId: 0,
    id: 0,
    name: '',
    thumbnail: '',
    description: '',
    price: 0,
    isStock: false,
  });
  const [productQuantity, setProductQuantity] = useState(1);

  const location = useLocation();
  const isProductDetailPage: boolean = location.pathname.includes(
    routerPath.app.FOOD,
  );

  useEffect(() => {
    const fetchProductByIdAPI = async () => {
      try {
        setIsLoading(true);
        const response = await appService.getFoodDetailById(foodId as number);
        setProductById(response);
      } catch (error) {
        console.log('Error when getFoodDetailById', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (foodId !== undefined) fetchProductByIdAPI();
  }, [foodId]);

  const handleChangeProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(parseInt(e.target.value));
  };

  const handleClickAddToCartBtn = (product: IFood) => {
    dispatch(addToCart({ ...product, quantity: productQuantity }));
    setSnackbarType('success');
    setShowSnackbar(true);
    if (setOpenModal) setOpenModal(false);
  };

  const renderFoodDetailSkeletonLoading = () => {
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
          <h2 className="food_detail-price">
            <Skeleton
              animation="wave"
              variant="text"
              width="11rem"
              height="3.5rem"
            />
          </h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="food_detail-line"></div>
          <h3 className="food_detail-title w-full">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height="2rem"
            />
          </h3>
          <p className="food_detail-description w-full">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height="1.5rem"
            />
          </p>
          <div className="food_detail-rating w-full">
            <Skeleton
              animation="wave"
              variant="text"
              width="12.5rem"
              height="2.3rem"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="6rem"
              height="2.3rem"
            />
          </div>
          <div className="food_detail-quantity w-full">
            <div>
              <Skeleton
                animation="wave"
                variant="text"
                width="12.5rem"
                height="3rem"
              />
            </div>
            <Skeleton
              animation="wave"
              variant="text"
              width="6rem"
              height="3rem"
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

          <div className="mt-8 w-full">
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

  return (
    <>
      {isLoading ? (
        renderFoodDetailSkeletonLoading()
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
              className="food_detail-thumbnail"
              src={productById.thumbnail}
              alt={productById.name}
            />
            <h2 className="food_detail-price">
              {convertNumberToVND(productById.price)}
            </h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="food_detail-line"></div>
            <h3 className="food_detail-title">{productById.name}</h3>
            <p className="food_detail-description">{productById.description}</p>
            {!isProductDetailPage && (
              <Link to={`${routerPath.app.FOOD}/${foodId}`}>
                <div className="food_detail-rating">
                  <ReadOnlyRating
                    starQuantity={averageStar as number}
                    showStarQuantity={true}
                  />
                  <Button variant="text">See detail</Button>
                </div>
              </Link>
            )}
            <div className="food_detail-quantity">
              <div>
                Product Quantity: <span>{randomNumberOfStock}</span>
              </div>
              <CustomTextField
                id="product-quantity"
                label="Quantity"
                type="number"
                InputProps={{
                  inputProps: { min: 1, max: randomNumberOfStock },
                }}
                value={productQuantity}
                onChange={handleChangeProductQuantity}
              />
            </div>
            <CustomTextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              id="note"
              name="note"
              label="Note"
              type="text"
              placeholder="Enter your note here"
              variant="outlined"
            />
            <div className="mt-8">
              <ConfirmButton
                fullWidth
                type="submit"
                variant="contained"
                onClick={() => handleClickAddToCartBtn(productById)}
              >
                Add to cart
              </ConfirmButton>
            </div>
          </Grid>
        </Grid>
      )}

      <CustomSnackbar
        snackbarColor={snackbarType}
        res={snackbarRes}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </>
  );
};
