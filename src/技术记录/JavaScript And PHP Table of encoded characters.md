---
title: JavaScript And PHP Table of encoded characters
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
date: 2024-06-06
---

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



