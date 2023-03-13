import{_ as s,c as n,o as a,a as l}from"./app.df5fc7ae.js";const F=JSON.parse('{"title":"github actions 推送 docker 镜像到 docker hub","description":"","frontmatter":{},"headers":[{"level":2,"title":"1.github 添加环境变量","slug":"_1-github-添加环境变量","link":"#_1-github-添加环境变量","children":[]},{"level":2,"title":"2.项目目录及 dockerFile 和 nginx 配置","slug":"_2-项目目录及-dockerfile-和-nginx-配置","link":"#_2-项目目录及-dockerfile-和-nginx-配置","children":[]},{"level":2,"title":"3. 写 yml 脚本","slug":"_3-写-yml-脚本","link":"#_3-写-yml-脚本","children":[]}],"relativePath":"pages/engineer/deploy/git-docker.md","lastUpdated":1678672568000}'),p={name:"pages/engineer/deploy/git-docker.md"},o=l(`<h1 id="github-actions-推送-docker-镜像到-docker-hub" tabindex="-1">github actions 推送 docker 镜像到 docker hub <a class="header-anchor" href="#github-actions-推送-docker-镜像到-docker-hub" aria-hidden="true">#</a></h1><h2 id="_1-github-添加环境变量" tabindex="-1">1.github 添加环境变量 <a class="header-anchor" href="#_1-github-添加环境变量" aria-hidden="true">#</a></h2><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6791dbc67aaa4c8586ede372074551ab~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="_2-项目目录及-dockerfile-和-nginx-配置" tabindex="-1">2.项目目录及 dockerFile 和 nginx 配置 <a class="header-anchor" href="#_2-项目目录及-dockerfile-和-nginx-配置" aria-hidden="true">#</a></h2><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">├─.dockerignore</span></span>
<span class="line"><span style="color:#A6ACCD;">├─Dockerfile</span></span>
<span class="line"><span style="color:#A6ACCD;">└nginx.conf</span></span>
<span class="line"></span></code></pre></div><p>DockerFile</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">FROM nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY dist/ /usr/share/nginx/html/</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf  // 因为不是放在根目录，根据自己的文件改</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>nginx</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen       80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name  localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    access_log  /var/log/nginx/host.access.log  main;</span></span>
<span class="line"><span style="color:#A6ACCD;">    error_log  /var/log/nginx/error.log  error;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        # index  index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location = /50x.html {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_3-写-yml-脚本" tabindex="-1">3. 写 yml 脚本 <a class="header-anchor" href="#_3-写-yml-脚本" aria-hidden="true">#</a></h2><p>这里触发以推送 tag 为例：</p><p>拉取代码 ---&gt; 生成 tag ---&gt; 打包 ---&gt; 登录 dockerhub ---&gt; 生成镜像 ---&gt; 上传 dockerhub</p><div class="language-yml"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Docker Image CI</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF9CAC;">on</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">tags</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">v*</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">jobs</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">build</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">runs-on</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">steps</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Checkout</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/checkout@v3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Create Release</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create_release</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/create-release@v1</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">env</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">GITHUB_TOKEN</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ secrets.GITHUB_TOKEN }}</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># This token is provided by Actions, you do not need to create your own token</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">tag_name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">\${{ github.ref }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">release_name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Release \${{ github.ref }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">            release</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">draft</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">prerelease</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Set env</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">echo &quot;RELEASE_VERSION=\${GITHUB_REF#refs/*/}&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Test</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          echo $RELEASE_VERSION</span></span>
<span class="line"><span style="color:#C3E88D;">          echo \${{ env.RELEASE_VERSION }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Install and Build</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          npm install</span></span>
<span class="line"><span style="color:#C3E88D;">          npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Build and push Docker image</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">|</span></span>
<span class="line"><span style="color:#C3E88D;">          docker login -u \${{ secrets.DOCKER_USERNAME }} -p \${{ secrets.DOCKER_PASSWORD }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">push</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker_build</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker/build-push-action@v2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">context</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">./deploy/Dockerfile</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">tags</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">f5l5y5/taoism-admin:latest</span></span>
<span class="line"></span></code></pre></div><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ececd6bbf3364347a98cdcccc8484d56~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>`,14),e=[o];function c(t,r,i,y,C,D){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{F as __pageData,d as default};
