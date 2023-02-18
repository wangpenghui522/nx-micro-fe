import { BlankLayout } from '@shared/layouts';
import type { RouteRecordRaw } from 'vue-router';
import { app1Router } from '@feature-app1/index';
/* #importFeatureRouter# */

export const routes: RouteRecordRaw[] = [
  // 业务相关页面
  {
    path: '/',
    redirect: '/demo',
    name: 'BlankLayout',
    component: BlankLayout,
    children: [
      ...app1Router,
      /* #useFeatureRouter# */
    ],
  },
  // 兜底的路由必须放在最后一个
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@feature-error/404.vue'),
  },
];
