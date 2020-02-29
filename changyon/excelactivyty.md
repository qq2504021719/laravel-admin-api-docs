---
sidebar: auto
---

# Excel操作类

#### [扩展安装](https://blog.csdn.net/qq_29755359/article/details/104575938)

## 使用

### 导出返回
```php
[
	// excel下载路径
	"url" => "http://xxx.xxx.xx/download/excel/test/test0.xlsx"
	// 总记录数
	"count" => 212
	"msg" => ""
	"count_page" => 1.0
]
```

### 导出调用示例
```php
<?php

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Pl\LaravelAdminApi\Common\Common;
use Pl\LaravelAdminApi\Common\Excel\ExcelZipRepository;

class TestController extends Controller
{

    /**
     * 导出
     */
    public function test(Request $request)
    {

        $query = Country::query();

        /**
         * 创建对象
         */
        $excel = new ExcelZipRepository($query,'test','/test/');

        /**
         * 导出初始化
         */
        $re = $excel->excel_init($request,function ($data){
            return $this->excelDataInit($data);
        });
        dd($re);
    }

    /**
     * 查询数据处理，格式化组合为导出格式
     */
    public function excelDataInit($data)
    {
        $rows = [];

        $rows[0] = ['id','简写','老王','全称','简介'];

        foreach ($data as $v)
        {
            $row = [];

            $row[] = Common::arrIsKey($v,'id');
            $row[] = Common::arrIsKey($v,'cname');
            $row[] = Common::arrIsKey($v,'full_name');
            $row[] = Common::arrIsKey($v,'remark');

            $rows[] = $row;
        }

        return $rows;
    }
}

```


## 方法简介

### 初始化

```php
/**
 * @param Model $query 模型query
 * @param string $name excel名称
 * @param string $path /目录名称
 * @param int $paginate 每页数量
 */
$excel = new ExcelZipRepository($query, $name, $path = '', $paginate=10000);
```

### 导出

> 例page等于100，初始化paginate等于100，那就从10000条数据开始查询导出。

```php
/**
 * 分页查询数据
 * @param Request $request 传page=多少页，支持从第多少页开始导出。
 * @param $callback 查询数据格式化函数
 * @return array
 */
$excel->excel_init(Request $request,$callback);
```
