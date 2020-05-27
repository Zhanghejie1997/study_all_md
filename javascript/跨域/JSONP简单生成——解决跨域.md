# JSONP简单生成——解决跨域

它只能解决get请求问题。

JSONP的原理就不细说了，就是利用script可以跨域的特点来实现跨域，首先我们考虑一个最简单的jsonp，就是简简单单创建script标签，
添加url的功能，如下：

```
function jsonp(url) {
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  document.body.appendChild(script);
}
```

此时我们使用服务端的代码如下：

```
const http = require('http');
const data = {'data':'hello'};
const url = require('url');
const queryString = require('querystring');

http.createServer(function(req, res) {
  var params = url.parse(req.url);
  console.log(params);
  if(params.query && queryString.parse(params.query).callback) {
    console.log(1231232);
    const str = queryString.parse(params.query).callback + '(' + JSON.stringify(data) + ')';
    return res.end(str)
  }
  res.end(JSON.stringify(data));
}).listen(5000);
```

这是我们调用jsonp，假设我们只是想要alert出返回的数据，如下：

```
function msg(res) {
  alert(res.data);
}

jsonp('http://localhost:5000?callback=msg');
```

这时候我们运行代码可以发现已经正确弹出了相应的数据。
但是我们会发现这里的callback回调函数是一个全局的，这是不可取的，因此我们需要进行一些修改，将处理修改为一个局部的，我们可以将其作为一个回调函数来处理，如下：

```
function jsonp(url, callback) {
  window.jsonpCallback = callback;
  const script = document.createElement('script');
  script.src = url + '?callback=jsonpCallback';
  script.type = 'text/javascript';
  document.body.appendChild(script);
}

jsonp('http://localhost:5000', function(res) {
  alert(res.data);
});
```

这时候我们会发现我们不再需要在url中声明相应的callback了，但是我们还是会发现一个问题，就是我们将所有的callback都设置成了一个全局变量，这样的原因是因为我们需要在数据请求完成之后调用这个方法，因此不得不设置为一个全局变量。但是当我们有多个请求，并且每个请求的处理都是不一样的时候，这个变量将会被覆盖。这是不行的，因此我们应该为每一次请求设置一个唯一且不会冲突的变量，因此增加一个生成callback名字的方法如下：

```
function generateJsonpCallback() {
  return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function jsonp(url, callback) {
  const funcName = generateJsonpCallback();
  window[funcName] = callback;
  const script = document.createElement('script');
  script.src = `${url}?callback=${funcName}`;
  script.type = 'text/javascript';
  document.body.appendChild(script);
}


jsonp('http://localhost:5000', function(res) {
  alert(res.data);
});

jsonp('http://localhost:5000', function(res) {
  const text = document.createTextNode(res.data);
  document.body.appendChild(text);
});
```

这时候我们会发现我们已经利用了一个类似于随机ID的形式完成了多次请求。
但是还是有一个问题大量的请求之后，window中会含有大量的全局变量，而且还有大量的script标签，这显然不是我们想要的，所以我们可以在请求完成之后删除变量和script标签。

```
function generateJsonpCallback() {
  return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function removeScript(id) {
  document.body.removeChild(document.getElementById(id));
}

function removeFunc(name) {
  delete window[name];
}

function jsonp(url, timeout = 3000, callback) {
  const funcName = generateJsonpCallback();
  window[funcName] = callback;
  const script = document.createElement('script');
  script.src = `${url}?callback=${funcName}`;
  script.id = funcName;
  script.type = 'text/javascript';
  document.body.appendChild(script);
  setTimeout(() => {
    removeScript(funcName);
    removeFunc(funcName);
  }, timeout)
}


jsonp('http://localhost:5000', 3000, function(res) {
  alert(res.data);
});

jsonp('http://localhost:5000', 3000, function(res) {
  const text = document.createTextNode(res.data);
  document.body.appendChild(text);
});
```

我们通过将利用一个timeout时间定时为我们清除相应的script标签和全局变量就可以了，这个定时时间的作用类似于ajax的timeout时间。
我们所有的内容都是使用es6的，那为什么不使用Promise来处理呢，还要使用烦人的回调，接下来那就来Promise化吧。

```
function jsonp(url, options = {timeout:3000}) {
  const timeout = options.timeout;
  return new Promise((resolve, reject) => {
    const funcName = generateJsonpCallback();
    window[funcName] = (res) => {
      resolve(res);
      setTimeout(() => {
        removeScript(funcName);
        removeFunc(funcName);
      }, timeout)
    };
    const script = document.createElement('script');
    script.src = `${url}?callback=${funcName}`;
    script.id = funcName;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  })
}
```

调用只需要如下就可以了

```
jsonp('http://localhost:5000').then((res) => alert(res.data));

jsonp('http://localhost:5000').then((res) => {
  const text = document.createTextNode(res.data);
  document.body.appendChild(text);
});
```

到目前为止，一个较为完整的jsonp就实现了，但是我们还是会觉得少了一些什么，相信你已经看出来了，那就是错误处理。
迄今为止，并没有测试过如果这个script标签加载不成功如何处理，判断资源加载失败，显然使用的是onerror事件，我们这就把他加上：

```
function jsonp(url, options = {timeout:3000}) {
  const timeout = options.timeout;
  let timeId;
  return new Promise((resolve, reject) => {
    const funcName = generateJsonpCallback();
    window[funcName] = (res) => {
      resolve(res);
      timeId = setTimeout(() => {
        removeScript(funcName);
        removeFunc(funcName);
      }, timeout)
    };
    const script = document.createElement('script');
    script.src = `${url}?callback=${funcName}`;
    script.id = funcName;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    script.onerror = () => {
      reject(new Error(`fetch ${url} failed`));
      removeScript(funcName);
      removeFunc(funcName);
      if(timeId) clearTimeout(timeId);
    }
  })
}
```

我们可以测试一下，输入一个不存在的url:

```
jsonp('http://localhost:7000').then((res) => alert(res.data));
```

可以发现这时正常处理错误了,可以在控制台看到相应的url获取失败，至此，完工；

至此所有的代码简单封装如下：

```
(function(global){
  function generateJsonpCallback() {
    return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  }

  function removeScript(id) {
    document.body.removeChild(document.getElementById(id));
  }

  function removeFunc(name) {
    delete global[name];
  }

  function jsonp(url, options = {timeout:3000}) {
    const timeout = options.timeout;
    let timeId;
    return new Promise((resolve, reject) => {
      const funcName = generateJsonpCallback();
      global[funcName] = (res) => {
        resolve(res);
        timeId = setTimeout(() => {
          removeScript(funcName);
          removeFunc(funcName);
        }, timeout)
      };
      const script = document.createElement('script');
      script.src = `${url}?callback=${funcName}`;
      script.id = funcName;
      script.type = 'text/javascript';
      document.body.appendChild(script);
      script.onerror = () => {
        reject(new Error(`fetch ${url} failed`));
        removeScript(funcName);
        removeFunc(funcName);
        if(timeId) clearTimeout(timeId);
      }
    })
  }
  window.jsonp = jsonp;
})(window);
```

测试代码如下：

```
jsonp('http://localhost:5000').then((res) => alert(res.data));

jsonp('http://localhost:5000').then((res) => {
  const text = document.createTextNode(res.data);
  document.body.appendChild(text);
});

jsonp('http://localhost:7000').then((res) => alert(res.data));
```

[参考](https://segmentfault.com/a/1190000011402543)