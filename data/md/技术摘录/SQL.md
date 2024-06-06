### group_concat 

- 以id分组，把name字段的值打印在一行，逗号分隔(默认)
```
select id,group_concat(name) from aa group by id;  

+------+--------------------+
| id| group_concat(name) |
+------+--------------------+
|1 | 10,20,20|
```

- 以id分组，把去冗余的name字段的值打印在一行
```
select id,group_concat(distinct name) from aa group by id;   

+------+-----------------------------+
| id| group_concat(distinct name) |
+------+-----------------------------+
|1 | 10,20|
```

- 以id分组，把name字段的值打印在一行，逗号分隔，以name排倒序
```
select id,group_concat(name order by name desc) from aa group by id;   

+------+---------------------------------------+
| id| group_concat(name order by name desc) |
+------+---------------------------------------+
|1 | 20,20,10 |
```

### 去重复

[Mysql去重查询（根据指定字段去重）](https://blog.csdn.net/wang1qqqq/article/details/115241993?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-5-115241993-blog-103361459.235^v38^pc_relevant_sort_base3&spm=1001.2101.3001.4242.4&utm_relevant_index=8)

> 在日常数据查询中，多有需要进行数据去重的查询，或删除重复数据的情况，以下罗列集中数据去重查询，可根据自身业务场景做调整：

1、根据全部字段的去重查询：
```
select distinct * from table
```
2、根据某些字段的去重查询（不考虑查询其他字段）
```
select distinct c_name,c_year,c_month from table
```
或者：
```
select c_name,c_year,c_month from table 
group by c_name,c_year,c_month
```
3、根据某些字段的去重查询（考虑查询其他字段）

如果其他字段所有结果值都想保留，建议直接用group by 和group_concat即可
```
select c_name,c_year,c_month,group_concat(',') c_values from table
group by c_name,c_year,c_month
```
4、根据某些字段的去重查询，查询重复项以外的全部数据

一般去重是根据时间、ID等，如时间最新/ID最大/value最大等等；

此处示例重复数据中ID小的是原始项，ID大的是重复项；

如果要看新的数据，则将以下的 min 改为 max ，也可根据自身情况调整其他字段。
```
select * from tableA
where c_id in
(select min(c_id) minid from tableA
group by c_name,c_year,c_month
)
```
或者：
```
select * from tableA
where c_id not in
(select min(c_id) minid from tableA
group by c_name,c_year,c_month
having count(*)>1
)
```
5、根据某些字段的去重查询，查询重复项（不包含原始项，只查询重复项）
```
select * from tableA
where c_id not in
(select min(c_id) minid from tableA
group by c_name,c_year,c_month
)
```
6、根据某些字段，查询出所有重复的数据（包含原始项和重复项）
```
select * from tableA a
right join
(select c_name,c_year,c_month from table A
group by c_name,c_year,c_month
having count(*)>1) b
on a.c_name=b.c_name
and a.c_year=b.c_year
and a.c_month=b.c_month
```
7、根据某些字段，删除重复的数据（示例ID最小的是要保留的数据，其他都是不要的）

从思路上来讲，应该（实际上会出错）：
```
delete from tableA
where c_id not in
(select min(c_id) minid from tableA
group by c_name,c_year,c_month
)
```
但是此时会报错： You can't specify target table for update in FROM clause

原因是：在同一张表，不能先查询某些值，再进行update操作

解决方法是：需要先把查询处理的id结果，as 一张表，再做delete操作，调整如下：
```
delete from tableA
where c_id in (
select * from
(select c_id from tableA
where c_id not in
(select min(c_id) from tableA
group by c_name,c_year,c_month
)) a
)
```
或者：
```
delete from tableA
where c_id in(
select * from (
select c_id from tableA
where c_id in
(select max(c_id) from tableA
group by c_name,c_year,c_month
having count(*)>1
)) a
)
```

