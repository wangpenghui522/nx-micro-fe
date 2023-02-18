import type { App } from 'vue';
import { directives } from '../directives/index';

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(app: App) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key]);
  });
}
