// 尾部加时间戳
export const withTimeStampUrl = (url: string) => {
  const currentTime_stamp = new Date().getTime();
  url = `${url}${url.indexOf('?') > -1 ? '&' : '?'}timestamp=${currentTime_stamp}`;
  return url;
};

//  canvas.toBlob
export const urlToBlob = (imgUrl: string): Promise<Blob | null> | string => {
  const imgExp = new RegExp(`^((https|http)?://)`);
  console.log('%c  是否为线上图片:', 'color: #0e93e0;background: #aaefe5;', imgExp.test(imgUrl));
  // 非线上图片
  if (!imgExp.test(imgUrl)) {
    return imgUrl;
  }
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); // 图片跨域时有用，必须前面
    img.src = withTimeStampUrl(imgUrl); // 加时间戳避免缓存问题

    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx?.drawImage(img, 0, 0);
      return canvas.toBlob((a) => resolve(a), 'image/jpeg');
    };
    img.onerror = function (err) {
      reject(err);
    };
  });
};

export const downloadBlobImg = (blob: Blob) => {
  const newA = document.createElement('a');
  newA.download = new Date().getTime().toString();
  newA.href = URL.createObjectURL(blob);
  newA.click();
  window.URL.revokeObjectURL(newA.href); // 释放掉blob对象
};
