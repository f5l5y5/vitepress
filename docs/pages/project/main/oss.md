# 打包上传 ali-oss

## 一、技术架构

网页或者移动应用的静态和动态资源分离

- 动态资源（index.html），部署到 ecs 服务器，采用协商缓存，保证每次拉取到都是最新版本
- OSS 结合 CDN 产品，提供静态内容存储、分发到边缘节点的解决方案，利用 CDN 边缘节点缓存的数据，提升同一个文件被同一地区客户大量重复并发下载的体验。优点：
- 降低服务器流量压力
- 提升资源访问速度

![image.png](/project/standard/cdn.png)

## 二、节点说明

1、云服务 ECS 二台：

- 消除单点故障
- 动态资源 index.html 另外：如 favicon.ico 、验证文件等需要放在根目录的资源
- 协商缓存
- nginx 配置： add_header Cache-Control 'private no-cache';//private: 禁止中间代理缓存 no-cache: 采用 http 协商缓存 2、负责均衡 SLB
- 架在两台 ECS 前
- 流量分摊 3、oss：
- 对象存储
- 静态资源 4、cdn：
- 静态资源访问除 index.html 其它资源
- 回源 oss
- 采用强缓存，需要异名更新（带版本号）
- cdn 配置：缓存过期时间 1、类型：文件名后缀 地址：jpg,jpeg,png,svg,mp3,txt,json,webp 过期时间：365 天 权重：99 2、类型：文件名后缀 地址：html,htm 过期时间：0 秒 权重：99 自定义 HTTP 响应头 1、响应头操作：增加 自定义响应头参数：Cache-Control 响应头值：max-age=31536000 是否允许重复：不允许

## 三、项目构建

1、统一构建命令：

```json
#package.json
 "build:dev": "vue-cli-service build --mode dev",
 "build:test": "vue-cli-service build --mode test",
 "build:uat": "vue-cli-service build --mode uat",
 "build:prod": "vue-cli-service build --mode prod",
 "upload:dev": "cross-env VUE_APP_ENV=dev yarn oss --config alioss.config.js",
 "upload:test": "cross-env VUE_APP_ENV=test yarn oss --config alioss.config.js",
 "upload:uat": "cross-env VUE_APP_ENV=uat yarn oss --config alioss.config.js",
 "upload:prod": "cross-env VUE_APP_ENV=prod yarn oss --config alioss.config.js",
```

2、配置资源前缀

```
#.env.[dev | test | uat | prod]
```

# 资源前缀

```
 BASE_URL = 'https://test.img.betterwood.com/admin/member2/'
```

3、配置 publicPath

```
#vue.config.js
publicPath: process.env.BASE_URL,
```

4、构建产物

- 文件列表 ![image.png](/project/standard/dist.png)
- html ![image.png](/project/standard/html.png)

## 四、部署

1、项目内使用@delonix/ali-oss

- 安装

```
yarn add @delonix/ali-oss -D
```

- 根目录下添加配置文件 alioss.config.js

```js
const path = require('path')

const { VUE_APP_ENV } = process.env

const getOSSConfig = () => {
  const config = {
    region: 'oss-cn-shenzhen',
    accessKeyId: '[TODO]',
    accessKeySecret: '[TODO]',
    bucket: 'delonix-test',
  }

  switch (VUE_APP_ENV) {
    case 'uat':
      config.bucket = 'delonix-uat'
      break
    case 'prod':
      config.bucket = 'delonix-prod'
      break
  }
  return config
}

module.exports = {
  oss: getOSSConfig(),
  task: [
    {
      source: path.join(__dirname, 'dist'),
      publicPath: '/[TODO]/',
    },
  ],
}
```

- package.json 添加上传命令

```js
"upload:prod": "cross-env VUE_APP_ENV=prod yarn oss --config alioss.config.js",
```

- 另外，可以通过命令行传入账号信息

```js
npx oss --config alioss.config.js --accessKeyId xxxx --accessKeySecret xxxx --bucket xxx
```

2、jenkins 配置

以 yarn 为例：

```js
yarn install --registry=https://registry.npm.taobao.org
yarn build:prod // 构建生产包
yarn oss --config alioss.production.js // 资源上传到oss
tar -zcvf dist.tar.gz dist// 将生产包处理为压缩包，供后续步骤上上传到 ecs服务器
```

