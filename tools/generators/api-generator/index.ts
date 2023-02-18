import { Tree, formatFiles, generateFiles, joinPathFragments, getWorkspaceLayout, getProjects } from '@nrwl/devkit';

import { clc, toCamelCase } from '../../scripts/help';

export default async function (tree: Tree, schema: any) {
  const { apiFileName, featureName, apiComment } = schema;
  const { libsDir, appsDir } = getWorkspaceLayout(tree);
  const projects = getProjects(tree);

  const libsName = `feature-${featureName}`;

  // 判断特性应用是否存在
  if (!projects.get(libsName)) {
    console.log(clc.red(`${libsDir} 下找不到 ${libsName}，请先创建 ${libsName}，再进行操作`));
    process.exit(1);
  }

  // 判断api文件是否存在
  const apiFilePath = joinPathFragments(libsDir, libsName, `./src/apis/modules/${apiFileName}.ts`);
  if (tree.exists(apiFilePath)) {
    console.log(clc.red(`${apiFilePath} 已经存在 `));
    process.exit(1);
  }

  // 读取api主索引文件内容
  const apiIndexPath = joinPathFragments(libsDir, libsName, `./src/apis/index.ts`);
  // console.log(apiIndexPath);
  const apiIndexContent = tree.read(apiIndexPath)!.toString();
  // 转换成字符串数组是为了方便插入内容
  let apiContentSplitArr = apiIndexContent.trim().split('\n');
  // 给api索引文件添加一条新的api导入
  apiContentSplitArr.push(
    `// ${apiComment}\nexport * as ${toCamelCase(apiFileName)}Api from './modules/${apiFileName}'`
  );
  tree.write(apiIndexPath, apiContentSplitArr.join('\n'));

  // 将api模板文件写入指定的feature-name/src/apis/modules目录
  const apiDir = joinPathFragments(libsDir, libsName, `./src/apis/modules`);
  generateFiles(tree, joinPathFragments(__dirname, `./${featureName}-api`), apiDir, {
    tmpl: '',
    ...schema,
  });

  // 修改api文件名称
  tree.rename(`${apiDir}/api.ts`, `${apiDir}/${apiFileName}.ts`);

  // 格式化api文件代码
  await formatFiles(tree);

  return () => {
    console.log(clc.magentaBright(`api ${apiFileName} 创建成功`));
  };
}
