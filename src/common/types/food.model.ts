import * as Yup from 'yup';

export interface IFood {
  id: number;
  categoryId: number;
  name: string;
  thumbnail: string;
  description: string;
  price: number;
  isStock: boolean;
}

export interface IFoodWithoutId {
  categoryId: number;
  name: string;
  thumbnail: string;
  description: string;
  price: number;
  isStock: boolean;
}

class ValidateInterfaces {
  private validateNotNullRegEx = /^(?!\s*$).+/;
  private validateIsNumberRegEx =
    /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
  public foodSchema;

  constructor() {
    this.foodSchema = Yup.object().shape({
      name: Yup.string()
        .required('This field can not be empty')
        .matches(
          this.validateNotNullRegEx,
          'This field must exist text or number',
        ),
      description: Yup.string()
        .required('This field can not be empty')
        .matches(
          this.validateNotNullRegEx,
          'This field must exist text or number',
        ),
      price: Yup.string()
        .required('This field can not be empty')
        .matches(this.validateIsNumberRegEx, 'This field only exist number'),
    });
  }
}

export default new ValidateInterfaces();
