# laravel项目安装部署

laravel 项目默认会把 vendor 目录和 env 忽略掉，不进行版本控制。
所以安装的时候，需要单独安装

env 文件是配置文件，直接上传即可
vendor 文件比较麻烦。
1. 需要明确知道使用的项目有些什么依赖，也就是必须纳入 composer 的依赖管理里面。
2. 部署（git、svn、copy等）完项目文件以后，检查文件下面是否有 composer.json 文件。
3. 使用 composer install 安装依赖（除非你知道依赖升级更新以后没有兼容性问题，否则请不要使用 composer update ）。
4. 确认项目使用的依赖里面有没有什么需要设置的，设置好。（比如 laravel 就需要执行 `php artisan key:generate` 生成新的 key 值
5. 检查 config、yml、env 等文件的配置情况。
6. api 依赖
7. 环境配置，比如 rewrite

laravel 之异步队列
1. 配置对应的队列驱动比如 redis 
2. 不管是事件监听器还是任务 jobs ，都要实现队列接口 ShouldQueue 
3. 消费者类设置对应的链接名称与队列名称
4. 启动伺服模式 `php artisan queue:work redis --queue=test --daemon` 
5. 或者启动监听模式 `php php artisan queue:listen`  

