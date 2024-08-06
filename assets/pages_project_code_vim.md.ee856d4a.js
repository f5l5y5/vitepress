import{_ as s,o as a,c as n,a as e}from"./app.388c05f4.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. 基础知识","slug":"_1-基础知识","link":"#_1-基础知识","children":[]},{"level":2,"title":"2. 快速 comment：","slug":"_2-快速-comment","link":"#_2-快速-comment","children":[]},{"level":2,"title":"3. EasyMotion:","slug":"_3-easymotion","link":"#_3-easymotion","children":[]},{"level":2,"title":"4. Vim surround","slug":"_4-vim-surround","link":"#_4-vim-surround","children":[]},{"level":2,"title":"5. Vim sneak","slug":"_5-vim-sneak","link":"#_5-vim-sneak","children":[]}],"relativePath":"pages/project/code/vim.md","lastUpdated":1722918563000}'),l={name:"pages/project/code/vim.md"},p=e(`<h2 id="_1-基础知识" tabindex="-1">1. 基础知识 <a class="header-anchor" href="#_1-基础知识" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">Operate ： d c y</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">motion: $ g G ^</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">leader key:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">比如 ff find f 单词 如果有功能是 find file 也想用 ff 冲突 可以加上 leader ，leader+ ff</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div><h2 id="_2-快速-comment" tabindex="-1">2. 快速 comment： <a class="header-anchor" href="#_2-快速-comment" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">gcc</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`gc【motion】 如 gc3j\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">整个到下个空行 comment gc}</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div><h2 id="_3-easymotion" tabindex="-1">3. EasyMotion: <a class="header-anchor" href="#_3-easymotion" aria-hidden="true">#</a></h2><p>快速移动 去你目之所及的任何地方</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">&lt;space&gt;&lt;space&gt;[num]s[char]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">leader leader + s + 字符</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">leader leader + 2s + 2 字符</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div><h2 id="_4-vim-surround" tabindex="-1">4. Vim surround <a class="header-anchor" href="#_4-vim-surround" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">    [operator]s[motion][symbol]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">y s i w )===&gt; yank operator + surround + iw 代表 text object 这个 motion + ）symbol</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    )改成] 光标移入文本</span></span>
<span class="line"><span style="color:#babed8;">    cs ) ] === change operator + surround + old symbol + new symbol</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    删除 ds]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    灵活使用surround 后面的加上符号</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    ysfr&quot;  ===&gt; yank + surround + fr find r + &quot;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    比如 con|st = try find r string ===&gt; con&#39;st = try find r&#39; string</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div><h2 id="_5-vim-sneak" tabindex="-1">5. Vim sneak <a class="header-anchor" href="#_5-vim-sneak" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">    [num][operator]z[char][char]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    通过两个字符 给你实现更强的motion</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    2dzPe ===&gt; 第二个为止 + delete operator + z 代表使用 vim sneak + Pe motion</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    从当前位置 到第二个Pe之前的所有东西全部给删除</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    可以与surround结合使用</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    2 ys z Pe &quot;   第二个Pe前都打上双引号</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    ## 窗口 文件移动</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    gd 查看定义 go to definition</span></span>
<span class="line"><span style="color:#babed8;">    C-o C-i 鼠标的后退和前进</span></span>
<span class="line"><span style="color:#babed8;">    gh 查看说明</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    打开文件 CTRL+p</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    remap：</span></span>
<span class="line"><span style="color:#babed8;">    leader tn tp nl nf 窗口切换</span></span>
<span class="line"><span style="color:#babed8;">    C-n 重构名称</span></span>
<span class="line"><span style="color:#babed8;">    C-z 终端切换 C-j关闭终端 C-b 关闭侧边栏</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    分屏</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div>`,11),o=[p];function c(t,i,r,d,b,y){return a(),n("div",null,o)}const u=s(l,[["render",c]]);export{h as __pageData,u as default};
