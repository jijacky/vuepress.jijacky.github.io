---
title: ES本地集群环境搭建
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

# ES本地集群环境搭建



> [Elasticsearch(ES) 本地集群环境搭建](https://www.exception.site/elasticsearch/elasticsearch-local-cluster-install)



我们将演示，如何在本机上搭建一个多节点的 Elasticsearch 集群。

这个集群中会有 4 个节点，分别是 `node0`、`node1`、`node2`、`node3`。

启动命令如下：

```shell
bin/elasticsearch -E node.name=node0 -E cluster.name=xiaoha-cluster -E path.data=node0_data -d
bin/elasticsearch -E node.name=node1 -E cluster.name=xiaoha-cluster -E path.data=node1_data -d
bin/elasticsearch -E node.name=node2 -E cluster.name=xiaoha-cluster -E path.data=node2_data -d
bin/elasticsearch -E node.name=node3 -E cluster.name=xiaoha-cluster -E path.data=node3_data -d
```

小伙伴们可能会说：启动命令后面的参数都是啥意思？

看图:

![img](https://exception-image-bucket.oss-cn-hangzhou.aliyuncs.com/156860500044382)

启动成功后，我们可以通过 /_cat/nodes API 来查看集群节点信息：

```shell
GET /_cat/nodes
```

> 注意: 执行命令后，不要立即验证节点是否启动成功，因为启动成功需要花费一些时长，稍等片刻，就能看到被成功启动的节点了。

接下来，通过 CURL 命令来查看一下节点信息：

```shell
curl localhost:9200/_cat/nodes
```

![img](https://exception-image-bucket.oss-cn-hangzhou.aliyuncs.com/156860516663734)

可以看到，一共 4 个节点，是 OK 的，另外，我们也可以通过 HEAD 插件来查看：

![img](https://exception-image-bucket.oss-cn-hangzhou.aliyuncs.com/156861441589949)

至此，一个 4 节点的 Elasticsearch 集群的本地环境搭建完毕。







# ES迁移数据存储位置和日志存储位置

> https://www.e-learn.cn/topic/3531480

## 1. 修改/etc/elasticsearch/elasticsearch.yml文件，

- 修改数据文件存储位置:

  ```
  默认位置: path.data: /var/lib/elasticsearch
  修改为:   path.data: /data/elasticsearch
  ```

- 修改日志文件存储位置:

  ```
  默认位置: path.logs: /var/log/elasticsearch
  修改为:   path.logs: /data/logs/elasticsearch
  ```

## 2. 迁移文件

- 迁移数据文件: 复制/var/lib/elasticsearch文件夹下的nodes文件 到 /data/elasticsearch文件夹下 修改新目录下的nodes文件夹归属:

  ```
  cd /data/elasticsearch
  chown -R elasticsearch:elasticsearch *
  ```

- 重启es:

  ```
  systemctl restart elasticsearch
  ```











