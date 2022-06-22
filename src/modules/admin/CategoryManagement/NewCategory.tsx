import { Form, Formik as FormValidation } from 'formik';
import { Container, Grid, Typography } from '@mui/material';
import { routerPath } from 'common/config/router/router.path';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import categoryModel, { ICategory, ICategoryWithoutId } from 'common/types/category.model';
import { GoBack } from 'components/GoBack/GoBack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNewCategoryToDB } from 'redux/features/categorySlice';
import { RootState } from 'redux/store';
import { Check } from '@mui/icons-material';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { ConfirmButton } from 'components/MuiStyling/ConfimButton.style';

export const NewCategory = () => {
  const { categoryList, isLoading } = useAppSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lastCategoryId = categoryList[categoryList.length - 1].id;
  const handleSubmitNewCategoryForm = async (values: ICategoryWithoutId) => {
    const newCategoryObj: ICategory = {
      id: lastCategoryId + 1,
      categoryName: values.categoryName,
    };
    await dispatch(addNewCategoryToDB(newCategoryObj));
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
              marginBottom: '1rem',
              fontSize: '2rem',
            }}
          >
            Add New Category
          </Typography>
          <FormValidation
            initialValues={{
              categoryName: '',
            }}
            validationSchema={categoryModel.categorySchema}
            onSubmit={(values: ICategoryWithoutId, { setSubmitting }) => {
              handleSubmitNewCategoryForm(values);
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleBlur, touched, errors, values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={10} sm={6} md={4}>
                    <CustomTextField
                      fullWidth
                      id="category-id"
                      className="category-id"
                      name="categoryID"
                      label="ID"
                      type="text"
                      variant="outlined"
                      value={lastCategoryId + 1}
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
                      error={touched.categoryName && Boolean(errors.categoryName)}
                      helperText={touched.categoryName && errors.categoryName}
                    />
                  </Grid>
                  <Grid item xs={10} sm={6} md={4}>
                    <ConfirmButton fullWidth type="submit" variant="contained" startIcon={<Check />}>
                      Confirm add new
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
