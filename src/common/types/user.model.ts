import * as Yup from 'yup';

export interface IProvince {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface IDistrict {
  district_id: string;
  district_name: string;
  district_type: string;
  province_id: string;
}

export interface IWard {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}

export interface IUser {
  id?: number;
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

class ValidateInterfaces {
  private validateNotNullRegEx = /^(?!\s*$).+/;
  private validateIsNumberRegEx =
    /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
  public userSchema;

  constructor() {
    this.userSchema = Yup.object().shape({
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
      phone: Yup.string()
        .min(10, 'Your phone number must have minimum 10 number')
        .max(20, 'Your phone number must have maximum 20 number')
        .required('This field can not be empty')
        .matches(this.validateIsNumberRegEx, 'This field must exist number'),
      address: Yup.string()
        .required('This field can not be empty')
        .matches(
          this.validateNotNullRegEx,
          'This field must exist text or number',
        ),
    });
  }
}

export default new ValidateInterfaces();
