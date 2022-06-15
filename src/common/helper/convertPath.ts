export const convertCategoryPath = (categoryName: string) => {
  if (categoryName === 'Khai vị') return 'appetizer';
  if (categoryName === 'Mỳ Ý') return 'pasta';
  if (categoryName === 'Nui Bỏ Lò') return 'oven-noodles';
  if (categoryName === 'Thức uống') return 'drink';
  if (categoryName === 'Kem hộp') return 'ice-cream';
  return categoryName.toLowerCase();
};
