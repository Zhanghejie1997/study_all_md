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





需要**注意**的一点是：在同一个上下文中，**总的执行顺序为同步代码—>microTask—>macroTask**[6]。这一块我们在下文中会讲。

浏览器中，一个事件循环里有很多个来自不同任务源的任务队列（task queues），每一个任务队列里的任务是严格按照**先进先出**的顺序执行的。但是，因为**浏览器自己调度**的关系，**不同任务队列的任务的执行顺序是不确定**的。

具体来说，浏览器会不**断从task队列中按顺序取task执行，每执行完一个task都会检查microtask队列是否为空**（执行完一个task的具体标志是函数执行栈为空），**如果不为空则会一次性执行完所有microtask**。然后再进入下一个循环去task队列中取下一个task执行，以此类推。





## 补充/在浏览器中和node.js中

如果在宏任务中创建了微任务就会优先执行微任务。换句话，就是每次执行完宏任务就会检查一下微任务是否有任务，有则执行。

在node.js中是完成当前所有任务再去执行。