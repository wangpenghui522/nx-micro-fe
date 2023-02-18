import { defineStore } from 'pinia';

interface PageHeaderState {
  title?: string;
  desc?: string;
  // showBack?: boolean;
  backFn?: Function | null;
}

// 页头信息
export const usePageHeaderStore = defineStore({
  id: 'pageHeader',
  state: (): PageHeaderState => ({
    title: '',
    desc: '',
    // showBack: false,
    backFn: null,
  }),
  actions: {
    setPageHeader({ title, desc, backFn = null }: PageHeaderState) {
      title && (this.title = title);
      desc && (this.desc = desc);
      // this.showBack = showBack;
      this.backFn = backFn;
    },
  },
});
