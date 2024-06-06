# laravel  整合 ES（basemkhirat）

### laravel（v5.2.45）整合es



> 本插件使用es-php，没有使用scout，使用了orm模型，但是是作为索引的ORM。并不能达成与数据库orm同步数据的目的。其他的方法是对ES-PHP做了一些包装，增加了一些orm属性而已。



> [laravel 使用 es 的正确姿势](https://learnku.com/articles/49763)   github：[basemkhirat/elasticsearch](https://github.com/basemkhirat/elasticsearch/wiki/0.-Overview/)。

1. 执行以下命令

    ```bash
    composer require  basemkhirat/elasticsearch
    ```

    如果报内存不足错误，请使用以下命令。其中，`D:/phpstudy_pro/Extensions/composer1.8.5/composer.phar` 为composer安装地址

    ```bash
    php -d memory_limit=-1 D:/phpstudy_pro/Extensions/composer1.8.5/composer.phar require  basemkhirat/elasticsearch
    ```

2. 在`config/app.php` 中，添加 *< laravel 5.5*

   ```php
   Basemkhirat\Elasticsearch\ElasticsearchServiceProvider::class
   'ES' => Basemkhirat\Elasticsearch\Facades\ES::class
   ```

3. 执行命令

   ```bash
   php artisan vendor:publish --provider="Basemkhirat\Elasticsearch\ElasticsearchServiceProvider"
   ```

4. 配置项 `config/es.php`、`config/scout.php`

    






















