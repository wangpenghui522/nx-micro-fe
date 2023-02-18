import dayjs from 'dayjs';

// 账号校验：支持英文、数字、-、_、@、.
export const accountValidator = (rule: any, value: any) => {
  const reg = new RegExp('^([a-zA-Z0-9-_@.]){1,30}$');
  const errInfo = '30个字符以内，支持英文、数字、-、_、@、.';
  if (value === '' || value === undefined) {
    return Promise.reject(errInfo);
  }
  if (reg.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(errInfo);
  }
};

// 密码校验：6-20个字符，必须同时有英文、数字
export const passwordValidator = (rule: any, value: any) => {
  const reg = new RegExp('^(?=.*[0-9])(?=.*[A-Za-z])(.{6,20})$');
  const errInfo = '6-20个字符，必须同时有英文、数字';
  if (value === '' || value === undefined) {
    return Promise.reject(errInfo);
  }
  if (reg.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(errInfo);
  }
};

// 时间跨度校验
export const handleDateRangeValidate = (rule: any, value: any, number: number, errTips?: string) => {
  const [startTime = '', endTime = ''] = value;
  if (dayjs(endTime).diff(startTime, 'day') > number) {
    return Promise.reject(errTips || `时间跨度不可超过${number}天`);
  }
  return Promise.resolve();
};
