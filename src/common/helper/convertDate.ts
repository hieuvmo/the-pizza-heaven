export const convertDateNowToDayMonthYear = (date: number) => {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  return dd + '/' + mm + '/' + yyyy;
};
