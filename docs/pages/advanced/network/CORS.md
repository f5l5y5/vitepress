# 1. 跨域

案例中使用 koa 进行后端演示

## 1.1 为什么会跨域

当一个资源从与该资源本身所在的服务器不同的域名(www.baidu.com)、协议(http)或端口(80/443)请求一个资源时，资源会发起一个跨域 HTTP 请求。同源策略参考浏览器的[同源策略 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

出于安全原因，浏览器限制从脚本内发起的跨源 HTTP 请求，XMLHttpRequest 和 Fetch API，只能从加载应用程序的同一个域请求 HTTP 资源，除非使用 CORS 头文件

对于浏览器限制这个词，要着重解释一下：

- 不一定是浏览器限制了发起跨站请求，如果 OPTIONS 未通过，是不会发请求到后端。
- 也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了

[MDN CORS 解释](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

## 1.2 CORS 流程介绍

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

![image:png](/advanced/network/corsflow.png)

## 1.3 什么是预检 options

[MDN OPTIONS 定义](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的“预检”请求。在预检中，浏览器发送的头中标示有 HTTP 方法和真实请求中会用到的头。

## 1.4 预检怎么产生

正常情况下，简单请求不会产生 OPTIONS 请求。

1. 简单请求

不会触发 CORS 预检的请求称为简单请求，满足以下所有条件的才会被视为简单请求，基本上我们日常开发只会关注前面两点

- 使用 GET、POST、HEAD 其中一种方法
- 只使用了如下的安全首部字段，不得人为设置其他首部字段
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type 仅限以下三种
    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded
  - HTML 头部 header field 字段：DPR、Download、Save-Data、Viewport-Width、WIdth
- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问
- 请求中没有使用 ReadableStream 对象

2. 预检请求

需预检的请求要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响

下面的请求会触发预检请求，其实非简单请求之外的就会触发预检，就不用记那么多了

- 使用了 PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH 方法
- 人为设置了非规定内的其他首部字段，参考上面简单请求的安全字段集合，还要特别注意 Content-Type 的类型
- XMLHttpRequestUpload 对象注册了任何事件监听器
- 请求中使用了 ReadableStream 对象

## 1.5 请求附带身份凭证 -> cookies

如果发起请求时设置 withCredentials 标志设置为 true，从而向服务器发送 cookie， 但是如果服务器端的响应中未携带 Access-Control-Allow-Credentials: true，浏览器将不会把响应内容返回给请求的发送者。

对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为\*， 必须是某个具体的域名

注意，简单 GET 请求不会被预检；如果对此类带有身份凭证请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页

## 1.6 案例实现

注意点：

- 前端必须开启 withCredentials 为 true 才带 cookies
- options 中不设置 Access-Control-Allow-Credentials', 'true'， 不会发 get 请求，尽管显示成功 options
- 设置为 true 后，可以 get 请求，但是浏览器会显示跨域，需要将 get 请求的头 Access-Control-Allow-Credentials 设置为 true

前端代码：

```js
axios.get('http://localhost:3000/getList', {
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true, // 是否携带身份验证
})
```

服务器代码 koa

```js
const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

router.options('/getList', (ctx) => {
  // ctx.response.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE')
  ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With')
  ctx.response.set('Access-Control-Allow-Credentials', 'true')
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:5173')
  console.log('打印***ctx', ctx)
  ctx.body = 204
  ctx.response.status = 204
})

router.get('/getList', (ctx) => {
  // ctx.response.set('Access-Control-Allow-Methods', 'POST')
  // ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With')
  ctx.response.set('Access-Control-Allow-Credentials', 'true')
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:5173')
  console.log(ctx)
  ctx.body = 'node1List'
})

// 配置路由（建议写在开启服务器的前面） 允许所有的请求方法
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

报错： ![image:png](/advanced/network/errortip.png)

```js
{
  request: {
    method: 'OPTIONS',
    url: '/getList',
    header: {
      host: 'localhost:3000',
      connection: 'keep-alive',
      pragma: 'no-cache',
      'cache-control': 'no-cache',
      accept: '*/*',
      'access-control-request-method': 'GET', // 请求的方式
      'access-control-request-headers': 'x-requested-with', // 请求头
      origin: 'http://localhost:5173',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-fetch-dest': 'empty',
      referer: 'http://localhost:5173/',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9'
    }
  },
  response: {
    status: 404,
    message: 'Not Found',
    header: [Object: null prototype] {}
  },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/getList',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}

// --------------------------  get 请求中有cookies --------------------

{
  request: {
    method: 'GET',
    url: '/getList',
    header: {
      host: 'localhost:3000',
      connection: 'keep-alive',
      pragma: 'no-cache',
      'cache-control': 'no-cache',
      'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
      accept: 'application/json, text/plain, */*',
      'x-requested-with': 'XMLHttpRequest',
      'sec-ch-ua-mobile': '?0',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'sec-ch-ua-platform': '"macOS"',
      origin: 'http://localhost:5173',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      referer: 'http://localhost:5173/',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9',
      cookie: 'hello=mimi'
    }
  },
  response: {
    status: 404,
    message: 'Not Found',
    header: [Object: null prototype] {
      'access-control-allow-credentials': 'true',
      'access-control-allow-origin': 'http://localhost:5173'
    }
  },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/getList',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}


```

完整请求流程 ![image:png](/advanced/network/wholeRequest.png)

## 1.7 如何解决跨域

使用几种方式解决跨域

## 1.8 JSONP

前面咱们说了，因为浏览器同源策略的存在，导致存在跨域问题，那有没有不受跨域问题所束缚的东西呢？其实是有的，以下这三个标签加载资源路径是不受束缚的

1. script 标签：`<script src="加载资源路径"></script>`
2. link 标签：`<link herf="加载资源路径"></link>`
3. img 标签：`<img src="加载资源路径"></img>`

而 JSONP 就是利用了 script 的 src 加载不受束缚，从而可以拥有从不同的域拿到数据的能力。但是 JSONP 需要前端后端配合，才能实现最终的跨域获取数据。

JSONP 通俗点说就是：利用 script 的 src 去发送请求，将一个方法名 callback 传给后端，后端拿到这个方法名，将所需数据，通过字符串拼接成新的字符串 callback(所需数据)，并发送到前端，前端接收到这个字符串之后，就会自动执行方法 callback(所需数据)。老规矩，先上图，再上代码。

JSONP（JSON with padding）是一种通过向 DOM 添加包含回调函数的 URL 的脚本元素来进行跨域请求的技术。服务器返回用回调函数包装的 JSON 数据，可以在客户端中处理。以下是 JSONP 的基本实现步骤：

1. 在客户端创建一个函数来处理 JSONP 的响应。例如：

```js
function handleResponse(response) {
  console.log(response)
}
```

2. 在客户端创建一个`<script>`标签来发出 JSONP 请求。例如：

```js
const script = document.createElement('script')
script.src = 'http://localhost:4000?callback=handleResponse'
document.body.appendChild(script)

//在上面的代码中，handleResponse函数是用来处理响应的，https://example.com/data.json是JSONP的URL，callback参数是在URL中传递的回调函数名称，它告诉服务器将响应包装在这个函数的调用中，以便在客户端中使用。
```

3. 服务器返回 JSONP 响应，它由回调函数名和 JSON 数据组成的 JavaScript 代码。例如：

```js
handleResponse({
  name: 'John',
  age: 30,
  city: 'New York',
})
```

前端代码：

```js
const jsonp = (url, params, cbName) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    window[cbName] = (data) => {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback: cbName }
    const arr = Object.keys(params).map((key) => `${key}=${params[key]}`)
    script.src = `${url}?${arr.join('&')}`
    document.body.appendChild(script)
  })
}

jsonp('http://localhost:4000/getList', { name: 'jack', age: 23 }, 'callback').then((data) => {
  console.log(data)
})
```

后端代码：

```js
const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

router.get('/getList', (ctx) => {
  const { name, age, callback } = ctx.request.query
  const person = `我是${name}年龄${age}`
  ctx.body = `${callback}(${JSON.stringify(person)})`
})

// 配置路由（建议写在开启服务器的前面） 允许所有的请求方法
app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
  console.log('http://localhost:4000')
})
```

## 1.9 websocket

WebSocket 不附属于同源策略

前端代码：

```js
function myWebsocket(url, params) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url)
    socket.onopen = () => {
      socket.send(JSON.stringify(params))
    }
    socket.onmessage = (e) => {
      resolve(e.data)
    }
  })
}
myWebsocket('ws://localhost:8000', { name: 'jack', age: 23 }).then((data) => {
  console.log(data)
})
```

后端代码：需要安装 yarn add ws

```js
const Websocket = require('ws')

