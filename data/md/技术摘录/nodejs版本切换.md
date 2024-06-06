# windows nodejs 版本控制工具nvm下载、安装及使用

nvm 是 nodejs 版本管理工具，这里主要记录一下在windows系统的安装和使用。

## 下载
下载地址： https://github.com/coreybutler/nvm-windows/releases

## 简单说明：
- nvm-noinstall.zip： 这个是绿色免安装版本，但是使用之前需要配置
- nvm-setup.zip：这是一个安装包，下载之后点击安装，无需配置就可以使用，方便。
- Source code(zip)：zip压缩的源码
- Sourc code(tar.gz)：tar.gz的源码，一般用于*nix系统

## 安装
* 这里没有使用默认的安装目录，修改安装目录为 `D:\nvm\` ；读者可自行决定安装目录
* 添加 node.js 的安装目录 这里用 “添加 node.js 的安装目录” 的说法其实不太准确，准确的说法应该是配置 node.js 的安装目录；默认会使用 `C:\Program Files\nodejs` 目录，`C:\Program Files\nodejs` 目录也是 node.js 默认的安装目录；如果读者在安装 nvm 前就已经安装了 node.js，且修改了 node.js 的安装目录，那么此处的目录要修改为 node.js 的安装目录；如果读者在安装 nvm 前没有安装 node.js，那么此处的目录可自行定义。
* 在安装过程中会弹出：由于已经安装了 node，所以此时提示“你希望nvm管理已经安装的 node 版本吗”，点击 是待安装完成后测试是否安装成功


## 命令使用
nvm for windows是一个命令行工具，在控制台输入nvm,就可以看到它的命令用法。

```
基本命令有：
nvm arch [32|64] ： 显示node是运行在32位还是64位模式。指定32或64来覆盖默认体系结构。
nvm install [arch]： 该可以是node.js版本或最新稳定版本latest。（可选[arch]）指定安装32位或64位版本（默认为系统arch）。设置[arch]为all以安装32和64位版本。在命令后面添加--insecure ，可以绕过远端下载服务器的SSL验证。
nvm list [available]： 列出已经安装的node.js版本。可选的available，显示可下载版本的部分列表。这个命令可以简写为nvm ls [available]。
nvm on： 启用node.js版本管理。
nvm off： 禁用node.js版本管理(不卸载任何东西)
nvm proxy [url]： 设置用于下载的代理。留[url]空白，以查看当前的代理。设置[url]为none删除代理。
nvm node_mirror [url]：设置node镜像，默认为nodejs.org/dist/.。建议设置…
nvm npm_mirror [url]：设置npm镜像，默认为github.com/npm/npm/arc…
nvm uninstall ： 卸载指定版本的nodejs。
nvm use [version] [arch]： 切换到使用指定的nodejs版本。可以指定32/64位[arch]。nvm use 将继续使用所选版本，但根据提供的值切换到32/64位模式的
nvm root [path]： 设置 nvm 存储node.js不同版本的目录 ,如果未设置，将使用当前目录。
nvm version： 显示当前运行的nvm版本，可以简写为nvm v 

常用命令：
nvm ls 查看已经安装的所有nodejs版本\
nvm install 版本号，可安装指定版本的nodejs\
nvm use 版本号，即可切换到指定版本\
nvm uninstall 版本号，卸载指定版本
```

注意：在使用nvm-window 时得环境变量的配置，尤其Path 是否正确。

引用：https://juejin.cn/post/7074108351524634655