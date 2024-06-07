---
title: 搭建安装ES
icon: fab fa-markdown
order: 2
category:
  - 技术记录
tag:
  - 技术
  - 随笔
  - ES
# star: true
# sticky: true
date: 2024-05-31
---

# 搭建安装ES，整合laravel

### deepin安装ES

ES系统安装在deepin_64（20社区版）系统上，安装的内容有jdk-10.0.1、elasticsearch-5.5.1、ik插件 *（插件安装一定要版本号对上）*



>**常用的方案是，在索引的时候使用细粒度的分词以保证召回，在查询的时候使用粗粒度的分词以保证精度**https://www.zhihu.com/question/19578687
>
>**[elasticsearch中的mapping简介](https://blog.csdn.net/lvhong84/article/details/23936697)**



##### 安装JDK
1. 创建目录
	`sudo mkdir /usr/lib/jdk/`
	
2. 解压安装包
	`sudo tar fx jdk-8u241-linux-x64.tar.gz -C /usr/lib/jdk/`
	`ls /usr/lib/jdk`
	
3. 添加环境变量
	`sudo vi /etc/profile`
	在文件最后添加
	```
	export JAVA_HOME=/usr/lib/jdk/jdk-10.0.1 
	export JRE_HOME=${JAVA_HOME}/jre
	export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
	export PATH=${JAVA_HOME}/bin:$PATH
	```
	让环境变量生效
	`source /etc/profile`
	
4. 测试
	`java -version`
	
	
##### 安装ES

> [全文搜索引擎 Elasticsearch 入门教程](http://www.ruanyifeng.com/blog/2017/08/elasticsearch.html)

1. 下载解压文件
```
$ wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.5.1.zip
$ unzip elasticsearch-5.5.1.zip
$ cd elasticsearch-5.5.1/ 
```
2. 进入解压后的目录，运行下面的命令，启动 Elastic， `前台运行`
```
$ ./bin/elasticsearch
```
3. 访问ES
```
$ curl localhost:9200
```
如果出现如下内容，则安装成功
```
{
  "name" : "atntrTf",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "tf9250XhQ6ee4h7YI11anA",
  "version" : {
    "number" : "5.5.1",
    "build_hash" : "19c13d0",
    "build_date" : "2017-07-18T20:44:24.823Z",
    "build_snapshot" : false,
    "lucene_version" : "6.6.0"
  },
  "tagline" : "You Know, for Search"
}
```
4. 按下 Ctrl + C，Elastic 就会停止运行



##### 访问控制

  文件 `config/elasticsearch.yml`

  去掉 `network.host` 前的 `#` ,修改内容为 `network.host: 0.0.0.0`。生产环境请修改为指定的IP

```yml
//添加新的配置项，允许跨域访问，这样 head 插件方可对 ES 进行访问
http.cors.enabled: true    //开启跨域访问支持，默认为false
http.cors.allow-origin: "*"    //跨域访问允许的域名地址，使用正则表达式
```



##### 配置

```yml
// 修改配置文件： （注意配置项的冒号后面要有空格）
cluster.name: stt-ELK    //修改集群的名字，以免在网络上混乱串门，加入别的集群里面
node.name: ELK-node1    //自定义节点名字
path.data: /home/stt/server/elasticsearch-5.1.1/data    //自定义数据存储路径
path.logs: /home/stt/server/elasticsearch-5.1.1/logs    //自定义日志存储路径
network.host: 0.0.0.0    //修改 ES 的监听地址，这样所有的机器都可以访问这部 ES
http.port: 9200    //注释掉的配置项，但却是默认的，只是我打开了，不用刻意去修改端口
```



##### 分词测试

> 默认分词

```
POST 192.168.184.129:9200/_analyze
{
    "text": ["我们都爱中华人民共和国"]
}
```

>指定分词器

```
POST 192.168.184.129:9200/_analyze
{
    "analyzer": "ik_max_word",
    "text": ["我们都爱中华人民共和国"]
}
```

>使用索引设置的分词器

```
POST 192.168.184.129:9200/goods_es/_analyze
{
    "field": "name",
    "text": ["我们都爱中华人民共和国"]
}
```



##### 中文分词设置
###### 安装方法1

```bash
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.5.1/elasticsearch-analysis-ik-5.5.1.zip
```

重新启动 Elastic，就会自动加载这个新安装的插件。



###### 安装方法2

```bash
    wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.5.1/elasticsearch-analysis-ik-5.5.1.zip
    # 将ik分词器的插件，上传到/export/servers/es
    # cd /export/servers/es   
    # rz
    unzip elasticsearch-analysis-ik-5.5.1.zip -d elasticsearch-5.5.1/plugins/
    cd elasticsearch-5.5.1/plugins/
    mv elasticsearch analysis-ik
```

重新启动 Elastic，就会自动加载这个新安装的插件。





###### IK分词配置 `自定义词典`

```bash
cd elasticsearch-5.5.1/config/analysis-ik/
vi IKAnalyzer.cfg.xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 -->
        <entry key="ext_dict">custom/mydict.dic;custom/ext.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典-->
        <entry key="ext_stopwords">custom/stop.dic</entry>
        <!--用户可以在这里配置远程扩展字典 -->
        <!-- <entry key="remote_ext_dict">http://192.168.140.133:8080/hot.dic</entry> -->
        <!--用户可以在这里配置远程扩展停止词字典-->
        <!-- <entry key="remote_ext_stopwords">http://192.168.140.133:8080/stop.dic</entry> -->
</properties>
```

###### IK分词配置 `远程词典`

> https://blog.csdn.net/jam00/article/details/52983056

要保证远程的内容是 utf-8 的格式。 

```php
// hot.php
$s = <<<'EOF'
陈港生
元楼
蓝瘦
EOF;
header('Last-Modified: '.gmdate('D, d M Y H:i:s', time()).' GMT', true, 200);
header('ETag: "5816f349-19"');
echo $s;
```

ik 接收两个返回的头部属性 Last-Modified 和 ETag，只要其中一个有变化，就会触发更新，ik 会每分钟获取一次
重启 Elasticsearch生效。



##### 新建索引

然后，新建一个 Index，指定需要分词的字段。这一步根据数据结构而异，下面的命令只针对本文。基本上，凡是需要搜索的中文字段，都要单独设置一下。

> Mapping 用来定义 Document 中每个字段的类型、所使用的 analyzer、是否索引等属性，非常关键。

```
$ curl -X PUT 'localhost:9200/accounts' -d '
{
  "mappings": {
    "person": {
      "properties": {
      	"id": {
          "type": "long"
        },
        "user": {
          "type": "text",
          "analyzer": "ik_max_word",
          "search_analyzer": "ik_smart"
        },
        "title": {
          "type": "text",
          "analyzer": "ik_max_word",
          "search_analyzer": "ik_max_word"
        }
      }
    }
  }
}'
```
上面代码中，首先新建一个名称为 `accounts` 的  `Index`，里面有一个名称为 `person` 的  `Type`。`person` 有三个字段 `id` `user` `title` 。这三个字段  `user` `title`  为中文，类型是文本（text），所以需要指定中文分词器，不能使用默认的英文分词器。Elastic 的分词器称为 `analyzer`。我们对每个字段指定分词器。
```
"user": {
  "type": "text",
  "analyzer": "ik_max_word",
  "search_analyzer": "ik_smart"
}
```
上面代码中，`analyzer` 是字段文本的分词器，`search_analyzer` 是搜索词的分词器。`ik_max_word`、`ik_smart` 分词器都是插件ik提供的。

- `ik_max_word` ：会将文本做最细粒度的拆分；尽可能多的拆分出词语
  句子：我爱我的祖国
  结果： 我|爱|我|的|祖|国|祖国
- `ik_smart`：会做最粗粒度的拆分；已被分出的词语将不会再次被其它词语占有
  句子：我爱我的祖国
  结果： 我|爱|我|的|祖国



##### 搜索

> 简单搜索

```json
{
  "query": {
    "match": {
      "content": "博客"
    }
  }
} 
```



##### 高亮显示

> [【elasticsearch】查询结果 高亮显示](https://blog.csdn.net/ma15732625261/article/details/79722791 )



* plain highlight（默认）
* posting highlight（性能）
     对磁盘的消耗更少
     将文本切割为句子，并且对句子进行高亮，效果更好
     性能比plain highlight高，因为不需要重新对高亮文本进行分词
* fast vector highlight（文件）
     对大文件而言（大于1M），性能更高



> plain highlight

```php
{
  "query": {
    "match": {
      "content": "博客"
    }
  },
  "highlight": {
    "fields": {
      "content": {}
    }
  }
} 
```

>  posting highlight
>
> 创建索引时在要搜索的字段添加`”index_options”: “offsets”`

```json
{
  "mappings": {
    "blogs": {
      "properties": {
        "title": {
          "type": "text",
          "analyzer": "ik_max_word"
        },
        "content": {
          "type": "text",
          "analyzer": "ik_max_word",
          "index_options": "offsets"
        }
      }
    }
  }
}
```

> fast vector highlight
>
> 建索引时term vector设置在mapping中

```bash
{
  "mappings": {
    "blogs": {
      "properties": {
        "title": {
          "type": "text",
          "analyzer": "ik_max_word"
        },
        "content": {
          "type": "text",
          "analyzer": "ik_max_word",
          "term_vector" : "with_positions_offsets"
        }
      }
    }
  }
}
```

> 自定义：
> 强制使用某种高亮：指定type

```json
{
  "query": {
    "match": {
      "content": "博客"
    }
  },
  "highlight": {
    "fields": {
      "content": {
        "type": "plain"//强制使用某种highlighter
      }
    }
  }
}
```

> 设置高亮标签，取代`<em>`

```json
{
  "query": {
    "match": {
      "content": "博客"
    }
  },
  "highlight": {
    "pre_tags": ["<font color=red>"],
    "post_tags": ["</font>"], 
    "fields": {
      "content": {
        "type": "plain"
      }
    }
  }
}
```



##### 查看&安装插件

```bash
./bin/elasticsearch-plugin list
```

或者

```bash
GET /_cat/plugins
```

安装命令：

```bash
./bin/elasticsearch-plugin install {插件名称}
```







***

### ES接口测试

> [ElasticSearch基本操作（二）](https://blog.csdn.net/u014401141/article/details/82753089) https://blog.csdn.net/u014401141/article/details/82753089



> 使用ApiPost

##### 分词测试：

`url` :  `localhost:9200/_analyze`

`post` : `json`

`data` ：

```
{
 "analyzer": "ik_max_word",
 "text":   "我是中国人"
}
{
 "analyzer": "ik_max_word",
 "text":   "我是中国人"
}
```

> 两种分词器使用的最佳实践是：索引时用ik_max_word，在搜索时用ik_smart https://zhuanlan.zhihu.com/p/52543633





### 报错处理



##### 报错一：

```
ERROR: bootstrap checks failed
```

解决方案：

```bash
vim /etc/security/limits.conf //添加, 【注销后并重新登录生效】

* soft nofile 300000
* hard nofile 300000
* soft nproc 102400
* hard nproc 102400
```

##### 报错二：

```
[2016-12-30T15:18:09,190][WARN ][o.e.b.JNANatives ] Unable to lock JVM Memory: error=12, reason=无法分配内存
[2016-12-30T15:18:09,190][WARN ][o.e.b.JNANatives ] This can result in part of the JVM being swapped out.
[2016-12-30T15:18:09,191][WARN ][o.e.b.JNANatives ] Increase RLIMIT_MEMLOCK, soft limit: 65536, hard limit: 65536
[2016-12-30T15:18:09,191][WARN ][o.e.b.JNANatives ] These can be adjusted by modifying /etc/security/limits.conf, for example:
# allow user 'stt' mlockall
stt soft memlock unlimited
stt hard memlock unlimited
```



解决方案：

```bash
vim /etc/security/limits.conf //添加

* soft memlock unlimited
* hard memlock unlimited
```

 

##### 报错三：

```
max virtual memory areas vm.max_map_count [65530] likely too low, increase to at least [262144]
```

解决方案 (永久，修改系统文件)：

```bash
vim /etc/sysctl.conf  //添加

fs.file-max = 1645037
vm.max_map_count=262144
```

执行：

```bash
sysctl -p
```

解决方案 （临时）：

````bash
$ sudo sysctl -w vm.max_map_count=262144
````



##### 报错四：

> （这个问题一但成为第一个阻断服务启动的原因，在终端是不会有输出和任何的日志记录的，文章末请听我讲）

```
Java HotSpot(TM) 64-Bit Server VM warning: INFO: os::commit_memory(0x0000000094cc0000, 1798569984, 0) failed; error='Cannot allocate memory' (errno=12)

#
# There is insufficient memory for the Java Runtime Environment to continue.
# Native memory allocation (mmap) failed to map 1798569984 bytes for committing reserved memory.
# An error report file with more information is saved as:
# /home/stt/server/elasticsearch-5.1.1/hs_err_pid10221.log
```

解决方案(最好不要修改默认值,否则引起更多问题)：（内存溢出，思路更改JVM内存大小即可）

```bash
vim elasticsearch-5.1.1/config/jvm.options

# Xms represents the initial size of total heap space
# Xmx represents the maximum size of total heap space
-Xms1g  #(默认为2G)
-Xmx1g  #(默认为2G)
```



##### 报错五：

```
2017-01-12T16:12:22,404][INFO ][o.e.b.BootstrapCheck     ] [SfD5sIh] bound or publishing to a non-loopback or non-link-local address, enforcing bootstrap checks
ERROR: bootstrap checks failed
initial heap size [536870912] not equal to maximum heap size [1073741824]; this can cause resize pauses and prevents mlockall from locking the entire heap
```

解决方法：


```bash
vi config/jvm.options

###-Xms 和 -Xmx需要配置的相等，不然无法启动成功。
-Xms1024m
-Xmx1024m
```

启动服务：（后台运行）

/home/stt/server/elasticsearch-5.1.1/bin/elasticsearch -d

##### 报错六：

编辑/etc/elasticsearch/elasticsearch.yml文件导致的错误

```
index.analysis.analyzer.ik.type: "ik" 
```

注意这里添加内容的格式,开头需要加一个空格, 冒号:前可加可不加空格,后必须加空格,如果报错可以参考一篇同学的blog,是空格导致错误的一些常见问题。
https://www.cnblogs.com/jiu0821/p/5624908.html



### ES说明：
#### 启动命令：

```bash
./bin/elasticsearch
```

#### 后台启动：

```bash
./bin/elasticsearch -d
```

```bash
可以后台开启elasticsearch服务
nohup ./bin/elasticsearch &  
```



#### 堆内存：

```bash
 ./bin/elasticsearch -Xmx10g -Xms10g
 ./bin/elasticsearch -Xmx512m -Xms512m
```

#### 关闭命令：

`CTRL + C`

#### 禁用 swap

暂时禁用：

```bash
sudo swapoff -a
```

永久禁用：修改 /etc/fstab。
降低交换内存的频率：
sysctl 中这样配置

```bash
vm.swappiness = 1
```

如果上面的方法都不合适，你需要打开配置文件中的 mlockall 开关。 它的作用就是允许 JVM 锁住内存，禁止操作系统交换出去。
设置elasticsearch.yml 文件如下：

```yml
bootstrap.mlockall: true
```

#### Elasticsearch的前后台运行与停止(tar包方式）

前台：

按下 Ctrl + C，Elastic 就会停止运行

后台：

方式1

```bash
通过后台启动并且指定pid文件
$   ./bin/elasticsearch -p /tmp/elasticsearch-pid -d
找到pid号通过kill命令停止
$   cat /tmp/elasticsearch-pid && echo
15516
$   kill -SIGTERM 15516
```

方式2

```bash
[hadoop@djt002 elasticsearch-5.5.1]$ jps
2308 Jps
2295 Elasticsearch

[hadoop@djt002 elasticsearch-5.5.1]$ kill -15 2295
```

方式3

```bash
[hadoop@djt002 elasticsearch-5.5.1]$ ps-ef | grep elastic
...
[hadoop@djt002 elasticsearch-5.5.1]$ kill -9 2295
```

#### Elasticsearch的前后台运行与停止(rpm包方式）

> [Elasticsearch的前后台运行与停止(rpm包方式）](https://blog.csdn.net/weixin_34192732/article/details/90131208?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_utm_term-1&spm=1001.2101.3001.4242)

```bash
建议用root用户

[root@djt002 elasticsearch-2.4.3]$ pwd
/usr/local/elasticsearch/elasticsearch-2.4.3
[root@djt002 elasticsearch-2.4.3]$  rpm -ivh elasticsearch-2.4.3.rpm

把es服务设置为开机启动

　　chkconfig --add elasticsearch

启动/停止/重启...

　　service elasticsearch start
　　service elasticsearch stop
　　service elasticsearch restart

es服务相关配置：/etc/sysconfig/elasticsearch
es的配置文件在/etc/elasticsearch目录
es的日志文件在/var/log/elasticsearch
es的数据文件在/var/lib/elasticsearch
es的bin目录在/usr/share/elasticsearch
```

#### 自动清理ES索引脚本

[自动清理ES索引脚本](https://www.jianshu.com/p/9efb84325112)

#### Elasticsearch 自动重启脚本

[Elasticsearch 自动重启脚本，同样适用于其他应用](https://segmentfault.com/a/1190000010329990)

### 单节点集群

> [linux 上elasticsearch集群搭建详解，手把手教学（tar下载包）](https://blog.csdn.net/weixin_38312502/article/details/98966450?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&dist_request_id=1328767.10524.16173413468780005&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)

如果你的项目比较小，还不需要特别庞大的集群，但是又考虑到之后的扩展性而使用集群时，可以使用单节点集群。单节点集群的配置非常简单，只需要在elasticsearch.yml中配置如下属性即可

```yml
discovery.type: single-node #（注意该配置只在单节点集群中使用，多节点集群不能使用，使用默认类型，即不要这属性）

cluster.name: search

node.name: es-node

bootstrap.memory_lock: true
bootstrap.system_call_filter: false

network.host: 192.168.20.105

http.port: 9200

http.cors.enabled: true
http.cors.allow-origin: "*"

#其他的cluster.initial_master_nodes等集群配置不用填，以免报错
```



### 蓝绿部署切换

> 在一个原子操作中完成别名切换 

```bash
POST /_aliases
{
    "actions": [
        { "remove": { "index": "my_index_blue", "alias": "my_index" }},
        { "add":    { "index": "my_index_green", "alias": "my_index" }}
    ]
}
```

