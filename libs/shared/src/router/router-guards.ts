import { isNavigationFailure } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import type { Router } from 'vue-router';
import { usePageHeaderStore } from '@shared/store';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const defaultRoutePath = '/welcome';

export function createRouterGuards(router: Router, whiteNameList: any) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start(); // start progress bar
    next();
  });

  router.afterEach((to, _, failure) => {
    // 更新页头信息
    const pageHeaderStore = usePageHeaderStore();
    const { title = '', desc = '' } =
      (to.meta as { title: string; desc: string }) || {};
    pageHeaderStore.setPageHeader({
      title,
      desc,
    });

    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure);
    }

    NProgress.done(); // finish progress bar
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
