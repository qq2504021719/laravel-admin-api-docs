---
sidebar: auto
---
# 中间件说明

## 说明

```php
/**
 *
 *  应用程序的路由中间件
 *
 * @var array
 */
protected $routeMiddleware = [
	// 登录验证
    'admin.api.auth'              => Middleware\AdminAuth::class,
    // 操作日志
    'admin.api.operation.log'     => Middleware\OperationLog::class,
    // 权限验证
    'admin.api.role.permission'   => Middleware\RolePermission::class,
    // xss过滤
    'admin.api.verify.xss'   => Middleware\VerifyXss::class,
];
```

#### 注意
> 一定要引用`web`中间件，才能正常使用登录验证