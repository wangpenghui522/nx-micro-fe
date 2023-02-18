// 将数字转换为千分位  保留小数
export const dieTrillion = (num: number | string, decimal = 0) => {
  if (decimal) {
    num = (Number(num) - 0).toFixed(decimal);
  }
  return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};
