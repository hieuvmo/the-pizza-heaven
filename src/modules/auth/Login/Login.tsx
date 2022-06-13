import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import { routerPath } from 'common/config/router/router.path';
import authModel from 'common/types/auth.model';
import { ColorSchema } from 'common/types/color.model';
import { AuthForm, ImageSide } from 'components/AuthForm/AuthForm';
import { Formik as FormValidation, Form } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthButton, AuthTextField, SubmitButtonStyle } from '../Auth.style';
import './Login.style.scss';

interface LoginFormInitValue {
  email: string;
  password: string;
  storeUser: boolean;
}

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  function submitLogin(params: LoginFormInitValue) {}

  return (
    <AuthForm
      imageSide={ImageSide.LEFT}
      imageLink="https://res.cloudinary.com/duitozhul/image/upload/v1655088034/the-pizza-heaven/authentication/log-in.svg"
    >
      <div className="login-container">
        <h1 className="login-heading">Sign In</h1>
        <FormValidation
          initialValues={{ email: '', password: '', storeUser: true }}
          validationSchema={authModel.loginSchema}
          onSubmit={(values: LoginFormInitValue, { setSubmitting }) => {
            submitLogin(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, touched, errors, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="login-form">
              <AuthTextField
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
              <AuthTextField
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
                        color: '#008c7a',
                      }}
                    />
                  }
                />
                <Link to={routerPath.common.HOME} className="my-auto text-redirect">
                  Forgot password?
                </Link>
              </div>
              <AuthButton variant="contained" type="submit" disabled={loading} style={SubmitButtonStyle}>
                {loading === false ? 'Sign In' : <CircularProgress sx={{ color: '#fff', padding: '6px' }} />}
              </AuthButton>

              <div className="separator"></div>
              <div className="text-center mb-4 text-sm">
                <span className="opacity-80">Dont have an account?</span> {'   '}
                <Link to={routerPath.auth.USER_REGISTER} className="text-redirect" color={ColorSchema.LightGreen}>
                  Sign up
                </Link>
              </div>
            </Form>
          )}
        </FormValidation>
      </div>
    </AuthForm>
  );
};
