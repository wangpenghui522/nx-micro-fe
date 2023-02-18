import { Tree, joinPathFragments, getWorkspaceLayout } from '@nrwl/devkit';

import { clc, toCamelCase } from '../../scripts/help';

export default (tree: Tree, schema: any, libsName = '') => {
  const { pageName, pageTitle } = schema;
  const { libsDir } = getWorkspaceLayout(tree);
  // 判断要新建的页面路由文件是否存在
  const routerFilePath = joinPathFragments(libsDir, libsName, `./src/router.ts`);
  // console.log(routerFilePath);
  if (!tree.exists(routerFilePath)) {
    console.log(clc.red(`${routerFilePath} 不存在,无法写入新路由 `));
    process.exit(1);
  }

  // 页面小驼峰命名
  const pageCamelName = `${toCamelCase(pageName)}`;

  // 路由索引文件路径
  const routerIndexPath = joinPathFragments(libsDir, libsName, `./src/router.ts`);
  // 路由索引文件内容
  const routerIndexContent = tree.read(routerIndexPath)!.toString();

  // 基础路由分隔符
  const baseRouterSplitFlag = 'export const basicRouter = ';
  const baseRouterIndex = routerIndexContent.indexOf(baseRouterSplitFlag);
  // 截取出基础路由
  const baseRouter = routerIndexContent.slice(baseRouterIndex + baseRouterSplitFlag.length);
  // 为了添加内容方便，将基础路由内容字符串转换成数组
  // 为了保留注释,没有转换成json对象
  let baseRouterSplitArr = baseRouter.split('\n');

  // 去掉基础路由结尾的]和换行
  baseRouterSplitArr.pop();
  baseRouterSplitArr.pop();

  // 向router/index.ts文件末尾追加新路由对象
  baseRouterSplitArr.push(`{
    path: '${pageCamelName}',
    name: '${pageName}',
    meta: {
      title: '${pageTitle}',
      desc: '',
    },
    component: () => import('./views/${pageName}/index.vue'),
  },
];`);

  // 公共路由
  const commonRouter = routerIndexContent.slice(0, baseRouterIndex);
  // 拼接公共路由+基础路由内容
  const joinRouterContent = `${commonRouter}${baseRouterSplitFlag}${baseRouterSplitArr.join('\n')}`;
  tree.write(routerIndexPath, `${joinRouterContent}`);
};
