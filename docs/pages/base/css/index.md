## CSS

## 1.1 弄清 screenHeight、clientHeight、scrollHeight、scrollTop、offsetTop、offsetHeight

以 1920\*1080 屏幕为例：

1. 屏幕相关 window.screen 由浏览器决定提供屏幕对象，此对象一般通过当前浏览器窗口活动状态动态检测来得到。

   1. width/height 屏幕分辨率的宽高 1920/1080
   2. availWidth/availHeight 指浏览器占整个屏幕的高度（如有任务栏即需要减去任务栏的高度） 1872/1080
   3. availTop/availLeft 离最上方/左边像素值 0/0 如果有扩展屏 availLeft 是扩展屏的宽度

2. 元素相关 clientHeight offsetHeight scrollHeight

2.1. Element.clientHeight/clientWidth

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .container {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    overflow-x: auto;
    border: 1px solid pink;
    padding: 10px;
    background-color: skyblue;
  }
</style>

<body>
  <div class="container"> 11111111111111111111111111111111111111111111111111111111111</div>
</body>

<script>
  const dom = document.querySelector('.container')
  console.log(dom.clientHeight, dom.clientWidth) //默认为120 120 但垂直方向出现滚动条 高度需要减去滚动条高度 所以是 105 120
</script>
```

对于没有定义 CSS 或者内联布局盒子的元素为 0；否则，它是元素内部的高度（以像素为单位），包含内边距，但不包括边框、外边距和水平滚动条（如果存在）。

clientHeight/clientWidth 可以通过 CSS height + CSS padding - 水平滚动条高度/垂直滚动条宽度（如果存在）来计算。 备注： 此属性会将获取的值四舍五入取整数。如果你需要小数结果，请使用 element.getBoundingClientRect()

2.2. Element.clientTop

一个元素顶部边框的宽度（以像素表示）。不包括顶部外边距或内边距。上边框宽度

2.3. Element.clientLeft

一个元素的左边框的宽度，以像素表示。如果元素的文本方向是从右向左（RTL, right-to-left），并且由于内容溢出导致左边出现了一个垂直滚动条，则该属性包括滚动条的宽度。clientLeft 不包括左外边距和左内边距。

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .container {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    overflow-x: auto;
    border: 1px solid pink;
    direction: rtl; /* 设置从右向左显示 */
    padding: 10px;
    background-color: skyblue;
  }
</style>

<body>
  <div class="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </div>
</body>

<script>
  const dom = document.querySelector('.container')
  console.log(dom.clientLeft) // 默认1 加上滚动条 16
</script>
```

2.4. scrollHeight/scrollWidth

是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。

scrollHeight 的值等于该元素在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度（整数）。没有垂直滚动条的情况下，scrollHeight === clientHeight 。包括元素的 padding，但不包括元素的 border 和 margin。scrollHeight 也包括 ::before 和 ::after 这样的伪元素。

```js
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100px;
      height: 100px;
      overflow: auto;
      border: 1px solid pink;
      padding: 10px; /* 包含padding */
      background-color: skyblue;
    }
    .container div {
      height: 20px;
    }
  </style>
  <body>
    <div class="container">
      <div>11111111111111111111</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </body>

  <script>
    const dom = document.querySelector('.container')
    console.log(dom.scrollHeight, dom.clientHeight, dom.scrollWidth, dom.clientWidth)
    // 132  =  100 + 20 padding + 12超出部分  120有滚动条105  // 198 = 100 + p20 + 超出部分78  120 =》105
    // 检测是否到底部
    dom.onscroll = function (e) {
      console.log(dom.scrollHeight - dom.clientHeight - dom.scrollTop)
    }
    // 能否滚动
    console.log(window.getComputedStyle(dom).overflowY) // auto
    console.log(window.getComputedStyle(dom).overflowX)
  </script>

```

2.5. Element.scrollLeft/scrollTop

可以读取或设置元素的内容(水平滚动条到元素左边的距离/垂直滚动条到元素上方的距离)。

注意如果这个元素的内容排列方向（direction）是 rtl (right-to-left) ，那么滚动条会位于最右侧（内容开始处），并且 scrollLeft 值为 0。此时，当你从右到左拖动滚动条时，scrollLeft 会从 0 变为负数。

在使用显示比例缩放的系统上，scrollLeft/scrollTop 可能会提供一个小数

2.6 HTMLElement.offsetxxx

1. HTMLElement.offsetHeight/Width padding + border + height

是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直/水平内边距和边框，且是一个整数。

元素的 offsetHeight 是一种元素 CSS 高度的衡量标准，包括元素的边框、内边距和元素的水平/垂直滚动条（如果存在且渲染的话），不包含:before 或:after 等伪类元素的高度。

对于文档的 body 对象，它包括代替元素的 CSS 高度线性总含量高。浮动元素的向下延伸内容高度是被忽略的。

如果元素被隐藏（例如 元素或者元素的祖先之一的元素的 style.display 被设置为 none），则返回 0

1. HTMLElement.offsetTop/offsetLeft

只读属性，它返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。距离最近的 position 不为 static 的祖先元素，没有则指向 body 元素

HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table, td, th, body 元素。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的。

## window 对象

1. outerHeight/outerWidth 1872/1080 只读属性返回整个浏览器窗口的高度（以像素为单位），包括侧边栏（如果存在）、窗口镶边（window chrome）和窗口调正边框（window resizing border/handle） 缩小数值可以变化
2. scrollX/scrollY 0/0 返回文档/页面水平/垂直方向滚动的像素值。 别名：pageXOffset pageYOffset
3. screenX/screenY 返回浏览器左边界到操作系统桌面左边界的水平距离。例如窗口缩小，距离为浏览器上方到屏幕顶部的距离
4. screenLeft/screenTop 只读属性，它返回浏览器左边框到左边屏幕边缘的 CSS 像素数。只读属性返回垂直距离，单位是 CSS 像素，从用户浏览器的上边界到屏幕最顶端。

## BFC

## 布局

- 双飞翼
- 三栏布局

## 适配

- vwvh
- rem
- 百分比

适配的原理设计三个视口设备像素 设备独立像素 为什么产生问题 因为独立像素不同

##
