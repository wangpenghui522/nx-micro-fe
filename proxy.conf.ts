export const getProxyConf = (env: any): { [key: string]: any } => {
  return {
    // 模拟登录相关接口，正式环境不存在
    '/api/': {
      target: 'http://192.168.1.101:6000/ ',
      changeOrigin: true,
      secure: false,
    },
  };
};
