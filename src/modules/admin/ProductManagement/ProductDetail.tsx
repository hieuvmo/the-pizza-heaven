import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Form, Formik as FormValidation } from 'formik';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useParams } from 'react-router-dom';

import { routerPath } from 'common/config/router/router.path';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import foodModel, { IFood } from 'common/types/food.model';
import { GoBack } from 'components/GoBack/GoBack';
import { RootState } from 'redux/store';
import appService from 'services/appService';
import { ICategory } from 'common/types/category.model';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { ConfirmButton } from 'components/MuiStyling/ConfirmButton.style';
import { PRODUCT_SELECT_IS_STOCK } from 'common/constants';
import adminService from 'services/adminService';
import {
  changeCategoryIdSelect,
  changeFoodImageUrl,
  changeIsStockSelect,
  updateFoodById,
} from 'redux/features/admin/foodSlice';
import { ColorSchema } from 'common/types/color.model';
import { SyncLoading } from 'components/Loading/SyncLoader';

export const ProductDetail = () => {
  const { foodDetail, isLoading } = useAppSelector(
    (state: RootState) => state.adminFood,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryListAPI, setCategoryListAPI] = useState<ICategory[]>([]);
  const [imageSelected, setImageSelected] = useState<File>();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategoryAPI = async () => {
      try {
        const response = await appService.getCategoryList();
        setCategoryListAPI(response);
      } catch (error) {
        console.log('Error when getCategoryList', error);
      }
    };
    fetchCategoryAPI();
  }, []);

  const handleSubmitUpdateFoodList = async (values: IFood) => {
    const newFoodDetail: IFood = {
      id: values.id,
      categoryId: foodDetail.categoryId,
      thumbnail: foodDetail.thumbnail.replace('http', 'https'),
      name: values.name,
      price: values.price,
      description: values.description,
      isStock: foodDetail.isStock,
    };
    await dispatch(
      updateFoodById({
        updatedFood: newFoodDetail,
        foodID: parseInt(id as string),
      }),
    );
    !isLoading && navigate(routerPath.admin.PRODUCT_LIST);
  };

  const handleGetImageInfo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setImageSelected(e.currentTarget.files[0]);
  };

  const handleUploadImageToCloudinary = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', imageSelected as File);
    formData.append('upload_preset', 'the-pizza-heaven');

    try {
      setIsImageLoading(true);
      const response = await adminService.uploadImageToCloudinary(formData);
      dispatch(changeFoodImageUrl(response));
    } catch (error) {
      console.log('Error when uploading image to Cloudinary', error);
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleChangeSelectCategory = (e: SelectChangeEvent<number>) => {
    dispatch(changeCategoryIdSelect(e.target.value as number));
  };

  const handleChangeSelectIsStock = (e: SelectChangeEvent) => {
    if (e.target.value === 'true') dispatch(changeIsStockSelect(true));
    else dispatch(changeIsStockSelect(false));
  };

  return (
    <>
      <GoBack pageLink={routerPath.admin.PRODUCT_LIST} />

      <Container maxWidth="lg" className="py-12">
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: '.1rem',
            textAlign: 'center',
            marginBottom: '3rem',
            fontSize: '2rem',
          }}
        >
          Edit Product
        </Typography>
        {isLoading ? (
          <div className="py-40">
            <SyncLoading loading={isLoading} />
          </div>
        ) : (
          <FormValidation
            initialValues={{
              id: foodDetail.id,
              categoryId: foodDetail.categoryId,
              name: foodDetail.name,
              thumbnail: foodDetail.thumbnail,
              description: foodDetail.description,
              price: foodDetail.price,
              isStock: foodDetail.isStock,
            }}
            validationSchema={foodModel.foodSchema}
            onSubmit={(values: IFood, { setSubmitting }) => {
              handleSubmitUpdateFoodList(values);
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
                      <img
                        className="m-auto py-4 w-2/5 sm:w-3/5"
                        src={foodDetail.thumbnail}
                        alt=""
                      />
                    </Grid>
                    <CustomTextField
                      sx={{ width: '80%', marginBottom: '1rem' }}
                      name="upload-image"
                      type="file"
                      onChange={handleGetImageInfo}
                    />
                    <Button
                      sx={{ width: '80%', marginBottom: '2rem' }}
                      color="inherit"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      type="submit"
                      onClick={handleUploadImageToCloudinary}
                      disabled={isImageLoading || imageSelected === undefined}
                    >
                      {isImageLoading ? (
                        <CircularProgress
                          sx={{ color: ColorSchema.White, padding: '0.375rem' }}
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
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category Name
                        </InputLabel>
                        <Select
                          required
                          id="category-id"
                          name="categoryId"
                          value={foodDetail.categoryId}
                          label="Category Name"
                          onChange={handleChangeSelectCategory}
                        >
                          {categoryListAPI.map((item) => {
                            return (
                              <MenuItem key={item.id} value={item.id}>
                                {item.categoryName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
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

                    <Grid item xs={10} sm={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Is Stock
                        </InputLabel>
                        <Select
                          required
                          id="is-stock"
                          name="isStock"
                          value={String(foodDetail.isStock)}
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

                    <Grid item xs={10} sm={12}>
                      <ConfirmButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        startIcon={<CheckIcon />}
                      >
                        Confirm edit food
                      </ConfirmButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </FormValidation>
        )}
      </Container>
    </>
  );
};
