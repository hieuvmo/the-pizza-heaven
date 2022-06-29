import {
  Stepper,
  StepLabel,
  StepContent,
  Container,
  AlertColor,
} from '@mui/material';
import { Formik as FormValidation, Form } from 'formik';
import { ColorSchema } from 'common/types/color.model';
import { CustomStep } from 'components/MuiStyling/CustomStep.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import React, { useState } from 'react';
import './Account.style.scss';
import userModel, { IUser } from 'common/types/user.model';
import { ConfirmButton } from 'components/MuiStyling/ConfimButton.style';
import { Check } from '@mui/icons-material';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from 'common/helper/storage';
import appService from 'services/appService';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';

export const Account = () => {
  const [snackbarType, setSnackbarType] = useState<AlertColor>();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [response, setResponse] = useState('');
  const userInfo: IUser = getLocalStorageItem('user-info');

  const submitAccountForm = async (values: IUser) => {
    const accountObj = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
    };
    try {
      const response = await appService.updateUserById(
        accountObj,
        userInfo.id as number,
      );
      setLocalStorageItem('user-info', response);
      setResponse('You have changed user info successfully');
      setSnackbarType('success');
      setShowSnackbar(true);
    } catch (error: any) {
      console.log('Error when updateUserById', error);
      setResponse(error?.response?.data);
      setSnackbarType('error');
      setShowSnackbar(true);
    }
  };

  return (
    <Container className="px-4 py-12">
      <p className="text-guild-line">profile</p>
      <FormValidation
        initialValues={{
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phone: userInfo.phone,
          address: userInfo.address,
        }}
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
              <p className="text-support">Info</p>
              <Stepper orientation="vertical">
                <CustomStep active={true}>
                  <StepLabel color={ColorSchema.LightGreen}>
                    <p className="font-semibold">Your email</p>
                  </StepLabel>
                  <StepContent>
                    <CustomTextField
                      fullWidth
                      id="email"
                      className="email"
                      name="email"
                      type="text"
                      variant="outlined"
                      value={values.email}
                      disabled
                    />
                  </StepContent>
                </CustomStep>

                <CustomStep active={true}>
                  <StepLabel color={ColorSchema.LightGreen}>
                    <p className="font-semibold">Enter your first name</p>
                  </StepLabel>
                  <StepContent>
                    <CustomTextField
                      fullWidth
                      id="first-name"
                      className="first-name"
                      name="firstName"
                      type="text"
                      variant="outlined"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Arron"
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </StepContent>
                </CustomStep>

                <CustomStep active={true}>
                  <StepLabel color={ColorSchema.LightGreen}>
                    <p className="font-semibold">Enter your last name</p>
                  </StepLabel>
                  <StepContent>
                    <CustomTextField
                      fullWidth
                      id="last-name"
                      className="last-name"
                      name="lastName"
                      type="text"
                      variant="outlined"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ramsey"
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </StepContent>
                </CustomStep>

                <CustomStep active={true}>
                  <StepLabel color={ColorSchema.LightGreen}>
                    <p className="font-semibold">Enter your phone number</p>
                  </StepLabel>
                  <StepContent>
                    <CustomTextField
                      fullWidth
                      id="phone"
                      className="phone"
                      name="phone"
                      type="text"
                      variant="outlined"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10 to 20 digit"
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </StepContent>
                </CustomStep>

                <CustomStep active={true}>
                  <StepLabel color={ColorSchema.LightGreen}>
                    <p className="font-semibold">Enter your address</p>
                  </StepLabel>
                  <StepContent>
                    <CustomTextField
                      fullWidth
                      id="address"
                      className="address"
                      name="address"
                      type="text"
                      variant="outlined"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Số 18 đường Tôn Thất Thuyết, Cầu Giấy, Hà Nội"
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </StepContent>
                </CustomStep>
              </Stepper>
            </div>

            <ConfirmButton
              fullWidth
              type="submit"
              variant="contained"
              startIcon={<Check />}
            >
              Submit
            </ConfirmButton>
          </Form>
        )}
      </FormValidation>

      <CustomSnackbar
        snackbarColor={snackbarType}
        res={response}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </Container>
  );
};
