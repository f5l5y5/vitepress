# 统一项目工程化配置

:::tip

@taoismcn 配置说明此指南说明如下：

- @taoismcn/eslint-config 配置目前只适用 vue3(ts),
- @taoismcn/stylelint-config 配置目前支持 scss,
- @taoismcn/prettier-config 和 @taoismcn/commitlint-config 通用

:::

## 一、vscode 配置

安装 Prettier - Code formatter、ESLint 、stylelint、editorConfig 扩展，每次保存自动格式化代码。

工作区配置首选项 -> 设置 -> 工作区 -> 打开设置（.json）

会创建.vscode/settings.json 文件，添加以下配置项

```json
{
  "prettier.enable": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnType": true,
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,

  "editor.formatOnSave": true, // 每次保存的时候将代码按格式进行修复  prettier
  "editor.codeActionsOnSave": {
    // eslint 自动修复
    "source.fixAll.eslint": true,
    // 保存时是否自动 stylelint 修复
    "source.fixAll.stylelint": true,
    // 保存时自动修复错误
    "source.fixAll": true
  },
  //eslint
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "json5"
  ],
  // stylelint
  "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"]
}
```

## 二、editorConfig

根目录新建.editorConfig

```yml
root = true
# unix风格的换行符，每个文件都以换行符结尾
[*]
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

## 三、prettier

安装依赖

```js
yarn add @taoismcn/prettier-config -D
```

配置 .prettierrc.js

```js
const fabric = require('@taoismcn/prettier-config')

module.exports = {
  ...fabric,
}
```

## 四、 stylelint

目前支持 scss 安装依赖

```js
yarn add @taoismcn/stylelint-config -D
```

配置 .stylelintrc.js

```js
module.exports = {
  root: true,
  extends: ['@taoismcn/stylelint-config'],
}
```

## 五、 eslint

支持: vue3(ts)

安装依赖

```js
yarn add @taoismcn/eslint-config -D
```

配置 .eslintrc.js

```js
module.exports = {
  root: true,
  extends: ['@taoismcn'],
  rules: {
    'global-require': 'off',
    'arrow-body-style': 'off',
    'vue/attribute-hyphenation': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'array-callback-return': 'off',
    'guard-for-in': 'off',
  },
}
```

## 六、 commitlint

安装依赖

```js
yarn add @taoismcn/commitlint-config -D
```

配置 commitlint.config.js 文件

```js
module.exports = {
  extends: ['@taoismcn/commitlint-config'],
}
```

## 七、husky、lint-staged

- 安装 husky 和 lint-staged

```js
yarn add husky lint-staged -D
yarn husky install
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
yarn husky add .husky/pre-commit "npx lint-staged"
```

- 添加 lint-staged 配置到 package.json

:::tip

prettier 应放在 eslint/stylelint 之后

:::

- 添加 lint-staged 配置到 package.json

```json
{
"scripts":{
  "lint-staged": "lint-staged",
}
"lint-staged": {
    "src/**/*.{js,ts,vue}": "eslint --fix --ignore-path .eslintignore",
    "src/**/*.{less,sass,css,vue}": "stylelint --fix --ignore-path .eslintignore",
    "**/*": "prettier --check . --ignore-unknown"
  }
}
```

## 八、配置 scripts 命令

1. 项目根目录添加 .eslintignore 文件，里面表示不需要检验的目录,根据自己需要进行设置

```json
build/*.js
src/assets
public
dist

# 类型
typings

# 第三方库
wxcomponents
qqmap-wx-jssdk1.2
tki-qrcode
```

2. package.json 中的 scripts 里添加

```json
{
  "scripts": {
    "eslint": "eslint --cache --max-warnings 0 \"{src,mock}/**/*.{vue,ts,tsx}\" --fix",
    "lint-staged": "lint-staged",
    "prettier": "prettier --write  \"src/**/*.{js,json,tsx,css,less,scss,vue,html,md}\"",
    "stylelint": "stylelint --cache --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/ --ignore-path .eslintignore"
  }
}
```

说明: --ignore-path: 参数指定 eslint、stylelint 忽略配置文件,其内表示不需要检验的目录
