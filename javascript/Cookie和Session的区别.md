# Cookie和Session的区别

# 前言：

cookie和session有着千丝万缕的联系，本文将详细介绍2者的区别。

------

#### 1、存储位置不同

> cookie的数据信息存放在客户端浏览器上。

> session的数据信息存放在服务器上。

#### 2、存储容量不同

> 单个cookie保存的数据<=4KB，一个站点最多保存20个Cookie。

> 对于session来说并没有上限，但出于对服务器端的性能考虑，session内不要存放过多的东西，并且设置session删除机制。

#### 3、存储方式不同

> cookie中只能保管ASCII字符串，并需要通过编码方式存储为Unicode字符或者二进制数据。

> session中能够存储任何类型的数据，包括且不限于string，integer，list，map等。

#### 4、隐私策略不同

> cookie对客户端是可见的，别有用心的人可以分析存放在本地的cookie并进行cookie欺骗，所以它是不安全的。

> session存储在服务器上，对客户端是透明对，不存在敏感信息泄漏的风险。

#### 5、有效期上不同

> 开发可以通过设置cookie的属性，达到使cookie长期有效的效果。

> session依赖于名为JSESSIONID的cookie，而cookie JSESSIONID的过期时间默认为-1，只需关闭窗口该session就会失效，因而session不能达到长期有效的效果。

#### 6、服务器压力不同

> cookie保管在客户端，不占用服务器资源。对于并发用户十分多的网站，cookie是很好的选择。

> session是保管在服务器端的，每个用户都会产生一个session。假如并发访问的用户十分多，会产生十分多的session，耗费大量的内存。

#### 7、浏览器支持不同

假如客户端浏览器不支持cookie：

> cookie是需要客户端浏览器支持的，假如客户端禁用了cookie，或者不支持cookie，则会话跟踪会失效。关于WAP上的应用，常规的cookie就派不上用场了。

> 运用session需要使用URL地址重写的方式。一切用到session程序的URL都要进行URL地址重写，否则session会话跟踪还会失效。

假如客户端支持cookie：

> cookie既能够设为本浏览器窗口以及子窗口内有效，也能够设为一切窗口内有效。

> session只能在本窗口以及子窗口内有效。

#### 8、跨域支持上不同

> cookie支持跨域名访问。

> session不支持跨域名访问。









