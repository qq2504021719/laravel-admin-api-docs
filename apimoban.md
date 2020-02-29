---
sidebar: auto
---

# API代码模板生成

## 生成
```
php artisan make:admin-api Admin/Base/Gift 1 model=App/Models/Admin/Gift
```
- 执行成功
```
文件创建成功: app/Http/Controllers/Admin/Base/GiftController.php
文件创建成功: app/Http/Requests/Admin/Base/GiftRequest.php
文件创建成功: app/Repository/Admin/Base/GiftRepository.php

路由模板:
$router->post('foo-bar-b-list','GiftTestController@GiftTestList');    // list
$router->post('foo-bar-b-deta','GiftTestController@GiftTestDeta');    // 详情
$router->post('foo-bar-b-add','GiftTestController@GiftTestAdd');      // 添加
$router->post('foo-bar-b-up','GiftTestController@GiftTestUp');        // 修改
$router->post('foo-bar-b-de','GiftTestController@GiftTestDe');        // 删除
```

### `GiftController.php`

> 参数验证、逻辑操作在这里分发。这里不会有逻辑操作


### `GiftRequest.php`

> 主要是添加和修改的公共参数的验证，可编辑字段添加。表示只用这些字段可以添加和修改

```php
/**
 * 添加可编辑字段
 * @var array
 */
private $field = [
];
```


### `GiftRepository.php`

> 控制器分发的逻辑在这里实现

## 删除
```
php artisan make:admin-api Admin/Base/Gift 2 model=App/Models/Admin/Gift
```

- 执行成功
```
文件删除成功: app/Http/Controllers/Admin/Base/TestController.php
文件删除成功: app/Http/Requests/Admin/Base/TestRequest.php
文件删除成功: app/Repository/Admin/Base/TestRepository.php
```