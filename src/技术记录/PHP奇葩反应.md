---
title: PHP奇葩反应
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

# PHP奇葩反应

[TOC]

1. array_unique对多维数组的反应。

```json
$couponAlllist = [
    'red',
    3,
    [44,55,66],
    [44,55,'66'],
    'red',
    [66,55],
    [44,55,66,66],
];

echo '-------------------------';
var_dump(array_unique($couponAlllist));
echo '-------------------------';
var_dump(array_unique($couponAlllist, SORT_REGULAR));
echo '-------------------------';
var_dump(array_unique($couponAlllist, SORT_NUMERIC));
echo '-------------------------';
var_dump(array_unique($couponAlllist, SORT_LOCALE_STRING ));

-------------------------array(3) {
  [0]=>
  string(3) "red"
  [1]=>
  int(3)
  [2]=>
  array(3) {
    [0]=>
    int(44)
    [1]=>
    int(55)
    [2]=>
    int(66)
  }
}
-------------------------array(5) {
  [0]=>
  string(3) "red"
  [1]=>
  int(3)
  [2]=>
  array(3) {
    [0]=>
    int(44)
    [1]=>
    int(55)
    [2]=>
    int(66)
  }
  [5]=>
  array(2) {
    [0]=>
    int(66)
    [1]=>
    int(55)
  }
  [6]=>
  array(4) {
    [0]=>
    int(44)
    [1]=>
    int(55)
    [2]=>
    int(66)
    [3]=>
    int(66)
  }
}
-------------------------array(3) {
  [0]=>
  string(3) "red"
  [1]=>
  int(3)
  [2]=>
  array(3) {
    [0]=>
    int(44)
    [1]=>
    int(55)
    [2]=>
    int(66)
  }
}
-------------------------array(3) {
  [0]=>
  string(3) "red"
  [1]=>
  int(3)
  [2]=>
  array(3) {
    [0]=>
    int(44)
    [1]=>
    int(55)
    [2]=>
    int(66)
  }
}
```



### array_map() 报错

以下写法：

```php
array_map(
    function(){},
	$array1,
);
```

在win php 7.1.9（linux 7.1.22）中因为最后的逗号报错。

在php 7.3.4中却没有问题



### array_merge() 非期待返回

以下写法：

```php
array_map($array1,$array2);
```

会因为中因为其他类型的值，比如 `null` ，最终返回 `null` 。需要改为如下，以保证返回值为数组

```php
array_map([],(array)$array1, (array)$array2);
```



### foreach 与 unset

##### 示例 1 

> php的foreach引用传递后需要unset

```php
foreach ($forumlist as &$forum) {
	$forum['lastpost'] = 'xxx';
}
unset($forum);
```

否则最后两个$forum会相同

##### 示例2 

> php foreach循环中unset后续的键值问题

实例：

```php
$arr=array('a','b','c','d','e','f');
foreach($arr as $index=>$tmp){
　　echo $index.'=>'.$tmp.PHP_EOL;
　　unset($arr[1]);
}
print_r($arr);
exit;
```

输出结果为:
```php
0=>a
1=>b
2=>c
3=>d
4=>e
5=>f
Array
(
[0] => a
[2] => c
[3] => d
[4] => e
[5] => f
)
```

总结:在foreach内UNSET当前循环的数组信息不会影响数组中的键值，只有当本数组结束后unset的值才会被真正的释放掉。

当您在循环0键值的时候想把后面还未循环的1-5号键值unset不循环是不成立的。

##### 示例3

> php foreach用&引用后需要unset

```php
   $arr = [1, 2, 3, 4];
   foreach ($arr as &$v) {
       $v = $v * 2;
   }
   var_dump($arr);

array(4) {
  [0]=>
  int(2)
  [1]=>
  int(4)
  [2]=>
  int(6)
  [3]=>
  &int(8)
}
```

unset后的结果

