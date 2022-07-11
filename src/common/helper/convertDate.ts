export const convertDateNowToDayMonthYear = (date: number) => {
  const today = new Date(date);
  let YYYY = today.getFullYear().toString();
  let MM = (today.getMonth() + 1).toString();
  let DD = today.getDate().toString();

  let hh = today.getHours().toString();
  let mm = today.getMinutes().toString();
  if (mm.length === 1) mm = '0' + mm;
  let ss = today.getSeconds().toString();
  if (ss.length === 1) ss = '0' + ss;
  return DD + '/' + MM + '/' + YYYY + ' ' + hh + ':' + mm + ':' + ss;
};
