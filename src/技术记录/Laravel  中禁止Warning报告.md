---
title: Laravel  中禁止Warning报告
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


## 方法1
我想在代码中完全禁止Warning报告，因为我使用laravel 9 ，php的版本是8.1，他修改了一些错误或异常的等级或报告方式。

如下它在一个简单的错误上抛出异常（因为未定义键 item ）
```php
$arr = [];
$item = $arr['item'];
```
失败的方案如下
```php
APP_DEBUG=false
APP_LOG_LEVEL='error'
display_errors(0);
```
但它仍然显示 ErrorException，键未定义。
防止这样的错误很容易，但是我不是很习惯，一个弱类型的语言，何必这么严肃。无聊。

一开始的方式可以使用诸如以下的方式，但是当没有定义时，直接返回null就可以了，何必脱裤子放屁。。。
```php
if(isset($arr['item'])){}
$arr['item']??''
```

后来研究laravel框架源码，发现框架在 Illuminate\Foundation\Bootstrap\HandleExceptions@bootstrap 直接来了句

```php
error_reporting(-1);
```

。。。
真真真是。。。

直接修改框架也不是回事，继续研究后发现，可以在中间件里面尝试改变这样的情况。我测试了以下方式。

随便找一个重写了handle方法的公共中间件，做如下修改。
```php
 public function handle($request, Closure $next)
{
    error_reporting(0);
    ...//原先代码继续执行
}
```
经过测试，应该是可以达到目的的。

## 方法2
后来发现的另一个方法，在App\Exceptions\Handler里面做如下处理
```php
public function render($request, Exception $exception)
{
    if ($exception instanceof ErrorException) {
        error_reporting(0);

        $kernel = app(\Illuminate\Contracts\Http\Kernel::class);
        $response = $kernel->handle($request)->send();
        return $kernel->terminate($request, $response);
    }

    return parent::render($request, $exception);
}
```
没有做测试，有兴趣再说。

参考：
[在 Laravel 生产中完全禁用错误报告？](https://segmentfault.com/q/1010000043326266)