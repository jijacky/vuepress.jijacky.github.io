---
title: PHP 中的 urlencode ， rawurlencode 和 JS 中的 encodeURI ， encodeURIComponent 
icon: fab fa-markdown
order: 2
category:
  - 技术记录
tag:
  - 技术
  - 随笔
  - PHP
  - JS
  - 编码
# star: true
# sticky: true
date: 2024-05-31
---



### PHP 中的 urlencode ， rawurlencode 和 JS 中的 encodeURI ， encodeURIComponent 

> PHP中的 urlencode 和 rawurlencode 

二都的区别仅在” “空格上， rawurlencode 会把空格编码为 %20 ，而 urlencode 会把空格编码为+。

> JS中的 encodeURI 和 encodeURIComponent

encodeURI 方法不会对下列字符进行编码：`”:”、”/”、”;” 和 “?”`，而 encodeURIComponent 会编码这些字符。

urlencode 与 encodeURI

首先，我们看下这4种编码方式针对 ASCII 的 127 个字符编码后的差别，显示代码如下：

```php
/**
* 生成 urlencode , rawurlencode , encodeURI , encodeURIComponent 的编码结果 2010-10-29 sz
* @author phppan.p#gmail.com  http://www.phppan.com
* 哥学社成员（http://www.blog-brother.com/）
* @package test
*/

header("Content-type:text/html;charset=utf-8");
echo <<<STYLE
<style type="text/css">
table {
cursor:default;
font-family:Verdana,Helvetica,sans-serif;
font-size:8pt;
}
td {
background:none repeat scroll 0 0 #EFEFEF;
text-align:center;
width:100px;
}
</style>
STYLE;
echo '<table >';
echo _tr(_td("ASCII") . _td("urlenocde") . _td("rawurlencode") . _td("encodeURI") . _td("encodeURIComponent"));
for ($i = 0; $i < 128; $i++) {
$ch = chr($i);
$td = _td($ch) . _td(urlencode($ch)) . _td(rawurlencode($ch));
$td .= _td(_encodeURI($ch)) . _td(_encodeURIComponent($ch));
echo _tr($td);}echo "</table>";
```

对比urlencode和encodeURI的不同，可以看到`#$&+,/:;=?@`这些符号编码结果不同，于是对于需要在PHP中编码后，给js的encodeURI使用的操作可以使用如下函数：

```php
/**
* urlencode 适用于 js 版本 2010-10-29 sz
* @author phppan.p#gmail.com  http://www.phppan.com
* 哥学社成员（http://www.blog-brother.com/）
* @package test
*/
header("Content-type:text/html;charset=utf-8");
function urlencode_js($str) {
$str_len = strlen($str);
$new = array();
for ($i = 0; $i < $str_len; $i++) {
$ch = $str[$i];
if (strpos("#$&+,/:;=?@", $ch) !== FALSE) {
$new[] = $ch;
} else {
$new[] = urlencode($ch);
}
}
return implode("", $new);
}
$encode_str = urlencode_js("a汉bc中文 章+aa#$&+,/:;=?@a汉bc中文 章+aa");
echo <<<HTML
<script type="text/javascript">
document.write(decodeURI("$encode_str") + "<br />");
</script>
HTML;
die();
```



