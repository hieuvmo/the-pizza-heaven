import * as Yup from 'yup';

export interface IFood {
  id: number;
  categoryID: number;
  name: string;
  thumbnail: string;
  description: string;
  price: string;
  isStock: boolean;
}

export interface IFoodWithoutId {
  categoryID: number;
  name: string;
  thumbnail: string;
  description: string;
  price: string;
  isStock: boolean;
}

class ValidateInterfaces {
  private validateNotNullRegEx = /^(?!\s*$).+/;
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
        .matches(
          this.validateNotNullRegEx,
          'This field must exist text or number',
        ),
    });
  }
}

export default new ValidateInterfaces();
