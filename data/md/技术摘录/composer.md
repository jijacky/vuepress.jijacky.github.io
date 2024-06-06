## 更换镜像源
```
composer config repo.packagist composer https://packagist.phpcomposer.com
composer config repo.packagist composer https://mirrors.aliyun.com/composer
composer config repo.packagist composer https://developer.aliyun.com/composer
```

## 镜像大全 

> https://blog.csdn.net/lisuibi/article/details/111651610

阿里云 Composer 全量镜像
`composer config repo.packagist composer https://developer.aliyun.com/composer`

腾讯云 Composer 全量镜像
`composer config repo.packagist composer https://mirrors.cloud.tencent.com/composer/`

华为 Composer 全量镜像
`composer config repo.packagist composer https://mirrors.huaweicloud.com/repository/php/`

安畅网络镜像
`composer config repo.packagist composer https://php.cnpkg.org`

交通大学镜像
`composer config repo.packagist composer https://packagist.mirrors.sjtug.sjtu.edu.cn`

Packagist / JP
`composer config repo.packagist composer https://packagist.jp`


## 解决内存不够的问题
```
php -d memory_limit=-1 D:/phpstudy_pro/Extensions/composer1.8.5/composer.phar require baijunyao/laravel-scout-elasticsearch "^2.0"
```

## 忽略平台以及扩展依赖强制安装
```
composer install --ignore-platform-reqs
composer update --ignore-platform-reqs
```