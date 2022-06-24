import { ArrowForward } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { convertNumberToVND } from 'common/helper/convertToVND';
import { ColorSchema } from 'common/types/color.model';
import { IFood } from 'common/types/food.model';
import { CustomModal } from 'components/Modal/CustomModal';
import { ConfirmButton } from 'components/MuiStyling/ConfimButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import React, { useEffect, useState } from 'react';
import appService from 'services/appService';

interface FoodItemProps {
  categoryID: number;
}

export const FoodItem: React.FC<FoodItemProps> = ({ categoryID }) => {
  const [productByCategoryId, setProductByCategoryId] = useState<IFood[]>([]);
  const [foodId, setFoodId] = useState<number>();
  const [productById, setProductById] = useState<IFood>();
  const [openModal, setOpenModal] = useState(false);
  const [randomNumberOfStock, setRandomNumberOfStock] = useState<number>(0);

  useEffect(() => {
    const fetchProductByCategoryIdAPI = async () => {
      try {
        const response = await appService.getFoodDetailByCategoryId(categoryID);
        setProductByCategoryId(response);
      } catch (error) {
        console.log('Error when fetch product by category id', error);
      }
    };
    const fetchProductByIdAPI = async () => {
      try {
        const response = await appService.getFoodDetailById(foodId as number);
        setProductById(response);
      } catch (error) {
        console.log('Error when fetch product by id', error);
      }
    };

    fetchProductByCategoryIdAPI();
    if (foodId !== undefined) fetchProductByIdAPI();
  }, [categoryID, foodId]);

  const handleClickBuyNowBtn = (foodId: number) => {
    setFoodId(foodId);
    setRandomNumberOfStock(Math.floor(Math.random() * 1000));
    setOpenModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingBlock: '2rem' }}>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        spacing={2}
      >
        {productByCategoryId.map((item, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={12 / 5}
            sx={{ padding: '0.5rem' }}
            key={index}
          >
            <Card>
              <CardActionArea
                sx={item.isStock ? { opacity: '1' } : { opacity: '0.25' }}
              >
                {!item.thumbnail ? (
                  <div className="h-48 ">
                    <Skeleton
                      variant="rectangular"
                      width={'100%'}
                      height={'9rem'}
                    />
                  </div>
                ) : (
                  <div className="h-48 flex relative">
                    {!item.isStock && (
                      <div className="absolute text-white top-1/4 left-1/4 w-1/2 h-1/2 bg-[rgba(0,0,0,0.75)] text-center rounded-[50%]">
                        <span className="h-full flex justify-center items-center">
                          Bán hết
                        </span>
                      </div>
                    )}
                    <CardMedia
                      sx={{ alignSelf: 'center' }}
                      className="px-6 py-4 object-fill"
                      component="img"
                      image={item.thumbnail}
                      alt="green iguana"
                    />
                  </div>
                )}
                <CardContent sx={{ paddingInline: '1.5rem' }}>
                  <Typography
                    gutterBottom
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      minHeight: '4.5rem',
                    }}
                    component="div"
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ marginRight: '1rem', fontSize: '0.875rem' }}
                  >
                    Giá:{' '}
                    <strong className="text-black font-bold text-base">
                      {convertNumberToVND(item.price)}
                    </strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ paddingBottom: '1rem' }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="button"
                  endIcon={<ArrowForward />}
                  color="inherit"
                  sx={{
                    ':hover': {
                      backgroundColor: ColorSchema.LightGreen,
                      color: ColorSchema.White,
                    },
                  }}
                  onClick={() => handleClickBuyNowBtn(item.id)}
                  disabled={!item.isStock}
                >
                  Buy now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CustomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        styling={{
          overlay: { marginTop: '3rem' },
          content: {
            marginBlock: 'auto',
            height: 'fit-content',
            paddingBottom: '2.5rem',
            borderRadius: '1rem',
          },
        }}
      >
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
              className="w-3/5"
              src={productById?.thumbnail}
              alt={productById?.name}
            />
            <h2 className="text-[#d30e15] text-3xl font-bold p-2">
              {convertNumberToVND(productById?.price as number)}
            </h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="w-6 h-[2px] bg-[#008c7a]"></div>
            <h3 className="text-2xl font-bold mt-1 mb-3 text-[#111111]">
              {productById?.name}
            </h3>
            <p className="text-[#444444]">{productById?.description}</p>
            <div className="flex justify-between items-center mb-4 mt-8">
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
      </CustomModal>
    </Container>
  );
};
