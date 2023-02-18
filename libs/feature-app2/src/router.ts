import { RouterView } from 'vue-router';

export default [
  {
    path: '/',
    name: 'feature-app2',
    component: RouterView,
    children: [
      {
        path: 'demo',
        name: 'feature-app2-demo',
        meta: { title: 'feature-app2 demo' },
        component: () => import('./views/demo/index.vue'),
      },
    ],
  },
];
