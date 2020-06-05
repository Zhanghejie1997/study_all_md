# 异步对象——promise之后的

## Generator——*函数

一个是星号`*`一个是`yield`暂停当前 并把之后的 当成返回值；他跟执行方法一样，都是普通函数，但是第一次需要执行，就是.next。`let fn=函数(); fn.next()`这样才是第一次执行。

注重：

​		`*`:标识为函数体上，并且不能使用new

​		`yield` :暂停当前 并把之后的 当成返回值；如果yield在表达式中，那么在下次调用的的next中需要给参数

​		`.next()`  执行时候需要使用方法才可以开始。如果yield在表达式中，那么在下次调用的的next中需要给参数

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}
n
var b = foo(5);  //设置x=5
b.next() // { value:6, done:false } //开始执行，把yield (x+1) 中的x+1 返回，
b.next(12) // { value:8, done:false }   //继续执行，把 2 * yield(x+1) 中这个设置为2*12；y=24 在返回yield (y/3) 等于8 
b.next(13) // { value:42, done:true } //继续执行，在z = yield (y/3) 中替换为z=13 加之前的数值
```

```javascript
//使用for
function *foo() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
    yield* foo2();
}
function *foo2() {
	yield 5;
	yield 6;
}
for(let i of foo()) {
	console.log(i);  //结果 1 2 3 4 5 6
}
```



## `async/await`

```javascript
  function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  }
  function You() {
    console.log(new Date());
    return new Promise((resolev,reject)=>{
      setTimeout(() => {
        resolev()
      }, 3000);
    }).then(res=>{return 'You res'},err=>{return 'err'})
  }
  function My() {
    console.log(new Date());
    return new Promise((resolev,reject)=>{
      setTimeout(() => {
        resolev()
      }, 3000);
    }).then(res=>{return 'My res'},err=>{return 'err'})
  }
  async function Toasync() {
    let a = await You();
    let b = await My();
    console.log('213',b,a);

    return 'Toasync';
  }
  Toasync()
```

