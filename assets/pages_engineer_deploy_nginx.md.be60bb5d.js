import{_ as s,c as n,o as a,a as p}from"./app.01f57b97.js";const l="/engineer/nginx/gzipon.png",o="/engineer/nginx/gziponstatic.png",e="/engineer/nginx/gzipoff.png",t="/engineer/nginx/gzipoffstatic.png",h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Webpack 配置","slug":"webpack-配置","link":"#webpack-配置","children":[]},{"level":2,"title":"nginx 配置","slug":"nginx-配置","link":"#nginx-配置","children":[]},{"level":2,"title":"开启 gzip","slug":"开启-gzip","link":"#开启-gzip","children":[]},{"level":2,"title":"未开启 gzip","slug":"未开启-gzip","link":"#未开启-gzip","children":[]}],"relativePath":"pages/engineer/deploy/nginx.md","lastUpdated":1699946696000}'),c={name:"pages/engineer/deploy/nginx.md"},i=p(`<h2 id="webpack-配置" tabindex="-1">Webpack 配置 <a class="header-anchor" href="#webpack-配置" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">plugins</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">CompressionWebpackPlugin</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">[path].gz[query]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">algorithm</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">gzip</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\.</span><span style="color:#89DDFF;">(</span><span style="color:#C3E88D;">js</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">json</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">txt</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">html</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">ico</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">svg</span><span style="color:#89DDFF;">)(</span><span style="color:#A6ACCD;">\\?</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">*)?</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">i</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">threshold</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10240</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">minRatio</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.8</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">deleteOriginalAssets</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="nginx-配置" tabindex="-1">nginx 配置 <a class="header-anchor" href="#nginx-配置" aria-hidden="true">#</a></h2><p>配置启用 nginx 的 gzip，这个必须要启动，而且配置协议为 1.0，且开启强制压缩，要不然代理一层你会发现正常，再代理一层就会出现不生效的情况：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">#开启gzip</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip  on;</span></span>
<span class="line"><span style="color:#A6ACCD;">#低于</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">kb的资源不压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_min_length </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">k;</span></span>
<span class="line"><span style="color:#A6ACCD;">#压缩级别</span><span style="color:#F78C6C;">1-9</span><span style="color:#A6ACCD;">，越大压缩率越高，同时消耗cpu资源也越多，建议设置在</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">左右。</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_comp_level </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">#需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片.</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;</span></span>
<span class="line"><span style="color:#A6ACCD;">#配置禁用gzip条件，支持正则。此处表示ie</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">及以下不启用gzip（因为ie低版本不支持）</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_disable </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MSIE [1-6]\\.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">#是否添加“Vary: Accept-Encoding”响应头</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_vary on;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">gzip  on;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_buffers </span><span style="color:#F78C6C;">16</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;">k;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_comp_level </span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_http_version </span><span style="color:#F78C6C;">1.1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_min_length </span><span style="color:#F78C6C;">256</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_vary on;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_types</span></span>
<span class="line"><span style="color:#A6ACCD;">text/xml application/xml application/atom+xml application/rss+xml application/xhtml+xml image/svg+xml     text/javascript application/javascript application/x-javascript     text/x-json application/json application/x-web-app-manifest+json     text/css text/plain text/x-component     font/opentype application/x-font-ttf application/vnd.ms-fontobject     image/x-icon;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_disable  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">msie6</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//==============</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> server中加入：</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip on;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_buffers </span><span style="color:#F78C6C;">32</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">K;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_comp_level </span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_min_length </span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_types application/javascript text/css text/xml;</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_disable </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">MSIE [1-6]\\.</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">; #配置禁用gzip条件，支持正则。此处表示ie</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">及以下不启用gzip（因为ie低版本不支持）</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_vary on;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">在需要代理的路径下加入</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_http_version </span><span style="color:#F78C6C;">1.0</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">proxy_set_header Accept-Encoding gzip;</span></span>
<span class="line"><span style="color:#A6ACCD;">if ($http_accept_encoding !~* </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">gzip</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//test.jtwo.me;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">例如：</span></span>
<span class="line"><span style="color:#A6ACCD;">location /expert </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_http_version 1.0;</span></span>
<span class="line"><span style="color:#A6ACCD;">proxy_set_header Accept-Encoding gzip;</span></span>
<span class="line"><span style="color:#A6ACCD;">if ($http_accept_encoding !~* </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">gzip</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//test.jtwo.me;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">auth_basic </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">The Kibana Monitor Center</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">auth_basic_user_file  /usr/local/.passwd;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><p>这是你那个项目的 webpack 专门配的，很多项目都会打包这个东西。浏览器可以直接解析 gz 文件并解压。比如 nginx 服务器，开启了 gzip:on,服务器会先去目录下寻找有没有对应的 gz 文件，如果没有，nginx 要做一次压缩，再返回，如果短时间访问量过高，会造成服务器压力大（压缩是消耗服务器资源的），提前打包好 gz，直接返回就好，服务器压力就没那么大。一般直播类型的网站会用到。插件 compression-webpack-plugin，你可以搜一下项目里是不是用的这个。</p><h2 id="开启-gzip" tabindex="-1">开启 gzip <a class="header-anchor" href="#开启-gzip" aria-hidden="true">#</a></h2><p><img src="`+l+'" alt="image.png"></p><p><img src="'+o+'" alt="image.png"></p><h2 id="未开启-gzip" tabindex="-1">未开启 gzip <a class="header-anchor" href="#未开启-gzip" aria-hidden="true">#</a></h2><p><img src="'+e+'" alt="image.png"></p><p><img src="'+t+'" alt="image.png"></p>',12),r=[i];function C(y,D,A,F,g,_){return a(),n("div",null,r)}const x=s(c,[["render",C]]);export{h as __pageData,x as default};
