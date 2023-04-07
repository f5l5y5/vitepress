# vitepress 添加 Algolia 搜索

## 1. 申请流程

vitepress 搜索使用 algolia,使用前需要申请 appId,appKey,indexName。[algolia 申请地址](https://docsearch.algolia.com/apply/),申请后需要回复邮件确认。 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61a7dd0bddee433f9d0693a890f9347a~tplv-k3u1fbpfcp-watermark.image?) 下面确认后邮件红色的框需要进入注册账号，到主页如下：

1. 先 getStarted 选择应用类型 ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4b83729210346d88985e470bf086092~tplv-k3u1fbpfcp-watermark.image?)
2. 后点击 API Keys ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/867e4a7060f74f7bb37655055eecf204~tplv-k3u1fbpfcp-watermark.image?)
3. 保存这些 key ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/539d15a9e3a245cda62ff2315c8b1609~tplv-k3u1fbpfcp-watermark.image?)
4. 创建 indexName vitepress 中的三个参数获取完毕。 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae16e36020d9439fae3d6cd9552bbdc4~tplv-k3u1fbpfcp-watermark.image?)

## 2. 如何实时更新搜索

algolia 默认一个星期更新，需要使用 github-Actions 添加实时更新。

1. 根目录下新建爬虫 crawlerConfig.json 文件

```json
{
  "index_name": "yinuosnowball",
  "start_urls": ["https://blog.yinuosnowball.top/"],
  "rateLimit": 8,
  "maxDepth": 10,
  "selectors": {
    "lvl0": {
      "selector": "",
      "defaultValue": "Documentation"
    },
    "lvl1": ".content h1",
    "lvl2": ".content h2",
    "lvl3": ".content h3",
    "lvl4": ".content h4",
    "lvl5": ".content h5",
    "content": ".content p, .content li",
    "lang": {
      "selector": "/html/@lang",
      "type": "xpath",
      "global": true
    }
  },
  "selectors_exclude": ["aside", ".page-footer", ".next-and-prev-link", ".table-of-contents"],
  "custom_settings": {
    "attributesForFaceting": ["lang", "tags"]
  },
  "js_render": true
}
```

2. 新建 algolia.yml 文件

```yml
name: algolia
on:
  push:
    branches:
      - main
jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Get the content of algolia.json as config
        id: algolia_config
        run: echo "config=$(cat crawlerConfig.json | jq -r tostring)" >> $GITHUB_OUTPUT
      - name: Push indices to Algolia
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.ALGOLIA_APP_ID }}
          API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
```

3. github 中添加变量 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ececfdabed024872988b3623ba1a2493~tplv-k3u1fbpfcp-watermark.image?)

## 3. 更新文档

    999 搜索不到

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46358fe5bafc4e59863408bfdd8d5e14~tplv-k3u1fbpfcp-watermark.image?)

添加 999:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df5f161333294d2a9e8df0d98a5d4fcc~tplv-k3u1fbpfcp-watermark.image?)

更新后输入： ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a1849f94e264581bd621086bd6539cf~tplv-k3u1fbpfcp-watermark.image?)

问题：如果是 algolia 先执行完，则不会搜索到，可以添加延时执行。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e68ee709413a4ef8b307c414a2279ef0~tplv-k3u1fbpfcp-watermark.image?)

[代码仓库](https://github.com/f5l5y5/vitepress)
