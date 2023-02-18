import fetchJsonp from 'fetch-jsonp';

/**
 * 封装一个jsonp请求的方法
 * @params url
 * @params params
 */
export const requestJSONP = (url: string, params: any = {}) => {
  if (Object.keys(params).length > 0) {
    const paramsArray = [];
    for (const key in params) {
      paramsArray.push(`${key}=${params[key]}`);
    }
    const paramsString = paramsArray.join('&');
    url = `${url}?${paramsString}`;
  }
  return new Promise((resolve, reject) => {
    fetchJsonp(url)
      .then(function (response) {
        return response.json();
      })
      .then((res) => {
        if (res.status === 0) {
          resolve(res);
        } else {
          reject(new Error(res.message));
        }
      })
      .catch(function (ex) {
        reject(new Error(ex));
      });
  });
};
