---
title: VScode相关
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

## 关闭打开新文件自动关闭预览文件功能

经常碰到这个问题，我打开文件就是有用的，每次给我自动关闭了我还得去打开。
当然这个问题可以双击文件，接触那个文件的预览状态就可以解决了。
不过还有一个更懒的方法，直接修改vscode配置就好了。

// 控制是否将打开的编辑器显示为预览。预览编辑器将会重用至其被保留(例如，通过双击或编辑)，且其字体样式将为斜体。

```
"workbench.editor.enablePreview": true,
```



### 标题栏怎么显示项目完整路径
进入设置页面，找到顶部搜索框，输入“window.title”
然后将activeEditorShort改为activeEditorLong

## 网上的几种等宽字体设置
1、Consolas,'Courier New',monospace
2、'JetBrains Mono NL', '思源黑体'
3、'Sarasa Term SC'
4、'Ubuntu Mono','楷体', monospace
5、'Ubuntu Mono',monospace

> 最终我的选择

 '幼圆','Ubuntu Mono',monospace



## 缩放设置：
1、滚轮缩放编辑框字体设置，在设置里面搜索“zoom”，相应设置即可
2、如果我们想要找到快捷键设置方式，可以在点击F1之后，输入”keyboard shortcut“
3、编辑框字体缩放快捷键设置可搜索”字体“
4、整体界面缩放使用 Ctrl+—、Ctrl++ Ctrl+0