---
title: php 中 urlencode 、 rawurlencode , javascript 中 encodeURI 、 encodeURIComponent 
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
article: false
date: 2024-05-31
---



# php 中 urlencode 、 rawurlencode , javascript 中 encodeURI 、 encodeURIComponent 

在项目中，常常需要对 url 、 uri 进行编码和解码，数据也要编码后进行传输，因此，本文要讲的内容就非常重要。在一些测试中，我们发现，有的时候先进行 php 的 encodeurl 编码，然后再进行 decodeurl 解码，再用到 javascript 中，结果会发生一些错误。编码到解码，会出现一些差错，这是由于不同的函数依照不同的标准进行编写，所以经过编码，再解码，就可能会出现问题。

## PHP 中的 urlencode 和 urldecode 

urlencode 是最传统的 url 编码函数。特别是在 `<form>` 的数据传输中，php 在接收表单时，就是以 urlencode 的结果形式进行接收的，如果 `<form>` 的提交形式是 get ，你就可以在结果地址中看到。但是在 php 中使用 $_GET 、 $_POST 进行接收时，结果却是已经 urldecode 了的。官方文档的解释是：此编码与 WWW 表单 POST 数据的编码方式是一样的，同时与 *application/x-www-form-urlencoded* 的媒体类型编码方式一样。

urlencode 在编码中文和一些字符时，就是将其转换为对应的十六进制编码。

urldecode 在解码时，也有 GB2312 和 UTF-8 之分，主要是用在不同的搜索引擎中，谷歌雅虎使用的是 UTF-8 ，而百度则使用的是 GB2312 。如何在 GB2312 和 UTF-8 之间转换呢？主要用到 mb_convert_encoding 函数，具体这里就不赘述。

```
中文 -> GB2312 的 Encode -> %D6%D0%CE%C4
中文 -> UTF-8 的 Encode -> %E4%B8%AD%E6%96%87
```

## PHP 中的 rawurlencode 和 rawurldecode ，及与 urlencode 的比较

urlencode 虽然主要用在数据提交和传输过程中，但是如果在构造 url 时， rawurlencode 更好。 rawurlencode 和 encode 的区别，主要是这两个函数编写时依据的标准不一样 rawurlencode 采用的是 RFC1738 编码，主要区别在于，对一些特殊字符的编码结果不同， rawurlencode 对更多的字符采用十六进制编码，特别是空格， urlencode 编码空格后是加号 + ，而 rawurlencode 编码空格后是 %20 。

```
urlencode(' ') => +
rawurlencode(' ') => %20
```

官方文档中指出，对 `~` 不再进行编码了。

## Javascript 中的 encodeURI 和 decodeURI 

rawurlencode 遵守是 94 年国际标准备忘录 RFC1738 ，而 Javascript 中的 encodeURI 也遵循该标准，所以从某种意义上， php 的 rawurlencode 的编码结果和 Javascript 的 encodeURI 的编码结果是一样的。

encodeURI 不编码字符有82个：`!#$&'()*+,-./:;=?@_~0-9a-zA-Z`

## Javascript 中的 encodeURIComponent 和 decodeURIComponent 

encodeURIComponent 的意思非常明确，就是要对 uri 的组成部分进行编码，我们用下面的例子来解释。

```
/test-url/测试.html
```

其中 test-url 和测试 .html 这两个段就是 component ，如果要进行编码，就应该用 encodeURIComponent 。但是如果你用encodeURIComponent('/test-url/测试.html') 进行编码，就会对 '/' 也进行编码，整个URI会变成编码后的十六进制字符串。而 encodeURI 进行编码时，则不会对 '/' 进行编码，还是完整的 URI ，只不过对 uri component 进行了编码。

encodeURIComponent 不编码字符有71个：`!'()*-._~0-9a-zA-Z`。缺少了：`#$&+,/:;=@`

故此，实际上，在 Javascript 的体系里，如果要对数据进行传输，要么不进行编码，要么使用 encodeURIComponent 编码，再进行传输，这样才能让数据解码后不变样。