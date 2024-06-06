## 如何部署安装别人的 laravel 项目？

刚下载下来的 laravel 项目，跟正常使用的相比，差一个 `.env` 文件和一个 `vendor` 文件夹。需要我们进行处理。

### .env 配置

复制根目录下的 `.env.example` 文件并重命名为 `.env`。`.env`是项目的示例配置文件，我们需要改成自己的实际配置。

> 说明如下

```
APP_NAME 就是自己的项目名称比如我现在就是：天真的小窝
APP_URL 就是我们的项目链接比如说我的 https://bin.zmide.com/ 本地的话就是我们配置的虚拟主机自定义的本地域名
DB_DATABASE 就是我们的数据库名比如说 test
DB_USERNAME 数据库用户名比如说 root
DB_PASSWORD 数据库密码比如说 123456
```

根据自己实际情况修改

### vendor 依赖

vendor 目录不用我们手动创建，在根目录下执行 `composer install` 命令之后，就会发现根目录下多了个 vendor。
另外，使用 `composer update` 也会生成 vendor，但是同时会改变 `composer.lock` 文件，并更新依赖为可用的最新版本。

这里简单的讲解下 `composer install` 和 `composer update` ，项目的开发者在开发的时候会生成 `composer.lock` 文件，它记录了开发者开发的时候使用的各扩展包的版本号，比如说某个扩展包开发者使用的是 1.0.1 版本。我们使用 `composer install`， 就是安装跟开发者一样版本的扩展包。而 `composer update` 则是更新各扩展包，这样的话可能我们某个扩展包 update 到了1.0.2 但是因为开发者还没测过 1.0.2 的兼容而产生错误。而且因为改变了 `composer.lock` 文件我们在 `git pull` 拉取新代码的时候也会冲突。如果我们是开发者，我们是需要经常 `composer update` 更新各扩展包，如果我们是使用者则使用 `composer install` 即可。

不能顺利的 install 完，大多是缺少某个 php 扩展，还有一些是因为 php 的版本比较低，install 的时候报错的话看下报错的提示。`composer install` 如果报错，版本问题的话可以参考我以前踩的坑：解决 `composer install` 遇到：`Your requirements could not be resolved to an installable set of packages`。

### 安装

接着我们需要执行下 `php artisan key:generate` ，这个是生成 APP_KEY 并自动写入到 .env 文件中的，这个是 laravel 用来加密 cookie 等的。
再接着我们需要执行 `php artisan migrate`，这个是生成数据表的，关于表迁移可以参考 laravel 官方文档，这时候我们查看数据库会发现创建了一大堆表。如果报错的话，大多是因为 .env 中的数据库账号密码配置的有问题，使用客户端或者其他项目连下数据库检查下。数据库表有了，但是表都是空的。
最后候我们需要执行 `php artisan db:seed`，这个是用来生成测试数据或者其他的一些基础数据的。现在就可以访问项目试试了，浏览器访问 APP_URL 链接。

如果首页并不能访问，我们可以查看 `routes/web.php` 文件里面定义的路由。

如果需要登录，一般可以通过查看填充文件 `database/seeds/UsersTableSeeder.php` 查看初始账号密码。