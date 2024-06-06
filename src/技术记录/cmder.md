---
title: cmder记录
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

## cmder配置

1. 把 Cmder 安装目录的路径添加到系统环境变量 Path 变量中：
电脑 → 属性 → 高级系统设置 → 环境变量 → 系统变量 → Path → 编辑 → 新建
2. 进入 Cmder 目录，右键以管理员身份运行 Cmder.exe 程序
3. 输入 Cmder.exe /REGISTER ALL 并回车

> 如果出现如下错误：RegisterShellMenuLine:494 则说明没有以管理员身份运行，换成以管理员身份运行就不会有问题了。

## 查找Window命令行Powershell的历史记录存放文件
首先查找Powershell历史记录存放位置。打开powershell，执行：
```
PS C:\Windows\System32> Get-PSReadLineOption
```

可以看到Powershell历史纪录的存储位置为：
```
HistorySavePath : C:\Users\xxxxx\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleH
                  ost_history.txt
```
转到该目录下，文件 ConsoleHost_history.txt 就是所有Powershell命令行历史记录了。可进行编辑修改或删除。


