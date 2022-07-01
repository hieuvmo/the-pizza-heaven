import { CircularProgress, Container, Grid } from '@mui/material';
import { routerPath } from 'common/config/router/router.path';
import { getLocalStorageItem } from 'common/helper/storage';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { IOrder, IOrderStatus } from 'common/types/order.model';
import userModel, { IUser } from 'common/types/user.model';
import { ConfirmButton } from 'components/MuiStyling/ConfimButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { Formik as FormValidation, Form } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAllCart } from 'redux/features/cartSlice';
import { addNewOrder } from 'redux/features/orderSlice';
import { RootState } from 'redux/store';
import appService from 'services/appService';

export const OrderInfo = () => {
  const [loading, setLoading] = useState(false);

  const userInfo: IUser = getLocalStorageItem('user-info');
  const existedToken: boolean =
    getLocalStorageItem('access-token') !== undefined;

  const { orderDetailValue } = useAppSelector(
    (state: RootState) => state.orderDetail,
  );
  const { totalPrice } = useAppSelector((state: RootState) => state.order);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const getUserId = () => {
    if (existedToken) return userInfo.id as number;
    return null;
  };

  const addNewOrderItem = () => {
    orderDetailValue.forEach((item) => {
      return appService.addNewOrderDetailToDB(item);
    });
  };

  const submitAccountForm = async (values: IUser) => {
    const newOrderInfo: IOrder = {
      id: orderDetailValue[0]?.orderId,
      userId: getUserId(),
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
      totalPrice,
      status: IOrderStatus.CONFIRM,
    };
    dispatch(addNewOrder(newOrderInfo));

    try {
      setLoading(true);
      await appService.addNewOrderToDB(newOrderInfo);
      addNewOrderItem();
      dispatch(deleteAllCart());
    } catch (error: any) {
      console.log('Error when registering account', error?.message);
    } finally {
      setLoading(false);
    }

    navigate(`/checkout/success/${newOrderInfo.id}`);
  };

  const getInitialValues = () => {
    if (existedToken) {
      return {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        address: userInfo.address,
      };
    }
    return {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    };
  };

  return (
    <Container className="px-4 py-12">
      <p className="text-guild-line">Order delivery</p>
      <FormValidation
        initialValues={getInitialValues()}
        validationSchema={userModel.userSchema}
        onSubmit={(values: IUser, { setSubmitting }) => {
          submitAccountForm(values);
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
          <Form onSubmit={handleSubmit} className="login-form px-8">
            <div className="mb-8">
              <p className="text-support">Delivery Information</p>
              <Grid
                container
                sx={{
                  display: 'flex',
                }}
                spacing={2}
              >
                <Grid item justifyContent="center" xs={12} md={6}>
                  <CustomTextField
                    fullWidth
                    id="first-name"
                    className="first-name"
                    name="firstName"
                    type="text"
                    variant="outlined"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Arron"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item justifyContent="center" xs={12} md={6}>
                  <CustomTextField
                    fullWidth
                    id="last-name"
                    className="last-name"
                    name="lastName"
                    type="text"
                    variant="outlined"
                    label="Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ramsey"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item justifyContent="center" xs={12} md={6}>
                  <CustomTextField
                    fullWidth
                    id="phone"
                    className="phone"
                    name="phone"
                    type="text"
                    variant="outlined"
                    label="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="10 to 20 digit"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item justifyContent="center" xs={12} md={6}>
                  <CustomTextField
                    fullWidth
                    id="address"
                    className="address"
                    name="address"
                    type="text"
                    variant="outlined"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Số 18 đường Tôn Thất Thuyết, Cầu Giấy, Hà Nội"
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
              </Grid>
            </div>

            <ConfirmButton
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading === false ? (
                'Order'
              ) : (
                <CircularProgress sx={{ color: '#fff', padding: '6px' }} />
              )}
            </ConfirmButton>
          </Form>
        )}
      </FormValidation>
    </Container>
  );
};
