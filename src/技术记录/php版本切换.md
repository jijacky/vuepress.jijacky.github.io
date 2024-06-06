---
title: php版本切换
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

# windows cli 下版本切换方法

windows下cli方式使用php本质就是在环境变量里面找到php.exe可执行程序，然后解释运行php脚本文件。所以php版本切换的基本眼里就是修改环境变量。但是每次都修改环境变量实在太繁琐。而且会导致同一个cli环境即使环境变量修改，cli重新打开不起作用的问题。所以我想到了使用软链接的方法。下面直接上代码。


```bash
@echo off

setlocal enabledelayedexpansion

set "php[php56]=G:\phpstudy_pro\Extensions\php\php5.6.9nts"
set "php[php71]=G:\phpstudy_pro\Extensions\php\php7.1.9nts"
set "php[php74]=G:\phpstudy_pro\Extensions\php\php7.4.3nts"
set "php[php80]=G:\sources_other\php8.0-8.1-for-phpstudy\php8.0.14nts"
set "php[php81]=G:\sources_other\php8.0-8.1-for-phpstudy\php8.1.1nts"
set "php[xampp]=G:\xampp\php"

set "phpVersion=%~1"

if defined php[%phpVersion%] (
    set "phpPath=!php[%phpVersion%]!"
	set "linkPath=G:\phpWork\php"
	
	if exist "!linkPath!" (
        rmdir /s /q "!linkPath!"
    )
	
    mklink /D "!linkPath!" "!phpPath!"
	
	echo PHP version switched to %phpVersion%.
) else (
    echo Invalid PHP version. Please specify php56, php60, or php71.
    exit /b
)
```
将以上代码保存至文本文件，重命名为 phpv.bat 。保存至文件夹 `g:\phpwork` 下。然后在环境变量里面添加 `g:\phpwork` 与 `g:\phpwork\php` 即可。其中必要的路径修改请根据实际情况调整。

执行代码

```
>phpv php70
PHP version switched to php70.
>php -v
```

是不是很丝滑。

