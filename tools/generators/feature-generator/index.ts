import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
  getWorkspaceLayout,
  getWorkspacePath,
  getProjects,
  readWorkspaceConfiguration,
  updateWorkspaceConfiguration,
  updateJson,
  names
} from '@nrwl/devkit';

import { clc } from '../../scripts/help';

export default async function (tree: Tree, schema: any) {
  const { name, appName } = schema;
  const { libsDir, appsDir } = getWorkspaceLayout(tree);
  const projects = getProjects(tree);

  if (projects.get(name)) {
    console.log(clc.red(`${libsDir} 下已经存在 ${name}，请查明原因后再进行操作`));
    process.exit(1);
  }

  if (!projects.get(appName)) {
    console.log(clc.red(`${appsDir} 下找不到 ${appName}，请先创建 ${appName}，再进行操作`));
    process.exit(1);
  }

  // 将 lib 模板文件写入指定目录
  const projectRoot = joinPathFragments(libsDir, name);
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    projectRoot,
    {
      tmpl: '',
      ...schema
    }
  );

  // 更新 workspace.json
  updateJson(tree, getWorkspacePath(tree), (jsonData) => {
    jsonData.projects = jsonData.projects ?? {};
    jsonData.projects[name] = `${libsDir}/${name}`;
    return jsonData;
  });

  // 更新 tsconfig.base.json
  updateJson(tree, 'tsconfig.base.json', (jsonData) => {
    jsonData.compilerOptions.paths = jsonData.compilerOptions?.paths ?? {};

    const pathsKey = `@${name}/*`;

    if (jsonData.compilerOptions.paths[pathsKey]) {
      console.log(clc.red(`tsconfig.base.json 已经配置了 ${pathsKey}，请查明原因后再进行操作`));
      process.exit(1);
    }

    jsonData.compilerOptions.paths[pathsKey] = [`./${libsDir}/${name}/src/*`];
    return jsonData;
  });

  // 更新 vite.base.config.ts
  const viteConfigFilePath = `vite.base.config.ts`;
  const viteConfigFileContents = tree.read(viteConfigFilePath).toString();
  const viteConfigFileSearchValue = '/* #useViteConfigResolveAlias# */';
  const viteConfigFileNewValue = `
        {
          find: '@${name}',
          replacement: join(workspaceRoot, './${libsDir}/${name}/src/'),
        },
        ${viteConfigFileSearchValue}
  `.trimStart();
  const newViteConfigFileContentsContents = viteConfigFileContents.replace(viteConfigFileSearchValue, viteConfigFileNewValue);
  tree.write(viteConfigFilePath, newViteConfigFileContentsContents);

  // 更新 feature 所属 app 的 project.json
  updateJson(tree, `${appsDir}/${appName}/project.json`, (jsonData) => {
    jsonData.implicitDependencies = jsonData.implicitDependencies ?? [];
    jsonData.implicitDependencies.push(name);
    return jsonData;
  });

  // 更新 feature 所属 app 的 router.config.ts
  const routerConfigFilePath = `${appsDir}/${appName}/src/router.config.ts`;
  const routerConfigFileContents = tree.read(routerConfigFilePath).toString();
  const routerConfigFileSearchValue1 = '/* #importFeatureRouter# */';

  // 路由小驼峰名称
  const routerCamelName = `${name.slice(8).replace(/-(\w)/g, (match, p1) => p1.toUpperCase())}Router`;
  const routerConfigFileNewValue1 = `
import { ${routerCamelName} } from '@${name}/index';
${routerConfigFileSearchValue1}
  `.trimStart();
  const routerConfigFileNewContents1 = routerConfigFileContents.replace(routerConfigFileSearchValue1, routerConfigFileNewValue1);

  const routerConfigFileSearchValue2 = '/* #useFeatureRouter# */';
  const routerConfigFileNewValue2 = `
      ...${routerCamelName}
      ${routerConfigFileSearchValue2}
  `.trimStart();
  const routerConfigFileNewContents2 = routerConfigFileNewContents1.replace(routerConfigFileSearchValue2, routerConfigFileNewValue2);

  tree.write(routerConfigFilePath, routerConfigFileNewContents2);

  // 格式化代码
  await formatFiles(tree);

  return () => {
    console.log(clc.magentaBright(`

    lib ${name} 已安装成功

    `));
  };
}
