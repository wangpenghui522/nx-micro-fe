import { RouterView } from 'vue-router';

export default [
  {
    path: '/',
    name: 'feature-app1',
    component: RouterView,
    children: [
      {
        path: 'demo',
        name: 'feature-app1-demo',
        meta: { title: 'feature-app1 demo' },
        component: () => import('./views/demo/index.vue'),
      },
    ],
  },
];