！注意：应该先部署静态资源，最后部署 html；否则，会造成新版本短暂的资源不可访问问题；

## 上传实现方式：

[上传 oss npm 包](https://www.npmjs.com/package/@taoismcn/ali-oss)

```js
#!/usr/bin/env node
'use strict'
var parseArgs = require('minimist')
const OSS = require('ali-oss')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}
var parseArgs__default = /*#__PURE__*/ _interopDefaultLegacy(parseArgs)
const args = parseArgs__default['default'](process.argv.slice(2))

/**
 * @description 主函数
 */
async function main() {
  console.time('√ 耗时')
  console.log(`use config：${args.config || 'alioss.config.js'}`)
  // 获取配置文件
  const absolutePath = `${process.cwd()}/${args.config || 'alioss.config.js'}`
  let config =
    process.env.npm_package_type === 'module'
      ? await import(absolutePath)
      : _interopDefaultLegacy(require(absolutePath))

  console.log('config', config.default, absolutePath)
  config = config.default
  // 判断 有问题如果传入进行参数有,为了方便进行合并
  if (!config.oss) {
    console.error('x 配置文件缺少oss项')
    process.exit(-1)
  }
  // 如果存在 合并配置
  const { region, accessKeyId, accessKeySecret, bucket } = config.oss
  // 优先读取命令的参数 后读取alioss.config.js
  // 合并配置
  const conf = {
    region: args.region || args.r || region,
    accessKeyId: args.accessKeyId || args.i || accessKeyId,
    accessKeySecret: args.accessKeySecret || args.s || accessKeySecret,
    bucket: args.bucket || args.b || bucket,
    timeout: 60000,
  }
  // 重新写入
  config.oss = conf
  console.log(`To Bucket: '${conf.bucket}'`, config)
  // 校验配置
  if (!validate(config)) {
    process.exit(-1)
  }
  await run(config)
}

/**
 * @description 验证oss配置是否存在
 * @param {*} config
 * @returns boolean
 */
function validate(config) {
  const {
    oss: { region, accessKeyId, accessKeySecret, bucket },
    task,
  } = config
  if (!region && !accessKeyId && !accessKeySecret && !bucket) {
    return console.error('x oss配置不正确')
  }
  if (!task || !task.length) {
    return console.error('x 没有配置task项')
  }
  return true
}

/**
 * @description 运行任务
 * @param {*} config
 */
async function run(config) {
  const client = new OSS(config.oss)
  // 并行启动任务
  console.log(`start:任务总数：${config.task.length}`)
  // 每个task其实是将源文件地址和oss上传的路径进行指定
  const results = await Promise.all(config.task.map((task) => runTask(client, task.source, task.publicPath)))
  // 计算文件总数
  let total = 0
  results.forEach((v) => {
    total += v
  })
  console.log(`√ 文件总数: ${total}`)
  console.timeEnd('√ 耗时')
}
let uid = 0
async function runTask(client, from, to) {
  console.log(from, to)
  // 转换成绝对路径
  if (!path.isAbsolute(from)) {
    from = path.resolve(__dirname, from)
  }
  // 获取文件列表
  const files = glob.sync(path.resolve(from, './**/*')).filter((v) => fs.statSync(v).isFile())
  // 上传到 alioss
  await upload(files, from, to, client)
  console.log('打印***files======>', files)
  console.log(`${++uid}、 Done:  { Total:${files.length},  From:'${from}',  To:'${to}' }`)
  return files.length
}

/**
 * @description 上传文件
 * @param {*} files
 * @param {*} from
 * @param {*} to
 * @param {*} client
 * @returns
 */
async function upload(files, from, to, client) {
  return Promise.all(
    files.map((file) => {
      // 目标地址  posix: linux  /   windows: \   ??
      const targetPath = path.posix.normalize(file.replace(from.replace(/\\/g, '/'), to))
      return client
        .put(targetPath, file)
        .then((res) => {
          if (res.res.statusCode === 200) {
            console.error(` ${res.res} 上传成功`)
            return res
          } else {
            console.error(res)
            throw res
          }
        })
        .catch((e) => {
          console.error(e)
          console.error(`❌❌❌  上传失败`)
          process.exit(-1)
        })
    }),
  )
}

main()
```
