import { Check } from '@mui/icons-material';
import { Container, Grid, Typography } from '@mui/material';
import { routerPath } from 'common/config/router/router.path';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import categoryModel, { ICategory } from 'common/types/category.model';
import { GoBack } from 'components/GoBack/GoBack';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCategoryById } from 'redux/features/categorySlice';
import { RootState } from 'redux/store';
import { Form, Formik as FormValidation } from 'formik';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { ConfirmButton } from 'components/MuiStyling/ConfimButton.style';

export const CategoryDetail = () => {
  const { categoryDetail, isLoading } = useAppSelector(
    (state: RootState) => state.category,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmitUpdateCategoryList = async (values: ICategory) => {
    await dispatch(
      updateCategoryById({
        updatedCategory: values,
        categoryId: parseInt(id as string),
      }),
    );
    !isLoading && navigate(routerPath.admin.CATEGORY_LIST);
  };

  return (
    <>
      <GoBack pageLink={routerPath.admin.CATEGORY_LIST} />
      {!isLoading && (
        <Container maxWidth="lg" className="py-12">
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: '.1rem',
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '2rem',
            }}
          >
            Edit Category
          </Typography>
          <FormValidation
            initialValues={{
              id: categoryDetail.id,
              categoryName: categoryDetail.categoryName,
            }}
            validationSchema={categoryModel.categorySchema}
            onSubmit={(values: ICategory, { setSubmitting }) => {
              console.log('values', values);
              handleSubmitUpdateCategoryList(values);
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
                  <Grid item xs={10} sm={6} md={4}>
                    <CustomTextField
                      fullWidth
                      id="category-id"
                      className="category-id"
                      name="categoryId"
                      label="ID"
                      type="text"
                      variant="outlined"
                      value={values.id}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={10} sm={6} md={4}>
                    <CustomTextField
                      fullWidth
                      id="category-name"
                      className="category-name"
                      name="categoryName"
                      label="Category Name"
                      type="text"
                      variant="outlined"
                      value={values.categoryName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Pizza"
                      error={
                        touched.categoryName && Boolean(errors.categoryName)
                      }
                      helperText={touched.categoryName && errors.categoryName}
                    />
                  </Grid>
                  <Grid item xs={10} sm={6} md={4}>
                    <ConfirmButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      startIcon={<Check />}
                    >
                      Confirm edit category
                    </ConfirmButton>
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
