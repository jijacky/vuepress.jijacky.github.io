## onclick与id冲突

HTML：
```
<button class="btn btn-info" id="price_rule" onclick="price_rule()" type="button">
定时改价
</button>
```
JS：
```
function price_rule(){
	console.log(1);
	return ;
}
```

以上写法，点击button，方法没有反应。需要将id的值与onclick的值变为不相同的才可以


## layui介绍

快速,灵活和务实,大道至简,良好的文档和示例,极具生产力的一个UI框架.LayUI,我的理解是,它本质
还是一个基于jQuery的UI框架,比如它的灵魂组件layer弹出层对象layero本质就是一个jQuery对象,
LayUI是内置了jQuery库的.举个例子,LayUI在功能上,可以说是全覆盖了 Vue+Axios+ElementUI 这套
MVVM前端方案.jQuery 对标 Vue.jQuery的AJAX 对标 Axios.LayUI 对标 ElementUI.如果工期紧张,人
手不足,那么LayUI这套方案绝对是一个差不到哪的选择.总之就是,门槛很低,但上限并不低.
看一下LayUI的零依赖的部署方式和全模块的加载方式,就大概能知道LayUI的设计哲学了.
```
<link rel="stylesheet" href="/layui/css/layui.css">
<script src="/layui/layui.all.js"></script>
<script>
(function(){
	var layer = layui.layer;
	layer.msg('Hello World');
})();
</script>
```
LayUI也提供了模块化加载的方法,但个人并不喜欢:
```
<link rel="stylesheet" href="/layui/css/layui.css">
<script src="/layui/layui.js"></script>
<script>
layui.use(['layer', 'form'], function(){
	var layer = layui.layer;
	var from = layui.form;
	layer.msg('Hello World');
});
</script>
```

作者：eechen
链接：https://www.zhihu.com/question/58435239/answer/1096615048
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


## layui介绍

我之前是做传统电信系统的，记得以前做功能的时候，一般都是一个人前端后端都做的，后来到互联网公司了，
大家开始搞前后端分离了，前端专心做前端，后端专心做后端，最开始的时候还能读懂前端的代码，后来随着
前端技术的突飞猛进，就不再能看懂了，对我这个后端程序员来说要做个界面只能老老实实用easyui，
bootstrap，最近才开始用layui，发现确实很不错，学习成本低，开发成本也低，对我来说确实是个福音，给
贤心点100个赞~

作者：郭virgil
链接：https://www.zhihu.com/question/58435239/answer/173946163
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


## 获取IFRAME当前的URL

```
parent.document.getElementById("content_info").contentWindow.location.href
```

## ”薛定谔的猫“现象
```
wsAction.close()
this.wsStatus = wsAction.status

console.log(this.usersList);
debugger
// 监听器 打开链接
let onopen = function ( {evt} ){
	vthis.wsStatus = wsAction.status
	vthis.autoLogin()
}

this.usersList = {...}
```
如上代码片段，debugger 之上的log ，在”看“之前 执行，和”看“之后执行的结果不一样。
具体就是，程序执行到 debuger 暂停，去看一眼输出的log的变量值，执行完再去看，这是一种情况
另一种就是，程序执行到 debuger 暂停，这时候不去看输出的log变量值，继续执行完程序，然后再去看
输出的值，这时候竟然是另一张情况。

## 怎么样彻底“锁死”const 定义的常量

> 可以使用Object.freeze()方法来 冻结变量
```
const obj = {
  name:"1024kb"
}
Object.freeze(obj)
// 此时对象obj被冻结，返回被冻结的对象
```

需要注意的是，被冻结后的对象不仅仅是不能修改值，同时也

> 不能向这个对象添加新的属性
> 不能修改其已有属性的值
> 不能删除已有属性
> 不能修改该对象已有属性的可枚举性、可配置性、可写性
建议判断清除情况再进行使用