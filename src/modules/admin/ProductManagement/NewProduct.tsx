import { Form, Formik as FormValidation } from 'formik';
import { routerPath } from 'common/config/router/router.path';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import foodModel, { IFood, IFoodWithoutId } from 'common/types/food.model';
import { ConfirmButton } from 'components/MuiStyling/ConfimButton.style';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNewFoodToDB } from 'redux/features/admin/foodSlice';
import { RootState } from 'redux/store';
import { GoBack } from 'components/GoBack/GoBack';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { Check, CloudUpload } from '@mui/icons-material';
import axios from 'axios';
import { ICategory } from 'common/types/category.model';
import appService from 'services/appService';
import { PRODUCT_SELECT_IS_STOCK } from 'common/constants';

export const NewProduct = () => {
  const { foodList, isLoading } = useAppSelector(
    (state: RootState) => state.food,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categoryListAPI, setCategoryListAPI] = useState<ICategory[]>([]);
  const [imageSelected, setImageSelected] = useState<File>();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [newCategoryId, setNewCategoryId] = useState<number>();
  const [newIsStock, setNewIsStock] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategoryAPI = async () => {
      try {
        const response = await appService.getCategoryList();
        setCategoryListAPI(response);
      } catch (error) {
        console.log('Error when get category API', error);
      }
    };
    fetchCategoryAPI();
  }, []);

  const lastFoodId = foodList[foodList.length - 1].id;
  const handleSubmitNewFoodForm = async (values: IFoodWithoutId) => {
    const newFoodObj: IFood = {
      id: lastFoodId + 1,
      categoryId: newCategoryId as number,
      thumbnail: imageUrl.replace('http', 'https'),
      name: values.name,
      price: values.price,
      description: values.description,
      isStock: newIsStock,
    };
    await dispatch(addNewFoodToDB(newFoodObj));
    !isLoading && navigate(routerPath.admin.FOOD_LIST);
  };

  const handleGetImageInfo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setImageSelected(e.currentTarget.files[0]);
  };

  const handleUploadImageToCloudinary = async (
    e: React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', imageSelected as File);
    formData.append('upload_preset', 'the-pizza-heaven');

    try {
      setIsImageLoading(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/duitozhul/image/upload',
        formData,
      );
      setImageUrl(response?.data?.url);
    } catch (error) {
      console.log('Error when uploading image to cloudinary', error);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleChangeSelectCategory = (e: SelectChangeEvent<number>) => {
    setNewCategoryId(e.target.value as number);
  };

  const handleChangeSelectIsStock = (e: SelectChangeEvent) => {
    if (e.target.value === 'true') setNewIsStock(true);
    else setNewIsStock(false);
  };

  return (
    <>
      <GoBack pageLink={routerPath.admin.FOOD_LIST} />
      {!isLoading && (
        <Container maxWidth="lg" className="py-12">
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: '.1rem',
              textAlign: 'center',
              marginBottom: '1rem',
              fontSize: '2rem',
            }}
          >
            Add New Product
          </Typography>
          <FormValidation
            initialValues={{
              categoryId: 0,
              name: '',
              thumbnail: '',
              description: '',
              price: 0,
              isStock: false,
            }}
            validationSchema={foodModel.foodSchema}
            onSubmit={(values: IFoodWithoutId, { setSubmitting }) => {
              handleSubmitNewFoodForm(values);
              setSubmitting(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              errors,
              values,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid container justifyContent="center" xs={12} sm={6} md={4}>
                    <Typography
                      sx={{
                        fontWeight: 100,
                        fontSize: '1rem',
                        justifyContent: 'center',
                      }}
                    >
                      Thumbnail
                    </Typography>
                    <Grid item xs={12}>
                      {imageUrl === '' ? (
                        <img
                          className="m-auto py-4 w-2/5 sm:w-3/5"
                          src="https://res.cloudinary.com/duitozhul/image/upload/v1656492494/the-pizza-heaven/other/upload-img.svg"
                          alt=""
                        />
                      ) : (
                        <img
                          className="m-auto py-4 w-2/5 sm:w-3/5"
                          src={imageUrl}
                          alt=""
                        />
                      )}
                    </Grid>
                    <CustomTextField
                      required
                      sx={{ width: '80%', marginBottom: '1rem' }}
                      name="thumbnail"
                      type="file"
                      onChange={handleGetImageInfo}
                    />
                    <Button
                      sx={{ width: '80%', marginBottom: '2rem' }}
                      color="inherit"
                      variant="contained"
                      startIcon={<CloudUpload />}
                      type="submit"
                      onClick={handleUploadImageToCloudinary}
                      disabled={isImageLoading || imageSelected === undefined}
                    >
                      {isImageLoading ? (
                        <CircularProgress
                          sx={{ color: '#fff', padding: '6px' }}
                        />
                      ) : (
                        'Upload image'
                      )}
                    </Button>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    xs={12}
                    sm={6}
                    md={8}
                  >
                    <Grid item xs={10} sm={12} md={6}>
                      <CustomTextField
                        fullWidth
                        id="id"
                        className="id"
                        name="foodID"
                        label="ID"
                        type="text"
                        variant="outlined"
                        value={lastFoodId + 1}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={10} sm={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category ID
                        </InputLabel>
                        <Select
                          required
                          id="category-id"
                          name="categoryId"
                          value={newCategoryId}
                          label="Category ID"
                          onChange={handleChangeSelectCategory}
                        >
                          {categoryListAPI.map((item) => {
                            return (
                              <MenuItem
                                key={item.id}
                                value={item.id}
                              >{`${item.id}-${item.categoryName}`}</MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} sm={12} md={6}>
                      <CustomTextField
                        fullWidth
                        id="name"
                        className="name"
                        name="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Pizza Hải Sản Đào"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>

                    <Grid item xs={10} sm={12} md={6}>
                      <CustomTextField
                        fullWidth
                        id="price"
                        className="price"
                        name="price"
                        label="Price"
                        type="text"
                        variant="outlined"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="169000"
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                      />
                    </Grid>

                    <Grid item xs={10} sm={12}>
                      <CustomTextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={5}
                        id="description"
                        className="description"
                        name="description"
                        label="Description"
                        type="text"
                        variant="outlined"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tôm, Giăm bông, Đào hoà quyện bùng nổ cùng sốt Thousand Island"
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={touched.description && errors.description}
                      />
                    </Grid>

                    <Grid item xs={10} sm={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Is Stock
                        </InputLabel>
                        <Select
                          required
                          id="is-stock"
                          name="isStock"
                          value={String(newIsStock)}
                          label="Is Stock"
                          onChange={handleChangeSelectIsStock}
                        >
                          {PRODUCT_SELECT_IS_STOCK.map((item, index) => (
                            <MenuItem key={index} value={String(item.value)}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={10} md={6}>
                      <ConfirmButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        startIcon={<Check />}
                      >
                        Confirm edit food
                      </ConfirmButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </FormValidation>
        </Container>
      )}
    </>
  );
};
