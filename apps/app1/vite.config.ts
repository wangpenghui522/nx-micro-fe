import { defineConfig } from 'vite';
import { workspaceRoot } from '@nrwl/tao/src/utils/app-root';

import { viteBaseConfig } from '../../vite.base.config';
import { loadNxDotEnv } from 'vite-plugin-nx-dotenv';
import _ from 'lodash';

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const nxDotEnv = loadNxDotEnv(mode, __dirname, workspaceRoot);

  return _.merge(
    {
      root: __dirname,
      build: {
        outDir: '../../dist/apps/app1',
        emptyOutDir: true,
      },
      server: {
        port: 5000,
        open: `${nxDotEnv.VITE_SITE_PATH_PREFIX}/demo`,
      },
    },
    await viteBaseConfig({ command, mode }, nxDotEnv)
  );
});
