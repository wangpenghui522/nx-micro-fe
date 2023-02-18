import { createApp } from 'vue';

import { installPlugins } from './plugin';

import { App } from '@shared/components';

const app = createApp(App);

installPlugins(app).catch((error: any) => {});

app.mount('#app');
