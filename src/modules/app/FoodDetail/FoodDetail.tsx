import { Grid } from '@mui/material';
import { convertNumberToVND } from 'common/helper/convertToVND';
import { IFood } from 'common/types/food.model';
import { ConfirmButton } from 'components/MuiStyling/ConfimButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import React, { useEffect, useState } from 'react';
import appService from 'services/appService';
import './FoodDetail.style.scss';

interface FoodDetailProps {
  foodId: number;
  randomNumberOfStock: number;
}

export const FoodDetail: React.FC<FoodDetailProps> = ({
  foodId,
  randomNumberOfStock,
}) => {
  const [productById, setProductById] = useState<IFood>();

  useEffect(() => {
    const fetchProductByIdAPI = async () => {
      try {
        const response = await appService.getFoodDetailById(foodId as number);
        setProductById(response);
      } catch (error) {
        console.log('Error when fetch product by id', error);
      }
    };

    if (foodId !== undefined) fetchProductByIdAPI();
  }, [foodId]);

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
          className="food_detail-thumbnail"
          src={productById?.thumbnail}
          alt={productById?.name}
        />
        <h2 className="food_detail-price">
          {convertNumberToVND(productById?.price as number)}
        </h2>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="food_detail-line"></div>
        <h3 className="food_detail-title">{productById?.name}</h3>
        <p className="food_detail-description">{productById?.description}</p>
        <div className="food_detail-quantity">
          <div>
            Product Number: <span>{randomNumberOfStock}</span>
          </div>
          <CustomTextField
            id="number-product"
            label="Number"
            type="number"
            InputProps={{
              inputProps: { min: 1, max: randomNumberOfStock },
            }}
            defaultValue={1}
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
          <ConfirmButton fullWidth type="submit" variant="contained">
            Add to cart
          </ConfirmButton>
        </div>
      </Grid>
    </Grid>
  );
};
