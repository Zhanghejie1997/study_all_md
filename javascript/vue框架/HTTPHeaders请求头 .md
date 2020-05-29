[详细可观看我幕布的](https://mubu.com/doc/explore/31546 "详细可观看我幕布的")
//过于复杂的多代整理
Genaral headers
同时适用于请求和响应消息，但与最终消息传输的数据无关的消息头。
	Cache-Control——控制缓存的行为
	控制缓存中的是否有效，有个毫秒数，大于0则有效，下回请求可以直接from disk cache获取
	Connection——决定当前的事务完成后，是否会关闭网络连接
	Date——创建报文的日期时间
	Keep-Alive——用来设置超时时长和最大请求数
	Via——代理服务器的相关信息
	Warning——错误通知
	Trailer——允许发送方在分块发送的消息后面添加额外的元信息
	Transfer-Encoding——指定报文主体的传输编码方式
	Upgrade——升级为其他协议
Request Headers
	包含更多有关要获取的资源或客户端本身信息的消息头。
	Accept——客户端可以处理的内容类型
	Accept-Charset——客户端可以处理的字符集类型
	Accept-Encoding——客户端能够理解的内容编码方式；
	Accept-Language——客户端可以理解的自然语言
	Authorization——Web 认证信息
	Cookie——通过Set-Cookie设置的值；
	Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器之后向同一服务器再次发起请求时自动被携带上，用于告知服务端两个请求是否来自同一浏览器。由于之后每次请求都会需要携带 Cookie 数据，因此会带来额外的性能开销（尤其是在移动环境下）。
	DNT——表明用户对于网站追踪的偏好
	From——用户的电子邮箱地址
	Host——请求资源所在服务器
	If-Match——比较实体标记（ETag）
	If-Modified-Since——比较资源的更新时间
	If-None-Match——比较实体标记（与 If-Match 相反）
	If-Range——资源未更新时发送实体 Byte 的范围请求
	If-Unmodified-Since——比较资源的更新时间（与 If-Modified-Since 相反）
	Origin——表明了请求来自于哪个站点；
	Proxy-Authorization——代理服务器要求客户端的认证信息
	Range——实体的字节范围请求
	Referer——对请求中 URI 的原始获取方
	TE——指定用户代理希望使用的传输编码类型
	Upgrade-Insecure-Requests——表示客户端优先选择加密及带有身份验证的响应
	User-Agent——浏览器信息
Response Headers
	包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
	Accept-Ranges——是否接受字节范围请求
	Age——消息对象在缓存代理中存贮的时长，以秒为单位
	Clear-Site-Data——表示清除当前请求网站有关的浏览器数据（cookie，存储，缓存）
	Content-Security-Policy——允许站点管理者在指定的页面控制用户代理的资源
	Content-Security-Policy-Report-Only—— 详情
	ETag——资源的匹配信息；链接描述
	Location——令客户端重定向至指定 URI
	Proxy-Authenticate——代理服务器对客户端的认证信息
	Public-Key-Pins——包含该Web 服务器用来进行加密的 public key （公钥）信息
	Public-Key-Pins-Report-Only——设置在公钥固定不匹配时，发送错误信息到report-uri
	Referrer-Policy——用来监管哪些访问来源信息——会在 Referer 中发送
	Server——HTTP 服务器的安装信息
	Set-Cookie——服务器端向客户端发送 cookie
	Strict-Transport-Security——它告诉浏览器只能通过HTTPS访问当前资源
	Timing-Allow-Origin——用于指定特定站点，以允许其访问Resource Timing API提供的相关信息
	Tk——显示了对相应请求的跟踪情况
	Vary——服务器缓存的管理信息
	WWW-Authenticate——定义了使用何种验证方式去获取对资源的连接
	X-XSS-Protection——当检测到跨站脚本攻击 (XSS)时，浏览器将停止加载页面
Entity Headers
	包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。
	HTTP状态码
	1XX    #信息性状态码
	接收的请求正在处理
	100  #客户端可以发送或者忽略这个请求
	2XX   #成功状态码
	请求正常处理完毕
	200  #正常处理
	204  #正常处理返回报文不含实体主体内容
	206  #客户端进行了范围请求
	3XX  #重定向状态码
	需要进行附加操作完成请求
	301 #永久性重定向
	302  #临时性重定向
	303  #说明客户端需要用get方法获取资源
	304  #需要请求报文需要一些条件
	4XX   #客户端错误状态码
	服务器无法处理请求
	400 #请求语法有错
	401  #状态码需要认证
	403  #请求资源被拒绝
	404  #浏览器地址错误找不到资源
	5XX   #服务端错误状态码
	服务器处理请求出错
	500 #服务器执行报错
	503  #服务器暂时超负载
	HTTP认证方式
	BASIC 认证（基本认证）
	缺点:
	BASIC 认证虽然采用 Base64 编码方式，但这不是加密处理。不需要任何附加信息即可对其解码。换言之，由于明文解码后就是用户 ID和密码,在 HTTP 等非加密通信的线路上进行 BASIC 认证的过程中，如果被人窃听，被盗的可能性极高。
	DIGEST 认证（摘要认证）
	SSL 客户端认证
	FormBase 认证（基于表单认证）