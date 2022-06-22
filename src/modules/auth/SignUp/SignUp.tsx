import { Formik as FormValidation, Form } from 'formik';
import { AlertColor, CircularProgress } from '@mui/material';
import { AuthForm, ImageSide } from 'components/AuthForm/AuthForm';
import { useState } from 'react';
import authModel from 'common/types/auth.model';
import { routerPath } from 'common/config/router/router.path';
import { Link } from 'react-router-dom';
import { ColorSchema } from 'common/types/color.model';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import './SignUp.style.scss';
import { CustomTextField } from 'components/MuiStyling/CustomTextField.style';
import { AuthButton } from 'components/MuiStyling/AuthButton.style';
import { SubmitButtonStyle } from 'components/MuiStyling/MuiStyling.style';

interface SignUpFormInitValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reTypePassword?: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [responseFromAPI, setResponseFromAPI] = useState('');
  const [snackbarType, setSnackbarType] = useState<AlertColor>();

  const signUpSubmit = async (signUpValues: SignUpFormInitValue) => {
    const signUpObj = { ...signUpValues };
    delete signUpObj?.reTypePassword;

    try {
      setLoading(true);
      // const response = await clientService.userSignUp(signUpObj);
      setSnackbarType('success');
      // setResponseFromAPI(response);
      setShowSnackbar(true);
    } catch (error: any) {
      console.log('Error when registering account', error);
      setSnackbarType('error');
      setResponseFromAPI(error?.data?.message);
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      imageSide={ImageSide.LEFT}
      imageLink="https://res.cloudinary.com/duitozhul/image/upload/v1655087977/the-pizza-heaven/authentication/sign-up.svg"
    >
      <div className="sign_up-container">
        <h1 className="sign_up-heading">Sign Up</h1>

        <FormValidation
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reTypePassword: '',
          }}
          validationSchema={authModel.clientSignUpSchema}
          onSubmit={async (values: SignUpFormInitValue, { setSubmitting }) => {
            await signUpSubmit(values);
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
            <Form onSubmit={handleSubmit} className="sign_up-form">
              <div className="sign_up-full_name">
                <CustomTextField
                  id="first-name"
                  className="first-name"
                  label="First name"
                  type="text"
                  variant="outlined"
                  value={values.firstName}
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Arron"
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <CustomTextField
                  id="last-name"
                  className="last-name"
                  label="Last name"
                  type="text"
                  variant="outlined"
                  value={values.lastName}
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ramsey"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </div>

              <CustomTextField
                id="outlined-email"
                label="Email"
                type="text"
                variant="outlined"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: '1.5rem' }}
                placeholder="arronramsey@gmail.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <CustomTextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={values.password}
                name="password"
                style={{ marginBottom: '1.5rem' }}
                placeholder="ArronRamsey1234!@"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <CustomTextField
                id="retype-password"
                label="Retype password"
                type="password"
                variant="outlined"
                value={values.reTypePassword}
                name="reTypePassword"
                style={{ marginBottom: '2rem' }}
                placeholder="ArronRamsey1234!@"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.reTypePassword && Boolean(errors.reTypePassword)}
                helperText={touched.reTypePassword && errors.reTypePassword}
              />

              <AuthButton
                variant="contained"
                type="submit"
                disabled={loading}
                style={SubmitButtonStyle}
              >
                {loading === false ? (
                  'Sign up'
                ) : (
                  <CircularProgress sx={{ color: '#fff', padding: '6px' }} />
                )}
              </AuthButton>

              <div className="separator"></div>
              <div className="text-center mb-4 text-sm">
                <span className="opacity-80 text-[0.925rem]">
                  You have had an account?
                </span>{' '}
                {'   '}
                <Link
                  to={routerPath.auth.LOGIN}
                  className="text-redirect"
                  color={ColorSchema.LightGreen}
                >
                  Sign in
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
