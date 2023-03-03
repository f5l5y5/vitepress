# eslint

## 1、什么是 ESLint

ESLint 是一款插件化的 JavaScript 代码静态检查工具，**其核心是通过对代码解析得到的 AST（Abstract Syntax Tree，抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力**。

ESLint 的使用其实并不复杂。安装相关依赖之后，可以直接使用开源的配置方案，例如 eslint-config-airbnb 或 eslint-config-standard，当然，你也可以根据个人或团队的代码风格进行配置。配置完成之后，就可以通过命令行工具或借助编辑器集成的 ESLint 功能对工程代码进行静态检查，发现和修复不符合规范的代码，ESLint 提供的 auto-fix 能力也能够帮助我们自动修复一些代码格式问题。

## 2、安装 ESLint

（1）脚手架自动安装

如果是采用脚手架如 Vue-Cli 创建项目，在创建项目时就可以选择安装 ESLint，安装完成后，会自动在项目根目录生成一个.eslintrc.js 文件，里面已经生成了 ESLint 的初始化默认配置。

（2）手动安装

如果是已经存在一个项目，并且想要安装 ESLint，可以通过 npm 的方式进行安装。

```js
npm install eslint --save-dev
```

安装完成后，可以执行下面命令进行 ESLint 的初始化配置。

```js
eslint --init
```

经过一系列一问一答的环节后，你会发现在你项目根目录已经生成了一个 .eslintrc.js 文件，该文件主要用来进行 ESLint 的配置。

## 3、ESLint 配置方式

ESlint 被设计为完全可配置的，我们可以混合和匹配 ESLint 默认绑定的规则和自己定义的规则，根据实际需求对每一个规则进行开启或关闭，以让 ESLint 更适合我们的项目。一般有两种主要的方式来配置 ESLint：

（1）Configuration Comments - **使用注释把 lint 规则嵌入到源码中**

这种配置方式允许我们使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中，如下面的代码所示，可以直接在代码中使用 ESLint 能够识别的注释方式，进行 Lint 规则的定义，下面的规则表示如果使用 console 语法便会报错。

```js
;/_ eslint no-console: "error" _/
console.log('this is an eslint rule check!')
```

当我们用命令行执行 eslint xxx.js 检查上述文件时，就会发现 eslint 给出报错信息。

（2）Configuration Files - 使用配置文件进行 lint 规则配置

除了上面的配置方式，另外一个更好的方式就是在项目根目录创建配置文件进行 ESLint 的配置，目前配置文件主要支持以下三种文件类型：

- JavaScript（eslintrc.js）
- YAML（eslintrc.yaml）
- JSON（eslintrc.json）、
- 在 package.json 文件中添加 eslintConfig 字段进行配置。

