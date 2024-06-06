### Laravel DB ORM 子查询

#### 子查询必须遵循以下规则：

    - 子查询必须括在圆括号中
    - 子查询的 SELECT 子句中只能有一个列，除非主查询中有多个列，用于与子查询选中的列相比较
    - 子查询不能使用 ORDER BY，不过主查询可以。在子查询中，GROUP BY 可以起到同 ORDER BY 相同的作用
    - 返回多行数据的子查询只能同多值操作符一起使用，比如 IN 操作符
    - SELECT 列表中不能包含任何对 BLOB、ARRAY、CLOB 或者 NCLOB 类型值的引用
    - 子查询不能直接用在集合函数中 B- ETWEEN 操作符不能同子查询一起使用，但是 BETWEEN 操作符可以用在子查询中

#### 构建 raw 语句
DB::raw 用于在查询中使用原始表达式。不仅限于 raw，也包括下述其他方法：
```
selectRaw
whereRaw / orWhereRaw
havingRaw / orHavingRaw
orderByRaw
```
使用到的方法
- toSql() 获取不带 binding 参数的 SQL 语句
- getQuery() 获取完整的 SQL 语句
- mergeBindings() 将 binding 参数合并到查询中
```
$sub = Abc::where(..)->groupBy(..); // Eloquent Builder instance

$count = DB::table( DB::raw("({$sub->toSql()}) as sub") )
->mergeBindings($sub->getQuery()) 
->count();
```