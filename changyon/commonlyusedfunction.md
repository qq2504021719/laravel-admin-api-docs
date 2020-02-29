---
sidebar: auto
---

# 常用方法

## 公共

> `use`文件,把文件包含进来

```php
use Pl\LaravelAdminApi\Common\Common;
```

## 数组

### 二维数组指定key排序

> 根据二维数组指定key升序排序

#### 调用
```php
/**
 * @param array $data 排序的数组
 * @param string $key 要排序的key
 * @return array
 */
Common::dataOrder($data, $key);
```

### 二维数组指定key统计

> 根据二维数组指定key统计，这里是相加统计

#### 调用
```php
/**
 * @param array $arr 排序的数组
 * @param string $key 要相加统计的key
 * @return int
 */
Common::sumArrKey($arr, $key);
```


### 获取二维数组指定key，组合为一维数组

> 获取二维数组指定key，组合为一维数组

#### 调用
```php
/**
 * @param array $data 二位数组
 * @param string $key 要取出的key
 * @return array
 */
Common::getArrKey($data,$key);
```

### 数组指定key值判断获取

> 判断数组指定下标是否存在,存在则返回数据,一维数组

#### 调用
```php
/**
 * @param array $arr 数组
 * @param string $key key
 * @param string 不存在返回值
 * @return string
 */
Common::arrIsKey($arr, $key, $type = '');
```

## 字符串

### 大写字符替换为指定字符串

> 大写字符替换为指定字符串

#### 调用
```php
/**
 * @param string $oldStr 原字符串
 * @param string $replace 替换为
 * @return string
 */
Common::CaStrReplaceStr($oldStr, $replace = '_');
```

## 日期时间

### 获取月的开始和接收时间

> 获取月的开始和接收时间

#### 调用
```php
/**
 * @param string $date 指定日期，默认适用当前日期
 * @return array
 */
Common::getMonthstartEnd($date = '');
```

### 计算两个时间范围是否有交集

> 计算两个时间范围是否有交集

#### 调用 
```php
/**
 * @param string $beginTime1 时间1开始
 * @param string $endTime1 时间1结束
 * @param string $beginTime2 时间2开始
 * @param string $endTime2 时间2结束
 * @return bool
 */
Common::isTimeCross($beginTime1 = '', $endTime1 = '', $beginTime2 = '', $endTime2 = '');
```

### 日期范围拆分为天

> 日期范围拆分为天

#### 调用
```php
/**
 * @param string $start 开始时间
 * @param string $end 结束时间
 * @return array
 */
Common::timeDay($start,$end);
```

## 文件目录

### 删除指定目录下的文件

> 删除指定目录下的文件，不删除目录文件夹

#### 调用
```php
/**
 * @param string $path 路径
 */
Common::delDirFile($path);
```

## 其他

### 根据手机号登录

> 适用前需要安装JWT,适用于小程序、微信授权登录等第三方授权登录，用户免密码登录

#### [JWT安装参考](https://learnku.com/articles/10885/full-use-of-jwt)

#### 调用
```php
/**
 * @param Model $model 用户模型
 * @param string $mobile mobile字段值
 * @return string
 */
Common::loginJwt($model,mobile);
```