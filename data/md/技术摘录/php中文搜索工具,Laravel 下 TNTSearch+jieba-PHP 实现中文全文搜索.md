# php中文搜索工具,Laravel 下 TNTSearch+jieba-PHP 实现中文全文搜索



`TNTSearch` + `jieba-php` 这套组合可以在不依赖第三方的情况下实现中文全文搜索。

特别的适合博客这种小项目。

开启php扩展

>  pdo_sqlite
>  sqlite3
>  mbstring

开始：

看到 https://learnku.com 社区新上线的文件推荐功能，作者介绍说是使用了 `es(elasticsearch)` 全文搜索功能，于是我开始使用 `es` (之前没用过)，首先想到的是找度娘，结果搜索了好多相关的文档资料，都说需要安装`java`环境才能使用`es`，我就想作为`php`开发如何一定要用`java`呢？继续搜索寻找其他资料，果然在`github`里面找到了别人造的轮子 `laravel-scout-tntsearch` ；

进入正题：

1. 直接

```bash
composer require vanry/laravel-scout-tntsearch
```

2. 添加 Provider ；

```php
'providers' => [
    ...
    /**
    * TNTSearch 全文搜索
    */
    Laravel\Scout\ScoutServiceProvider::class,
    Vanry\Scout\TNTSearchScoutServiceProvider::class,
],
```

3. 中文分词

```bash
composer require fukuball/jieba-php
```

4. 发布配置项

```php
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```

5. 配置项 `config/scout.php` 中增加 `tntsearch`

```php
'tntsearch' => [
    'storage' => storage_path('indexes'), //必须有可写权限
    'fuzziness' => env('TNTSEARCH_FUZZINESS', false),
    'searchBoolean' => env('TNTSEARCH_BOOLEAN', false),
    'asYouType' => false,
    'fuzzy' => [
        'prefix_length' => 2,
        'max_expansions' => 50,
        'distance' => 2,
	],
    'tokenizer' => [
        'driver' => env('TNTSEARCH_TOKENIZER', 'default'),
        'jieba' => [
            'dict' => 'small',
            //'user_dict' => resource_path('dicts/mydict.txt'), //自定义词典路径
    	],
        'analysis' => [
            'result_type' => 2,
            'unit_word' => true,
            'differ_max' => true,
        ],
        'scws' => [
            'charset' => 'utf-8',
            'dict' => '/usr/local/scws/etc/dict.utf8.xdb',
            'rule' => '/usr/local/scws/etc/rules.utf8.ini',
            'multi' => 1,
            'ignore' => true,
            'duality' => false,
        ],
    ],
    'stopwords' => [
        '的',
        '了',
        '而是',
    ],
],
```

6. `.env` 增加配置项

```env
SCOUT_DRIVER=tntsearch
TNTSEARCH_TOKENIZER=jieba
```



到这里一切准备就绪，下面我们来测试功能是否有效

```php
//控制器中：
public function search(){
    $data = Article::search('tnt')->get()->toArray();
    dd($data);
}
```

在模型中我们添加需要搜索的字段：

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
class Article extends Model
{
    use Searchable;
    /**
    * 索引的字段
    *
    * @return array
    */
    public function toSearchableArray()
    {
        return $this->only('id', 'title', 'content');
        // return $this->toArray();
    }
}
```

生成索引：

```bash
php artisan scout:import "App\Model\Article"
```



![0f09ec546c704f75194a086bcef2b830.png](https://img-blog.csdnimg.cn/img_convert/0f09ec546c704f75194a086bcef2b830.png)

大功告成！

注：上面生成索引执行过一次就不需要操作了，当我们新增文章的时候回自动添加索引。

执行 `php artisan scout:import "App\Model\Article" ` 生成的文件在配置项中 ` 'storage' => storage_path('indexes') ` 配置。



> https://blog.csdn.net/weixin_39883129/article/details/115203850?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242














