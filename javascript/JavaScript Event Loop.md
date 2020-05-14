# JavaScript Event Loop 事件循环

javascript是一门单线程语言，他的异步和多线程的实现是通过event loop事件循环机制。

[动态过程](https://www.bilibili.com/video/BV1kf4y1U7Ln)

### 调用栈 call stack

​		遇见函数调用就压如栈中，被压入的函数叫做帧(Frame),等函数返回时候就弹出。

### 消息队列  Message Queue

​		存放定时器的函数体，当触发时间触发完成才会放入消息队列。

### 微任务队列  Microtask Queue

​		用来存放promise().then()的then之类的函数体。



例子

```javascript
var  p = new Promise(resolve=>{
	console.log(4);
	resolve(5);
})
function func1(){
	console.log(3);
}
function func2(){
	seTimeout(()=>{
		console.log(2);
	})
	func1();
	console.log(3);
	p.then(resolved=>{
		console.log(resolved);
	}).then(()=>{
		console.log(6);
	})
}
func2();
```

首先将要new Promise 压入 **调用栈** ，

把函数体内的console.log(4) **压入栈中执行并弹出**；

把函数体内的resolve(5) 压入栈中执行并弹出；

**调用栈弹出**new Promise ；

再把func2() 压入**调用栈**中，把seTimeout，压入**调用栈**中，

把匿名函数内的console.log(2)，加入**消息队列**，

**调用栈弹出**seTimeout，

把func1()压入**调用栈**中;把console.log(3);) 压入栈中执行并弹出；

再把**调用栈弹出**func1()

再把console.log(3);压入栈中执行并弹出；

会把p.then的回调函数内容添加到**微任务队列**中。

**调用栈弹出**func2;

**此时调用栈为空，开始执行微任务队列内容，再执行消息队列内容**



## 总结

调用栈>微任务>消息队列咯

## 标注

浏览器由很多模块组成，有解析html和css的模块，有解析js的模块，有定时器模块，有ajax模块。其中v8引擎就是用来解析js的，js是单线程是因为v8引擎是单线程，当v8引擎解析到异步代码时，比如定时器，就会把异步代码交给相关的模块处理，处理完之后，再交给事件队列中排队，当执行栈有空时，消息队列就把事件交给调用栈执行。拿定时器来说，当v8引擎从上往下执行代码，读到定时器的时候。就会把定时器交给定时器模块处理，然后v8引擎继续执行代码，定时器模块会计时，当时间到了，就会把任务交给事件队列，当执行栈有空闲时，事件队列就会把任务推给执行栈，执行栈执行完毕之后将其弹出。