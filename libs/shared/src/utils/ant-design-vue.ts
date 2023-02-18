// Select,Tooltip,时间选择器,浮层渲染父节点设置--防止提示语，滚动条定位异常
const getPopupContainer = (trigger: HTMLElement): HTMLElement => (trigger.parentNode || document.body) as HTMLElement;

export { getPopupContainer };
