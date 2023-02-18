export function getCookie(name: string): string {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split('; ');
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (arr[0] === name) {
      return arr[1];
    }
  }
  return '';
}
// time秒 默认30天
export function setCookie(
  name: string,
  value: string,
  time: number = 30 * 24 * 3600
): void {
  const exp = new Date();
  exp.setTime(exp.getTime() + time * 1000);
  document.cookie =
    name + '=' + value + ';expires=' + exp.toUTCString() + ';path=/';
}

// 清除cookie
export function clearCookieByKey(name: string): void {
  setCookie(name, '', -1);
}
