# 前置知识

## 1. 什么是异常

程序发生了意想不到的情况，这种情况影响到了程序的正确运行。

1. 错误只有被抛出，才会产生异常，不被抛出的错误不会产生异常。比如：

```js
function t() {
  console.time('start')
  new Error()
  console.timeEnd('start')
}
t()
```

## 2.异常的分类

按照产生异常时程序是否正在运行，我们可以将错误分为「编译时异常」和「运行时异常」。

编译时异常指的是源代码在编译成可执行代码之前产生的异常。而运行时异常指的是可执行代码被装载到内存中执行之后产生的异常。

2.1 编译时异常

我们知道 TS 最终会被编译成 JS，从而在 JS Runtime 中执行。既然存在编译，就有可能编译失败，就会有编译时异常。

比如我使用 TS 写出了如下代码：

```
const s: string = 123;
```

这很明显是错误的代码， 我给 s 声明了 string 类型，但是却给它赋值 number。

当我使用 tsc（typescript 编译工具，全称是 typescript compiler）尝试编译这个文件的时候会有异常抛出：

```
tsc a.ts
a.ts:1:7 - error TS2322: Type '123' is not assignable to type 'string'.
1 const s: string = 123;
        ~
Found 1 error.
```

这个异常就是编译时异常，因为我的代码还没有执行。

2.2 运行时异常

JavaScript 是一种解释型语言，代码的编译和执行是同时进行的。当浏览器解析 JavaScript 代码时，如果遇到语法错误或者类型错误等问题，会立即抛出错误并中止程序的执行，这些错误被称为运行时异常。

```js
function t() {
  console.log('start')
  throw 1
  console.log('end')
}
t()
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c6557fb7b5a488b991708e6f7c7e2ac~tplv-k3u1fbpfcp-watermark.image?)

注意 end 没有打印，并且 t 没有弹出栈。实际上 t 最终还是会被弹出的，只不过和普通的返回不一样。

## 3. js 异常的传播

### 3.1 基本原则

1.  异常会沿着调用栈向上传播，直到被捕获或者到达全局作用域。
1.  当异常在某个函数中被抛出，如果没有被 try-catch 捕获，将会继续向上抛出，直到被捕获或者到达全局作用域。
1.  **一旦异常被捕获，程序会跳转到相应的 catch 块进行处理**，然后执行 finally 块中的代码（如果有）。
1.  如果异常没有被捕获，将会触发浏览器或者 Node.js 进程的默认异常处理机制，导致程序崩溃或者中断。

例如：throw 下面增加一行代码，这行代码是无法被执行的，**「无论这个错误有没有被捕获」**

```js
try {
  const a = null
  a.toString()
  // ==== 后面代码不会执行，会跳到catch，此时不管加不加try catch，同步会直接处理，异步则使用Promise.catch捕获 ===
  console.log('1111')
} catch (error) {
  console.log(error)
}
```

### 3.2 前提知识

在 JavaScript 中，通过 new Error() 构造函数可以创建一个新的错误对象。该对象包含以下属性和方法：

1.  name：错误名称，默认为 "Error"。
1.  message：错误信息，描述了错误的具体原因和上下文。
1.  stack：错误堆栈，包含了引起错误的代码调用链。
1.  toString() 方法：返回完整的错误信息，包括错误名称和错误信息。
1.  instanceof 操作符：可以用来检测一个对象是否是 Error 类型的实例。

```js
const error = new Error('发生了错误')

console.log(error.name) // Error
console.log(error.message) // 发生了错误
console.log(error.stack) // 错误堆栈跟踪信息
console.log(error.toString()) // Error: 发生了错误

console.log(error instanceof Error) // true
console.log(error instanceof TypeError) // false
```

在实际开发中，可以通过自定义错误对象来扩展 Error 类型，以便更好地描述和处理特定的异常情况。例如：

```js
class NetworkError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = 'NetworkError'
  }
}

try {
  throw new NetworkError(2, 123)
} catch (error) {
  if (error instanceof NetworkError) {
    console.error('请求超时', error.message, error.name, error, error.code)
  } else {
    console.error('请求失败', error)
  }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b3f0d32bd03434b964172a3d77350dc~tplv-k3u1fbpfcp-watermark.image?)

### 3.3 异常抛出方式

1. 手动抛出

比如 forEach 函数如果停止循环，可以手动抛出异常进行终止。

```js
;[1, 2, 3].forEach((item, i) => {
  if (i === 1) {
    throw new NetworkError(0, '中断循环')
  }
  console.log(item)
})
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61cb0b2aa279478ea04226e8b5c18edc~tplv-k3u1fbpfcp-watermark.image?)

2. 自动抛出

调用不存在的方法，程序自动抛出异常。

```js
const a = null
a.toString()
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04bfddb8b2ca40f3b0e38abd3307fda0~tplv-k3u1fbpfcp-watermark.image?)

