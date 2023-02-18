// 获取接口域名
export const getApiHost = () => {
  if (import.meta.env.VITE_USER_NODE_ENV === 'development') {
    return location.origin;
  }
  return import.meta.env.VITE_API_HOST;
};
