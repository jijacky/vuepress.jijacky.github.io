---
title: JS编码方法总结
icon: fab fa-markdown
order: 2
category:
  - 技术记录
tag:
  - 技术
  - 随笔
  - JS
  - 编码
# star: true
# sticky: true
date: 2024-06-06
---

**escape() 方法：**
该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： 
`- _ . ! ~ * ' ( ) `。

**encodeURI() 方法：**
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： 
`- _ . ! ~ * ' ( ) `。
该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：`;/?:@&=+$,#`

**encodeURIComponent() 方法：**
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： 
`- _ . ! ~ * ' ( ) `。
其他字符（比如 ：`;/?:@&=+$,#` 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

**encodeURIComponent() 函数 与 encodeURI() 函数的区别之处：**
前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串），因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。



**总结：**
通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。
而encodeURI() 用于编码整个URI，因为URI中的合法字符都不会被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参数）应当是最常用的，它可以讲参数中的中文、特殊字符进行转义，而不会影响整个URL。



