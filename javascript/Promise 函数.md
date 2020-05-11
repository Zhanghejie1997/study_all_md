# Promise 函数

Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then、catch等，当主栈完成后，才会去调用resolvereject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。

```javascript
//源码
function needsResolver() {
  throw new TypeError(
    'You must pass a resolver function as the first argument to the promise constructor'
  );
}
function needsNew() {
  throw new TypeError(
    "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
  );
}
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}
```

- 接收一个参数`resolver`,并且参数类型必须为 Function 否则抛错`typeof resolver !== 'function' && needsResolver()`. 

- 初始化属性`_result``_state``_subscribers`值.

- 判断 this 是否来源于 Promise 构造函数(通过 new Promise() 创建的),如果是则调用函数`initializePromise(this, resolver)`.

  始化`_subscribers`属性,说明 Promise 使用了发布/订阅者模式.

  