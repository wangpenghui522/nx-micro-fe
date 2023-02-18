/// <reference types="axios/index" />
// 声明全局变量
declare module 'global' {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => any;
  }
  interface AxiosRequestConfig<D = any> {
    showLoading?: boolean;
    showError?: boolean;
  }
}

// url参数类型属性
type TUrlProps = {
  [key: string]: string;
};

type Recordable<T = any> = Record<string, T>;

// 定时器类型
type TTimer = ReturnType<typeof setTimeout>;

// 宽松类型
type TLooseObj = {
  [key: string]: any;
};
