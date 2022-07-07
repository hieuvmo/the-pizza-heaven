import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { AlertColor, Grid } from '@mui/material';

import { convertNumberToVND } from 'common/helper/convertMoney';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { IFood } from 'common/types/food.model';
import { ConfirmButton } from 'components/MuiStyling/ConfirmButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import { addToCart } from 'redux/features/app/cartSlice';
import { RootState } from 'redux/store';
import appService from 'services/appService';
import './FoodDetail.style.scss';

interface FoodDetailProps {
  foodId: number;
  randomNumberOfStock: number;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const FoodDetail: FC<FoodDetailProps> = ({
  foodId,
  randomNumberOfStock,
  setOpenModal,
}) => {
  const dispatch = useAppDispatch();
  const { snackbarRes } = useAppSelector((state: RootState) => state.cart);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>();
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

  useEffect(() => {
    const fetchProductByIdAPI = async () => {
      try {
        const response = await appService.getFoodDetailById(foodId as number);
        setProductById(response);
      } catch (error) {
        console.log('Error when getFoodDetailById', error);
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
    setOpenModal(false);
  };

  return (
    <>
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

      <CustomSnackbar
        snackbarColor={snackbarType}
        res={snackbarRes}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </>
  );
};
