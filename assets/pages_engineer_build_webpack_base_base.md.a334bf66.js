import{_ as s,c as a,o as n,a as l}from"./app.f31a5268.js";const A=JSON.parse('{"title":"基本使用","description":"","frontmatter":{},"headers":[{"level":2,"title":"功能介绍","slug":"功能介绍","link":"#功能介绍","children":[]},{"level":2,"title":"开始使用","slug":"开始使用","link":"#开始使用","children":[{"level":3,"title":"1. 资源目录","slug":"_1-资源目录","link":"#_1-资源目录","children":[]},{"level":3,"title":"2. 创建文件","slug":"_2-创建文件","link":"#_2-创建文件","children":[]},{"level":3,"title":"3. 下载依赖","slug":"_3-下载依赖","link":"#_3-下载依赖","children":[]},{"level":3,"title":"4. 启用 Webpack","slug":"_4-启用-webpack","link":"#_4-启用-webpack","children":[]},{"level":3,"title":"5. 观察输出文件","slug":"_5-观察输出文件","link":"#_5-观察输出文件","children":[]}]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"relativePath":"pages/engineer/build/webpack/base/base.md"}'),e={name:"pages/engineer/build/webpack/base/base.md"},p=l(`<h1 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-hidden="true">#</a></h1><p><strong><code>Webpack</code> 是一个静态资源打包工具。</strong></p><p>它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。</p><p>输出的文件就是编译好的文件，就可以在浏览器段运行了。</p><p>我们将 <code>Webpack</code> 输出的文件叫做 <code>bundle</code>。</p><h2 id="功能介绍" tabindex="-1">功能介绍 <a class="header-anchor" href="#功能介绍" aria-hidden="true">#</a></h2><p>Webpack 本身功能是有限的:</p><ul><li>开发模式：仅能编译 JS 中的 <code>ES Module</code> 语法</li><li>生产模式：能编译 JS 中的 <code>ES Module</code> 语法，还能压缩 JS 代码</li></ul><h2 id="开始使用" tabindex="-1">开始使用 <a class="header-anchor" href="#开始使用" aria-hidden="true">#</a></h2><h3 id="_1-资源目录" tabindex="-1">1. 资源目录 <a class="header-anchor" href="#_1-资源目录" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">webpack_code # 项目根目录（所有指令必须在这个目录运行）</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── src # 项目源码目录</span></span>
<span class="line"><span style="color:#A6ACCD;">        ├── js # js文件目录</span></span>
<span class="line"><span style="color:#A6ACCD;">        │   ├── count.js</span></span>
<span class="line"><span style="color:#A6ACCD;">        │   └── sum.js</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── main.js # 项目主文件</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_2-创建文件" tabindex="-1">2. 创建文件 <a class="header-anchor" href="#_2-创建文件" aria-hidden="true">#</a></h3><ul><li>count.js</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">count</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">y</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">y</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ul><li>sum.js</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">sum</span><span style="color:#89DDFF;">(...</span><span style="color:#A6ACCD;font-style:italic;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">p</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">c</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">p</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><ul><li>main.js</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./js/count</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> sum </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./js/sum</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">count</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">sum</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-下载依赖" tabindex="-1">3. 下载依赖 <a class="header-anchor" href="#_3-下载依赖" aria-hidden="true">#</a></h3><p>打开终端，来到项目根目录。运行以下指令：</p><ul><li>初始化<code>package.json</code></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm init -y</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>此时会生成一个基础的 <code>package.json</code> 文件。</p><p><strong>需要注意的是 <code>package.json</code> 中 <code>name</code> 字段不能叫做 <code>webpack</code>, 否则下一步会报错</strong></p><ul><li>下载依赖</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm i webpack webpack-cli -D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_4-启用-webpack" tabindex="-1">4. 启用 Webpack <a class="header-anchor" href="#_4-启用-webpack" aria-hidden="true">#</a></h3><ul><li>开发模式</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npx webpack ./src/main.js --mode=development</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>生产模式</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npx webpack ./src/main.js --mode=production</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><code>npx webpack</code>: 是用来运行本地安装 <code>Webpack</code> 包的。</p><p><code>./src/main.js</code>: 指定 <code>Webpack</code> 从 <code>main.js</code> 文件开始打包，不但会打包 <code>main.js</code>，还会将其依赖也一起打包进来。</p><p><code>--mode=xxx</code>：指定模式（环境）。</p><h3 id="_5-观察输出文件" tabindex="-1">5. 观察输出文件 <a class="header-anchor" href="#_5-观察输出文件" aria-hidden="true">#</a></h3><p>默认 <code>Webpack</code> 会将文件打包输出到 <code>dist</code> 目录下，我们查看 <code>dist</code> 目录下文件情况就好了</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-hidden="true">#</a></h2><p><code>Webpack</code> 本身功能比较少，只能处理 <code>js</code> 资源，一旦遇到 <code>css</code> 等其他资源就会报错。</p><p>所以我们学习 <code>Webpack</code>，就是主要学习如何处理其他资源。</p>`,39),o=[p];function c(t,r,i,d,y,D){return n(),a("div",null,o)}const F=s(e,[["render",c]]);export{A as __pageData,F as default};
