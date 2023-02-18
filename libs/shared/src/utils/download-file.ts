import { message } from 'ant-design-vue';

/**
 * 下载文件
 * @param src
 */
export async function downloadFile(src: string, name?: string) {
  try {
    const fileName: string = name || src.match(/([^/*.]+)\.\w+$/)?.[1] || '下载';
    const downloadRes = await window.fetch(src);
    const blob = await downloadRes.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('下载成功');
  } catch (error) {
    message.error('下载失败');
  }
}
