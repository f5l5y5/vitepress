# github actions 推送 docker 镜像到 docker hub

## 1.github 添加环境变量

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6791dbc67aaa4c8586ede372074551ab~tplv-k3u1fbpfcp-watermark.image?)

## 2.项目目录及 dockerFile 和 nginx 配置

```json
deploy
├─.dockerignore
├─Dockerfile
└nginx.conf
```

DockerFile

```
FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf  // 因为不是放在根目录，根据自己的文件改
```

nginx

```
server {
    listen       80;
    server_name  localhost;

    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        # index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

## 3. 写 yml 脚本

这里触发以推送 tag 为例：

拉取代码 ---> 生成 tag ---> 打包 ---> 登录 dockerhub ---> 生成镜像 ---> 上传 dockerhub

```yml
name: Docker Image CI

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            release
          draft: false
          prerelease: false

      - name: Set env
        run: echo "RELEASE_VERSION=${GITHUB_REF#refs/*/}" >> $GITHUB_ENV

      - name: Test
        run: |
          echo $RELEASE_VERSION
          echo ${{ env.RELEASE_VERSION }}

      - name: Install and Build
        run: |
          npm install
          npm run build

      - name: Build and push Docker image
        run: |
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}

      - name: push
        id: docker_build
        uses: docker/build-push-action@v2
        with:
          context: .
          file: ./deploy/Dockerfile
          push: true
          tags: f5l5y5/taoism-admin:latest
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ececd6bbf3364347a98cdcccc8484d56~tplv-k3u1fbpfcp-watermark.image?)
