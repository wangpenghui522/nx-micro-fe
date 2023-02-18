// 输出高亮
export const clc = {
  green: (text) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text) => `\x1B[33m${text}\x1B[39m`,
  red: (text) => `\x1B[31m${text}\x1B[39m`,
  magentaBright: (text) => `\x1B[95m${text}\x1B[39m`,
  cyanBright: (text) => `\x1B[96m${text}\x1B[39m`,
};

// 烤串转驼峰
export function toCamelCase(str) {
  if (str == '') {
    throw new Error('转换小驼峰命名的字符串不能为空');
  }
  var arr = str.split('-');
  var newStr = arr[0];
  for (let i = 1; i < arr.length; i++) {
    newStr += arr[i].slice(0, 1).toLocaleUpperCase() + arr[i].slice(1);
  }
  return newStr;
}