一般采用了在根目录创建.eslintrc.js 的方式对 eslint 进行配置。.eslintrc.js 中一般配置。

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 'latest', // 使用最新的ECMA标准
      sourceType: 'module',
      //指定要使用其他那些语言对象
      experimentalObjectRestSpread: true, //启用对对象的扩展
      jsx: true, //启用jsx语法
      globalReturn: true, //允许return在全局使用
      impliedStrict: true, //启用严格校验模式
    },
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {},
}
```

## 4、ESLint 配置项解析

接下来主要对 ESLint 配置文件中的配置项进行介绍。

（1）parser 解析器

ESLint **默认使用 Espreer 作为其解析器，但是该解析器仅支持最新的 ECMPScript(es5)标准，对于实验性的语法和非标准（例如 Flow 或 TypeScript 类型）语法是不支持的**。因此，开源社区提供了以下两种解析器来丰富相关的功能：

- babel-eslint：Babel 一个工具链，主要用于将 ECMAScript 2015+(es6+) 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。因此，如果在项目中使用 es6，就需要将解析器改成 babel-eslint。

- @typescript-eslint/parser：该解析器将 TypeScript 转换成与 estree 兼容的形式， 允许 ESLint 验证 TypeScript 源代码。

（2）parserOptions 解析器选项

除了可以自定义解析器外，ESLint 允许指定你想要支持的 JavaScript 语言选项。**默认情况下，ESLint 支持 ECMPScript 5 语法。你可以覆盖该设置，以启用对 ECMPScript 其它版本和 JSX 的支持**。

（3）env 和 global - 环境和全局变量

**ESLint 会检测未声明的变量，并发出警告，但是有些变量是我们引入的库声明的，这里就需要提前在配置中声明。** 每个变量有三个选项，writable，readonly 和 off，分别表示可重写，不可重写和禁用。

```json
{
  "globals": {
    // 声明 jQuery 对象为全局变量
    "$": false // true 表示该变量为 writeable，而 false 表示 readonly "jQuery": false
  }
}
```

**在 globals 中一个个的进行声明未免有点繁琐，这个时候就需要使用到 env，这是对一个环境定义的一组全局变量的预设**。当然，我们可以在 golbals 中使用字符串 off 禁用全局变量来覆盖 env 中的声明。

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "jquery": true // 环境中开启 jquery，表示声明了 jquery 相关的全局变量，无需在 globals 二次声明
  }
}
```

如果是微信小程序开发，env 并没有定义微信小程序变量，需要在 globals 中手动声明全局变量，否则在文件中引入变量，会提示报错。声明如下所示：

```json
{
  "globals": {
    "wx": true,
    "App": true,
    "Page": true,
    "Component": true,
    "getApp": true,
    "getCurrentPages": true,
    "Behavior": true,
    "global": true,
    "__wxConfig": true
  }
}
```

（4）rules 规则

ESLint 附带有大量的规则，你可以在配置文件的 rules 属性中配置你想要的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：

- off 或 0：关闭规则
- warn 或 1：开启规则，warn 级别的错误 (不会导致程序退出)
- error 或 2：开启规则，error 级别的错误(当被触发的时候，程序会退出)

如以下代码，在 rules 中设置关闭某些规则

```js
rules: {
	'no-loop-func': 'off',
	'no-param-reassign': 'off',
	'no-nested-ternary': 'off',
	'no-underscore-dangle': 'off',
}
```

（5）plugins 插件

虽然官方提供了上百种的规则可供选择，但是这还不够，**因为官方的规则只能检查标准的 JavaScript 语法，如果你写的是 JSX 或者 TypeScript**，ESLint 的规则就开始束手无策了。

这个时候就需要安装 ESLint 的插件，来定制一些特定的规则进行检查。ESLint 的插件与扩展一样有固定的命名格式，以 **eslint-plugin-开头**，使用的时候也可以省略这个头。

举个例子，我们要在项目中使用 TypeScript，前面提到过，**需要将解析器改为@typescript-eslint/parser，同时需要安装@typescript-eslint/eslint-plugin 插件来拓展规则，添加的 plugins 中的规则默认是不开启的，我们需要在 rules 中选择我们要使用的规则。** 也就是说 plugins 是要和 rules 结合使用的。如下所示：

```js

// npm i --save-dev @typescript-eslint/eslint-plugin
// 注册插件
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
// 引入插件
"rules":{
  "@typescript-eslint/rule-name": "error" ,// 使用插件规则
  '@typescript-eslint/adjacent-overload-signatures': 'error', '@typescript-eslint/ban-ts-comment': 'error',
  '@typescript-eslint/ban-types': 'error',
  '@typescript-eslint/explicit-module-boundary-types': 'warn',
  '@typescript-eslint/no-array-constructor': 'error',
  'no-empty-function': 'off',
  '@typescript-eslint/no-empty-function': 'error',
  '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
 }
}
```

（6）extends 扩展

**extends 可以理解为一份配置好的 plugin 和 rules**，extends 属性值一般包括以下两种：

