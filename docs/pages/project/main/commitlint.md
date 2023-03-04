# husky+lint-staged+commitlint

## commitlint

## 1.1 什么是 Commitlint

在使用 Git 提交代码时，通常都需要填写提交说明，也就是 Commit Message。在前面的文章中，已经介绍了如何使用 Commitizen 或可视化工具编写符合规范的 Commit Message。然而有些同学可能还是会使用 git commit 方式提交一些不符合规范的 Commit Message。为了禁止不符合规范的 Commit Message 的提交，我们就需要采用一些工具，只有当开发者编写了符合规范的 Commit Message 才能够进行 commit。而 Commitlint 就是这样一种工具，通过结合 husky 一起使用，可以在开发者进行 commit 前就对 Commit Message 进行检查，只有符合规范，才能够进行 commit。

## 1.2 安装 Commitlint

使用 npm 安装 Commitlint 相关依赖包。

```js
npm install @commitlint/cli @commitlint/config-conventional --save-dev
```

## 1.3 配置 Commitlint

安装好 Commitlint 之后，就需要配置 Commitlint，可以在根目录创建 commitlint.config.js 文件进行配置。

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

## 2. Husky

首先，先来介绍一下 Husky 的安装和相关配置。

## 2.1 什么是 git hook

在介绍 Husky 之前，我们先来看什么是 git hook，也就是常说的 Git 钩子。

和其它版本控制系统一样，Git 能在特定的重要动作发生时触发自定义脚本。有两组这样的钩子：客户端的和服务器端的。 客户端钩子由诸如提交和合并这样的操作所调用，而服务器端钩子作用于诸如接收被推送的提交这样的联网操作。 你可以随心所欲地运用这些钩子。

其中，客户端钩子我们可能用的比较多，客户端钩子通常包括了提交工作流钩子、电子邮件工作流钩子和其它钩子。这些钩子通常存储在项目的.git/hooks 目录下，我们需要关注的主要是提交工作流钩子。提交工作流钩子主要包括了以下四种：

- pre-commit：该钩子在键入提交信息前运行。 它用于检查即将提交的快照。如果该钩子以非零值退出，Git 将放弃此次提交，你可以利用该钩子，来检查代码风格是否一致。
- prepare-commit-msg：该钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所看到的默认信息。 - commit-msg：该钩子接收一个参数，此参数存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。
- post-commit：该钩子一般用于通知之类的事情。 在上面的钩子中，我们需要关注 pre-commit 和 commit-msg 钩子。

## 2.2 什么是 husky husky

是常见的 git hook 工具，使用 husky 可以挂载 Git 钩子，当我们本地进行 git commit 或 git push 等操作前，能够执行其它一些操作，比如进行 ESLint 检查，如果不通过，就不允许 commit 或 push。

## 2.3 安装 husky

安装 husky，可以使用 npm 进行安装。

```js
npm install husky --save-dev
```

## 2.4 配置 husky

安装好 husky 之后，还需要对 husky 进行配置。不同版本的 husky 配置方法有些不同，这里主要对 8.0 版本的配置进行介绍。

### 2.4.1 初始化 husky

