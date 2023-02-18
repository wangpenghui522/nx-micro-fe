import { defineStore } from 'pinia';

export const useGlobalLoadingStore = defineStore({
  id: 'global-loading',
  state: () => ({
    loading: false,
    loadingMsg: '加载中...',
  }),
  getters: {},
  actions: {
    setLoad(loading: boolean) {
      this.loading = loading;
    },
  },
});
