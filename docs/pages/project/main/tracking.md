# 前置知识

## 什么是异常

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

2.异常的分类

## 了解前端有哪些异常

window.onerror 和 window.addEventListener('error') 区别

## 如何处理异常
