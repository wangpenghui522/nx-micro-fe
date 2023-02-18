const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// 输出高亮
const clc = {
  green: (text) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text) => `\x1B[33m${text}\x1B[39m`,
  red: (text) => `\x1B[31m${text}\x1B[39m`,
};

console.log(clc.yellow('\n准备创建本地环境变量文件...\n'));

const inquirerPrompt = inquirer.createPromptModule();
inputPrompt();

// 输入提示
function inputPrompt() {
  inquirerPrompt(getQuestions())
    .then((answers) => {
      // 环境变量文件
      const envFile = path.join(process.cwd(), `./apps/${answers.appName}/.env.${answers.envName}`);
      const envLocalFile = `${envFile}.local`;

      // 校验是否存在对应环境 local 文件
      if (fs.existsSync(envLocalFile)) {
        coverPrompt(envFile, envLocalFile);
      } else {
        createFile(envFile, envLocalFile);
      }
    })
    .catch((error) => {
      if (error) {
        console.log(clc.red('解析输入失败，请查明原因后再操作'));
        process.exit(1);
      }
    });
}

// 获取问询
function getQuestions() {
  // apps 目录路径
  const appsDirPath = path.join(process.cwd(), `./apps`);

  // 所有 app
  const apps = fs.readdirSync(appsDirPath).filter((name) => {
    return !(fs.lstatSync(`${appsDirPath}/${name}`).isFile() || name.includes('-e2e'));
  });

  // 所有环境
  const envs = ['dev', 'sit', 'test', 'prod'];

  return [
    {
      type: 'list',
      name: 'appName',
      message: '请选择目标应用：',
      choices: apps,
    },
    {
      type: 'list',
      name: 'envName',
      message: '请选择需要复制的环境：',
      choices: envs,
      default: 'dev',
    },
  ];
}

// 覆盖提示
function coverPrompt(envFile, envLocalFile) {
  inquirerPrompt([
    {
      type: 'confirm',
      name: 'isCover',
      message: clc.yellow(`\n本地环境变量文件 ${envLocalFile} 已存在，该操作将覆盖原文件，是否继续？（默认否）\n`),
      default: false,
    },
  ])
    .then((answers) => {
      if (answers.isCover) {
        createFile(envFile, envLocalFile);
      }
    })
    .catch((error) => {
      if (error) {
        console.log(clc.red('解析输入失败，请查明原因后再操作'));
        process.exit(1);
      }
    });
}

// 创建文件
function createFile(envFile, envLocalFile) {
  // 读取环境变量文件
  fs.readFile(envFile, 'utf8', (err, data) => {
    if (err) {
      console.log(clc.red(`${envFile} 读取失败，请查明原因后再操作`));
      process.exit(1);
    }

    // 解析并拼接文件内容
    const dataArr = data.split('\n');
    dataArr.push(
      '',
      '# ******************** 本地开发调试相关的变量 ******************** #',
      '',
      '# Node 运行环境',
      'VITE_USER_NODE_ENV=development',
      '',
      '# 是否开启模拟登录：on-开启，off-关闭 !!! 非本地开发必须为 off !!!',
      'VITE_ENABLE_MOCK_LOGIN=on',
      '',
      '# 是否开启上传 CDN：on-开启，off-关闭',
      'ENABLE_UPLOAD_CDN=off',
      ''
    );

    // 生成对应环境 local 文件
    fs.writeFile(envLocalFile, `${dataArr.join('\n')}`, (err) => {
      if (err) {
        console.log(clc.red(`${envLocalFile} 生成失败，请查明原因后再操作`));
        process.exit(1);
      }
      console.log(clc.green(`\n本地环境变量文件 ${envLocalFile} 已创建成功！\n`));
    });
  });
}
