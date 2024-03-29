# 移动端开发知识

## 1.屏幕相关

### 1.1 屏幕大小

一般生活中说手机多少寸，都是手机屏幕对角线的长度，单位：英寸(inch)，1 英寸=2.54 厘米。常见的手机屏幕大小 3.5、4、4.7、5.0、5.5、6.0 等。[常见手机屏幕查看网址](http://screensiz.es/)[中国屏幕网站](https://uiiiuiii.com/screen/)

### 1.2 屏幕分辨率

横纵向上的像素点（物理像素）数（个数），1px=1 个像素点，也称物理像素，例如 iphone6 的屏幕分辨率为：750\*1334

- 注意
  1. **屏幕分辨率是一个固定值，生产出来就固定了**，无论手机屏幕还是电脑屏幕。
  2. 屏幕分辨率与显示分辨率不同。计算机可以修改显示分辨率，信号传递给屏幕，屏幕会进行计算，在屏幕上显示。屏幕分辨率>=显示分辨率
  3. 1080P 的分辨率是 1920x1080
  4. 2K 屏幕是单一方向分辨率具有约 2000 像素的显示设备。最标准的 2K 分辨率为 2048×1024

iphone6 是 2014.9.9 前端发展元年，为移动端打造单独的网页，都以 iphone6 出图

### 1.3 屏幕像素密度(ppi=pixels per inch)

每英寸所拥有的物理像素数量，决定了手机清晰度。单位 ppi <br> ppi= x^2+y^2 开根号除以屏幕尺寸

## 2 像素相关

### 2.1 物理像素

物理像素对应显示设备中一个微小的物理部件。单位 px 长度单位

### 2.2 css 像素

抽象长度单位(px)，开发最小单位

- web 开发的最小单位，**一个 CSS 像素在移动设备上最终会转成物理像素去呈像**
- 一个 CSS 像素占用多少个物理像素，取决于【设备特性】、【用户缩放行为】 2010 年之前，就是 1:1 的关系

### 2.3 设备独立像素

设备独立像素，简称 DIP（device-independent pixel）,又称为设备无关像素，是一个长度计量单位。设备独立像素也是手机屏幕的一个参数，由手机制造商决定。 1 个设备独立像素可以认为是计算机坐标系统中的一个点，代表可以通过程序控制使用的虚拟像素。

- 普通屏幕下 1 设备独立像素 等于 1 物理像素
- 高清屏幕下 1 设备独立像素 等于 N 物理像素
- 获取设备独立像素

```js
screen.width // iphone6 375px
screen.height
```

<br> 
高清屏， 2010年苹果公司推出新的显示标准，在屏幕尺寸不变的前提下，将更多的物理像素点压缩至一块屏幕，称retina屏幕->视网膜屏幕。发布了iphone4。

- 思考：

  如果在开发中写一个 width:2px height:2px ,如果一个 css 像素对应一个物理像素，i3 和 i4 相同的屏幕但 i4 有更多的物理像素，但 i4 更清晰。如何做到，靠的是设备独立像素

![image.png](/project/h5/设备独立像素.png) **设备独立像素的出现，使得在高清屏下，也可以让元素有正常的尺寸，让代码不受设备的影响，它是根据设备厂商根据屏幕特性设置的，无法更改。**<br> 像素处理: css 像素设置为 2x2 ->独立设备像素为 320x480 -> 物理像素 320x750 -> 引起一个 2x2 个物理像素点亮<br> 像素处理: css 像素设置为 2x2 ->独立设备像素为 320x480 -> 物理像素 640x960 -> 引起一个 4x4 个物理像素点亮

:::tip

1. 设备独立像素对于 css 像素？
   1. 在无缩放(标准情况下) 1css 像素 = 1 独立设备像素
2. css 像素对应多少物理像素？不考虑缩放情况
   1. 高清屏(dpr=1):1pxcss 像素 = 1px 设备独立像素 = 1px 物理像素
   2. 高清屏(dpr=2):1css 像素 = 1 设备独立像素 = 2 物理像素
   3. 高清屏(dpr=3):1css 像素 = 1 设备独立像素 = 3 物理像素程序猿写了 width：200px 不进行缩放 dpr 为 2

:::

### 2.4 像素比(dpr)

- 【单方向】占满屏幕物理像素个数 / 占满屏幕设备独立像素个数 = devicePixelRatio
- 获取像素比：window.devicePixelRatio
- iPhone6 物理像素（分辨率）是 750，设备独立像素是 375，dpr=2

![image.png](/project/h5/dpr.png)

<!-- | 型号 | 分辨率 | 设备独立像素 | 像素比dpr ｜
| ---- | ----  | ---- | ----- |
| i4 ｜ 640*980 ｜ 320 * 480 ｜2 ｜
| i6 ｜ 750*1334 ｜ 375 * 667 ｜2 ｜ -->

### 2.4 位图和矢量图

- 位图图像是由称作像素（图片元素）的单个点组成的。放大后会失真。常见有 png,jpg,jpeg,gif
- 矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。放大后不会失真。svg 有兼容性问题
- 软件有 Adobe Illustrator，Sketch

:::tip

1 个位图像素对应于 1 个物理像素，图片才能得到完美清晰的展示 <br> 说明:位图像素是设计师设计图片的最小单位 AI Sketch 设计位图

:::

## 总结

对于 web 开发者开说

1. 我们使用的是 css 像素，不在意一个 css 像素到底跨越了多少个物理像素。我们将这个依赖于屏幕特性和用户缩放程度的复杂计算交给了浏览器。
2. 物理像素是设备呈像的最小单元
3. css 像素是一个抽象的层，是 web 开发中的最小单元
4. 位图像素是图片的最小单元。
5. 设备独立像素也是-一个抽象的层，是设备提供出来的接口
6. 像素比：物理像素/设备独立像素
   1. 一个方向上占据一块屏幕所需要的物理像素的个数 / 一个方向上占据一块屏幕所需要的设备独立像素的个数

由于物理像素，设备独立像素，像素比都是设备中的概念与浏览器没有一点关系，在设备出厂时这些参数就定了。所以在默认情况下，设备独立像素和像素比在 web 开发中毫无意义，因为默认情况下，设备独立像素，像素比跟浏览器没有关系，都是设备的东西。

## 3.视口

1. 在 PC 端，视口指的是浏览器的可视区域。其宽度和浏览器窗口的宽度保持一致。在 CSS 标准文档中，视口也被称为初始包含块，它是所有 CSS 百分比宽度推算的根源。**默认情况下在 pc 端，一个 CSS 像素 = 一个物理像素**

- document.documentElement.clientWidth 最干净的显示区域 3072
- window.innerWidth 最干净的显示区域+滚动条 3072
- window.outerWidth 最干净的显示区域+滚动条+浏览器边框 1538
- screen.width 与浏览器无关，当前设备显示分辨率横向的值 1536

1. 移动端的视口与 PC 端不同，有三个视口

- 布局视口
- 视觉视口
- 理想视口

### 3.1 布局视口 (layout viewport)

- 布局视口是用来放置网页内容的区域。早期 pc 端的页面一般为 960px-1024px 范围，就算超过范围，内容也在版心位置。

  **浏览器厂商针对移动端设置了一个容器，盛放 pc 端网页，这个容器宽度为 980px**，不同设备差别不大，然后将这个容器等比例压缩到与手机等宽，这样就可以完整呈现页面不需要滚动，问题是页面内容被压缩太小，影响用户体验。

- 一般移动设备的浏览器都默认定义一个虚拟的布局视口（layout viewport），用于解决早期的页面在手机上显示的问题。 **视口大小由浏览器厂商决定，大多数设备的布局视口大小为 980px。**
- **注意：布局视口经过压缩后，横向的宽度用 css 表达不再是 375px,而是 980px。**
- 获取大小
  ```js
  document.documentElement.clientWidth //iphone6 980px
  document.documentElement.clientHeight
  ```

### 3.2 视觉视口 (visual layout)

- 视觉视口就是用户可见的区域。绝对宽度永远与设备等宽，这个宽中的包含的 css 像素是变化的。 例如：一般手机将 980pxcss 像素放入视觉视口中，而 ipad 会将 1024px 的 css 像素放入视觉视口中。
- **如果宽度设置为大于屏幕的宽度，视觉视口也会变大，例如 375 设备独立，不设置宽度，默认为 375px。如果设置了 400，那么视觉视口也为 400px**
- 获取大小
  ```js
  window.innerWidth // 980px
  window.innerHeight
  ```
- **不缩放的情况下，视觉视口宽度 === 布局视口宽度 ？？？**

### 描述一下屏幕

iphone6 为例：

1. 物理像素 750px
2. 设备独立像素 375px （必须要写 375px 才能使 750 个发光点亮，之前以为写 375pxcss 对应 375px 独立像素，理想视口下）
3. css 像素 980px

### 3.3 理想视口标准 (ideal layout)

与屏幕(设备独立像素 device-width)等宽的布局视口(width), 称为理想视口。 是一种标准。理想视口是特殊的布局视口,与设备独立像素相等，980px 变成 375px,ui 开发以 375 基准进行设计。

- 理想视口特点:
  - 用户不需要缩放和滚动条就能看到网站的全部内容
  - 针对移动端的设计稿更容易开发
- **注意：理想视口不是真实存在的视口 980**
- 设置理想视口标准的方法

  ```js
  // 获取的方法, 始终是等于独立像素
  screen.width/height
  // 布局视口设置  设备独立像素宽度
  <meta name="viewport" content="width=device-width" />
  // 不缩放
  <meta name="viewport" content="initial-scale=1.0" />
  // 合体
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  ```

【总结】不写 meta 标签(不符合理想视口标准)

1. 描述屏幕：物理像素 750px 设备独立像素 375px css 像素 980px
2. 优点：元素在不同屏幕上呈现效果几乎一致，因为都是通过布局容器等比例缩放 例如 200px 200/980
3. 缺点：元素大小 页面文字不清晰 用户体验不好

写 meta 标签(符合理想视口标准)

1. 描述屏幕： 物理像素 750px 设备独立像素 375px css 像素 375px
2. 优点
   1. 页面清晰展示 用户体验不好
   2. 更清晰的像素关系 布局视口=视觉视口 = 设备独立像素 = 375px
   3. 更清晰的 dpr 例如：dpr 为 2 的设备 1*1pxcss = 1*1 设备独立像素 = 2\*2 物理像素
3. 缺点：同一个元素在不同设备上，呈现效果不一样，例如 375 的盒子，375/375 和 375/414（不是等比例显示）
   1. 解决是做适配

## 缩放

### pc 的缩放

- 放大时：先把视口变小，然后进行等比例缩放成屏幕大小
  - 视口变小
  - 元素的 css 像素值不变，px 是相对单位：1px css 像素所占面积变大
- 缩小时：先把视口变大，然后进行等比例缩放成屏幕大小
  - 视口变大
  - 元素的 css 像素值不变，px 是相对单位：1px css 像素所占面积变小

### 移动端缩放

- 放大时
  - 布局视口不变
  - 视觉视口变小
- 缩小时
  - 布局视口不变
  - 视觉视口变大

**注意：移动端缩放不会影响页面布局，因为缩放时，布局视口没有变化，简记：移动端缩放没有改变布局视口任何东西**

## viewport

meta-viewport 标签是 2007 苹果引进，用于移动端布局视口的控制。

1. viewport 相关选项
1. width 布局视口的宽度
   1. 设备宽度标识 = 设备独立像素
1. initial-scale 【系统】初始缩放比例 1.0
   1. 比值 (屏幕宽度)设备独立像素/布局视口宽度 如果设置了，布局视口默认为设备独立像素也就等于 width=device-width
   2. 如果 1/2 都设置了 谁大听谁的
1. maximum-scale 允许【用户】缩放的最大比例
   1. (屏幕宽度)设备独立像素/布局视口宽度
1. minimum-scale 允许【用户】缩放的最小比例
1. user-scalable 是否允许用户缩放
   1. 通过手指缩放页面
1. viewport-fit 设置为 cover 值可以解决刘海屏留白问题

## 适配

一、为什么要适配 <br> 由于移动端设备的屏幕尺寸大小不一，会出现同一个元素在两个不同手机上显示效果不一样（比例不同）要想现实一致，要进行适配。**无论采用何种适配方式，中心原则永远不变，等比** <br>

**为什么要适配：**

- 例如 iphone6 的设备独立像素为 375px 宽度充满屏幕 css 像素设置为 375px 即可，但是 ipx 设独是 414px，之前设置的 375px 不会充满屏幕。所以需要适配。 ![image.png](/project/h5/ip6.png) ![image.png](/project/h5/ip6p.png)

主流适配方式

1.  viewport 适配
2.  rem 适配
3.  vw 适配

### 1.viewport 适配

- 方法:拿到设计稿后，设置布局视口宽度为设计稿宽度，然后按照设计稿的宽度进行布局即可
- 优点：不用复杂计算，直接使用设计稿的 px 值
- 缺点：
  - 不能使用完整的 meta 标签，会导致某些安卓手机上有兼容性问题
  - 不希望适配的东西，例如边框也强制参与了适配
  - 图片会失真

### 2.rem 适配

em 和 rem

- em 是父元素字体的单位 font-size
- rem 根节点的字体大小 font-size

| 375px              | 414px              |
| ------------------ | ------------------ |
| 345px              | 380.88px(计算出来) |
| 根字体设置为 100px |                    |
| 3.75rem            |                    |
| 3.45rem            |                    |

1. 方案一 淘宝 百度
   1. 设置理想视口
   2. ip6 根字体设置为 100px ,设计稿根字体的大小等于 （设备独立像素比值 \* 100）/ 设计稿宽度
   3. 编写样式 直接以 rem 为单位，值为 设计稿/100
   4. 增加 js 代码进行实时适配
2. 优势 编写代码直接移动小数点即可

```js
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>rem适配方案一</title>
      <meta name="viewport" content=" width=device-width initial-scale=1.0 maximum-scale=1 minimum-scale=1 user-scalable=no viewport-fit=cover">
      <style>
        *{
          margin: 0;
          padding: 0;
        }
        #demo{
          width: 3.45rem;
          height: 1.5rem;
          margin: 0 auto;
          margin-top: 0.15rem;
          background-color: #87CEEB;
          border: 0.01rem solid black;	/* 边框参与适配*/
          /* border: 1px solid black; */  /* 边框不参与适配*/
        }
      </style>
    </head>
    <body>
      <div id="demo"></div>
      <script type="text/javascript" >
      {/* fontSize:100px  ----> 设计值/100
        375px ----> 375px/100px  ----> 3.75rem
        1rem  ----> 375px/3.75rem   ---->  100px
        1px   ----> 1rem/100px ----> 0.01rem */}

        function adapter (){
          //获取手机横向的设备独立像素
          const dip = document.documentElement.clientWidth
          //计算根字体大小(100是我们自己指定的，375是设计稿宽度)
          const rootFontSize = (dip * 100)/375
          //设置根字体
          document.documentElement.style.fontSize = rootFontSize + 'px'
        }
        adapter()

        window.onresize = adapter
      </script>
    </body>
  </html>
```

### 方案一 less 版本

按照根元素设置为 100，单位是 345/100 rem 即可

```less
@font: 100rem;
* {
  margin: 0;
  padding: 0;
}
#demo {
  width: 345 / @font;
  height: 150 / @font;
  margin: 0 auto;
  margin-top: 15 / @font;
  background-color: #87ceeb;
  /* border: 0.01rem solid black; */ /* 边框参与适配*/
  border: 1px solid black; /* 边框不参与适配*/
}
```

2. 方案二 搜狐唯品会
   1. 设置理想视口
   2. 根字体=设备独立像素/10 （根字体为 375 / 10 = 37.5 手机屏幕宽度是 10rem 345 是？345/37.5rem ip6p 是 41.4px 设置根字体特别简单编码恶心）
   3. 编写样式：直接以 rem 为单位，值为：设计值/（设计稿宽度/10）
   4. 增加 js 代码进行实时适配

```js
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>rem适配方案二</title>
		<meta name="viewport" content=" width=device-width initial-scale=1.0 maximum-scale=1 minimum-scale=1 user-scalable=no viewport-fit=cover">
		<style>
			*{
				margin: 0;
				padding: 0;
			}
			#demo{
				width: 9.2rem;
				height: 4rem;
				margin: 0 auto;
				margin-top: 0.4rem;
				background-color: #87CEEB;
				/* border: 0.01rem solid black;	边框参与适配 */
				/* border: 1px solid black; */  /* 边框不参与适配*/
			}
		</style>
	</head>
	<body>
		<div id="demo"></div>
		<script type="text/javascript" >
      {/* fontSize:37.5px ----> 设计值/(设计稿宽度/10)
        375px ----> 375px/37.5px ----> 10rem
        1rem  ----> 375px/10rem  ----> 37.5px
        1px   ----> 1rem/37.5px  ----> 0.026...rem */}
			function adapter (){
				//获取手机横向的设备独立像素
				const dip = document.documentElement.clientWidth
				//计算根字体大小(37.5是我们自己指定的，375是设计稿宽度)
				const rootFontSize = dip / 10
				//设置根字体
				document.documentElement.style.fontSize = rootFontSize + 'px'
			}

			window.onresize = adapter
		</script>
	</body>
</html>
```

### 方案二 less 版本

```less
/* 安装easy-less 进行编译 */
/*  在less中直接写 345/(375/10)rem ()会有空格 出现样式不生效情况 如 9.2 rem */
/*  所以将单位定义在变量上 */
@font:375 /10rem;
* {
  margin: 0;
  padding: 0;
}
/*  加括号 会出现空格 导致样式不生效 */
#demo {
  width: (345 / @font);
  height: (150 / @font);
  margin-top: (15 / @font);
  margin: 0 auto;
  background-color: skyblue;
}
```

## 设计稿 750/800

- 针对方案一只需要修改设计稿宽度 375->750；less 文件对应的宽度设置为 2 倍。 如 345px 690/@font；800 同理
- 针对方案二只需要修改 less 文件中 @font 为 750/10rem 对应宽度设置为 2 倍。 如 345px 690/@font；800 同理

### 3.vw 适配

vw 和 vh 是两个相对单位

- 1vw 是等于布局视口宽度的 1%
- 1vh 是等于布局视口高度的 1%

有兼容性问题 [点击查看](https://caniuse.com/)

```less
@base:375 /100vw; //345/375*100vw
* {
  margin: 0;
  padding: 0;
}
#demo {
  width: (345 / @base);
  height: (150 / @base);
  background-color: skyblue;
  margin: 0 auto;
  margin-top: (15 / @base);
  border: (1 / @base) solid black;
}
```

### 4 1 物理像素边框

高清屏幕下 1px 对应更多的物理像素 所以 1px 像素边框看起来比较粗，使用媒体查询,真机调试效果明显

```css
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  #demo {
    border: 0.5 solid black;
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  #demo {
    border: 0.333px solid black;
  }
}
```

使用伪元素 上下边框

![image.png](/project/h5/1border.png)

```css
#demo {
  position: relative;
  width: 3.45rem;
  height: 1.5rem;
  background-color: pink;
  margin: 0 auto;
  margin-top: 0.15rem;
}
#demo::after {
  position: absolute;
  bottom: 0;
  left: 0;
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: black;
}
#demo::before {
  position: absolute;
  top: 0;
  right: 0;
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: black;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  #demo::after {
    transform: scaleY(0.5);
  }
  #demo::before {
    transform: scaleY(0.5);
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  #demo::after {
    transform: scaleY(0.333);
  }
  #demo::before {
    transform: scaleY(0.333);
  }
}
```

## 移动端事件

事件类型

- touchstart 元素上触摸开始时触发
- touchmove 元素上触摸移动时触发
- touchend 手指从元素上离开时触发
- touchcancel 触摸被打断时触发

这几个事件最早出现于 IOS safari 中，为了向开发人员转达一些特殊的信息。 <br> 应用场景

- touchstart 事件可用于元素触摸的交互，比如页面跳转，标签页切换
- touchmove 事件可用于页面的滑动特效，网页游戏，画板
- touchend 事件主要跟 touchmove 事件结合使用
- touchcancel 使用率不高
- 注意：
  - touchmove 事件触发后，即使手指离开了元素，touchmove 事件也会持续触发
  - 触发 touchmove 与 touchend 事件，一定要先触发 touchstart
  - 事件的作用在于实现移动端的界面交互

事件绑定

- box.ontouchstart
- box.addEventListener('touchstart',cb)

事件 e

- touches 屏幕上拥有的触点数 一个手指一个触点
- targetTouches: 当前元素上的触点数
- changedTouches: 同时按下几个手指(改变了的触点数)

![image.png](/project/h5/me.png)

点击穿透

- **touch 事件结束后会默认触发元素的 click 事件**，如没有设置完美视口，则事件触发的时间间隔为 350ms 左右，如设置完美视口则时间间隔为 50ms 左右。

```js
//测试代码
<button id="btn">点我</button>
<script>
    let btn = document.getElementById('btn')
    let time
    btn.addEventListener('click',()=>{
        console.log('你点击了我',Date.now()-time);
    })
    btn.addEventListener('touchstart',()=>{
        time = Date.now()
        console.log('你触摸了我');
    })
</script>
```

- 如果 touch 事件隐藏了元素，则 click 动作将作用到新的元素上，触发新元素的 click 事件或页面跳转，此现象称为点击穿透

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>点击穿透</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        html,
        body {
            width: 100%;
            height: 100%;
        }

        #app {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: skyblue;
        }

        .banner {
            display: block;
            background-color: orange;
            width: 100%;
            height: 200px;
        }

        .shade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            text-align: center;
        }
        /* h1 如果是180 点击按钮在 橙色区域上方 并且屏蔽层消失，且后方有click点击事件 才会触发点击穿透 */
        /* 1.必须绑定touch* 如touchstart 引起元素消失 2.如果引起消失，后面有click事件 */
        h1{
            margin-top: 100px;
            color: white;
        }
        button {
            width: 100px;
            height: 50px;
            font-size: 20px;
        }
    </style>
