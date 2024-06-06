

**escape() 方法：**
该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。

**encodeURI() 方法：**
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&=+$,#

**encodeURIComponent() 方法：**
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

**encodeURIComponent() 函数 与 encodeURI() 函数的区别之处：**
前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串），因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。



**总结：**
通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。
而encodeURI() 用于编码整个URI，因为URI中的合法字符都不会被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参数）应当是最常用的，它可以讲参数中的中文、特殊字符进行转义，而不会影响整个URL。



## Table of encoded characters

Here you can see how the various JavaScript and PHP functions apply to a range of common characters.

| Input   | JavaScript |           |                    |    PHP    |              |              |
| :------ | :--------: | :-------: | :----------------: | :-------: | :----------: | :----------: |
|         |   escape   | encodeURI | encodeURIComponent | urlencode | rawurlencode | htmlentities |
| <space> |  %20   |  %20  |   %20    |   +   |   %20   |       |
| !       |    %21     |     !     |         !          |    %21    |     %21      |      !       |
| @       |     @      |     @     |        %40         |    %40    |     %40      |      @       |
| #       |    %23     |     #     |        %23         |    %23    |     %23      |      #       |
| $       |    %24     |     $     |        %24         |    %24    |     %24      |      $       |
| %       |    %25     |    %25    |        %25         |    %25    |     %25      |      %       |
| ^       |    %5E     |    %5E    |        %5E         |    %5E    |     %5E      |      ^       |
| &       |    %26     |     &     |        %26         |    %26    |     %26      |    &amp;     |
| *       |     *      |     *     |         *          |    %2A    |     %2A      |      *       |
| (       |    %28     |     (     |         (          |    %28    |     %28      |      (       |
| )       |    %29     |     )     |         )          |    %29    |     %29      |      )       |
| -       |     -      |     -     |         -          |     -     |      -       |      -       |
| _       |     _      |     _     |         _          |     _     |      _       |      _       |
| =       |    %3D     |     =     |        %3D         |    %3D    |     %3D      |      =       |
| +       |     +      |     +     |        %2B         |    %2B    |     %2B      |      +       |
| :       |    %3A     |     :     |        %3A         |    %3A    |     %3A      |      :       |
| ;       |    %3B     |     ;     |        %3B         |    %3B    |     %3B;     |      ;       |
| .       |     .      |     .     |         .          |     .     |      .       |      .       |
| "       |    %22     |    %22    |        %22         |    %22    |     %22      |    &quot;    |
| '       |    %27     |     '     |         '          |    %27    |     %27      |      '       |
| \       |    %5C     |    %5C    |        %5C         |    %5C    |     %5C      |      \       |
| /       |     /      |     /     |        %2F         |    %2F    |     %2F      |      /       |
| ?       |    %3F     |     ?     |        %3F         |    %3F    |     %3F      |      ?       |
| <       |    %3C     |    %3C    |        %3C         |    %3C    |     %3C      |     &lt;     |
| >       |    %3E     |    %3E    |        %3E         |    %3E    |     %3E      |     &gt;     |
| ~       |    %7E     |     ~     |         ~          |    %7E    |     %7E      |      ~       |
| [       |    %5B     |    %5B    |        %5B         |    %5B    |     %5B      |      [       |
| ]       |    %5D     |    %5D    |        %5D         |    %5D    |     %5D      |      ]       |
| {       |    %7B     |    %7B    |        %7B         |    %7B    |     %7B      |      {       |
| }       |    %7D     |    %7D    |        %7D         |    %7D    |     %7D      |      }       |
| \`     |    %60    |    %60    |    %60    |    %60    |    %60    |    |

The [RFC 1738](http://www.ietf.org/rfc/rfc1738.txt) specifications make fascinating reading - considering that the document is 10 years old yet still applicable.



### PHP中的urlencode，rawurlencode和JS中的encodeURI，encodeURIComponent

> PHP中的 urlencode 和 rawurlencode 

二都的区别仅在” “空格上， rawurlencode 会把空格编码为%20，而 urlencode 会把空格编码为+。

> JS中的 encodeURI 和 encodeURIComponent

encodeURI 方法不会对下列字符进行编码：”:”、”/”、”;” 和 “?”，而 encodeURIComponent 会编码这些字符。

urlencode与encodeURI

首先，我们看下这4种编码方式针对ASCII的127个字符编码后的差别，显示代码如下：

```php
/**
* 生成urlencode,rawurlencode,encodeURI,encodeURIComponent的编码结果 2010-10-29 sz
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

对比urlencode和encodeURI的不同，可以看到#$&+,/:;=?@这些符号编码结果不同，于是对于需要在PHP中编码后，给js的encodeURI使用的操作可以使用如下函数：

```php
/**
* urlencode适用于js版本 2010-10-29 sz
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





# php中urlencode、rawurlencode,javascript中encodeURI、encodeURIComponent

在项目中，常常需要对url、uri进行编码和解码，数据也要编码后进行传输，因此，本文要讲的内容就非常重要。在一些测试中，我们发现，有的时候先进行php的encodeurl编码，然后再进行decodeurl解码，再用到javascript中，结果会发生一些错误。编码到解码，会出现一些差错，这是由于不同的函数依照不同的标准进行编写，所以经过编码，再解码，就可能会出现问题。

## PHP中的urlencode和urldecode

urlencode是最传统的url编码函数。特别是在<form>的数据传输中，php在接收表单时，就是以urlencode的结果形式进行接收的，如果<form>的提交形式是get，你就可以在结果地址中看到。但是在php中使用$_GET、$_POST进行接收时，结果却是已经urldecode了的。官方文档的解释是：此编码与 WWW 表单 POST 数据的编码方式是一样的，同时与 *application/x-www-form-urlencoded* 的媒体类型编码方式一样。

urlencode在编码中文和一些字符时，就是将其转换为对应的十六进制编码。

urldecode在解码时，也有GB2312和UTF-8之分，主要是用在不同的搜索引擎中，谷歌雅虎使用的是UTF-8，而百度则使用的是GB2312。如何在GB2312和UTF-8之间转换呢？主要用到mb_convert_encoding函数，具体这里就不赘述。

```
中文 -> GB2312的Encode -> %D6%D0%CE%C4
中文 -> UTF-8的Encode -> %E4%B8%AD%E6%96%87
```

## PHP中的rawurlencode和rawurldecode，及与urlencode的比较

urlencode虽然主要用在数据提交和传输过程中，但是如果在构造url时，rawurlencode更好。rawurlencode和encode的区别，主要是这两个函数编写时依据的标准不一样rawurlencode采用的是RFC1738 编码，主要区别在于，对一些特殊字符的编码结果不同，rawurlencode对更多的字符采用十六进制编码，特别是空格，urlencode编码空格后是加号+，而rawurlencode编码空格后是%20.

```
urlencode(' ') => +
rawurlencode(' ') => %20
```

官方文档中指出，对~不再进行编码了。

## Javascript中的encodeURI和decodeURI

rawurlencode遵守是94年国际标准备忘录RFC1738，而Javascript中的encodeURI也遵循该标准，所以从某种意义上，php的rawurlencode的编码结果和Javascript的encodeURI的编码结果是一样的。

encodeURI不编码字符有82个：!#$&'()*+,-./:;=?@_~0-9a-zA-Z

## Javascript中的encodeURIComponent和decodeURIComponent

encodeURIComponent的意思非常明确，就是要对uri的组成部分进行编码，我们用下面的例子来解释。

```
/test-url/测试.html
```

其中test-url和测试.html这两个段就是component，如果要进行编码，就应该用encodeURIComponent。但是如果你用encodeURIComponent('/test-url/测试.html')进行编码，就会对'/'也进行编码，整个URI会变成编码后的十六进制字符串。而encodeURI进行编码时，则不会对'/'进行编码，还是完整的URI，只不过对uri component进行了编码。

encodeURIComponent不编码字符有71个：!'()*-._~0-9a-zA-Z

缺少了：#$&+,/:;=@

故此，实际上，在Javascript的体系里，如果要对数据进行传输，要么不进行编码，要么使用encodeURIComponent编码，再进行传输，这样才能让数据解码后不变样。