实际前端写代码过程中，比如表格的 loading 加载，code 为 1 默认返回成功 0 失败：

```js
tableLoading = true
const res = axios('/api/getList')
if(res.code===1){
tableData = res.data
}
tableLoading = false
=========添加错误处理=======>
try{
    tableLoading = true
    const res = fetch('/api/getList')
    if(res.code===1){
        tableData = res.data
    }
}finally{
    tableLoading = false
}
```

出现接口异常情况，加载会一直存在。此时需要进行错误捕获更合理。

3. 错误捕获返回 异常 or 数据

拿上面的例子:

如果使用 axios 进行网络请求封装，当接口报错情况下有两种处理方式

- 响应拦截器会抛出异常，每个接口都需要进行 try...catch 捕获
- 统一返回响应数据，定义错误数据格式

```js
const http = axios.create({ baseURL: 'http://localhost:3000'})
// 添加响应拦截器
http.interceptors.response.use( (response) => response ,
(error) => {
    //===========第一种直接抛出错误===============
    return Promise.reject(error) },
    //===========第二种返回响应数据===============
    return {
        code:0,
        err:true,
        data:null,
        msg:error.message
    }
)
===========第一种使用================>
try{
    tableLoading = true
    const res = fetch('/api/getList')
    if(res.code===1){
         tableData = res.data
    }
}catch(err){
    tableLoading = false
}
===========第二种使用================>
 tableLoading = true
 const res = fetch('/api/getList')
 if(!res.err){
    tableData = res.data
  }
 tableLoading = false
```

### 3.4 错误传播理解

以下是一个简单的 JavaScript 错误传播案例，其中在函数调用链中抛出错误并通过 try-catch 语句处理：

```js
function func1() {
  throw new Error('错误发生在 func1')
}

function func2() {
  func1()
}

function func3() {
  func2()
}

try {
  func3()
} catch (err) {
  console.error(err.message)
}
```

以上代码定义了三个函数：func1、func2 和 func3。在 func1 中抛出了一个包含错误信息的 Error 对象，然后将其传递给调用它的函数，即 func2。func2 同样将错误继续传递给调用它的函数，即 func3。

最后，在 func3 中调用 try-catch 语句捕获错误，并通过 console.error() 方法打印错误信息。由于错误被抛出后沿着函数调用链向上传播，因此最终被捕获和处理。

如果直接执行 func3

```js
func3()
```

没有 catch 错误，因此上面才会有**Uncaught Error** ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2451bde5c715422c9c7af633c08989ab~tplv-k3u1fbpfcp-watermark.image?)

如果将 try...catch 放在 func2 中，

```js
function func1() {
  throw new Error('错误发生在 func1')
}

function func2() {
  try {
    func1()
  } catch (error) {
    console.log('func2-error', error)
  }
}

function func3() {
  func2()
}

try {
  func3()
} catch (err) {
  console.error(err.message)
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a8f9e5c3fec48a095e959fe7cd41376~tplv-k3u1fbpfcp-watermark.image?)

处于函数调用栈顶部的函数报错， 其函数调用栈下方的任意函数都可以进行捕获，并且效果没有本质不同。那么问题来了，我到底应该在哪里进行错误处理呢？

如何针对不同 func 的函数，做出不同的错误捕获

责任链模式

责任链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这个对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理他为止。

例如：

```js
class Handler {
  constructor() {
    this.next = null
  }

  setNext(handler) {
    this.next = handler
    return handler
  }

  handle(error, stack) {}
}

class TopHandler extends Handler {
  handle(error, stack) {
    console.error(`Unhandled exception: ${error}\nStack trace:\n${stack.join('\n')}`)
  }
}

class ErrorHandler extends Handler {
  constructor(func) {
    super()
    this.func = func
  }

  handle(error, stack) {
    try {
      this.func(error, stack)
    } catch (e) {
      if (this.next) {
        this.next.handle(e, stack)
      } else {
        throw e
      }
    }
  }
}

function addErrorHandler(func, errorHandler) {
  const top = new TopHandler()
  const error = new ErrorHandler(errorHandler)

  top.setNext(error)

  return function (...args) {
    try {
      return func.apply(this, args)
    } catch (e) {
      top.handle(e, e.stack.split('\n'))
    }
  }
}
```

在这个实现中，与 TypeScript 的实现类似，我们定义了 `Handler` 类和其子类 `TopHandler` 和 `ErrorHandler`。 `TopHandler` 是责任链的顶部节点，负责打印未处理的异常信息。 `ErrorHandler` 是具体的错误处理器，它接收异常和函数调用栈信息，并尝试通过用户自定义的错误处理函数进行处理。如果处理失败，则将异常沿着责任链传递给下一个处理器。最后， `addErrorHandler` 函数用来增加错误处理器，将函数包装成一个新的函数，并返回新的函数。

使用这个实现时，只需要将需要处理异常的函数作为第一个参数，而将错误处理函数作为第二个参数传递给 `addErrorHandler` 函数即可。例如：

```js
function foo() {
  throw new Error('foo error')
}