</head>

<body>
    <div id="app">
        <a class="banner" href="http://www.baidu.com">点我去百度</a>
        <div class="shade">
            <h1>恭喜一等奖！</h1>
            <button id="btn">关闭</button>
        </div>
    </div>

    <script>
        const shade = document.querySelector('.shade')
        const btn = document.getElementById('btn')
        btn.addEventListener('touchstart',(e)=>{
            shade.style.display = 'none'
        })
    </script>
</body>

</html>
```

解决方案：

1.  阻止默认行为 e.preventDefault()
2.  使背后元素不具备 click 特性，用 touch\*事件代替 click

```js
;<div class="banner">点我去百度</div>
const banner = document.querySelector('.banner')
banner.addEventListener('touchstart', () => {
  window.location.href = 'http://www.baidu.com'
})
```

3. 让背后的元素暂时失去 click 事件，300ms 再复原

```js
#anode{
  pointer-events:none;
}
btn.addEventListener('touchstart',()=>{
  shade.style.display='none'
  setTimeout(() => {
    anode.style.pointerEvents = 'auto'
  }, 500);
})

```

4. 让隐藏的元素延迟 300ms 左右再隐藏

```js
btn.addEventListener('touchstart', (e) => {
  setTimeout(() => {
    shade.style.display = 'none'
  }, 300)
})
```

## 图片高清显示

为什么移动端需要@2x 或者@3x 的图片 ?

:::tip

移动端开发过程中，@2x 或者@3x 的图标，是因为手机的 dpr(设备像素比不同)，我们> 需要根据 dpr 来修改不同大小的图标，来解决不同设备用户视觉体验。 dpr=2 说明 1css 最小像素点对应 2 个物理像素，如果图片的 ui 最小宽度达不到会出现失真

:::

```less
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .logo {
    content: url(../imgs/logo@2x.png);
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .logo {
    content: url(../imgs/logo@3x.png);
  }
}
```

使用 scss，通过 mixin,动态修改图标的背景图片。通过@media (媒体查询)，判断设备的 dpr。

```scss
@mixin bg-image($url) {
  background-image: url($url + '@2x.png');
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url($url + '@3x.png');
  }
}
// 调用
div {
  width: 30px;
  height: 30px;
  background-size: 30px 30px;
  background-repeat: no-repeat;
  @include bg-image('logo');
}
```
