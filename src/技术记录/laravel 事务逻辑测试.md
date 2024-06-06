---
title: laravel 事务逻辑测试
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

## 顺序提交
```
if(false){
	# 开启事务
	DB::beginTransaction();

	$rs = \App\Models\Test::add(['name'=>'1']);
	dump($rs);
	if ($rs) {
		// 一旦回滚执行，后续的逻辑当即不再存在与本事务中
		// DB::rollBack();
		// continue;
		// break;
	}
	// 上面触发回滚后，下面的执行不再需要commit进行提交，会立即执行
	$rs = \App\Models\Test::add(['name'=>'2']);
	dump($rs);
	if ($rs) {
		// DB::rollBack();
	}
	// 一旦开始事务，必须使用commit提交，不然不执行
	// DB::commit();
}
```

## 嵌套提交
```
if(1){
	# 第一层 开启事务
	DB::beginTransaction();

	$rs = \App\Models\Test::add(['name'=>'01']);
	dump($rs);
	
	// 一旦这里回滚，事务结束，下面的逻辑变为单层事务与无事务逻辑
	if (false) {
		DB::rollBack();
	}
	{
		# 第二层 开启事务
		DB::beginTransaction();
		
		$rs = \App\Models\Test::add(['name'=>'11']);
		dump($rs);
		if (false) {
			// 内部回滚为真回滚，即使外部成功提交，不影响内部回滚。
			DB::rollBack();
		}
		// 内层提交为虚假提交，必须要外部所有嵌套事务全部提交才执行。
		// 
		DB::commit();
	}
	
	$rs = \App\Models\Test::add(['name'=>'02']);
	dump($rs);
	// 一旦上面发生回滚，这里不在事务内部，代码直接执行
	// 外部回滚，被包含的内部事务也回滚
	if (true) {
		DB::rollBack();
	}
	// 一旦开始事务，必须使用commit提交，不然不执行
	DB::commit();
}
```