const port = 8000
const ws = new Websocket.Server({ port })
ws.on('connection', (obj) => {
  obj.on('message', (data) => {
    data = JSON.parse(data.toString())
    const { name, age } = data
    obj.send(`${name}今年${age}岁啦！！！`)
  })
})
```

## 1.10 CORS 跨域资源共享

CORS，全称是 Cross-Origin Resource Sharing，意思是跨域资源共享，CORS 一般是由后端来开启的，一旦开启，前端就可以跨域访问。

看前端报错：

```
Access to XMLHttpRequest at 'http://localhost:3000/getList' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

前端跨域访问到后端，后端开启 CORS，将响应头中的 Access-Control-Allow-Origin: 设置为请求的域名，前端浏览器判断 Access-Control-Allow-Origin 的域名如果跟前端域名一样，浏览器就不会实行跨域拦截，从而解决跨域问题。

前端代码：

**注意：get 请求参数直接拼接，post 请求在 send 中放入**

```js
function http(method, url, data, successCallback, errorCallback) {
  // 创建一个XMLHttpRequest对象
  const xhr = new XMLHttpRequest()

  // 设置请求的参数和回调函数
  xhr.open(method, url)
  // xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = function () {
    // 在回调函数中，我们检查readyState属性是否为XMLHttpRequest.DONE，表示请求已完成。
    if (xhr.readyState === XMLHttpRequest.DONE) {
      //如果status属性为200，表示请求成功，我们调用成功回调函数并将响应内容作为参数传递。
      if (xhr.status === 200) {
        successCallback(xhr.responseText)
      } else {
        errorCallback(xhr.status)
      }
    }
  }

  // 发送请求
  xhr.send(JSON.stringify(data))
}

http(
  'post',
  'http://localhost:4000/getList',
  { name: 'jack', age: 18 },
  function (response) {
    console.log(response)
  },
  function (status) {
    console.error('请求失败：' + status)
  },
)
```

