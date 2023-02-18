import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import {
  setupAssets,
  setupStore,
  setupDirectives,
  setupCustomComponents,
  setupGlobalMethods,
} from '@shared/plugins';
import { createRouterGuards } from '@shared/router';
import { routerWhiteNameList } from '@shared/config';
import { routes } from './router.config';

export async function installPlugins(app: App) {
  // 引入静态资源
  setupAssets();

  // 注册全局自定义组件,如：<svg-icon />
  setupCustomComponents(app);

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app);

  // 注册全局方法，如：app.config.globalProperties.$message = message
  setupGlobalMethods(app);

  // 设置 pinia 状态管理
  setupStore(app);

  // 设置路由
  await setupRouter(app);
}

export async function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_SITE_PATH_PREFIX),
    routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  createRouterGuards(router, routerWhiteNameList);

  router.onError((error) => {
    console.log(error, '路由错误');
  });

  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}
