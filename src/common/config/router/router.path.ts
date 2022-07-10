export const routerPath = {
  app: {
    MY_ACCOUNT: '/app/my-account',
    FOOD: '/app/products',
    FOOD_DETAIL: '/app/products/:id',
    SEARCH: '/search',
    CART: '/cart',
    ORDER_SEARCH: '/order/search',
    CHECKOUT_ORDER: '/checkout/order-info',
    CHECKOUT_SUCCESS: '/checkout/success/:orderId',
  },
  admin: {
    DASHBOARD: '/admin/dashboard',
    CATEGORY_LIST: '/admin/categories',
    CATEGORY_DETAIL: '/admin/categories/:id',
    CATEGORY_NEW: '/admin/new/category',
    PRODUCT_LIST: '/admin/products',
    PRODUCT_DETAIL: '/admin/products/:id',
    PRODUCT_NEW: '/admin/new/product',
    ORDER_LIST: '/admin/orders',
    ORDER_DETAIL: '/admin/orders/:id',
  },
  auth: {
    USER_REGISTER: '/auth/user/sign-up',
    LOGIN: '/auth/log-in',
  },
  common: {
    HOME: '/',
    NOT_FOUND: '/page-not-found',
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
