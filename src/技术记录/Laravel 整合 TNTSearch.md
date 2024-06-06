---
title: Laravel 整合 TNTSearch
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

# laravel整合tntSearch



介绍：

laravel下TNTSearch+jieba-php实现中文全文搜索
`TNTSearch`+`jieba-php`这套组合可以不依赖第三方的情况下实现中文搜索，特别的适合博客这类项目。




环境：
>
>- laravel（v5.5.50）
>- [vanry/laravel-scout-tntsearch](https://github.com/vanry/laravel-scout-tntsearch)
>- SQLite
>- mbstring
>- jieba-php



命令：
```bash
composer require vanry/laravel-scout-tntsearch
```

```bash
composer require fukuball/jieba-php
```



参考：

>[laravel-scout-tntsearch-driver ](https://github.com/teamtnt/laravel-scout-tntsearch-driver) https://github.com/teamtnt/laravel-scout-tntsearch-driver 
> [laravel下TNTSearch+jieba-php实现中文全文搜索](https://baijunyao.com/article/154)(https://baijunyao.com/article/154)


















