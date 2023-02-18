/*  获取url  query参数
 *  @param url:String -- url地址
 *  @param codeURI:Boolean -- 是否解码
 */
export const getUrlQueryParams = (url = window.location.href, codeURI = false) => {
  url = url || '';
  const search = url.split('?');
  let result = {};
  search.forEach((item, index) => {
    if (index !== 0) {
      result = item.split('&').reduce((obj, item) => {
        const arr = item.split('=');
        return { ...obj, [arr[0]]: codeURI ? decodeURIComponent(arr[1]) : arr[1] };
      }, result);
    }
  });
  return result;
};

// 获取url参数
export const getUrlQueryString = (search: string, name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = search.substr(1).match(reg);
  if (r != null) {
    return r[2];
  }
  return '';
};