```php
$arr = [1, 2, 3, 4];
 foreach ($arr as &$v) {
     $v = $v * 2;
 }
 unset($v);
 var_dump($arr);

array(4) {
  [0]=>
  int(2)
  [1]=>
  int(4)
  [2]=>
  int(6)
  [3]=>
  int(8)
}
```

##### 示例4

> foreach & unset 注意项

```php
    $a = [3,4,5];
    foreach ($a as $key => &$val){
        if($val == 4){
            unset($val);
        }
    }
    // [3,4,5]
```



```php
    $a = [3,4,5];
    foreach ($a as $key => $val){
        if($val == 4){
            unset($val[$key]);
        }
    }
    // [3,5]
```



```php
    $a = [3,4,5];
    foreach ($a as $key => &$val){
        if($val == 4){
            unset($val);
        }
    }
    foreach ($a as $key => $val){
        if($val == 4){
            unset($val[$key]);
        }
    }
    // [3,4,4]
```


###### 原因解析

> [php在foreach中使用引用赋值&可能遇到的问题](https://blog.csdn.net/luan111111)
>
> 楼主在写项目的时候，由于初涉PHP的赋值引用操作，觉得这个功能非常强大，用时一时爽，没有深入了解过其中的原理，导致了一些当时觉得不可思议的BUG，废话不都说，我举个例子详细的描述一下这个问题。

代码：

```php
$test=array('a','b','c');

foreach($test as &$value){
     echo $value;
}
echo $value;

foreach($test as $value){
     echo $value;
}
echo $value;
```

运行结果：

```php
'a','b','c'
'c'
'a','b','b'
'b'
```

解释：

> 在第一个foreach中，我们使用了赋值引用符号，它的意思是每次遍历时，$value指向的是$test数组中的对应元素的地址，循环一次时，$value指向的是'a'的地址，第二次循环的时候，$test指向的是第二个元素'b'的地址，第三次循环时，指向的就是'c'的地址。当我们在做第二次遍历的时候，其实$value变量指向的还是$test的第三个元素即'c'的地址。然后foreach本身的操作是把数组中对应的元素赋值给as后面的变量，所以在第二个foreach中，遍历第一次的时候，把‘a’赋值给$value指向的地址即['a','b','a']，第二次遍历的时候，把'b'赋值给$value指向的地址即['a','b','b']，第三次遍历的时候，就把'b'赋值给$value指向的地址，这也就是为什么输出结果是['a','b','b']而不是['a','b','c']的原因。

解决方案：

> 1、在使用完赋值引用操作符之后，把变量unset掉，上例中加上unset($value)语句，相当于取消$value对该地址的引用，这样第二次foreach的时候，$value相当于新的变量，不会导致上述问题。这也是一个很好的编程习惯。
>
> 2、把两处的foreach循环内的变量设成不同的名称即可

实验：

```php
$test=array('a','b','c');

foreach($test as &$value){
     //对$value进行操作
}
var_dump($test);
```

大家如果运行一下的话，会发现浏览器打印出来的结构是这样的：

```php
array (size=3)
  0 => string 'a' (length=1)
  1 => string 'b' (length=1)
  2 => &string 'c' (length=1)
```

大家有木有发现，元素'c'的前面有个赋值引用符号’&‘，原因就在这里。


> 其他资料：（https://blog.csdn.net/leavemetomorrow/article/details/80454866）

> 补充示例：

```php
        // 片段1
		$list = $list['data'];
        $rank_list = [];
        foreach($list['sn'] as $rank=>$team_id){
			//...
            $team = $list['team'][$team_id];
            $leader = $list['team'][$team_id]['leader'];
            $rank_list[$rank]['team']=$team;
            unset($rank_list[$rank]['team']['leader']);

            $rank_list[$rank]['leader']=$leader;
        }

		// 片段2
        $list = $list['data'];
        $rank_list = [];
        foreach($list['sn'] as $rank=>$team_id){
            //...
            $team = $list['team'][$team_id];
            $rank_list[$rank]['team']=$team;
            unset($rank_list[$rank]['team']['leader']);

            $leader = $list['team'][$team_id]['leader'];
            $rank_list[$rank]['leader']=$leader;
        }

		// 这两段代码的位置不同，最后的结果竟然不一样
		// unset($rank_list[$rank]['team']['leader']);
        // $leader = $list['team'][$team_id]['leader'];
		// 片段2中 unset的内容又神奇的回来了
```

#### 其他资料

- 十个 PHP 开发者最容易犯的错误 https://www.techug.com/post/10-php-mistakes-programmer-make/



### PHP 的命名空间

PHP 的命名空间对class、function有效
对全局定义的变量常量无效

use 关键字可以指向到命名空间本身，类。但是不能指向到方法。



### 方法的动静态调用

类::静态方法　//可以
类::非静态方法 　//不可以(虽然方法里不用$this关键字时，可以！但不支持这种写法)
类对象->静态方法 　 //可以
类对象->非静态方法 　 //可以



### 多个应用中数据库连接错乱

同事无意中发现，在多个基于 Laravel 的 Web 应用中，当应用 A 进行一个长时间操作时（PHP 会运行超过 30s+），在这期间，在应用 B 中进行数据库操作时，B 应用会连接到 A 应用中的数据库，而非 B 的数据库。

问题就出现在这里。

getenv() 和 putenv() 不是一个线程安全的函数，意味着如果两个线程同时调用这个函数，就会出现问题。

而且服务器的环境正好是：

Apache + worker 模式，这种模式下，php 运行环境是以线程模式运行的，所以才出现了上述的问题。

[# 链接](https://learnku.com/laravel/t/2791/have-you-encountered-multiple-applications-in-the-database-connection-problem#9694ad)



### 有关laravel的DB与ORM

```php
dump(\App\Models\WxInfo::where('openid','otSV1wV2I2rqiIr2_ORWjtaO6UxQ')->get());
//Collection[ORM]
dump(\App\Models\WxInfo::where('openid','sdf')->get());
//Collection[]
dump(DB::table('wx_info')->where('openid','otSV1wV2I2rqiIr2_ORWjtaO6UxQ')->get());
//Array[StdClass]
dump(DB::table('wx_info')->where('openid','sdf')->get());
//Array[]

dump(\App\Models\WxInfo::where('openid','otSV1wV2I2rqiIr2_ORWjtaO6UxQ')->first());
//ORM
dump(\App\Models\WxInfo::where('openid','sdf')->first());
//null
dump(DB::table('wx_info')->where('openid','otSV1wV2I2rqiIr2_ORWjtaO6UxQ')->first());
//StdClass
dump(DB::table('wx_info')->where('openid','sdf')->first());
//null
```

### 中括号与大括号用法

不借助其他变量，交换两个变量的值
字符串与数组的 中括号与大括号用法

```php
    // 不借助其他变量，交换两个变量的值
    $a = 1;
    $b = 2;
    $arr = [$a,$b] = [$b,$a];
    // 字符串与数组的 中括号与大括号用法
    $str = 'ab';
    var_dump([$arr[0],$arr{1},$str{1},$str[0]]);
```

### PHP中开启jit后经常报502
> php8.1.1nts
```
;opcache.jit_buffer_size=100M
;opcache.jit=1255
```
一直没有找到具体原因

### php intval 两位小数乘以100后结果少1

> 在做微信支付时，需要将小数（单位元）表示的金额转为整数（单位分），出现记录的是1790，实际支付的是1789  


```php
$sum = 17.90;
echo intval($sum * 100); // 1789

// 我的方案
intval(number_format($money * 100, 0, '.', ''));
```

> 网络资料的数值为16.33元换算为1633分，经测试，什么数值会出现这样的精度丢失，没有具体的规律。
```php
// 网上的方案
intval(strval($money * 100));
```

[网络资料](https://blog.csdn.net/leedaning/article/details/52485699)


