# prettier

## 1、什么是 Prettier

Prettier 是一个代码格式化工具，可以格式化代码，但不具备代码检查功能，它可以通过解析代码并使用自己的规则重新打印它，并考虑最大行长来强制一致的样式，并在必要时包装代码，如今，它已成为解决所有代码格式问题的优选方案，支持多种语言，可以将 ESLint 和 Prettier 结合使用，提高代码质量。

## 2、为什么要用 Prettier

上面 Prettier 的定义一看，是不是觉得和 ESLint 差不了多少？那么，有了 ESLint，为什么还要用 Prettier 呢？

其实呀，**ESLint 虽然是一个代码检测工具，可以检测代码质量问题并给出提示，但是提供的格式化功能有限，在代码风格上面做的不是很好，并且也只能格式化 JS，不支持 CSS,HTML 等语言。而在代码风格上面，Prettier 具有更加强大的功能，并且能够支持包括 JavaScript、TypeScript、各种 CSS、Vue 和 Markdown 等前端绝大部分的语言和文件格式。** 因此，我们一般会将 ESLint 和 Prettier 一起结合起来使用，用 ESLint 进行代码校验，用 Prettier 统一代码风格。

## 3、安装 Prettier

（1）脚手架自动安装

如果是采用脚手架如 Vue-Cli 创建项目，在创建项目时就可以选择安装 Prettier，安装完成后，会自动在项目根目录生成一个.eslintrc.js 文件，里面的默认配置中已经包含了 prettier 的相关扩展。

（2）手动安装

如果已经存在一个项目，并且想要安装 Prettier，可以通过 npm 的方式进行安装。

```
npm install prettier --save-dev
```

## 4、安装 eslint-config-prettier

安装好 Prettier 之后，我们还需要安装 eslint-config-prettier，这是因为 eslint 和 prettier 里面的一些规则可能会存在冲突，这个时候我们就需要安装 eslint-config-prettier，**并且关掉所有和 prettier 冲突的 eslint 配置**。

通过 npm 安装 eslint-config-prettier。

```
npm install eslint-config-prettier --save-dev
```

安装好 eslint-config-prettier 之后，接下来我们就需要关掉所有和 prettier 冲突的 eslint 配置。这里只需要在.eslintrc.js 的 extends 中将 prettier 设置为最后一个 extends 即可，相当于用 prettier 的规则，覆盖掉 eslint:recommended 的部分规则。

```js
extends: ["eslint:recommended", "prettier"],
```

## 5、安装 eslint-plugin-prettier

接下来，我们还需要安装 eslint-plugin-prettier，eslint-plugin-prettier 的作用时是将 prettier 的能力集成到 eslint 中，使得我们在运行 eslint 检查我们的代码时，**能够按照 prettier 的规则检查代码规范性，并进行修复**。

使用 npm 安装 eslint-plugin-prettier。

```
npm install eslint-plugin-prettier
```

安装 eslint-plugin-prettier 后，需要对.eslintrc.js 进行配置。

```js
{
	"rules":{
	    "prettier/prettier":"error"
	},
	"plugins": ["prettier"]，
}
```

除了上面这种配置之外，我们也可以直接将上面两个步骤结合在一起，使用下面的配置就可以。

```js
{
	"extends": [ "eslint:recommended", "plugin:prettier/recommended" ]
}
```

## 6、配置文件

Prettier 和 ESLint 一样，支持我们通过配置文件的方式，实现自定义配置，覆盖原来的 Prettier 配置。

- "prettier" key in your package.json file.
- .prettierrc file written in JSON or YAML.
- .prettierrc.json, .prettierrc.yml, .prettierrc.yaml, or .prettierrc.json5 file.
- .prettierrc.js, .prettierrc.cjs, prettier.config.js, or prettier.config.cjs file that exports an object using module.exports.
- .prettierrc.toml file.

我们可以在根目录创建.prettierrc 文件，.prettierrc 文件支持写入 YAML，JSON 的配置格式，并且支持.yaml，.yml，.json 和.js 后缀。在平时的开发中，一般会选择创建.prettierrc.js 文件，实现对 prettier 配置的覆盖。

在.prettierrc.cjs/js 文件中，我们可以对 prettier 的默认配置进行修改。

```js
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: null,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化内嵌代码
  embeddedLanguageFormatting: 'auto',
}
```

## 7、忽略某些文件的格式化

Prettier 和 ESLint 一样，也支持忽略对某些文件的格式化。如果我们存在一些不需要格式化的文件，可以在根目录创建 **.prettierignore** 文件，并且将不需要格式化的文件或目录名称写在该文件中。

```
dist node_modules .eslintignore .prettierignore
```

## 8、格式化命令

```js
// 格式化所有文件
npx prettier --write .
// 格式化app目录下的所有文件
prettier --write app/
```

## vscode 中使用 prettier

配置好 ESLint 和 Prettier 之后，我们通过运行 eslint 命令，就可以对我们代码进行检查啦。但是，每次要手动运行命令才能检查我们的代码还是有点麻烦，有没有更简单的方式，让我们在编写代码的过程中，只要保存文件就能够对当前文件进行检查，并且自动修复一些错误呢？VSCode 插件：安装 prettier

```json
  "editor.formatOnSave": true,// 开启自动保存
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认格式化工具选择prettier
  // 设定特定语言
  "[vue]": {
	"editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }

```

## Prettier 配合 EditorConfig 使用说明

如果你不知道什么是 editorConfig，或者不知道怎么用，请看 EditorConfig 使用详解。

editorconfig 和 prettier 其实是相辅相成的，是互不矛盾的，共同协作来格式化代码。

editorConfig 中 indent_style 控制的是：编辑器使用制表符（tab）缩进，还是空格（space）缩进，控制编辑器的缩进风格。

prettier 中的 useTabs 控制的是：是否使用制表符缩进，而不使用空格。

如果使用制表符缩进，即 useTabs 值为 true，如果配置了 editorconfig 文件，并安装 editorconfig 插件，则编辑器缩进距离取值为 editorconfig 文件配置的值。如果 indent_style = space，则先取 indent_size 的值，如果没有则取 tab_width 的值；如果 indent_style = tab，则先取 tab_width 的值，如果没有则取 indent_size 的值。如果 useTabs 值为 false，则取 prettier 文件中 tabWidth 的值。

- useTabs = true ----> indent-style = space ----> indent_size/tab_width
- useTabs = true ----> indent-style = tab ----> tab_width/indent_size
- useTabs = false----> prettier ----> tabWidth

如果没有安装 editorconfig 插件，则 useTabs 为 true，取值为编辑器 tabSize 值，如果 useTabs 为 false，取值为 tab_width 值。

优先级说明：

editorConfig 的优先级高于编辑器设置的值，前提是编辑器安装了 EditorConfig 插件。

prettier 中 useTabs 的优先级高于 editorConfig 中的 indent_style。
