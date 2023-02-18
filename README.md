# nx-micro-fe

Nx+Monorepo+Vite3+Vue3项目

## 目录

```
nx-micro-fe/
├── apps/ - 应用目录, 原则轻量，所有繁重的工作都由每个应用程序导入的库完成
├── libs/ - 库目录, 主要业务模块，每个库都定义了自己的外部 API，以便库之间的界限保持清晰
├── tools/ - 自定义的生成 app、feature-lib 的 generators 脚手架工具
├── workspace.json - 工作区配置
├── nx.json - nx配置
├── package.json
└── tsconfig.base.json
```

## 安装 nx

```shell
# Node version >= 16.x
npm install -g  nx
```

## 安装依赖

```shell
pnpm
```

### 安装新依赖时注意

如果在开发过程中需要安装新的依赖包，请注意指定版本并锁定，版本要选择稳定、下载量高、兼容性好的

安装命令格式如下：

```shell
# dependencies
pnpm add <package>@<version>

# devDependencies
pnpm add <package>@<version> [--dev/-D]
```

## 修改机构环境变量（已修改可跳过）

在第一次部署时，根据机构实际情况，修改环境变量

详情可见 ./apps/[app-name]/.env、./apps/[app-name]/.env.[mode] 文件中注明的需要修改变量

## 初始化本地开发环境变量文件

```shell
pnpm gen:env
```

根据提示选择对应的应用和环境

### 环境变量优先级说明

1.  ./apps/[app-name]/.env.[mode].local
2.  ./apps/[app-name]/.env.[mode]
3.  ./apps/[app-name]/.env.local
4.  ./apps/[app-name]/.env

> .local 结尾的 env 文件不会提交到版本库中
>
> 暂不支持 `VITE_XXX=xxx pnpm start:dev --project xxx` 这种外部环境变量

## 本地开发

```shell
pnpm start:dev --project <app-name>
```

## 编译

```shell
pnpm build:dev --project <app-name>
```

## e2e 测试

```shell
pnpm e2e <app-name>-e2e
```

## 查看依赖关系

```shell
nx graph
```

## 添加应用

```shell
nx workspace-generator app-generator <app-name>
```

## 添加 Feature 库

```shell
nx workspace-generator feature-generator <feature-lib-name>
```
