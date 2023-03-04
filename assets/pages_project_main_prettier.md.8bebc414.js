import{_ as s,c as n,o as a,a as e}from"./app.70f22cdf.js";const d=JSON.parse('{"title":"prettier","description":"","frontmatter":{},"headers":[{"level":2,"title":"1、什么是 Prettier","slug":"_1、什么是-prettier","link":"#_1、什么是-prettier","children":[]},{"level":2,"title":"2、为什么要用 Prettier","slug":"_2、为什么要用-prettier","link":"#_2、为什么要用-prettier","children":[]},{"level":2,"title":"3、安装 Prettier","slug":"_3、安装-prettier","link":"#_3、安装-prettier","children":[]},{"level":2,"title":"4、安装 eslint-config-prettier","slug":"_4、安装-eslint-config-prettier","link":"#_4、安装-eslint-config-prettier","children":[]},{"level":2,"title":"5、安装 eslint-plugin-prettier","slug":"_5、安装-eslint-plugin-prettier","link":"#_5、安装-eslint-plugin-prettier","children":[]},{"level":2,"title":"6、配置文件","slug":"_6、配置文件","link":"#_6、配置文件","children":[]},{"level":2,"title":"7、忽略某些文件的格式化","slug":"_7、忽略某些文件的格式化","link":"#_7、忽略某些文件的格式化","children":[]},{"level":2,"title":"8、格式化命令","slug":"_8、格式化命令","link":"#_8、格式化命令","children":[]},{"level":2,"title":"vscode 中使用 prettier","slug":"vscode-中使用-prettier","link":"#vscode-中使用-prettier","children":[]},{"level":2,"title":"Prettier 配合 EditorConfig 使用说明","slug":"prettier-配合-editorconfig-使用说明","link":"#prettier-配合-editorconfig-使用说明","children":[]}],"relativePath":"pages/project/main/prettier.md","lastUpdated":1677895774000}'),l={name:"pages/project/main/prettier.md"},p=e(`<h1 id="prettier" tabindex="-1">prettier <a class="header-anchor" href="#prettier" aria-hidden="true">#</a></h1><h2 id="_1、什么是-prettier" tabindex="-1">1、什么是 Prettier <a class="header-anchor" href="#_1、什么是-prettier" aria-hidden="true">#</a></h2><p>Prettier 是一个代码格式化工具，可以格式化代码，但不具备代码检查功能，它可以通过解析代码并使用自己的规则重新打印它，并考虑最大行长来强制一致的样式，并在必要时包装代码，如今，它已成为解决所有代码格式问题的优选方案，支持多种语言，可以将 ESLint 和 Prettier 结合使用，提高代码质量。</p><h2 id="_2、为什么要用-prettier" tabindex="-1">2、为什么要用 Prettier <a class="header-anchor" href="#_2、为什么要用-prettier" aria-hidden="true">#</a></h2><p>上面 Prettier 的定义一看，是不是觉得和 ESLint 差不了多少？那么，有了 ESLint，为什么还要用 Prettier 呢？</p><p>其实呀，<strong>ESLint 虽然是一个代码检测工具，可以检测代码质量问题并给出提示，但是提供的格式化功能有限，在代码风格上面做的不是很好，并且也只能格式化 JS，不支持 CSS,HTML 等语言。而在代码风格上面，Prettier 具有更加强大的功能，并且能够支持包括 JavaScript、TypeScript、各种 CSS、Vue 和 Markdown 等前端绝大部分的语言和文件格式。</strong> 因此，我们一般会将 ESLint 和 Prettier 一起结合起来使用，用 ESLint 进行代码校验，用 Prettier 统一代码风格。</p><h2 id="_3、安装-prettier" tabindex="-1">3、安装 Prettier <a class="header-anchor" href="#_3、安装-prettier" aria-hidden="true">#</a></h2><p>（1）脚手架自动安装</p><p>如果是采用脚手架如 Vue-Cli 创建项目，在创建项目时就可以选择安装 Prettier，安装完成后，会自动在项目根目录生成一个.eslintrc.js 文件，里面的默认配置中已经包含了 prettier 的相关扩展。</p><p>（2）手动安装</p><p>如果已经存在一个项目，并且想要安装 Prettier，可以通过 npm 的方式进行安装。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm install prettier --save-dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_4、安装-eslint-config-prettier" tabindex="-1">4、安装 eslint-config-prettier <a class="header-anchor" href="#_4、安装-eslint-config-prettier" aria-hidden="true">#</a></h2><p>安装好 Prettier 之后，我们还需要安装 eslint-config-prettier，这是因为 eslint 和 prettier 里面的一些规则可能会存在冲突，这个时候我们就需要安装 eslint-config-prettier，<strong>并且关掉所有和 prettier 冲突的 eslint 配置</strong>。</p><p>通过 npm 安装 eslint-config-prettier。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm install eslint-config-prettier --save-dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装好 eslint-config-prettier 之后，接下来我们就需要关掉所有和 prettier 冲突的 eslint 配置。这里只需要在.eslintrc.js 的 extends 中将 prettier 设置为最后一个 extends 即可，相当于用 prettier 的规则，覆盖掉 eslint:recommended 的部分规则。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint:recommended</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span></code></pre></div><h2 id="_5、安装-eslint-plugin-prettier" tabindex="-1">5、安装 eslint-plugin-prettier <a class="header-anchor" href="#_5、安装-eslint-plugin-prettier" aria-hidden="true">#</a></h2><p>接下来，我们还需要安装 eslint-plugin-prettier，eslint-plugin-prettier 的作用时是将 prettier 的能力集成到 eslint 中，使得我们在运行 eslint 检查我们的代码时，<strong>能够按照 prettier 的规则检查代码规范性，并进行修复</strong>。</p><p>使用 npm 安装 eslint-plugin-prettier。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm install eslint-plugin-prettier</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>安装 eslint-plugin-prettier 后，需要对.eslintrc.js 进行配置。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rules</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">prettier/prettier</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">plugins</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">]，</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>除了上面这种配置之外，我们也可以直接将上面两个步骤结合在一起，使用下面的配置就可以。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">extends</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: [ </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint:recommended</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">plugin:prettier/recommended</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="_6、配置文件" tabindex="-1">6、配置文件 <a class="header-anchor" href="#_6、配置文件" aria-hidden="true">#</a></h2><p>Prettier 和 ESLint 一样，支持我们通过配置文件的方式，实现自定义配置，覆盖原来的 Prettier 配置。</p><ul><li>&quot;prettier&quot; key in your package.json file.</li><li>.prettierrc file written in JSON or YAML.</li><li>.prettierrc.json, .prettierrc.yml, .prettierrc.yaml, or .prettierrc.json5 file.</li><li>.prettierrc.js, .prettierrc.cjs, prettier.config.js, or prettier.config.cjs file that exports an object using module.exports.</li><li>.prettierrc.toml file.</li></ul><p>我们可以在根目录创建.prettierrc 文件，.prettierrc 文件支持写入 YAML，JSON 的配置格式，并且支持.yaml，.yml，.json 和.js 后缀。在平时的开发中，一般会选择创建.prettierrc.js 文件，实现对 prettier 配置的覆盖。</p><p>在.prettierrc.cjs/js 文件中，我们可以对 prettier 的默认配置进行修改。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 一行最多 120 字符</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">printWidth</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">120</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 使用 2 个空格缩进</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">tabWidth</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 不使用缩进符，而使用空格</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">useTabs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 行尾需要有分号</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">semi</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 使用单引号</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">singleQuote</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 对象的 key 仅在必要时用引号</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">quoteProps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">as-needed</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// jsx 不使用单引号，而使用双引号</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">jsxSingleQuote</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 末尾需要有逗号</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">trailingComma</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">all</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 大括号内的首尾需要空格</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">bracketSpacing</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// jsx 标签的反尖括号需要换行</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">jsxBracketSameLine</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 箭头函数，只有一个参数的时候，也需要括号</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">arrowParens</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">always</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 每个文件格式化的范围是文件的全部内容</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">rangeStart</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">rangeEnd</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 不需要写文件开头的 @prettier</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">requirePragma</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 不需要自动在文件开头插入 @prettier</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">insertPragma</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 使用默认的折行标准</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">proseWrap</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">preserve</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 根据显示样式决定 html 要不要折行</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">htmlWhitespaceSensitivity</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// vue 文件中的 script 和 style 内不用缩进</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">vueIndentScriptAndStyle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 换行符使用 lf</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">endOfLine</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lf</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 格式化内嵌代码</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">embeddedLanguageFormatting</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">auto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="_7、忽略某些文件的格式化" tabindex="-1">7、忽略某些文件的格式化 <a class="header-anchor" href="#_7、忽略某些文件的格式化" aria-hidden="true">#</a></h2><p>Prettier 和 ESLint 一样，也支持忽略对某些文件的格式化。如果我们存在一些不需要格式化的文件，可以在根目录创建 <strong>.prettierignore</strong> 文件，并且将不需要格式化的文件或目录名称写在该文件中。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">dist node_modules .eslintignore .prettierignore</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_8、格式化命令" tabindex="-1">8、格式化命令 <a class="header-anchor" href="#_8、格式化命令" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 格式化所有文件</span></span>
<span class="line"><span style="color:#A6ACCD;">npx prettier </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">write </span><span style="color:#89DDFF;">.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 格式化app目录下的所有文件</span></span>
<span class="line"><span style="color:#A6ACCD;">prettier </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">write app</span><span style="color:#89DDFF;">/</span></span>
<span class="line"></span></code></pre></div><h2 id="vscode-中使用-prettier" tabindex="-1">vscode 中使用 prettier <a class="header-anchor" href="#vscode-中使用-prettier" aria-hidden="true">#</a></h2><p>配置好 ESLint 和 Prettier 之后，我们通过运行 eslint 命令，就可以对我们代码进行检查啦。但是，每次要手动运行命令才能检查我们的代码还是有点麻烦，有没有更简单的方式，让我们在编写代码的过程中，只要保存文件就能够对当前文件进行检查，并且自动修复一些错误呢？VSCode 插件：安装 prettier</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">editor.formatOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">true</span><span style="color:#A6ACCD;">,</span><span style="color:#676E95;font-style:italic;">// 开启自动保存</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">editor.defaultFormatter</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">esbenp.prettier-vscode</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#676E95;font-style:italic;">// 默认格式化工具选择prettier</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 设定特定语言</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[vue]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.defaultFormatter</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">esbenp.prettier-vscode</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">[javascript]</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">editor.defaultFormatter</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">esbenp.prettier-vscode</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="prettier-配合-editorconfig-使用说明" tabindex="-1">Prettier 配合 EditorConfig 使用说明 <a class="header-anchor" href="#prettier-配合-editorconfig-使用说明" aria-hidden="true">#</a></h2><p>如果你不知道什么是 editorConfig，或者不知道怎么用，请看 EditorConfig 使用详解。</p><p>editorconfig 和 prettier 其实是相辅相成的，是互不矛盾的，共同协作来格式化代码。</p><p>editorConfig 中 indent_style 控制的是：编辑器使用制表符（tab）缩进，还是空格（space）缩进，控制编辑器的缩进风格。</p><p>prettier 中的 useTabs 控制的是：是否使用制表符缩进，而不使用空格。</p><p>如果使用制表符缩进，即 useTabs 值为 true，如果配置了 editorconfig 文件，并安装 editorconfig 插件，则编辑器缩进距离取值为 editorconfig 文件配置的值。如果 indent_style = space，则先取 indent_size 的值，如果没有则取 tab_width 的值；如果 indent_style = tab，则先取 tab_width 的值，如果没有则取 indent_size 的值。如果 useTabs 值为 false，则取 prettier 文件中 tabWidth 的值。</p><ul><li>useTabs = true ----&gt; indent-style = space ----&gt; indent_size/tab_width</li><li>useTabs = true ----&gt; indent-style = tab ----&gt; tab_width/indent_size</li><li>useTabs = false----&gt; prettier ----&gt; tabWidth</li></ul><p>如果没有安装 editorconfig 插件，则 useTabs 为 true，取值为编辑器 tabSize 值，如果 useTabs 为 false，取值为 tab_width 值。</p><p>优先级说明：</p><p>editorConfig 的优先级高于编辑器设置的值，前提是编辑器安装了 EditorConfig 插件。</p><p>prettier 中 useTabs 的优先级高于 editorConfig 中的 indent_style。</p>`,51),t=[p];function o(r,i,c,D,y,F){return a(),n("div",null,t)}const A=s(l,[["render",o]]);export{d as __pageData,A as default};