function bar(error, stack) {
  console.error(`Caught exception: ${error}\nStack trace:\n${stack.join('\n')}`)
}

const safeFoo = addErrorHandler(foo, bar)

safeFoo() // 输出：Caught exception: Error: foo error...
```

在这个例子中， `foo` 函数会抛出一个错误，但我们并没有在函数内部处理异常。通过调用 `addErrorHandler` 函数，我们将 `foo` 函数包装成了一个新的函数 `safeFoo`，并将错误处理函数 `bar` 作为处理器添加到了责任链中。当我们调用 `safeFoo` 函数时，发生的异常会被 `TopHandler` 捕获并沿着责任链向下传递，直到被 `ErrorHandler` 处理。在 `bar` 函数中，我们可以自定义异常处理逻辑，并打印出异常信息和调用栈信息。

所以上面可以用责任链模式进行对应错误处理：

- func1 `抛出错误`
- func2 `输入错误`
- func3 `网络错误`

```js
class NetworkError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = 'NetworkError'
  }
}

function func1() {
  throw new NetworkError('NETWORK_ERROR', '网络错误❌')
}

function func2() {
  try {
    func1()
  } catch (error) {
    if (error.code === 'INPUT_ERROR') {
      return console.log('func2 I can handle INPUT_ERROR')
    }
    // can't handle, pass it down
    throw error
  }
}

function func3() {
  try {
    func2()
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      return console.log('func3 I can handle NETWORK_ERROR')
    }
    // can't handle, pass it down
    throw error
  }
}

func3()
```

这种**只 catch 你可以处理的异常，而将你不能处理的异常 throw 出来」**，这就是责任链模式的典型应用。

## 4. 同步错误 异步错误

同步错误是指在执行 JavaScript 代码时，如果遇到了抛出异常的语句，那么程序就会停止执行，并将控制权交给调用栈中的上一级函数。这种错误通常可以通过 try-catch 语句来捕获和处理。

```js
try {
  const result = 1 / 0
} catch (e) {
  console.log('Caught an error: ', e.message)
}
```

在这个例子中，由于试图将一个数除以零，导致程序抛出了一个异常。我们使用 try-catch 语句来捕获这个异常，并打印出异常信息。

异步错误则指在异步操作（如回调函数、Promise、async/await 等）中发生的错误。当异步操作中的某个函数抛出了异常时，它不会立即被捕获，而是被放入一个事件队列中等待执行。只有当当前所有正在执行的同步代码执行完毕且事件队列为空时，才会去执行队列中的异步错误处理器。因此，我们需要使用特定的方式来捕获和处理异步错误。例如，在 Promise 中，我们可以使用 catch 方法来捕获错误

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Async error'))
  }, 1000)
})
  .then(() => {
    console.log('Success')
  })
  .catch((e) => {
    console.log('Caught an error: ', e.message)
  })
```

在这个例子中，我们创建了一个 Promise，它会在 1 秒后抛出一个异常。在 then 方法中，我们打印出一个成功消息，但由于出现了异常，它并不会被执行。相反，异常被传递给了 catch 方法，并输出了错误信息。

异步错误无法用 try 捕获

```
try {
  fs.readFile("something-not-exist.lucifer", (err, data) => {
    if (err) {
      throw err;
    }
  });
} catch (err) {
  console.log("catching an error");
}
复制代码
```

上面的 `catching an error` 不会被打印。因为错误抛出的时候， 调用栈中不包含这个 catch 语句，而仅仅在执行`fs.readFile`的时候才会。

如果我们换成同步读取文件的例子看看：

```
try {
  fs.readFileSync("something-not-exist.lucifer");
} catch (err) {
  console.log("catching an error");
}
复制代码
```

上面的代码会打印 `catching an error`。因为读取文件被同步发起，文件返回之前线程会被挂起，当线程恢复执行的时候， fs.readFileSync 仍然在函数调用栈中，因此 fs.readFileSync 产生的异常会冒泡到 catch 语句。

简单来说就是**异步产生的错误不能用 try catch 捕获，而要使用回调捕获。**

---

[参考文章 ](https://juejin.cn/post/6844904192549584910#heading-8)

[跨域](https://blog.51cto.com/u_15291238/4820752)
