export const getLocalStorageItem = (key: string) => {
  if (localStorage.getItem(key))
    return JSON.parse(localStorage.getItem(key) || '{}');
};

export const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const destroyLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
