---
title: laravel 整合 ES (Elasticquent)
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

## laravel 整合 ES (Elasticquent)



### 环境

> laravel （5.2.45）
>
> elasticquent 1.0.7
>
> es-php ^6.1
>
> es 5.5.1
>
> ik 5.5.1

何以使用laravel的Eloquent ORM，直接数据库查出内容，然后调用es方法即可。但是，并没有与Model的增删改做同步，还需要自己调用相应的方法修改索引。查到的数据仅仅是做了索引的字段，并不是数据库的字段，还需要自己处理。当前的配置其实es-php版本过高。



> [laravel下elasticsearch+analysis-ik实现中文全文搜索 github  [Elasticquent](https://github.com/elasticquent/Elasticquent)



### 安装ES

上传文以下文件，按照 `安装搭建ES` 所示，进行安装即可

```bash
# JDK 这里使用解压安装
jdk-10.0.1_linux-x64_bin.tar
# ES 这里是已经配置好IK和参数的压缩包，解压后直接使用
elasticsearch-5.5.1_pub
```



### 安装elasticquent
#### 安装命令

```bash
composer require elasticquent/elasticquent "1.0.7"
```

如果报内存不足，请使用如下命令

```bash
php -d memory_limit=-1 composer.phar安装路径 require elasticquent/elasticquent "1.0.7"
```

如果下载有问题，请换源

```shell
composer config repo.packagist composer https://php.cnpkg.org
```



#### 配置服务

在`config/app.php`

```php
'providers' => [
    ...
    Elasticquent\ElasticquentServiceProvider::class,
],

'aliases' => [
    ...
    'Es' => Elasticquent\ElasticquentElasticsearchFacade::class,
],
```



#### 发布服务

```bash
php artisan vendor:publish --provider="Elasticquent\ElasticquentServiceProvider"
```



#### 配置参数

文件 `/app/config/elasticquent.php`

```php
return array(

    'config' => [
        'hosts'     => ['localhost:9200'],// URL
        'retries'   => 1,//重试次数
    ],

    'default_index' => 'my_custom_index_name',// 默认索引

);
```



### 使用示例

```php
    /**
     * ES 索引更新方法
     */
    public static function toIndex($obj,$op){
        // $books = static::whereIn('id', $ids)->get();
        // 添加当前对象（集合）到索引

        if($obj && $obj instanceof \Elasticquent\ElasticquentCollection){
            // dump($op,$obj);
            if($op == 'add')
                $obj->addToIndex(); 
            elseif($op == 'edit')
                $obj->addToIndex();
            elseif($op == 'del')
                $obj->removeFromIndex();
        }
        
    }

    /**
     * 插入单条数据的
     * @param $data 插入的数据
     * @return mixed
     */
    public static function add($data){
        $id = self::insertGetId($data);
        self::toIndex(self::whereIn('id',[$id])->get(),'add');
        return $id;
    }

    /**
     * ES Admin 搜索方法
     */
    public static function esSearch($where,$limit=10){

        $where['name']      && $es_where[] = ['match'=>['name' => $where['name']]];

        $where['is_del']    && $es_where[] = ['term'=>['is_del'     => $where['is_del']]];
        $where['shop_id']   && $es_where[] = ['term'=>['shop_id'    => $where['shop_id']]];
        $where['is_check']  && $es_where[] = ['term'=>['is_check'   => $where['is_check']]];
        $where['is_tui']    && $es_where[] = ['term'=>['is_tui'     => $where['is_tui']]];
        $where['is_new']    && $es_where[] = ['term'=>['is_new'     => $where['is_new']]];
        $where['is_hot']    && $es_where[] = ['term'=>['is_hot'     => $where['is_hot']]];
        $where['status']    && $es_where[] = ['term'=>['status'     => $where['status']]];
        $where['cate_id']   && $es_where[] = ['term'=>['cate_id'    => $where['cate_id']]];
        $where['cate_two_id'] && $es_where[] = ['term'=>['cate_two_id' => $where['cate_two_id']]];
        $where['cate_thr_id'] && $es_where[] = ['term'=>['cate_thr_id' => $where['cate_thr_id']]];
        $where['self_operated'] && $es_where[] = ['term'=>['self_operated' => $where['self_operated']]];

        $where['ids']       && $es_where[] = ['terms'=>['id' => $where['ids']]];

        // dump($where);

        $page = Paginator::resolveCurrentPage() ?: 1;
        $offset = ($page-1)*$limit;

        $es_rs = self::complexSearch(array(
            'body' => array(
                'query' => ['bool'=>['must'=>$es_where]],
                "from" => $offset,
                "size" => $limit
            )
        ));
        
        $es_rs_ids = $es_rs->pluck('id');
        $db_rs = self::whereIn('id',$es_rs_ids)->get()->keyBy('id');

        return $es_rs->transform(function($item, $key) use($db_rs){
            return $db_rs[$item->id];
        })->paginate($limit);
    }

```





### 蓝绿切换

> [ElasticSearch 索引蓝绿部署](https://my.oschina.net/u/2400083/blog/909982)



#### 部署设计

每次生产部署进行如下操作：

1. 将模型的索引循环切换其 `别名指向` 至如下两个 `实际索引`
   - 实际索引_blue
   - 实际索引_green
2. 删除过时的实际索引
3. 使用部署更新后的索引

**一个别名可以指向多个索引，所以别名切换进行蓝绿部署时，我们要原子化操作“增加新别名 & 删除旧别名”** 

```bash

# 在一个原子操作中完成别名切换
POST /_aliases
{
    "actions": [
        { "remove": { "index": "my_index_blue", "alias": "my_index" }},
        { "add":    { "index": "my_index_green", "alias": "my_index" }}
    ]
}
```

#### Laravel Elasticquent实现


我们约定每个模型表独占一个INDEX空间

```php
<?php

trait EsSearchable
{
    use Elasticquent\ElasticquentTrait;

    public static function getIndex(){
        return static::index;
    }

    public static function setIndex($index){
        return static::index = $index;
    }

    public static function getType(){
        return static::type;
    }

    public static function setType($type){
        return static::type = $type;
    }    
}

class Foo extends \App\Models\Model
{
    use EsSearchable;

    protected static $index = 'foo_index';
    protected static $type = 'foo_type';

    // protected $indexSettings = [];
    // protected $mappingProperties = [];
}

##########################################################################

$aliasIndex = Foo::getIndex();
$actualIndexes = [
    $aliasIndex . '_blue',
    $aliasIndex . '_green',
];
$fromIndex = \ES::indices()->existsAlias(['name'=>$aliasIndex, 'index'=>$actualIndexes[0]])
                        ? array_shift($actualIndexes) : array_pop($actualIndexes);
$toIndex = current($actualIndexes);

createIndexByModel($toIndex, Foo::class);
ModelDocsToIndex($toIndex, Foo::class);
switchIndexAlias($aliasIndex, $fromIndex, $toIndex);
deleteIndexByModel($fromIndex, Foo::class);


/**
 * 索引文档至指定索引空间
 */
function ModelDocsToIndex($index, $modelCls){
    $originIndex = $modelCls::getIndex();

    $modelCls::setIndex($index);
    $modelCls::chunk(1000, function(Collection $collection){
        $collection->->addToIndex();
    });

    $modelCls::setIndex($originIndex);
}

/**
 * 蓝绿部署切换：改变索引别名的指向
 */
function switchIndexAlias($aliasIndex, $fromIndex, $toIndex){
    $params = [
        'body' => [
            'actions' => [
                'remove' => ['index' => $fromIndex, 'alias' => $aliasIndex],
                'add' => ['index' => $toIndex, 'alias' => $aliasIndex],
            ]
        ]
    ];

    \ES::indices()->updateAliases($params);
}

/**
 * 新建索引(配置同指定模型)
 */
function createIndexByModel($index, $modelCls){
    $originIndex = $modelCls::getIndex();
    
    $modelCls::setIndex($index);
    $modelCls::createIndex();

    $modelCls::setIndex($originIndex);
}

/**
 * 删除索引(配置同指定模型)
 */
function deleteIndexByModel($index, $modelCls){
    $originIndex = $modelCls::getIndex();
    
    $modelCls::setIndex($index);
    $modelCls::deleteIndex();

    $modelCls::setIndex($originIndex);
}
```



### 注意事项

* es->complexSearch() 方法必须指定index、type，否则查询URL是ip:9200/_search，会查找所有的索引

















