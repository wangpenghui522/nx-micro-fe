import { join, resolve } from 'path';
import { ConfigEnv, UserConfig, Plugin } from 'vite';
import { workspaceRoot } from '@nrwl/tao/src/utils/app-root';

// vue语法支持
import vue from '@vitejs/plugin-vue';

// vue3.2 setup 语法糖扩展 name
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

// tsx语法支持
import vueJsx from '@vitejs/plugin-vue-jsx';

// 按需加载UI组件样式,vite 自带按需加载仅针对js
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';

// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy';

// gzip压缩
import compressPlugin from 'vite-plugin-compression';

import WindiCSS from 'vite-plugin-windicss';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// html 支持 ejs
import { createHtmlPlugin } from 'vite-plugin-html';

import { nxDotEnvSupport } from 'vite-plugin-nx-dotenv';

import _ from 'lodash';

// 终端输出支持带颜色
import { clc } from './tools/scripts/help';

// 本机代理配置
import { getProxyConf } from './proxy.conf';

// https://vitejs.dev/config/
export const viteBaseConfig = async ({ command, mode }: ConfigEnv, nxDotEnv: any) => {
  console.log(clc.green(`当前应用名称：${nxDotEnv.VITE_NX_APP_NAME}`));
  console.log(clc.green(`当前运行环境：${mode}`));

  if (command === 'serve') {
    return getServeConfig(command, mode, nxDotEnv);
  } else if (command === 'build') {
    return getBuildConfig(command, mode, nxDotEnv);
  }
};

// serve 和 build 共享配置项
function getSharedConfig(command, mode, nxDotEnv): UserConfig {
  return {
    esbuild: {
      // vite 使用 esbuild 来转换 JS、TS、CSS 等，可以通过配置目标环境来转换较新的语法
      // https://esbuild.github.io/api/#transform-api
      target: 'chrome64',
      include: /\.(ts|vue|jsx|tsx)$/,
    },
    css: {
      preprocessorOptions: {
        less: {
          // less使用js写法的话,不开启此项会报错
          javascriptEnabled: true,
          strictMath: false,
          noIeCompat: true,
          modifyVars: {
            '@header-height': '64px',
            '@footer-height': '70px',
          },
        },
      },
    },
    resolve: {
      alias: getAlias(),
    },
    plugins: [
      nxDotEnvSupport({
        globalEnvDir: workspaceRoot,
      }),
      vue(),
      vueJsx(),
      VueSetupExtend(),
      WindiCSS(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'svg-icon-[dir]-[name]',
      }),
      // 按需加载样式文件
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            CURRENT_ENV: mode,
            STATIC_HOST: nxDotEnv.VITE_STATIC_HOST,
            STATIC_PREFIX: nxDotEnv.VITE_STATIC_PREFIX, // 资源地址前缀
          },
        },
      }),
    ],
  };
}

// serve 配置
function getServeConfig(command, mode, nxDotEnv): UserConfig {
  console.log(clc.green(`本地代理转发地址：${nxDotEnv.VITE_API_HOST}`));

  const config = _.merge(getSharedConfig(command, mode, nxDotEnv), {
    base: './',
    server: {
      host: '0.0.0.0',
      hmr: true,
      proxy: getProxyConf(nxDotEnv),
      // 屏蔽命令窗口的文件访问限制警告
      fs: {
        strict: false,
      },
    },
  });

  return config;
}

