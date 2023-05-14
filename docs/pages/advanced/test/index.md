## mocha

[官网地址](https://mochajs.org/) [文章](https://developer.aliyun.com/article/979925)

### 快速上手

1. 安装

```js
npm install --save-dev mocha
```

2. 写入测试文件

```js
// $ mkdir test
// test.js
var assert = require('assert')
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})
```

3. 配置命令

```js
package.json
"scripts": {
  "test": "mocha"
}

```

4. 运行 npm test

### 出现 Cannot use import statement outside a module

- 使用 babel 进行转 node 不支持 esModule
- 项目安装 npm install --save babel-core & npm install --save babel-preset-env 或者 npm install --save babel-preset-es2015
- 根目录下新建.babelrc 写入

```js
{
    "presets": [
      "es2015"/"env"
    ],
    "plugins": []
}
```

- 命令配置
  - "test": "mocha test --compilers js:babel-core/register"

### 新写法

将 `mocha test --compilers js:babel-core/register` 更改为 `mocha test --require @babel/register`。这样，您可以在运行 Mocha 测试时使用 Babel 进行编译。但是，这需要安装 @babel/register 和 @babel/core，您可以使用以下命令安装相应依赖项：

```
npm install --save-dev @babel/register @babel/core
```

这个修改是因为在 Babel 7.x 中，已经弃用了 "babel-core"，并引入了名为 "@babel/core" 的新组件。同时，Mocha 也更新了，已不再使用 "--compilers" 选项，而是通过 "--require" 选项继续支持 Babel。

## jest

[官网地址](https://jestjs.io/zh-Hans/docs/getting-started)