首次安装成功后，需要手动初始化(因为这时候不需要执行 npm install)，直接在控制台输入下面命令: [不同版本配置不同](https://ainyi.com/129)

```js
//package.json
"scripts": {
    "prepare": "husky install",
},
// 运行
npm run prepare
```

指令执行成功后会在项目根目录下面生成一个 **.husky** 目录，该目录下有一个 **\_** 目录。

### 添加 commit-msg hook

**commit-msg** 文件中可以配置在 `git commit` 时对 `commit` 注释的校验指令

可手动创建文件再输入文件内容，但是建议使用命令创建，命令如下:

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

上面命令执行成功后会在 `.husky` 目录下生成一个 **commit-msg** 文件，该文件的内容如下，表示在 `git commit` 前执行一下 `npx --no -- commitlint --edit $1` 指令，对 `commit` 的注释进行校验。

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit
```

### 添加 pre-commit hook

**pre-commit** 文件中可以配置在 `git commit` **前**需要执行的操作

可手动创建文件再输入文件内容，但是建议使用命令创建，命令如下，下面出现的 `npm run lint-staged` 指令会在接下来的内容中解释(lint-staged 为 husky 的辅助工具)。

```
npx husky add .husky/pre-commit "npm run lint-staged"
```

上面命令执行成功后会在 `.husky` 目录下生成一个 **pre-commit** 文件，该文件的内容如下，表示在 `git commit` 前执行一下 `npm run lint-staged` 指令，对所有代码进行 `eslint校验` 和 `stylelint校验` ，不符合校验规则就终止 commit。

[common.sh](http://common.sh) 解决 window 下不生效问题

```js
//common.sh
#!/bin/sh
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
//pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

[ -n "$CI" ] && exit 0

# Format and submit code according to lintstagedrc.js configuration
npm run lint:lint-staged
```

首先，我们需要先安装配置好 ESLint 或 Stylelint，并且在 package.json 中加入以下代码。

```json
  "lint-staged": {
    "src/**/*.{js,ts,vue}": "eslint --fix --ignore-path .eslintignore",
    "src/**/*.{less,sass,css,vue}": "stylelint --fix --ignore-path .eslintignore"
  }
```

<!-- "husky": { "hooks": { "pre-commit": "eslint src/\*_/_.{js,jsx,ts,tsx}", } } 接着，当我们执行 git commit 时，就会触发 pre-commit 钩子，并且执行对应命令，这里将会指定目录下的文件进行 ESLint 检查，如果 ESLint 检查不通过，是无法进行 commit 的。 -->

如果 ESLint 检查通过，就可以正常进行 commit。

在安装并配置好 husky 之后，如果发现在 commit 时不能触发 pre-commit，可以试着重新安装 husky，并且重启 VSCode。

2.5 只使用 husky 的问题

使用 husky 虽然能够帮助我们在 commit 或 push 前执行一些指令，但是如果只使用 husky，仍然存在下面这些问题：

在某次提交时，我们只修改了某个文件，但是只使用 husky 会把所有的文件都运行一遍 Lint 检查，时间成本太高。此外，有些项目会在中途才加上 husky，但是在 commit 时 husky 也会对其它未修改的历史代码进行检查，可能会一下子报了很多错误，这个时候我们更希望只对当前修改过的文件进行检查，而不是对项目中的代码都进行检查。 husky 的钩子只能执行一个指令，但是有时候我们希望能够在 git commit 之前执行多个指令，比如执行 ESLint、Stylelint 或 Commitlint 等操作。 为了解决上面的问题，就需要结合 Lint-staged 一起使用。

## 3. Lint-staged

接下来，将会对 Lint-staged 的安装和配置进行介绍。

### 3.1 什么是 Lint-staged

Lint-staged 可以在 git staged 阶段的文件上执行 Linters，简单说就是当我们运行 ESlint 或 Stylelint 命令时，可以通过设置指定只检查我们通过 git add 添加到暂存区的文件，可以避免我们每次检查都把整个项目的代码都检查一遍，从而提高效率。

其次，Lint-staged 允许指定不同类型后缀文件执行不同指令的操作，并且可以按步骤再额外执行一些其它 shell 指令。

### 3.2 安装 Lint-staged

安装 Lint-staged，可以使用 npm 进行安装。

npm install lint-staged --save-dev

## 3.3 配置 Lint-staged

安装好了 Lint-staged 之后，就需要配置 Lint-staged。我们可以在 package.json 中加入以下代码，这里需要先安装配置好 husky，ESLint 和 Stylelint。

```js
"prepare": "husky install",
"lint-staged": "lint-staged" // 必须配置，否则找不到命令



"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.json": [
      "prettier --write"
    ],
    "*.vue": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{scss,less,html}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
```

当我们执行 git commit 时，就会触发 husky 的 pre-commit 钩子，调用 lint-staged 命令。而 lint-staged 包含了对*.vue，*.{js,jsx,ts,tsx}，\_.{htm,html,css,sss,less,scss,sass}类型文件的操作。以\*.vue 为例，当匹配到后缀名为.vue 的文件时，就会分别执行以下操作：

- 首先会执行 eslint --fix 命令，对.vue 文件执行 ESLint 检查，并且自动修复一些 JS 格式问题
- 接着会执行 stylelint --fix 命令，对.vue 文件的 CSS 执行 Stylelint 检查，并且自动修复一些 CSS 格式问题最后，
- 若前面的指令都执行通过，那么将通过 git add 命令将文件重新加入到本地的 git commit 中，如果没有执行通过，那么将不能 commit
