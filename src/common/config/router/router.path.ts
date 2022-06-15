export const routerPath = {
  app: {
    FOOD: '/app/food',
    FOOD_DETAIL: '/app/food/:category',
  },
  admin: {
    USER_LIST: '/admin/users',
  },
  auth: {
    USER_REGISTER: '/auth/user/sign-up',
    LOGIN: '/auth/log-in',
  },
  common: {
    HOME: '/',
  },
  test: {
    TEST: '/test',
  },
};

export const getAllPathArrayName = (): string[] => {
  const arrayResult: string[] = [];

  for (const [, value] of Object.entries(routerPath)) {
    if (typeof value === 'object') {
      for (const [, secondValue] of Object.entries(value)) {
        arrayResult.push(secondValue);
      }
    } else if (typeof value === 'string') {
      arrayResult.push(value);
    }
  }

  return arrayResult;
};
