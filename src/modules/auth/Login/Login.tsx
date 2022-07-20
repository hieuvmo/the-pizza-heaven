import { FC, useState } from 'react';
import { Formik as FormValidation, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertColor,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';

import { routerPath } from 'common/config/router/router.path';
import { setLocalStorageItem } from 'common/helper/storage';
import authModel, { ILogin } from 'common/types/auth.model';
import { ColorSchema } from 'common/types/color.model';
import { AuthForm, ImageSide } from 'components/AuthForm/AuthForm';
import { AuthButton } from 'components/MuiStyling/AuthButton.style';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { SubmitButtonStyle } from 'components/MuiStyling/MuiStyling.style';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import authService from 'services/authService';
import './Login.style.scss';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [responseFromAPI, setResponseFromAPI] = useState('');
  const [snackbarType, setSnackbarType] = useState<AlertColor>();

  const submitLoginForm = async (params: ILogin) => {
    try {
      setLoading(true);
      const response = await authService.loginAccount(params);
      const accessToken = response.accessToken;
      const userInfo = response.user;
      setLocalStorageItem('access-token', accessToken);
      setLocalStorageItem('user-info', userInfo);
      navigate(routerPath.common.HOME);
    } catch (error: any) {
      console.log('Error when loginAccount', error?.response?.data);
      setSnackbarType('error');
      setResponseFromAPI(error?.response?.data);
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      imageSide={ImageSide.LEFT}
      imageLink="https://res.cloudinary.com/duitozhul/image/upload/v1655088034/the-pizza-heaven/authentication/log-in.svg"
    >
      <div className="login-container">
        <h1 className="login-heading">Log In</h1>
        <FormValidation
          initialValues={{ email: '', password: '', storeUser: true }}
          validationSchema={authModel.loginSchema}
          onSubmit={(values: ILogin, { setSubmitting }) => {
            submitLoginForm(values);
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
            <Form onSubmit={handleSubmit} className="login-form">
              <CustomTextField
                id="outlined-email"
                label="Username"
                type="text"
                variant="outlined"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: '2rem', marginTop: '1rem' }}
                placeholder="johndoe@hotmail.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomTextField
                id="standard-password"
                label="Password"
                type="password"
                variant="outlined"
                value={values.password}
                name="password"
                style={{ marginBottom: '1rem' }}
                placeholder="lovelyMuffin"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <div className="flex justify-between mt-2 mb-2">
                <FormControlLabel
                  label="Remember me"
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={handleChange}
                      id="standard-storeUser"
                      value={values.storeUser}
                      name="storeUser"
                      style={{
                        color: ColorSchema.LightGreen,
                      }}
                    />
                  }
                />
                <Link
                  to={routerPath.common.HOME}
                  className="my-auto text-redirect"
                >
                  Forgot password?
                </Link>
              </div>
              <AuthButton
                variant="contained"
                type="submit"
                disabled={loading}
                style={SubmitButtonStyle}
              >
                {loading === false ? (
                  'Sign In'
                ) : (
                  <CircularProgress
                    sx={{ color: ColorSchema.White, padding: '0.375rem' }}
                  />
                )}
              </AuthButton>

              <div className="separator"></div>
              <div className="text-center mb-4 text-sm">
                <span className="opacity-80">Dont have an account?</span>{' '}
                {'   '}
                <Link
                  to={routerPath.auth.USER_REGISTER}
                  className="text-redirect"
                  color={ColorSchema.LightGreen}
                >
                  Sign up
                </Link>
              </div>
            </Form>
          )}
        </FormValidation>
      </div>

      <CustomSnackbar
        snackbarColor={snackbarType}
        res={responseFromAPI}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </AuthForm>
  );
};
