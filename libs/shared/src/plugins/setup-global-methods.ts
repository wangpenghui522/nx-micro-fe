import type { App } from 'vue';

/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods(app: App) {
  // 全局挂载Reflect反射对象,以便在vue模板中使用
  app.config.globalProperties.Reflect = Reflect;
}
