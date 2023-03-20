## Webpack 配置

```js
config.plugins.push(
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }),
)
```

## nginx 配置

配置启用 nginx 的 gzip，这个必须要启动，而且配置协议为 1.0，且开启强制压缩，要不然代理一层你会发现正常，再代理一层就会出现不生效的情况：

```json

#开启gzip
gzip  on;
#低于1kb的资源不压缩
gzip_min_length 1k;
#压缩级别1-9，越大压缩率越高，同时消耗cpu资源也越多，建议设置在5左右。
gzip_comp_level 5;
#需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片.
gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;
#配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
gzip_disable "MSIE [1-6]\.";
#是否添加“Vary: Accept-Encoding”响应头
gzip_vary on;


gzip  on;
gzip_buffers 16 8k;
gzip_comp_level 6;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
gzip_types
text/xml application/xml application/atom+xml application/rss+xml application/xhtml+xml image/svg+xml     text/javascript application/javascript application/x-javascript     text/x-json application/json application/x-web-app-manifest+json     text/css text/plain text/x-component     font/opentype application/x-font-ttf application/vnd.ms-fontobject     image/x-icon;
gzip_disable  "msie6";

//==============

 server中加入：
gzip on;
gzip_buffers 32 4K;
gzip_comp_level 6;
gzip_min_length 100;
gzip_types application/javascript text/css text/xml;
gzip_disable "MSIE [1-6]\."; #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
gzip_vary on;

在需要代理的路径下加入
gzip_http_version 1.0;
proxy_set_header Accept-Encoding gzip;
if ($http_accept_encoding !~* "gzip") {
    proxy_pass http://test.jtwo.me;
}

例如：
location /expert {
gzip_http_version 1.0;
proxy_set_header Accept-Encoding gzip;
if ($http_accept_encoding !~* "gzip") {
    proxy_pass http://test.jtwo.me;
}

auth_basic "The Kibana Monitor Center";
auth_basic_user_file  /usr/local/.passwd;
}
```

这是你那个项目的 webpack 专门配的，很多项目都会打包这个东西。浏览器可以直接解析 gz 文件并解压。比如 nginx 服务器，开启了 gzip:on,服务器会先去目录下寻找有没有对应的 gz 文件，如果没有，nginx 要做一次压缩，再返回，如果短时间访问量过高，会造成服务器压力大（压缩是消耗服务器资源的），提前打包好 gz，直接返回就好，服务器压力就没那么大。一般直播类型的网站会用到。插件 compression-webpack-plugin，你可以搜一下项目里是不是用的这个。

## 开启 gzip

![image.png](/engineer/nginx/gzipon.png)

![image.png](/engineer/nginx/gziponstatic.png)

## 未开启 gzip

![image.png](/engineer/nginx/gzipoff.png)

![image.png](/engineer/nginx/gzipoffstatic.png)
