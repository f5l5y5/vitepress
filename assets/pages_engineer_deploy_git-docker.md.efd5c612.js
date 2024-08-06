import{_ as s,o as n,c as a,a as l}from"./app.388c05f4.js";const d=JSON.parse('{"title":"github actions 推送 docker 镜像到 docker hub","description":"","frontmatter":{},"headers":[{"level":2,"title":"1.github 添加环境变量","slug":"_1-github-添加环境变量","link":"#_1-github-添加环境变量","children":[]},{"level":2,"title":"2.项目目录及 dockerFile 和 nginx 配置","slug":"_2-项目目录及-dockerfile-和-nginx-配置","link":"#_2-项目目录及-dockerfile-和-nginx-配置","children":[]},{"level":2,"title":"3. 写 yml 脚本","slug":"_3-写-yml-脚本","link":"#_3-写-yml-脚本","children":[]}],"relativePath":"pages/engineer/deploy/git-docker.md","lastUpdated":1722912902000}'),p={name:"pages/engineer/deploy/git-docker.md"},e=l(`<h1 id="github-actions-推送-docker-镜像到-docker-hub" tabindex="-1">github actions 推送 docker 镜像到 docker hub <a class="header-anchor" href="#github-actions-推送-docker-镜像到-docker-hub" aria-hidden="true">#</a></h1><h2 id="_1-github-添加环境变量" tabindex="-1">1.github 添加环境变量 <a class="header-anchor" href="#_1-github-添加环境变量" aria-hidden="true">#</a></h2><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6791dbc67aaa4c8586ede372074551ab~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="_2-项目目录及-dockerfile-和-nginx-配置" tabindex="-1">2.项目目录及 dockerFile 和 nginx 配置 <a class="header-anchor" href="#_2-项目目录及-dockerfile-和-nginx-配置" aria-hidden="true">#</a></h2><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#BABED8;">deploy</span></span>
<span class="line"><span style="color:#BABED8;">├─.dockerignore</span></span>
<span class="line"><span style="color:#BABED8;">├─Dockerfile</span></span>
<span class="line"><span style="color:#BABED8;">└nginx.conf</span></span>
<span class="line"></span></code></pre></div><p>DockerFile</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">FROM nginx</span></span>
<span class="line"><span style="color:#babed8;">COPY dist/ /usr/share/nginx/html/</span></span>
<span class="line"><span style="color:#babed8;">COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf  // 因为不是放在根目录，根据自己的文件改</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div><p>nginx</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">server {</span></span>
<span class="line"><span style="color:#babed8;">    listen       80;</span></span>
<span class="line"><span style="color:#babed8;">    server_name  localhost;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    access_log  /var/log/nginx/host.access.log  main;</span></span>
<span class="line"><span style="color:#babed8;">    error_log  /var/log/nginx/error.log  error;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    location / {</span></span>
<span class="line"><span style="color:#babed8;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#babed8;">        # index  index.html index.htm;</span></span>
<span class="line"><span style="color:#babed8;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#babed8;">    location = /50x.html {</span></span>
<span class="line"><span style="color:#babed8;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre></div><h2 id="_3-写-yml-脚本" tabindex="-1">3. 写 yml 脚本 <a class="header-anchor" href="#_3-写-yml-脚本" aria-hidden="true">#</a></h2><p>这里触发以推送 tag 为例：</p><p>拉取代码 ---&gt; 生成 tag ---&gt; 打包 ---&gt; 登录 dockerhub ---&gt; 生成镜像 ---&gt; 上传 dockerhub</p><div class="language-yml"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Docker Image CI</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9CAC;">on</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">tags</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">v*</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">jobs</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">build</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">runs-on</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ubuntu-latest</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">steps</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Checkout</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">actions/checkout@v3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Create Release</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">create_release</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">actions/create-release@v1</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">env</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">GITHUB_TOKEN</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">\${{ secrets.GITHUB_TOKEN }}</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;"># This token is provided by Actions, you do not need to create your own token</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">tag_name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">\${{ github.ref }}</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">release_name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Release \${{ github.ref }}</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">            release</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">draft</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">prerelease</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Set env</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">echo &quot;RELEASE_VERSION=\${GITHUB_REF#refs/*/}&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Test</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          echo $RELEASE_VERSION</span></span>
<span class="line"><span style="color:#C3E88D;">          echo \${{ env.RELEASE_VERSION }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Install and Build</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          npm install</span></span>
<span class="line"><span style="color:#C3E88D;">          npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Build and push Docker image</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          docker login -u \${{ secrets.DOCKER_USERNAME }} -p \${{ secrets.DOCKER_PASSWORD }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">push</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">docker_build</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">docker/build-push-action@v2</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">context</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">.</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">file</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">./deploy/Dockerfile</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">tags</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">f5l5y5/taoism-admin:latest</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ececd6bbf3364347a98cdcccc8484d56~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>`,14),o=[e];function c(t,r,i,y,D,B){return n(),a("div",null,o)}const E=s(p,[["render",c]]);export{d as __pageData,E as default};
