# github actions 推送 docker 镜像到 docker hub

## 1. 添加环境变量

## 2. 配置 CI 脚本

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
