import { defineStore } from 'pinia';

interface GlobalState {}

export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => ({}),
  getters: {},
  actions: {},
});
