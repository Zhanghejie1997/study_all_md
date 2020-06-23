# this的绑定——上下文和引导对象调用

this的使用场景：函数中使用。

## 绑定设置种类

- 默认绑定
- 隐式绑定
- 显式绑定
- new绑定
- 箭头函数绑定详解

## 默认绑定

就是函数调用，默认绑定window，例子

```javascript
function show(back) {
  console.log(this);//window;
  child();
  back();//调用使用 打印的this还是window
}
function child() {
  console.log(this);//window;
}
var object = {
  show: function () {
    console.log(this);
  }
}
show(object.show);
```

### 注意严格模式下——this的不指向window

```javascript
function fn() {
    console.log(this); //window
    console.log(this.name);
};

function fn1() {
    "use strict";
    console.log(this); //undefined
    console.log(this.name);
};

var name = '听风是风';

fn(); 
fn1() //TypeError: Cannot read property 'a' of undefined
```

```javascript
"use strict";
var name = '听风是风';
function fn() {
    console.log(this); //undefined
    console.log(this.name);//报错
};
fn();
```

最后一点，如果在严格模式下调用不在严格模式中的函数，并不会影响this指向，来看最后一个例子：

```
var name = '听风是风';
function fn() {
    console.log(this); //window
    console.log(this.name); //听风是风
};

(function () {
    "use strict";
    fn();
}());
```

## 隐式绑定

什么是隐式绑定呢，如果函数调用时，前面存在调用它的对象，那么this就会隐式绑定到这个对象上，比如 a.show()  隐式绑定this对象为a

特性一:函数调用时，前面存在调用它的对象，那么this就会隐式绑定到这个对象上

```javascript
function show(back) {
  console.log(this);//window;
  child();
  back();//调用使用 打印的this还是window
}
function child() {
  console.log(this);//window;
  
  object.show() //object //--------------隐式绑定---------------
	
}
var object = {
  show: function () {
    console.log(this);
  }
}
show(object.show);
```

特性二：如果函数调用前存在多个对象，this指向距离调用自己最近的对象，比如这样：

```
function fn() {
    console.log(this.name);
};
let obj = {
    name: '行星飞行',
    func: fn,
};
let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //行星飞行

//-----如果 obj.name 删除它呢
function fn() {
    console.log(this.name);
};
let obj = {
    func: fn,
};
let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //undefined
```

特性三:作用域链和原型链弄混淆了,两原型链并不相同,由于obj未提供name属性，所以是undefined。

```javascript
function Fn() {};
Fn.prototype.name = '时间跳跃';

function fn() {
    console.log(this.name);
};

let obj = new Fn();
obj.func = fn;

let obj1 = {
    name: '听风是风',
    o: obj
};
obj1.o.func() //时间跳跃
//这里输出时间跳跃，虽然obj对象并没有name属性，但顺着原型链，找到了产生自己的构造函数Fn，由于Fn原型链存在name属性，所以输出时间跳跃了。

```

特性四：隐式绑定丢失，因为是传递方法，再调用，这里对param()  使用就是普通的函数调用，使用默认绑定的this就是全局的window

```
var name = '行星飞行';
let obj = {
    name: '听风是风',
    fn: function () {
        console.log(this.name);
    }
};

function fn1(param) {
    param();
};
fn1(obj.fn);//行星飞行
```

## 显式绑定

显式绑定是指我们通过call、apply以及bind方法改变this的行为，相比隐式绑定，我们能清楚的感知 this 指向变化过程。来看个例子：

```
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
let obj3 = {
    name: 'echo'
}
var name = '行星飞行';

function fn() {
    console.log(this.name);
};
fn(); //行星飞行
fn.call(obj1); //听风是风
fn.apply(obj2); //时间跳跃
fn.bind(obj3)(); //echo
```



```
let obj = {
    name: '听风是风'
};

[1, 2, 3].forEach(function () {
    console.log(this.name);//听风是风*3
}, obj);
```

## new绑定

使用new，会强行指向当前

```
function Fn(){
    this.name = '听风是风';
};
let echo = new Fn();
echo.name//听风是风

//-----new和显示不能同时存在
function Fn(){
    this.name = '听风是风';
};
let obj = {
    name:'行星飞行'
}
let echo = new Fn().call(obj);//报错 call is not a function
```

这里存在一个new和普通调用。

```
function Fn(){
  var start = Date.now();
  this.num = 0;  //普通调用，就是再window下生成一个num。如果是当作构造函数调用，则再内部生成num
  this.timer1 = setInterval(function () {  //是使用setInterval ，则函数是回调函数，是指向window，且放入宏任务中
    this.num++; 
    var gap = Date.now()-start;
    console.log('t1',this.num,gap);
    
  },900)  
  sleep(1000);//需要执行1000ms
  this.timer2 = setTimeout(()=> {
    this.num++;
    var gap = Date.now()-start;
    console.log('t2',this.num,gap);
  },0)
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
//第一个例子
new Fn()
Fn();
//第二个例子  ，结果不一样
Fn()
new Fn();
```



## 绑定等级

显式绑定 > 隐式绑定 > 默认绑定

new绑定 > 隐式绑定 > 默认绑定

为什么显式绑定不和new绑定比较呢？因为不存在这种绑定同时生效的情景，如果同时写这两种代码会直接抛错，所以大家只用记住上面的规律即可。

## 箭头函数的this

ES6的箭头函数是另类的存在，为什么要单独说呢，这是因为箭头函数中的this不适用上面介绍的四种绑定规则。

准确来说，箭头函数中没有this，箭头函数的this指向取决于外层作用域中的this，外层作用域或函数的this指向谁，箭头函数中的this便指向谁。有点吃软饭的嫌疑，一点都不硬朗，我们来看个例子：

```
function fn() {
    return () => {
        console.log(this.name);
    };
}
let obj1 = {
    name: '听风是风'
};
let obj2 = {
    name: '时间跳跃'
};
let bar = fn.call(obj1); // fn this指向obj1
bar.call(obj2); //听风是风
```

特性1：一旦箭头函数的this绑定成功，也无法被再次修改

## 总结

在this绑定的时候，如果有new和箭头函数，则有限，不然就是理他最近的调用对象，如果没写则是window，如果是使用数组，或者对象触发，都需要 `变量.方法()` ,调用就确定了this指向，如果没有() 则只是返回这个函数了不是使用。

# 补充

**番外------作用域链与原型链的区别：**

当访问一个变量时，解释器会先在当前作用域查找标识符，如果没有找到就去父作用域找，作用域链顶端是全局对象window，如果window都没有这个变量则报错。

当在对象上访问某属性时，首选i会查找当前对象，如果没有就顺着原型链往上找，原型链顶端是null，如果全程都没找到则返一个undefined，而不是报错。

**番外-----call、apply与bind有什么区别？**

1.call、apply与bind都用于改变this绑定，但call、apply在改变this指向的同时还会执行函数，而bind在改变this后是返回一个全新的boundFcuntion绑定函数，这也是为什么上方例子中bind后还加了一对括号 ()的原因。

2.bind属于硬绑定，返回的 boundFunction 的 this 指向无法再次通过bind、apply或 call 修改；call与apply的绑定只适用当前调用，调用完就没了，下次要用还得再次绑。

3.call与apply功能完全相同，唯一不同的是call方法传递函数调用形参是以散列形式，而apply方法的形参是一个数组。在传参的情况下，call的性能要高于apply，因为apply在执行时还要多一步解析数组。

