import * as Yup from 'yup';

export interface ICategory {
  id: number;
  categoryName: string;
}

export interface ICategoryWithoutId {
  categoryName: string;
}

class ValidateInterfaces {
  private validateIsNullRegEx = /^(?!\s*$).+/;
  public categorySchema;

  constructor() {
    this.categorySchema = Yup.object().shape({
      categoryName: Yup.string()
        .required('This field can not be empty')
        .matches(this.validateIsNullRegEx, 'This field must exist text'),
    });
  }
}

export default new ValidateInterfaces();
