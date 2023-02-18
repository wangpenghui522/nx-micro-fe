// 链接协议处理：http => https
export function getHttpsUrl(url: string) {
  const reg = new RegExp('^((http)?://)');
  let newUrl = url;
  if (reg.test(url)) {
    newUrl = newUrl.replace(/^http/, 'https');
  }
  return newUrl;
}
