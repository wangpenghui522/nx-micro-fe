import { useBrowserLocation } from '@vueuse/core';
import { message } from 'ant-design-vue';
import axios from 'axios';
import { getApiHost } from '../api-host';

const FailCode: any = {
  1000001: (resData: any) => {
    message.destroy(); // 销毁之前的message，避免同时出现多个错误提示，影响用户体验
    message.warning('未登录或登录态失效', 2, () => {
      const { origin, pathname = '' } = useBrowserLocation().value;
      const pathnameArr = pathname.split('/');
      // 跳转到登陆页
      // const url = `${origin}/${pathnameArr[1]}/login`;
      // location.href = url;
    });
    return Promise.reject(resData);
  },
  default: (resData: any) => {
    message.error(resData?.retmsg ?? '接口错误', 2);
    return Promise.reject(resData);
  },
};

const instance = axios.create({
  baseURL: `${getApiHost()}${import.meta.env.VITE_API_PATH_PREFIX}`, // 默认接口基础路径，如果有特殊接口路径，单独设置绝对路径覆盖
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (config) {
    // 只有content-type类型是application/x-www-form-urlencoded格式的请求,参数会被转化成表单编码格式
    if (config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.transformRequest = [
        (data) => {
          let formDataParams = [];
          for (const key in data) {
            formDataParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
          }
          return formDataParams.join('&');
        },
      ];
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    const { status, statusText, data, config } = response;
    if (status === 200) {
      const { ret } = data;
      if (ret !== 0 && !config.headers?.isHideError) {
        return FailCode[ret] ? FailCode[ret](data) : FailCode['default'](data);
      }
      return data;
    } else {
      message.error(`[${status}]${statusText}`, 2);
      return Promise.resolve(response);
    }
  },
  function (error) {
    message.error(error?.message, 2);
    return Promise.reject(error);
  }
);

export const httpClient = instance;
