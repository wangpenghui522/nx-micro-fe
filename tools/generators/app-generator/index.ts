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
  const { name, port } = schema;
  const { appsDir } = getWorkspaceLayout(tree);
  const projects = getProjects(tree);

  if (projects.get(name)) {
    console.log(clc.red(`${appsDir} 下已经存在 ${name}，请查明原因后再进行操作`));
    process.exit(1);
  }

  // 将 app 模板文件写入指定目录
  const projectRoot = joinPathFragments(appsDir, name);
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    projectRoot,
    {
      tmpl: '',
      ...schema
    }
  );

  // 将 app-e2e 模板文件写入指定目录
  const projectE2eRoot = joinPathFragments(appsDir, name + '-e2e');
  generateFiles(
    tree,
    joinPathFragments(__dirname, './e2e-files'),
    projectE2eRoot,
    {
      tmpl: '',
      ...schema
    }
  );

  // 更新 workspace.json
  updateJson(tree, getWorkspacePath(tree), (jsonData) => {
    jsonData.projects = jsonData.projects ?? {};
    jsonData.projects[name] = `${appsDir}/${name}`;
    jsonData.projects[name + '-e2e'] = `${appsDir}/${name}-e2e`;
    return jsonData;
  });

  // 格式化代码
  await formatFiles(tree);

  return () => {
    console.log(clc.magentaBright(`

    app ${name} 已安装成功，接下来请安装一个 feature lib：

    nx workspace-generator feature-generator <feature-lib-name>

    `));
  };
}