后端代码：

```js
const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

// 动态路由
router.post('/getList', (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  ctx.body = {
    data: 'jack',
  }
})
// 配置路由（建议写在开启服务器的前面） 允许所有的请求方法
app.use(router.routes()).use(router.allowedMethods())
app.listen(4000, () => {
  console.log('http://localhost:4000')
})
```

![image:png](/advanced/network/xhr.png)

## 1.11 Node 接口代理

还是回到同源策略，同源策略它只是浏览器的一个策略而已，它是限制不到后端的，也就是前端-后端会被同源策略限制，但是后端-后端则不会被限制，所以可以通过 Node 接口代理，先访问已设置 Cors 的后端 1，再让后端 1 去访问后端 2 获取数据到后端 1，后端 1 再把数据传到前端

![image:png](/advanced/network/node.png)

前端代码：

```js
<script>
	function http(method, url, data, successCallback, errorCallback) {
		// 创建一个XMLHttpRequest对象
		const xhr = new XMLHttpRequest()

		// 设置请求的参数和回调函数
		xhr.open(method, url)
		// xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.onreadystatechange = function () {
			// 在回调函数中，我们检查readyState属性是否为XMLHttpRequest.DONE，表示请求已完成。
			if (xhr.readyState === XMLHttpRequest.DONE) {
				//如果status属性为200，表示请求成功，我们调用成功回调函数并将响应内容作为参数传递。
				if (xhr.status === 200) {
					successCallback(xhr.responseText)
				} else {
					errorCallback(xhr.status)
				}
			}
		}

		// 发送请求
		xhr.send(JSON.stringify(data))
	}

	http(
		'get',
		'http://localhost:3000/getList',
		{},
		function (response) {
			console.log(response)
		},
		function (status) {
			console.error('请求失败：' + status)
		}
	)
</script>

```

