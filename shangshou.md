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
    // 测试
    $router->get('admin_api_test',function (){
        echo 'admin_api_test';
    });
    /**
     * 商品管理
     */
    $router->group([
        'middleware'    => [
            'admin.api.role.permission' // 权限验证
        ],
    ],function (Router $router){

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
> 访问`域名/admin_api_test`后，打开数据库，查看`操作日志表`,就能看到访问记录了。这里用户默认配置了登录，所有当前是登录了用户的。下一小节会说到用户模拟登录

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

## 角色权限

> 默认有两个用户，`系统管理员`和`管理员`。

- 1.管理员
> 具有`管理员`角色,`管理员`角色只有`日志list`的权限,所有`管理员`用户只能访问`日志list`接口,访问其他接口都是无权限

- 2.系统管理员
> 具有`系统管理员`角色,能访问所有接口

### 注意
- 1.用户权限，角色一定得通过`管理员修改`和`管理员添加`接口来操作，因为权限验证有缓存
- 2.添加权限的时候,`route_name`字段得是路由全路径，例如接口地址是`域名/aaaa/bbbb`,那字段的值就得是`aaaa/bbbb`


### 管理员验证

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

### 系统管理员验证

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