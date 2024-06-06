---
title: http头
icon: fab fa-markdown
order: 2
category:
  - 技术记录
tag:
  - 技术
  - 随笔
# star: true
# sticky: true
date: 2024-05-31
---

- 缓存1
```
    Expires:GMT时间 
    Pragma:no-cache(唯一值)
```
- 缓存2
```
    Cache-contral:...
```
- 缓存时间
```
    last-modified:GMT时间
    if-modified-since:...
```
- 缓存签名
```
    etag:字符串
    if-none-match:...
```
- 跨域
```
    Access-Control-Allow-Origin:*
    Access-Control-Allow-Credentials:true
    Access-Control-Allow-Methods:GET, POST, OPTIONS
    Access-Control-Allow-Headers:*
    Access-Control-Expose-Headers:*
```
- 跨域OPTIONS
```
    Access-Control-Max-Age:1728000
    Content-Type:text/plain;charset=utf-8
    Content-Length:0
```
