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
use Pl\LaravelAdminApi\success;

public function render($request, Exception $exception)
{
    // 拦截参数验证错误
    if($exception instanceof ValidationException)
    {
        $error = array_collapse($exception->errors());
        success::success($error,$error[0],success::info);

    }
    ......
    return parent::render($request, $exception);
}
```