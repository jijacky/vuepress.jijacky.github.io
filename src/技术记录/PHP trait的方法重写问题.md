---
title: PHP trait的方法重写问题
icon: fab fa-markdown
order: 2
category:
  - 技术记录
tag:
  - 技术
  - 随笔
  - PHP
  - trait
star: true
# sticky: true
date: 2024-06-18
---

# PHP trait的方法重写问题

最近项目使用到了 PHP 的 trait ，发现 trait 的方法重写有问题，所以记录一下。

查看如下代码
```php

class base{
    public function test(){
        echo "base";
    }
}

trait trait1{
    public function test(){
        parent::test();
        echo "trait1";
    }
}

class child extends base{
    use trait1;
    public function test(){
        parent::test();
        echo "child";
    }
}

$o = new child();
$o->test();

```
预期结果是：`basetrait1child`
实际结果是：`basechild`

再看以下代码
```php

class base{
    public function test(){
        echo "base";
    }
}

trait trait1{
    public function test(){
        parent::test();
        echo "trait1";
    }
}

class child extends base{
    use trait1;
    // public function test(){
    //     parent::test();
    //     echo "child";
    // }
}

$o = new child();
$o->test();

```
预期结果是：`basetrait1`
实际结果是：`basetrait1`

综合以上，虽然 train 中的方法会覆盖父类的同名方法，但是不属于继承体系。仅仅相当于字面上的覆盖，相当于使用本 trait 的类自己写了个方法。所以 parent 关键字并不指向 trait 中的方法。