// build 配置
function getBuildConfig(command, mode, nxDotEnv): UserConfig {
  console.log(clc.green(`IS_UPLOAD_CDN：${process.env.ENABLE_UPLOAD_CDN}`));

  const config = _.merge(getSharedConfig(command, mode, nxDotEnv), {
    base: getBuildBase(command, mode, nxDotEnv),
    build: {
      target: 'es2015', // 最终构建的浏览器兼容目标，最低支持到 es2015
      reportCompressedSize: false, // 禁用显示 gzip 压缩大小报告，小幅提高构建性能
      rollupOptions: {
        output: {
          // 人工拆包,防止打包出来的三方库体积过大
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
      // 避免cjs和es混合编写的三方库报错
      commonjsOptions: {
        transformMixedEsModules: true,
        exclude: ['node_modules/lodash/**', 'node_modules/lodash-es/**', 'node_modules/@types/lodash-es/**'],
      },
    },
  });

  config?.plugins?.push(
    configLegacyPlugin(),
    // 配置 gzip
    compressPlugin({
      verbose: false, // 不在控制台显示输出结果
      deleteOriginFile: false,
    })
  );

  return config;
}

// 获取 alias
function getAlias() {
  return [
    {
      find: '@shared/store',
      replacement: join(workspaceRoot, './libs/shared/src/store/'),
    },
    {
      find: '@shared/hooks',
      replacement: join(workspaceRoot, './libs/shared/src/hooks/'),
    },
    {
      find: '@shared/plugins',
      replacement: join(workspaceRoot, './libs/shared/src/plugins/'),
    },
    {
      find: '@shared/utils',
      replacement: join(workspaceRoot, './libs/shared/src/utils/'),
    },
    {
      find: '@shared/apis',
      replacement: join(workspaceRoot, './libs/shared/src/apis/'),
    },
    {
      find: '@shared/router',
      replacement: join(workspaceRoot, './libs/shared/src/router/'),
    },
    {
      find: '@shared/styles',
      replacement: join(workspaceRoot, './libs/shared/src/styles/'),
    },
    {
      find: '@shared/assets',
      replacement: join(workspaceRoot, './libs/shared/src/assets/'),
    },
    {
      find: '@shared/config',
      replacement: join(workspaceRoot, './libs/shared/src/config/'),
    },
    {
      find: '@shared/components',
      replacement: join(workspaceRoot, './libs/shared/src/components/'),
    },
    {
      find: '@shared/layouts',
      replacement: join(workspaceRoot, './libs/shared/src/layouts/'),
    },
    {
      find: '@feature-error',
      replacement: join(workspaceRoot, './libs/feature-error/src/'),
    },
    {
      find: '@feature-app1',
      replacement: join(workspaceRoot, './libs/feature-app1/src/'),
    },
    {
      find: '@feature-app2',
      replacement: join(workspaceRoot, './libs/feature-app2/src/'),
    },
    /* #useViteConfigResolveAlias# */
  ];
}

// 获取 build base
function getBuildBase(command, mode, nxDotEnv) {
  if (nxDotEnv.VITE_ENABLE_MOCK_LOGIN === 'on') {
    console.error(`${command} 模式下 VITE_ENABLE_MOCK_LOGIN 必须为 off`);
    process.exit(1);
  }

  console.log(clc.green(`是否开启上传 CDN：${process.env.ENABLE_UPLOAD_CDN}`));

  // 将打包后的文件上传到 CDN
  if (process.env.ENABLE_UPLOAD_CDN === 'on') {
    // 根据机构实际情况校验环境变量
    if (!nxDotEnv.VITE_STATIC_HOST) {
      console.error(`获取 ${mode} 环境的 CDN 配置信息失败，必须设置环境变量 VITE_STATIC_HOST`);
      process.exit(1);
    }
    if (!process.env.APP_NAME || !process.env.APP_VERSION) {
      console.error('必须设置环境变量 APP_NAME 和 APP_VERSION');
      process.exit(1);
    }
    // console.log(`${nxDotEnv.VITE_STATIC_HOST}/apps/${process.env.APP_NAME}/latest/`);
    // 根据机构实际情况配置 CDN 路径
    return `${nxDotEnv.VITE_STATIC_HOST}/apps/${process.env.APP_NAME}/latest/`;
  } else {
    // 不上传 CDN 时，根据机构实际情况配置打包后的文件基础路径
    // 可以按需增加应用名、版本号等
    return './';
  }
}

// 配置浏览器兼容插件
function configLegacyPlugin(): Plugin | Plugin[] {
  return legacy({
    /**
     * 需要兼容的浏览器版本
     *
     * vite 中 现代浏览器 与 旧版浏览器 区分基线：是否支持 ESM + dynamic import + import.meta
     *
     * 项目中仅兼容到现代浏览器最低版本
     *
     * 此处采用 browserslist 的配置格式（https://github.com/browserslist/browserslist）
     */
    targets: ['chrome >= 64', 'edge >= 79', 'safari >= 11.1', 'firefox >= 67'],
    /**
     * 是否忽略检测 browserslist 配置源
     *
     * 将传给 babel，在 @babel/preset-env 中会自动检测 browserslist 配置源
     * 如 package.json 中的 browserslist 或根目录中的 .browserslistrc
     *
     * 由于项目中没有配置源，仅使用传入的 targets，因此可以设置 true 忽略
     */
    ignoreBrowserslistConfig: true,
    /**
     * 是否生成旧版浏览器兼容包
     *
     * 由于兼容的浏览器均为现代浏览器，可以不生成
     */
    renderLegacyChunks: false,
    /**
     * 现代浏览器需要的 polyfills
     *
     * 由于一些低版本现代浏览器不支持新语法，需要通过加载语法对应的 polyfills 来兼容
     * 在构建时，会根据目标浏览器版本范围打包需要的 polyfills
     *
     * 两种配置方式：
     *
     * 1、设为 true
     *  - 根据目标浏览器版本范围自动探测需要的 polyfills
     *  - 弊端：会引入高版本现代浏览器不需要的 polyfills，以及比较激进的 polyfills
     *
     * 2、设为 string[]
     *  - 按需添加低版本浏览器 polyfills
     *  - 示例：['es/global-this', 'proposals/object-from-entries']
     *  - 弊端：需要手动添加，不灵活；很有可能部署生产后才发现，导致生产页面白屏！！！
     */
    modernPolyfills: true,
  });
}
