---
sidebar: auto
---

# 安装配置管理

## 安装

### 安装
```
composer require pl/laravel-admin-api
```

### 服务添加

> `config/app.php`

```
'providers' => [
    ......
    Pl\LaravelAdminApi\LaravelAdminApiProvider::class,
]
```

### 发布文件
```
php artisan vendor:publish --provider="Pl\LaravelAdminApi\LaravelAdminApiProvider"
```

### 迁移数据库
```
php artisan migrate
```

### 更新 composer
``` 
composer dump-autoload
```

### 数据填充
```
php artisan db:seed --class=LaravelAdminApiSeeder
```

> 注意,若果填充出现`Class LaravelAdminApiSeeder does not exist `报错。则执行`composer dump-autoload`后再重新执行填充命令即可


## 配置

### 登录验证
> `config/auth.php`
```
'guards' => [
    'admin_api' => [
        'driver' => 'session',
        'provider' => 'admin_api_users',
    ],
    ....
],

'providers' => [
    'admin_api_users' => [
        'driver' => 'eloquent',
        'model' => \Pl\LaravelAdminApi\Models\Admin_user::class,
    ],
    ....
],
```

### `POST`提交验证取消
> `VerifyCsrfToken.php`
```
protected $except = [
    'gjgase/*',
];
```

### 参数验证拦截
>`Handler.php`
```
use Illuminate\Validation\ValidationException;
use App\Http\Success;

public function render($request, Exception $exception)
{
    // 拦截参数验证错误
    if($exception instanceof ValidationException)
    {
        $error = array_collapse($exception->errors());
        return Success::success_v2(success::params,$error[0]);

    }
    ......
    return parent::render($request, $exception);
}
```

### 后台API文件快速生成

- 创建
```
php artisan make:admin-api Admin/Base/Gift 1 model=App/Models/Admin/Gift

# 会自动创建如下的文件
文件创建成功: app/Http/Controllers/Admin/Base/GiftController.php (控制器)
文件创建成功: app/Http/Requests/Admin/Base/GiftRequest.php (公共参数验证文件)
文件创建成功: app/Repository/Admin/Base/GiftRepository.php (仓库，逻辑操作)

路由模板:
$router->post('foo-bar-b-list','GiftTestController@GiftTestList');    // list
$router->post('foo-bar-b-deta','GiftTestController@GiftTestDeta');    // 详情
$router->post('foo-bar-b-add','GiftTestController@GiftTestAdd');      // 添加
$router->post('foo-bar-b-up','GiftTestController@GiftTestUp');        // 修改
$router->post('foo-bar-b-de','GiftTestController@GiftTestDe');        // 删除
```

- 删除
```
php artisan make:admin-api Admin/Base/Gift 2 model=App/Models/Admin/Gift

# 成功删除
文件删除成功: app/Http/Controllers/Admin/Base/TestController.php
文件删除成功: app/Http/Requests/Admin/Base/TestRequest.php
文件删除成功: app/Repository/Admin/Base/TestRepository.php
```