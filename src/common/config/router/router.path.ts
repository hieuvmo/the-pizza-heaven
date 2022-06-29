export const routerPath = {
  app: {
    MY_ACCOUNT: '/app/my-account',
    SEARCH: '/search',
    CART: '/cart',
    CHECKOUT: '/checkout',
    CHECKOUT_SUCCESS: '/checkout/success',
  },
  admin: {
    CATEGORY_LIST: '/admin/categories',
    CATEGORY_DETAIL: '/admin/categories/:id',
    CATEGORY_NEW: '/admin/new/category',
    FOOD_LIST: '/admin/foods',
    FOOD_DETAIL: '/admin/foods/:id',
    FOOD_NEW: '/admin/new/food',
    ORDER_LIST: '/admin/orders',
  },
  auth: {
    USER_REGISTER: '/auth/user/sign-up',
    LOGIN: '/auth/log-in',
  },
  common: {
    HOME: '/',
    NOT_FOUND: '/page-not-found',
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
