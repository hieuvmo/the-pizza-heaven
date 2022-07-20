import * as Yup from 'yup';

export interface ISignUp {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  reTypePassword?: string;
  phone: string;
  address: string;
}
export interface ILogin {
  email: string;
  password: string;
  storeUser: boolean;
}

class AuthValidation {
  private validatePasswordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  private validateNotNullRegEx = /^(?!\s*$).+/;

  public clientSignUpSchema;
  public loginSchema;

  constructor() {
    this.clientSignUpSchema = Yup.object().shape({
      firstName: Yup.string()
        .required('This field can not be empty')
        .matches(
          this.validateNotNullRegEx,
          'This field must exist text or number',
        ),
      lastName: Yup.string()
        .required('This field can not be empty')
        .matches(
          this.validateNotNullRegEx,
          'This field must exist text or number',
        ),
      email: Yup.string()
        .email()
        .min(16, 'Your email has at least 16 characters')
        .max(40, 'Your email has maximum 30 characters')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(8, 'Password has at least 8 characters')
        .max(30, 'Password has maximum 30 characters')
        .required('This field can not be empty')
        .matches(
          this.validatePasswordRegEx,
          'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
        ),
      reTypePassword: Yup.string()
        .min(8, 'Password has at least 8 characters')
        .max(30, 'Password has maximum 30 characters')
        .required('This field can not be empty')
        .oneOf([Yup.ref('password')], "Password retype doesn't match "),
    });

    this.loginSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(16, 'Your email has at least 16 characters')
        .max(40, 'Your email has maximum 30 characters')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(8, 'Password has at least 8 characters')
        .max(30, 'Password has maximum 30 characters')
        .required('This field can not be empty'),
    });
  }
}

export default new AuthValidation();
