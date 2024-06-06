---
title: Docker安装ES
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

# Docker安装ES



### 资料 1

- CentOS 7.4 系统
- Docker version 18.06.1-ce
- docker-compose version 1.22.0

> https://zhuanlan.zhihu.com/p/97718826

### 资料2

> https://blog.csdn.net/weixin_43501634/article/details/107101403

### 资料3

> https://segmentfault.com/a/1190000020140461?utm_source=sf-related

`elasticsearch 5.5.1`安装命令：

```bash
docker pull elasticsearch:5.5.1
```

启动es：

```bash
docker run --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -d elasticsearch:7.2.0
```

检查：

```bash
curl http://localhost:9200
```

或者在浏览器中打开[http://localhost:9200](http://localhost:9200/)这个网址，如果能看到以下信息则说明我们的es是已经安装好了的。

```json
{
  "name" : "530dd7820315",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "7O0fjpBJTkmn_axwmZX0RQ",
  "version" : {
    "number" : "5.5.1",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "508c38a",
    "build_date" : "2019-06-20T15:54:18.811730Z",
    "build_snapshot" : false,
    "lucene_version" : "8.0.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

修改配置，解决跨域访问问题：

进入到容器中

```bash
docker exec -it elasticsearch /bin/bash
cd /usr/share/elasticsearch/config/
vi elasticsearch.yml
```

在elasticsearch.yml的文件末尾加上：

```yml
http.cors.enabled: true
http.cors.allow-origin: "*"
```

重启

```bash
docker restart elasticsearch
```

安装ik分词器：

```bash
cd /usr/share/elasticsearch/plugins/
elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.5.1/elasticsearch-analysis-ik-5.5.1.zip
exit
docker restart elasticsearch 
```

检查

```bash
POST test/_analyze
{
  "analyzer": "ik_max_word",
  "text": "你好我是东邪Jiafly"
}
```

