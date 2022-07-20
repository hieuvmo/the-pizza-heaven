import { Form, Formik as FormValidation } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

import { routerPath } from 'common/config/router/router.path';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import categoryModel, { ICategory } from 'common/types/category.model';
import { GoBack } from 'components/GoBack/GoBack';
import { updateCategoryById } from 'redux/features/admin/categorySlice';
import { RootState } from 'redux/store';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { ConfirmButton } from 'components/MuiStyling/ConfirmButton.style';
import { SyncLoading } from 'components/Loading/SyncLoader';

export const CategoryDetail = () => {
  const { categoryDetail, isLoading } = useAppSelector(
    (state: RootState) => state.adminCategory,
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

        {isLoading ? (
          <div className="py-5">
            <SyncLoading loading={isLoading} />
          </div>
        ) : (
          <FormValidation
            initialValues={{
              id: categoryDetail.id,
              categoryName: categoryDetail.categoryName,
            }}
            validationSchema={categoryModel.categorySchema}
            onSubmit={(values: ICategory, { setSubmitting }) => {
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
                  <Grid item xs={12} sm={6} md={4}>
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
                  <Grid item xs={12} sm={6} md={4}>
                    <ConfirmButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      startIcon={<CheckIcon />}
                    >
                      Confirm edit category
                    </ConfirmButton>
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
