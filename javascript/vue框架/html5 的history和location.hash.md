# html5 的history和location

### history的对象

history对象是window.history属性

具有属性和方法

```
{
    state:'',   //返回一个表示历史堆栈顶部的状态的值。一种可以不必等待popstate 事件而查看状态的方式。
    length:0,    //返回浏览器历史列表中的 URL 数量。
    back(),        //加载 history 列表中的前一个 URL。
    forward(),    //加载 history 列表中的下一个 URL。
    go(),         //加载 history 列表中的某个具体页面。history.go(-2)单击两次后退按钮执行的操作一样
    pushState(date,title,url),     //新建一个访问历史
    //一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL
    //其中url会因为同源问题才可以进行，不会导致浏览器加载，不触发事件，只是新建一个网页j记录，所以popstate事件不触发
    //date序列化后大于640k的状态对象，该方法会抛出异常。
    replaceState(date,title,url) //修改当前的的页面state
}
```

使用例子：

```
let stateObj = {
    foo: "bar",
};
history.pushState(stateObj, "page 2", "bar.html");
history.replaceState(stateObj, "page 3", "bar2.html");
```

上面除了state其他会发送给window 触发popstate的事件，当前历史记录条目由于用户导航站点或以编程方式遍历的历史记录而发生更改时发生。

可以监听window的popstate

```
window.addEventListener('popState',()=>{
    console.log(history.state)
})
```

**问题**

由于是虚拟的网站，再点击刷新的时候会出现404，因为只是修改了网站的显示地址。

### location对象

管理地址栏的内置对象,**Location 接口**不继承任何属性，但是实现了那些来自 URLUtils 的属性。

属性方法有

```
{
    hash        //设置或返回从井号 (#) 开始的 URL（锚）。
    host        //设置或返回主机名和当前 URL 的端口号。
    hostname    //设置或返回当前 URL 的主机名。
    href        //设置或返回完整的 URL。
    pathname    //设置或返回当前 URL 的路径部分。
    port        //设置或返回当前 URL 的端口号。
    protocol    //设置或返回当前 URL 的协议。
    search        //设置或返回从问号 (?) 开始的 URL（查询部分）。
    assign()    //加载新的文档。
    reload()    //重新加载当前文档。
    replace()    //用新的文档替换当前文档。
}
```

例子

```
var url = document.createElement('a');
url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // (blank - https assumes port 443)
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org
```

对location.hash修改不会刷新页面，

```
<html>
<a href="#/home"> 首页</a> //#表示hash
<a href="#/about"> 关于</a>
</html>
```

问题：search和hash不能换位置，会导致读取不到，先search再hash

```
?date=3#dd  //可以读取
#dd?date=3  //读取不到seatch，且seatch会在hash中
```