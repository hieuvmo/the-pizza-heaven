import { useEffect, useState } from 'react';
import { ArrowForward } from '@mui/icons-material';
import { Container } from '@mui/system';
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

import { convertNumberToVND } from 'common/helper/convertMoney';
import { useAppSelector } from 'common/hooks/ReduxHook';
import { ColorSchema } from 'common/types/color.model';
import { IFood } from 'common/types/food.model';
import { ClipLoading } from 'components/Loading/ClipLoader';
import { CustomModal } from 'components/Modal/CustomModal';
import { RootState } from 'redux/store';
import appService from 'services/appService';
import { FoodDetail } from '../FoodDetail/FoodDetail';
import { IRating } from 'common/types/rating.model';
import { handleCalculateAverageRating } from 'common/helper/averageRating';
import './ProductSearch.style.scss';

export const ProductSearch = () => {
  const { searchValue } = useAppSelector((state: RootState) => state.search);

  const [isLoading, setIsLoading] = useState(false);
  const [searchedProduct, setSearchedProduct] = useState<IFood[]>([]);
  const [foodId, setFoodId] = useState<number>();
  const [openModal, setOpenModal] = useState(false);
  const [randomNumberOfStock, setRandomNumberOfStock] = useState<number>(0);
  const [latestRatingByFoodId, setLatestRatingByFoodId] = useState<IRating[]>(
    [],
  );

  useEffect(() => {
    const fetchLatestRatingByFoodIdAPI = async () => {
      try {
        const response = await appService.getLatestReviewByFoodId(
          foodId as number,
        );
        setLatestRatingByFoodId(response);
      } catch (error) {
        console.log('Error when getLatestReviewByFoodId', error);
      }
    };

    fetchLatestRatingByFoodIdAPI();
  }, [foodId]);

  useEffect(() => {
    const searchProductAPI = async () => {
      try {
        setIsLoading(true);
        const response = await appService.searchProductFullText(searchValue);
        setSearchedProduct(response);
      } catch (error) {
        console.log('Error when fetch searchProductFullText ', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchProductAPI();
  }, [searchValue]);

  const handleClickBuyNowBtn = (foodId: number) => {
    setFoodId(foodId);
    setRandomNumberOfStock(Math.floor(Math.random() * 1000));
    setOpenModal(true);
  };

  const renderProductSearchResult = () => {
    return searchedProduct.length === 0 ? (
      <div className="empty_search">
        <img
          src="https://res.cloudinary.com/duitozhul/image/upload/v1656383542/the-pizza-heaven/other/empty-search.svg"
          alt=""
        />
        <p className="empty_search-text">This product does not exist</p>
      </div>
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
        {searchedProduct.map((item, index) => (
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
                  <div className="h-48">
                    <Skeleton
                      variant="rectangular"
                      width={'100%'}
                      height={'9rem'}
                    />
                  </div>
                ) : (
                  <div className="food_item-container">
                    {!item.isStock && (
                      <div className="food_item-sold_out">
                        <span className="sold_out-text ">Bán hết</span>
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
                    Price:{' '}
                    <strong className="food_item-price">
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
    );
  };

  return (
    <Container maxWidth="lg">
      <div className="product_search-container">
        <div className="product_search-heading">
          <h1 className="pr-4">Search result: </h1>
          <span>{searchValue}</span>
        </div>
        {isLoading ? (
          <div className="py-44">
            <ClipLoading loading={isLoading} />
          </div>
        ) : (
          renderProductSearchResult()
        )}
      </div>

      <CustomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        newStyled={{
          overlay: {},
          content: { maxHeight: '80vh', maxWidth: '90%' },
        }}
      >
        <FoodDetail
          foodId={foodId as number}
          randomNumberOfStock={randomNumberOfStock}
          setOpenModal={setOpenModal}
          averageStar={handleCalculateAverageRating(latestRatingByFoodId)}
        />
      </CustomModal>
    </Container>
  );
};
