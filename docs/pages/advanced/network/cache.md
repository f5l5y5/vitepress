# 缓存

[参考文章缓存方式](https://juejin.cn/post/6844903747357769742#heading-9)

## 1.强缓存

**`Expires` 优先级低**   这是 HTTP 1.0 的字段，表示缓存到期时间，是一个绝对的时间 (当前时间+缓存时间) 。响应头包含日期/时间，即在此时候之后，响应过期。

问题是如果客户端修改时间，会出现过期。

```jsx
ctx.response.set('Expires', 'Sun, 26 Mar 2023 07:18:59 GMT')
```

**`Cache-Control` 优先级中**   已知 Expires 的缺点之后，在 HTTP/1.1 中，增加了一个字段 Cache-control，该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求。相对时间。

通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

- public：表示资源可以被任何缓存进行缓存，包括客户端和代理服务器。
- private：表示资源只能被客户端缓存，代理服务器不能缓存。
- no-cache：表示客户端缓存资源前必须向服务器发送请求进行验证，验证通过才能使用缓存，否则需要重新从服务器获取资源。
- no-store：表示资源不能被缓存，每次请求都必须重新从服务器获取。
- max-age：表示资源在缓存中的最长有效时间，单位为秒。
- must-revalidate：表示缓存资源在过期后必须经过服务器验证才能继续使用，如果验证失败，则需要重新从服务器获取。

```jsx
// 同时设置 以上面优先
ctx.response.set('Cache-Control', 'max-age=5')
ctx.response.set('Expires', 'Sun, 26 Mar 2023 07:31:59 GMT')
```

**`Pragma` 优先级高**   是一个在 HTTP/1.0 中规定的通用首部，这个首部的效果依赖于不同的实现，所以在“请求 - 响应”链中可能会有不同的效果。它用来向后兼容只支持 HTTP/1.0 协议的缓存服务器，那时候 HTTP/1.1 协议中的 Cache-Control 还没有出来。建议只在需要兼容 HTTP/1.0 客户端的场合下应用 Pragma 首部

与 Cache-Control: no-cache 效果一致。强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证。

```jsx
ctx.response.set('Cache-Control', 'max-age=5')
ctx.response.set('Expires', 'Sun, 26 Mar 2023 07:31:59 GMT')
ctx.response.set('Pragma', 'no-cache')
```

## 2.协商缓存

协商**缓存在请求数上和没有缓存是一致的**，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此 **在响应体体积上的节省是它的优化点**。它的优化覆盖了文章开头提到过的请求数据的三个步骤中的最后一个：“响应”。通过减少响应体体积，来缩短网络传输时间。所以和强制缓存相比提升幅度较小，但总比没有缓存好。

### 2.1 **Last-Modified & If-Modified-Since**

1. 服务器通过 `Last-Modified` 字段告知客户端，资源最后一次被修改的时间，例如

`Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT 复制代码` 2. 浏览器将这个值和内容一起记录在缓存数据库中。 3. 下一次请求相同资源时时，浏览器从自己的缓存中找出“不确定是否过期的”缓存。因此在请求头中将上次的 `Last-Modified` 的值写入到请求头的 `If-Modified-Since` 字段 4. 服务器会将 `If-Modified-Since` 的值与 `Last-Modified` 字段进行对比。如果相等，则表示未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。

但是他还是有一定缺陷的：

- 如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。
- 如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用。

### 2.2 Etag & If-None-Match

为了解决上述问题，出现了一组新的字段 `Etag` 和 `If-None-Match`

`Etag` 存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的 `Etag` 字段。之后的流程和 `Last-Modified` 一致，只是 `Last-Modified` 字段和它所表示的更新时间改变成了 `Etag` 字段和它所表示的文件 hash，把 `If-Modified-Since` 变成了 `If-None-Match`。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。

**Etag 的优先级高于 Last-Modified**

### 2.3 案例

前端代码：

```jsx
let lastModified
let etag
axios
  .get('http://localhost:3000/cache', {
    headers: {
      'If-Modified-Since': lastModified,
      'If-None-Match': etag,
    },
  })
  .then((response) => {
    // 服务器返回的是新的资源，更新本地的 ETag 和 Last-Modified 字段
    if (response.status === 200) {
      console.log('打印***response', response)
      lastModified = response.headers['last-modified']
      etag = response.headers.etag
      console.log('打印***etag', etag)
      // 处理返回的数据
      // ...
    } else if (response.status === 304) {
      // 服务器返回的是缓存的资源，不需要更新本地的 ETag 和 Last-Modified 字段
      // 处理返回的数据
    }
  })
```

后端代码：

```jsx
const Koa = require('koa')
const fs = require('fs')
const cors = require('koa-cors')
const crypto = require('crypto')
const router = require('koa-router')()
const path = require('path')

const app = new Koa()
// 配置跨域
app.use(cors())

// 读取静态文件
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

router.get('/cache', async (ctx) => {
  const filePath = path.resolve(__dirname, 'views/index.html')
  const fileContent = await readFile(filePath)

  // 计算文件的 ETag 和 Last-Modified
  const hash = crypto.createHash('md5').update(fileContent).digest('hex')
  console.log('打印***hash', hash)
  // 获取文件修改的时间
  const lastModified = fs.statSync(filePath).mtime.toUTCString()
  console.log('打印***lastModified', lastModified)

  // 如果客户端请求头中的 If-None-Match 字段与服务端生成的资源的 ETag 字段一致，则返回 304 Not Modified 状态码
  if (ctx.headers['if-none-match'] === hash) {
    ctx.status = 304
    return
  }

  // 如果客户端请求头中的 If-Modified-Since 字段与服务端生成的资源的 Last-Modified 字段一致或更晚，则返回 304 Not Modified 状态码
  if (ctx.headers['if-modified-since'] === lastModified) {
    ctx.status = 304
    return
  }

  // 设置响应头中的 ETag 和 Last-Modified 字段
  // ctx.set('Content-Type', 'text/html')
  ctx.set('Access-Control-Expose-Headers', '*') // 暴露给客户端使用
  ctx.set('ETag', hash)
  ctx.set('Last-Modified', lastModified + Math.random())

  ctx.body = fileContent
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

:::tips ctx.set('Access-Control-Expose-Headers', '\*') // 暴露给客户端使用 否则 axios 获取不到

由于 etag 优先级高所以优先缓存 :::

## 3.缓存存放位置

我看过的大部分讨论缓存的文章会直接从 HTTP 协议头中的缓存字段开始，例如 `Cache-Control`, `ETag`, `max-age` 等。但偶尔也会听到别人讨论 memory cache, disk cache 等。**那这两种分类体系究竟有何关联？是否有交叉？**(我个人认为这是本文的最大价值所在，因为在写之前我自己也是被两种分类体系搞的一团糟)

实际上，HTTP 协议头的那些字段，都属于 disk cache 的范畴，是几个缓存位置的其中之一。因此本着从全局到局部的原则，我们应当先从缓存位置开始讨论。等讲到 disk cache 时，才会详细讲述这些协议头的字段及其作用。

我们可以在 Chrome 的开发者工具中，Network -> Size 一列看到一个请求最终的处理方式：如果是大小 (多少 K， 多少 M 等) 就表示是网络请求，否则会列出 `from memory cache`, `from disk cache` 和 `from ServiceWorker`。

它们的优先级是：(由上到下寻找，找到即返回；找不到则继续)

1. Service Worker
2. Memory Cache
3. Disk Cache
4. 网络请求

## 4. nginx 配置缓存

```jsx
location / {
  add_header Last-Modified $date_gmt;
  if_modified_since before;
}
location / {
  add_header ETag $etag;
  if_none_match $etag;
}
```

禁用协商缓存

```jsx
location / {
  expires -1;
  add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0";
}
```

如果同时存在，看强缓存有没有，没有以协商为

```jsx
location / {
			# 全部禁用
      expires -1;
      add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0";

			# 重写强缓存 没有重写 以expires为准
			add_header 'Cache-Control' "public, max-age=10";
			expires 7d;

			# 协商缓存
			add_header 'Cache-Control' "public, no-cache";

      # 强缓存 -1 不使用缓存 max 最大值 315360000
			expires max;

			# 关闭 etag
			# etag off;

			# 关闭 Last-Modified
			add_header Last-Modified "";

			# OPTIONS 直接返回204
			if ($request_method = 'OPTIONS') {
				return 204;
			}
    }
```

add_header 'Cache-Control' "public, no-cache, no-store, must-revalidate, max-age=0";

# 强缓存 -1 不使用缓存 max 最大值 315360000

expires -1;

add_header 'Cache-Control' "public, no-cache, no-store, must-revalidate, max-age=0";

# 强缓存 -1 不使用缓存 max 最大值 315360000

expires max;

add_header 'Cache-Control' "public, no-cache";

# 强缓存 -1 不使用缓存 max 最大值 315360000

# expires max;

不设置默认协商缓存

只关闭 last

expires 会加入 cache-control 设置为 max-age xxx


## 4. Nginx配置缓存