后端服务器 1

安装 axios 进行请求

```js
const Koa = require('koa')
const router = require('koa-router')()
const axios = require('axios')

const app = new Koa()

router.get('/getList', async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  const res = await axios.get('http://localhost:4000/getList1')
  ctx.body = res.data
})

// 配置路由（建议写在开启服务器的前面） 允许所有的请求方法
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

后端服务器 2:

```js
const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()
router.get('/getList1', (ctx) => {
  ctx.body = `返回的数据`
})
// 配置路由（建议写在开启服务器的前面） 允许所有的请求方法
app.use(router.routes()).use(router.allowedMethods())
app.listen(4000, () => {
  console.log('http://localhost:4000')
})
```

## 1.12 Nginx 代理

其实 Nginx 跟 Node 接口代理是一个道理，只不过 Nginx 就不需要我们自己去搭建一个中间服务

nginx 配置

```js
server {
    listen 80;
    server_name 127.0.0.1;

    location /api {
      rewrite ^/api(.*)$ $1 break; //^/api(.*)$表示匹配以/api开头，其余部分保存为变量$1。$1表示将请求重写为$1的值。
      proxy_pass http://127.0.0.1:4000; //请求转发到http://backend_server_ip:8080。
      proxy_set_header Host $host;//设置了一些请求头信息，以便后端服务器可以正确地处理请求。
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
```

同 node 代理

## 1.13 postMessage

场景：http://127.0.0.1:5500/index.html页面中使用了iframe标签内嵌了一个http://127.0.0.1:5555/index.html的页面

虽然这两个页面存在于一个页面中，但是需要 iframe 标签来嵌套才行，这两个页面之间是无法进行通信的，因为他们端口号不同，根据同源策略，他们之间存在跨域问题那应该怎么办呢？

使用 postMessage 可以使这两个页面进行通信

```html
// http:127.0.0.1:5500/index.html

<body>
  <iframe src="http://127.0.0.1:5555/index.html" id="frame"></iframe>
</body>
<script>
  document.getElementById('frame').onload = function () {
    this.contentWindow.postMessage({ name: '林三心', age: 23 }, 'http://127.0.0.1:5555')
    window.onmessage = function (e) {
      console.log(e.data) // 林三心今年23岁啦！！！
    }
  }
</script>
```

```html
// http://127.0.0.1:5555/index.html

<script>
  window.onmessage = function (e) {
    const {
      data: { name, age },
      origin,
    } = e
    e.source.postMessage(`${name}今年${age}岁啦！！！`, origin)
  }
</script>
```

## 1.14 document.domain && iframe

场景：a.sanxin.com/index.html 与 b.sanxin.com/index.html 之间的通信

其实上面这两个正常情况下是无法通信的，因为他们的域名不相同，属于跨域通信那怎么办呢？

其实他们有一个共同点，那就是他们的二级域名都是 sanxin.com，这使得他们可以通过 document.domain && iframe 的方式来通信

```html
// http://127.0.0.1:5500/index.html

<body>
  <iframe src="http://127.0.0.1:5555/index.html" id="frame"></iframe>
</body>
<script>
  document.domain = '127.0.0.1'
  document.getElementById('frame').onload = function () {
    console.log(this.contentWindow.data) // 林三心今年23岁啦！！！
  }
</script>
```

```html
// http://127.0.0.1:5555/index.html

<script>
  // window.name="林三心今年23岁啦！！！"
  document.domain = '127.0.0.1'
  var data = '林三心今年23岁啦！！！'
</script>
```
