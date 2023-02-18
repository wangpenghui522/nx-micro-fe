import { Tree, formatFiles, generateFiles, joinPathFragments, getWorkspaceLayout, getProjects } from '@nrwl/devkit';

import { clc, toCamelCase } from '../../scripts/help';
// 创建feature-manage应用页面
import createManagePage from './create-manage-page';
// 创建feature-chat应用页面
import createChatPage from './create-chat-page';

export default async function (tree: Tree, schema: any) {
  const { pageName, featureName, pageTitle } = schema;
  const { libsDir, appsDir } = getWorkspaceLayout(tree);
  const projects = getProjects(tree);

  // 特性应用名称
  const libsName = `feature-${featureName}`;

  // 判断特性应用是否存在
  if (!projects.get(libsName)) {
    console.log(clc.red(`${libsDir} 下找不到 ${libsName}，请先创建 ${libsName}，再进行操作`));
    process.exit(1);
  }

  // 判断要新建的页面文件是否存在
  const pageFilePath = joinPathFragments(libsDir, libsName, `./src/views/${pageName}/index.vue`);
  // console.log(pageFilePath);
  if (tree.exists(pageFilePath)) {
    console.log(clc.red(`${pageFilePath} 已经存在 `));
    process.exit(1);
  }

  // manage和chat应用的目录结构不一样,所以要分别处理
  const createPage = { createManagePage, createChatPage };
  // 生成调用方法名
  const action = `${toCamelCase(`create-${featureName}-page`)}`;
  createPage[action]?.(tree, schema, libsName);

  // 创建新增页面
  // 将vue模板文件写入指定的feature-name/src/views目录
  const pageDir = joinPathFragments(libsDir, libsName, `./src/views/${pageName}`);
  generateFiles(tree, joinPathFragments(__dirname, './files'), pageDir, {
    tmpl: '',
    ...schema,
  });

  // 替换新增页面中的api导入路径
  const pagePath = `${pageDir}/index.vue`;
  const pageContent = tree.read(pagePath)!.toString();

  tree.write(pagePath, `${pageContent.replace('#featureName#', featureName)}`);

  // 格式化代码
  await formatFiles(tree);

  return () => {
    console.log(clc.magentaBright(`页面 ${pageName} 创建成功`));
  };
}
