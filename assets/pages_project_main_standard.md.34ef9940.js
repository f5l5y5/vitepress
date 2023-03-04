import{_ as s,c as n,o as a,a as l}from"./app.c4de1d4b.js";const A=JSON.parse('{"title":"统一项目工程化配置","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、vscode 配置","slug":"一、vscode-配置","link":"#一、vscode-配置","children":[]},{"level":2,"title":"二、editorConfig","slug":"二、editorconfig","link":"#二、editorconfig","children":[]},{"level":2,"title":"三、prettier","slug":"三、prettier","link":"#三、prettier","children":[]},{"level":2,"title":"四、 stylelint","slug":"四、-stylelint","link":"#四、-stylelint","children":[]},{"level":2,"title":"五、 eslint","slug":"五、-eslint","link":"#五、-eslint","children":[]},{"level":2,"title":"六、 commitlint","slug":"六、-commitlint","link":"#六、-commitlint","children":[]},{"level":2,"title":"七、husky、lint-staged","slug":"七、husky、lint-staged","link":"#七、husky、lint-staged","children":[]},{"level":2,"title":"八、配置 scripts 命令","slug":"八、配置-scripts-命令","link":"#八、配置-scripts-命令","children":[]}],"relativePath":"pages/project/main/standard.md","lastUpdated":1677942263000}'),p={name:"pages/project/main/standard.md"},o=l(`<h1 id="统一项目工程化配置" tabindex="-1">统一项目工程化配置 <a class="header-anchor" href="#统一项目工程化配置" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>@taoismcn 配置说明此指南说明如下：</p><ul><li>@taoismcn/eslint-config 配置目前只适用 vue3(ts),</li><li>@taoismcn/stylelint-config 配置目前支持 scss,</li><li>@taoismcn/prettier-config 和 @taoismcn/commitlint-config 通用</li></ul></div><h2 id="一、vscode-配置" tabindex="-1">一、vscode 配置 <a class="header-anchor" href="#一、vscode-配置" aria-hidden="true">#</a></h2><p>安装 Prettier - Code formatter、ESLint 、stylelint、editorConfig 扩展，每次保存自动格式化代码。</p><p>工作区配置首选项 -&gt; 设置 -&gt; 工作区 -&gt; 打开设置（.json）</p><p>会创建.vscode/settings.json 文件，添加以下配置项</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">prettier.enable</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.defaultFormatter</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">esbenp.prettier-vscode</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.formatOnType</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.formatOnPaste</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.formatOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.formatOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 每次保存的时候将代码按格式进行修复  prettier</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.codeActionsOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// eslint 自动修复</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">source.fixAll.eslint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// 保存时是否自动 stylelint 修复</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">source.fixAll.stylelint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// 保存时自动修复错误</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">source.fixAll</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//eslint</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">eslint.validate</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">javascript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">typescript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">javascriptreact</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">typescriptreact</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">html</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">markdown</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">jsonc</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">json5</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// stylelint</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">stylelint.validate</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">less</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">postcss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sass</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="二、editorconfig" tabindex="-1">二、editorConfig <a class="header-anchor" href="#二、editorconfig" aria-hidden="true">#</a></h2><p>根目录新建.editorConfig</p><div class="language-yml"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C3E88D;">root = true</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># unix风格的换行符，每个文件都以换行符结尾</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">*</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#C3E88D;">charset = utf-8</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 设置文件字符集为 utf-8</span></span>
<span class="line"><span style="color:#C3E88D;">indent_style = space</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 缩进风格（tab | space）</span></span>
<span class="line"><span style="color:#C3E88D;">indent_size = 2</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 缩进大小</span></span>
<span class="line"><span style="color:#C3E88D;">end_of_line = lf</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 控制换行类型(lf | cr | crlf)</span></span>
<span class="line"><span style="color:#C3E88D;">trim_trailing_whitespace = true</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 去除行首的任意空白字符</span></span>
<span class="line"><span style="color:#C3E88D;">insert_final_newline = true</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 始终在文件末尾插入一个新行</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;font-style:italic;">*</span><span style="color:#A6ACCD;">.md</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 表示仅 md 文件适用以下规则</span></span>
<span class="line"><span style="color:#C3E88D;">max_line_length = off</span></span>
<span class="line"><span style="color:#C3E88D;">trim_trailing_whitespace = false</span></span>
<span class="line"></span></code></pre></div><h2 id="三、prettier" tabindex="-1">三、prettier <a class="header-anchor" href="#三、prettier" aria-hidden="true">#</a></h2><p>安装依赖</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yarn add </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">taoismcn</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">prettier</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">config </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">D</span></span>
<span class="line"></span></code></pre></div><p>配置 .prettierrc.js</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fabric </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@taoismcn/prettier-config</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">fabric</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="四、-stylelint" tabindex="-1">四、 stylelint <a class="header-anchor" href="#四、-stylelint" aria-hidden="true">#</a></h2><p>目前支持 scss 安装依赖</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yarn add </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">taoismcn</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">stylelint</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">config </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">D</span></span>
<span class="line"></span></code></pre></div><p>配置 .stylelintrc.js</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@taoismcn/stylelint-config</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="五、-eslint" tabindex="-1">五、 eslint <a class="header-anchor" href="#五、-eslint" aria-hidden="true">#</a></h2><p>支持: vue3(ts)</p><p>安装依赖</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yarn add </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">taoismcn</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">eslint</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">config </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">D</span></span>
<span class="line"></span></code></pre></div><p>配置 .eslintrc.js</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@taoismcn</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">rules</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">global-require</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">arrow-body-style</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">vue/attribute-hyphenation</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">no-use-before-define</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">no-restricted-syntax</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">array-callback-return</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">guard-for-in</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="六、-commitlint" tabindex="-1">六、 commitlint <a class="header-anchor" href="#六、-commitlint" aria-hidden="true">#</a></h2><p>安装依赖</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yarn add </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">taoismcn</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">commitlint</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">config </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">D</span></span>
<span class="line"></span></code></pre></div><p>配置 commitlint.config.js 文件</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@taoismcn/commitlint-config</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="七、husky、lint-staged" tabindex="-1">七、husky、lint-staged <a class="header-anchor" href="#七、husky、lint-staged" aria-hidden="true">#</a></h2><ul><li>安装 husky 和 lint-staged</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">yarn add husky lint</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">staged </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">D</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn husky install</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn husky add </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">husky</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">commit</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">msg </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">yarn commitlint --edit $1</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn husky add </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">husky</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">pre</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">commit </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">npx lint-staged</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><ul><li>添加 lint-staged 配置到 package.json</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>prettier 应放在 eslint/stylelint 之后</p></div><ul><li>添加 lint-staged 配置到 package.json</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lint-staged</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lint-staged</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lint-staged</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">src/**/*.{js,ts,vue}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint --fix --ignore-path .eslintignore</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">src/**/*.{less,sass,css,vue}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylelint --fix --ignore-path .eslintignore</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">**/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --check . --ignore-unknown</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="八、配置-scripts-命令" tabindex="-1">八、配置 scripts 命令 <a class="header-anchor" href="#八、配置-scripts-命令" aria-hidden="true">#</a></h2><ol><li>项目根目录添加 .eslintignore 文件，里面表示不需要检验的目录,根据自己需要进行设置</li></ol><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">build</span><span style="color:#676E95;font-style:italic;">/*.js</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">src/assets</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">public</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 类型</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">typings</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 第三方库</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">wxcomponents</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">qqmap-wx-jssdk1.2</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">tki-qrcode</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>package.json 中的 scripts 里添加</li></ol><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">eslint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint --cache --max-warnings 0 </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">{src,mock}/**/*.{vue,ts,tsx}</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;"> --fix</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lint-staged</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lint-staged</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">prettier</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --write  </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">src/**/*.{js,json,tsx,css,less,scss,vue,html,md}</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">stylelint</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylelint --cache --fix </span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;">**/*.{vue,less,postcss,css,scss}</span><span style="color:#A6ACCD;">\\&quot;</span><span style="color:#C3E88D;"> --cache --cache-location node_modules/.cache/stylelint/ --ignore-path .eslintignore</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>说明: --ignore-path: 参数指定 eslint、stylelint 忽略配置文件,其内表示不需要检验的目录</p>`,44),t=[o];function e(c,r,D,y,i,F){return a(),n("div",null,t)}const d=s(p,[["render",e]]);export{A as __pageData,d as default};
