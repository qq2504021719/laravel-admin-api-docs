---
sidebar: auto
---

# 快速上手

## 安装

> 安装并配置好所有的环境

## 路由

### 1.新建文件
> `routes/admin_api.php`
```php
<?php

use Illuminate\Routing\Router;
use \Illuminate\Support\Facades\Route;

Route::group([
    'prefix'        => config('admin-api.route.prefix'),
    'middleware'    => [
        'web',
        'admin.api.auth', // 登录验证
        'admin.api.operation.log', // 操作日志
        'admin.api.verify.xss' // xss过滤
    ],
],function (Router $router){

    // 新建路由测试-修改管理员对应权限
    $router->get('admin_api_test_up',function (){
        $request = new \Illuminate\Http\Request();
        $request->merge([
            'name'=>'新建路由测试',
            'id'=>17,
            'route_name' => config('admin-api.route.prefix').'/admin_api_test',
            'role' => [], // 添加角色
//            'role' => [2]  // 删除角色
        ]);
        $permission = new \Pl\LaravelAdminApi\Repository\PermissionRepository();
        dd($permission->permission_up($request));
    });

    /**
     * 商品管理
     */
    $router->group([
        'middleware'    => [
            'admin.api.role.permission' // 权限验证
        ],
    ],function (Router $router){
        // 新建路由测试
        $router->get('admin_api_test',function (){
            echo 'admin_api_test';
        });
    });
});

```

### 2.注册路由

> `app/Providers/RouteServiceProvider.php`
```php
public function map()
{
    ....
    $this->mapAdminApiRoutes();
}

protected function mapAdminApiRoutes()
{
    Route::namespace($this->namespace)->group(base_path('routes/admin_api.php'));
}
```

### 3.验证

- 1.访问`域名/admin_api_test`后，打开数据库，查看`操作日志表`,就能看到访问记录了。这里用户默认配置了登录，所有当前是登录了用户的。下一小节会说到用户模拟登录
- 2.可以配置模拟用户为2，通过访问`admin_api_test_up`路由，添加或删除`管理员`的`新建路由测试`权限，来权限是否生效


## 用户登录模拟
> `config/admin-api.php`，产考注释配置即可

```php
/**
 * 模拟数据
 */
'simulation' => [
    /**
     * 模拟用户信息
     * 有值时表示当前登录用户是此用户
     * 没有值时需要正常登录
     * 1 是系统管理员
     * 2 是管理员
     */
    'user' => 1,
//  'user' => '',
]

```

### 1.默认账号密码


名称 | 账号 | 密码
---|---|---
系统管理员 | admin | 123456
管理员 | admin1 | 123456



## 角色权限

> 默认有两个用户，`系统管理员`和`管理员`。

- 1.管理员
> 具有`管理员`角色,`管理员`角色只有`日志list`的权限,所有`管理员`用户只能访问`日志list`接口,访问其他接口都是无权限

- 2.系统管理员
> 具有`系统管理员`角色,能访问所有接口

### 1.注意
- 1.用户权限，角色一定得通过`管理员修改`和`管理员添加`接口来操作，因为权限验证有缓存
- 2.添加权限的时候,`route_name`字段得是路由全路径，例如接口地址是`域名/aaaa/bbbb`,那字段的值就得是`aaaa/bbbb`


### 2.管理员验证

> 配置用户模拟的`user=2`为`管理员`

- 1.访问`管理员list`接口(`域名/gjgase/admin_list`)，返回

```json
{
	"code": 201,
	"msg": "无权限",
	"data": []
}
```

- 2.访问`日志list`接口(`域名/gjgase/log_list`)，返回

```json
{
	"code": 200,
	"msg": "成功",
	"data": {
		"current_page": 1,
		"data": [{
			"id": 1,
			"u_id": 2,
			"path": "gjgase\/log_list",
			"method": "GET",
			"ip": "127.0.0.1",
			"input": [],
			"created_at": "2019-08-03 08:45:58",
			"updated_at": "2019-08-03 08:45:58",
			"user": {
				"id": 2,
				"name": "管理员",
				"avatar": ""
			}
		}],
		"first_page_url": "http:\/\/laravel55.it\/gjgase\/log_list?page=1",
		"from": 1,
		"last_page": 1,
		"last_page_url": "http:\/\/laravel55.it\/gjgase\/log_list?page=1",
		"next_page_url": null,
		"path": "http:\/\/laravel55.it\/gjgase\/log_list",
		"per_page": 10,
		"prev_page_url": null,
		"to": 7,
		"total": 7
	}
}
```

### 3.系统管理员验证

> 配置用户模拟的`user=1`为`系统管理员`

- 1.访问`管理员list`接口(`域名/gjgase/admin_list`)，返回

```json
{
	"code": 200,
	"msg": "成功",
	"data": {
		"current_page": 1,
		"data": [{
			"id": 1,
			"username": "admin",
			"name": "系统管理员",
			"avatar": "",
			"created_at": "2019-08-03 08:31:56",
			"updated_at": "2019-08-03 08:31:56"
		}, {
			"id": 2,
			"username": "admin1",
			"name": "管理员",
			"avatar": "",
			"created_at": "2019-08-03 08:31:56",
			"updated_at": "2019-08-03 08:31:56"
		}],
		"first_page_url": "http:\/\/laravel55.it\/gjgase\/admin_list?page=1",
		"from": 1,
		"last_page": 1,
		"last_page_url": "http:\/\/laravel55.it\/gjgase\/admin_list?page=1",
		"next_page_url": null,
		"path": "http:\/\/laravel55.it\/gjgase\/admin_list",
		"per_page": 10,
		"prev_page_url": null,
		"to": 2,
		"total": 2
	}
}
```

## 全局返回

> 会发布`Success.php`到`App\Http\`目录下，在这里定义状态码和对应的返回值。一个状态码对应一个返回值。方便报错后快速定位

- 示例
```
use App\Http\Success;

return Success::success_v2(Success::success,$data = []);
```