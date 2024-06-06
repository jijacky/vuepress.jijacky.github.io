---
title: composer本地代码作为源库
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

# composer本地代码作为源库

鉴于众所周知的情况，再不更新的前提下，直接使用本地的扩展包对系统进行升级，高端，快速，酸爽。



### 方案1

这种方案的多层依赖问题会在安装扩展的时候体现。

1. 首先，在开发的项目使用 `composer show` ，检查需要使用的插件的版本。

2. 在对应插件的根目录的 `composer.json` 文件里面，查看是否有对用的 `version` 字段。

3. 没有则添加查找到的版本号 `version: 2.1.3` 。

4. 在更新的项目的 `composer.json` 文件中，修改或添加对应的字段。如下：

   ```json
   	"prefer-stable": true, # 优先使用更稳定的包版本
       "repositories": {
           "0": {
               "type": "path", # 仓库路径类型
               "url": "E:/composer_source/vendor/*/*" # 本地仓库路径
           },
           "packagist": false # 禁用packagist
       }
   ```

5. 和远程一样正常执行命令 `composer  request xx/xx *`。



### 方案2

这种方案需要考虑多层依赖问题。可能会出现当时调试没有问题，运行一段时间出现问题的情况。

```json
"autoload": {
    "psr-4": {
        "App\\Controller\\": "app/controller",
        "App\\Model\\": "app/model"
    }, # 自动加载规范。key为项目中引用类时的namespace，value为自定义类namespace。要注意key中需要两个\\
    "files":["app/controller/index.php"], # 引入单个文件
    "classmap":["app/controller"] # 引入文件夹下所有文件
}

```

以上三中方式都可以映入自定义类或者函数。
执行 ` composer update` ,不推荐使用，最好使用` composer install` 。
开发中间加入的情况下，直接执行 `composer dump-autoload` 即可。



> https://ask.csdn.net/questions/3749907
>
> [PHP Composer 加载本地扩展包](ttps://blog.csdn.net/nextvary/article/details/100671287)





















