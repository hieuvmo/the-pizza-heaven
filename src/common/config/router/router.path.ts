export const routerPath = {
  app: {
    PIZZA: '/app/pizzas',
    PIZZA_DETAIL: '/app/pizzas/:id',
  },
  admin: {
    USER_LIST: '/admin/users',
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
