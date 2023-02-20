import{_ as s,c as a,o as n,a as l}from"./app.f31a5268.js";const u=JSON.parse('{"title":"提升开发体验","description":"","frontmatter":{},"headers":[{"level":2,"title":"SourceMap","slug":"sourcemap","link":"#sourcemap","children":[{"level":3,"title":"为什么","slug":"为什么","link":"#为什么","children":[]},{"level":3,"title":"是什么","slug":"是什么","link":"#是什么","children":[]},{"level":3,"title":"怎么用","slug":"怎么用","link":"#怎么用","children":[]}]}],"relativePath":"pages/engineer/build/webpack/senior/enhanceExperience.md"}'),o={name:"pages/engineer/build/webpack/senior/enhanceExperience.md"},e=l(`<h1 id="提升开发体验" tabindex="-1">提升开发体验 <a class="header-anchor" href="#提升开发体验" aria-hidden="true">#</a></h1><h2 id="sourcemap" tabindex="-1">SourceMap <a class="header-anchor" href="#sourcemap" aria-hidden="true">#</a></h2><h3 id="为什么" tabindex="-1">为什么 <a class="header-anchor" href="#为什么" aria-hidden="true">#</a></h3><p>开发时我们运行的代码是经过 webpack 编译后的，例如下面这个样子：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight has-diff" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * ATTENTION: The &quot;eval&quot; devtool has been used (maybe by default in mode: &quot;development&quot;).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * This devtool is neither made for production nor for readable output files.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * It uses &quot;eval()&quot; calls to create a separate source file in the browser devtools.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * or disable the default devtool with &quot;devtool: false&quot;.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * If you are looking for production-ready output files, see mode: &quot;production&quot; (https://webpack.js.org/configuration/mode/).</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/******/</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// webpackBootstrap</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/******/</span><span style="color:#F07178;"> 	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">use strict</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/******/</span><span style="color:#F07178;"> 	</span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">__webpack_modules__</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/***/</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/*!**********************************************************************************************************!*\\</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less ***!</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  \\**********************************************************************************************************/</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/***/</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">module</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">__webpack_exports__</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">__webpack_require__</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">eval</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">__webpack_require__.r(__webpack_exports__);</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony export */ __webpack_require__.d(__webpack_exports__, {</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony export */   </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">default</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">: () =&gt; (__WEBPACK_DEFAULT_EXPORT__)</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony export */ });</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">./node_modules/css-loader/dist/runtime/noSourceMaps.js</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">);</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">./node_modules/css-loader/dist/runtime/api.js</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">);</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">// Imports</span><span style="color:#A6ACCD;">\\n\\n\\n</span><span style="color:#C3E88D;">var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">// Module</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">___CSS_LOADER_EXPORT___.push([module.id, </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">.box2 {</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n  width: 100px;</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n  height: 100px;</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n  background-color: deeppink;</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n}</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">, </span><span style="color:#A6ACCD;">\\&quot;\\&quot;</span><span style="color:#C3E88D;">]);</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">// Exports</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);</span><span style="color:#A6ACCD;">\\n\\n\\n</span><span style="color:#C3E88D;">//# sourceURL=webpack://webpack5/./src/less/index.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/***/</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 其他省略</span></span>
<span class="line"></span></code></pre></div><p>所有 css 和 js 合并成了一个文件，并且多了其他代码。此时如果代码运行出错那么提示代码错误位置我们是看不懂的。一旦将来开发代码文件很多，那么很难去发现错误出现在哪里。</p><p>所以我们需要更加准确的错误提示，来帮助我们更好的开发代码。</p><h3 id="是什么" tabindex="-1">是什么 <a class="header-anchor" href="#是什么" aria-hidden="true">#</a></h3><p>SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。</p><p>它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。</p><h3 id="怎么用" tabindex="-1">怎么用 <a class="header-anchor" href="#怎么用" aria-hidden="true">#</a></h3><p>通过查看<a href="https://webpack.docschina.org/configuration/devtool/" target="_blank" rel="noreferrer">Webpack DevTool 文档</a>可知，SourceMap 的值有很多种情况.</p><p>但实际开发时我们只需要关注两种情况即可：</p><ul><li><p>开发模式：<code>cheap-module-source-map</code></p><ul><li>优点：打包编译速度快，只包含行映射</li><li>缺点：没有列映射</li></ul></li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 其他省略</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mode</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">development</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">devtool</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cheap-module-source-map</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div><ul><li>生产模式：<code>source-map</code><ul><li>优点：包含行/列映射</li><li>缺点：打包编译速度更慢</li></ul></li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 其他省略</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mode</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">production</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">devtool</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">source-map</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre></div>`,17),p=[e];function t(c,r,_,i,y,D){return n(),a("div",null,p)}const C=s(o,[["render",t]]);export{u as __pageData,C as default};