- 指定配置的字符串: 比如官方提供的两个拓展 eslint:recommended 或 eslint:all，可以启用当前安装的 ESLint 中所有的核心规则，省得我们在 rules 中一一配置。
- 字符串数组：每个配置继承它前面的配置。如下所示，拓展是一个数组，ESLint 递归地扩展配置, 然后使用 rules 属性来拓展或者覆盖 extends 配置规则。

```json
{
  "extends": [
    "eslint:recommended", // 官方拓展
    "plugin:@typescript-eslint/recommended", // 插件拓展
    "standard" // npm 包，开源社区流行的配置方案，比如：eslint-config-airbnb、eslint-config-standard
  ],
  "rules": {
    "indent": ["error", 4], // 拓展或覆盖 extends 配置的规则
    "no-console": "off"
  }
}
```

(7) overrides

## 5、运行 ESLint 检查文件

当我们配置好.eslintrc.js 文件后，我们就可以通过运行 ESLint 相关命令，对指定文件进行检查，假设当前的项目目录如下所示：

其中，.eslintrc.js 文件的配置如下，这里采用了 Vue-Cli 创建项目后给出的默认配置。

```js
module.exports = {
  root: true,
  env: { node: true },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: { parser: 'babel-eslint' },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
```

当我们想对某个文件进行检查时，只需要在当前目录打开命令行窗口，输入以下命令，就可以对某个文件或某个目录下的所有文件进行检查。如果执行完命令后什么也没有输出，就说明我们的代码已经通过 ESLint 检查，可以放心提交代码。

```js
eslint src/APP.vue 　　// 检查指定的文件
eslint src/\*.vue 　　 // 检查 src 目录下的所有文件
```

但是如果出现以下提示或报错，就说明我们的代码没有通过 ESLint 的检查，需要按照提示进行修改。

有些同学一执行完上述命令，可能会吓了一跳，怎么报了这么多错误？不急，我们可以执行以下的 ESLint 自动修复命令，对一些错误进行自动修复。不过，这个命令只能自动修复一些代码格式上的错误（比如 ESLint 的配置要求需要使用双引号，但是写代码时采用了单引号而报错），对于一些语法错误，就需要我们手动去修复。

```js
eslint src/APP.vue --fix // 检查指定的文件，并且自动修复错误
eslint src/\*.vue --fix // 检查 src 目录下的所有文件，并且自动修复错误
```

## 6、跳过 ESLint 的检查

在实际的使用场景中，我们可能存在某些文件或某行代码，希望能够跳过 ESLint 的检查，下面主要介绍了几种跳过 ESLint 检查的方式：

（1）使用注释跳过 ESLint 的检查

- 块注释： 使用如下方式，可以在整个文件或者代码块禁用所有规则或者禁用特定规则：

```js
/* eslint-disable */
alert('该注释放在文件顶部，整个文件都不会出现 lint 警告')

/* eslint-disable */
alert('块注释 - 禁用所有规则')
/* eslint-enable */

/* eslint-disable no-console, no-alert */
alert('块注释 - 禁用 no-console, no-alert 特定规则')
/* eslint-enable no-console, no-alert */
```

- 行注释： 使用如下方式可以在某一特定的行上禁用所有规则或者禁用特定规则：

```js
alert('禁用该行所有规则') // eslint-disable-line

// eslint-disable-next-line alert('禁用该行所有规则');

/* eslint-disable-next-line no-alert */
alert('禁用该行 no-alert 特定规则')

alert('禁用该行 no-alert, quotes, semi 特定规则')
/* eslint-disable-line no-alert, quotes, semi*/
```

（2）创建.eslintignore 文件忽略某些文件的检查

在项目根目录创建.eslintignore 文件，在该文件中添加需要跳过检查的文件名称，ESLint 将会跳过这些文件的检查。如下所示，ESLint 将会跳过 dist、node_modules 和 package.json 文件的检查。

```
dist node_modules package.json
```

## 7、vscode 中使用 eslint

安装 eslint 插件，配置中设置

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
