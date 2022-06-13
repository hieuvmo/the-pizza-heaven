import * as Yup from 'yup';

class AuthValidation {
  private validateRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  public clientSignUpSchema;
  public loginSchema;

  constructor() {
    this.clientSignUpSchema = Yup.object().shape({
      firstName: Yup.string().required('This field can not be empty'),
      lastName: Yup.string().required('This field can not be empty'),
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty')
        .matches(
          this.validateRegEx,
          'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
        ),
      reTypePassword: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty')
        .oneOf([Yup.ref('password')], "Password retype doesn't match "),
    });

    this.loginSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty'),
    });
  }
}

export default new AuthValidation();
