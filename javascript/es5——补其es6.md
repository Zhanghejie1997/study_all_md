# es5——补其es6

- ES5 : 09年发布
- ES6(ES2015) : 15年发布, 也称为ECMA2015
- ES7(ES2016) : 16年发布, 也称为ECMA2016 (变化不大)
- ES8(ES2020) : 2020发布了

## es5严格模式

```javascript
"use strict";
```

## es5输出

使用 window.alert() 写入警告框

使用 document.write() 写入 HTML 输出

使用 innerHTML 写入 HTML 元素

使用 console.log() 写入浏览器控制台

## JSON 对象方法

全局对象JSON，对其进行序列化**`JSON.parse(text [, reviver])`**,反序列化**`JSON.stringfity`**,就是字符串转成json对象。

注意必须是`双引号`，不然报错

- **`JSON.parse(text [, reviver])`**

```javascript
var result = JSON.parse('{"a": 1, "b": "2"}', function(key, value){
  if (typeof value == 'string'){
    return parseInt(value);
  } else {
    return value; 
  }
})

>> result.b
2
```

第二参数比较坑

```
//reviver函数是会执行n个属性+自己本身，就是说，上面{a:1,b:2},它会执行3吃reviver函数，最后一次key为'' ,value为整个对象，类型是Object。
//所以会出现被覆盖问题，所以reviver函数最好针对其修改的类型进行修改，非此类型这return value.
```

- **`JSON.stringify(value [, replacer [, space]])`**

  replacer 相当于过滤器，添加到白名单，再输出到c的是否只选择replacer中存在的对象key,并按照其replacer对象顺序输出，由于它生成的对象顺序是无序的，可以`JSON.stringify(obj, Object.keys(obj).sort())`就可以成为有序，nuber就是再生成出字符串的时候对象key前面有多少个空格。

  ```
   let b={"a":1,"b":2,"c":3};
   let c=JSON.stringify(b,['b','a'],nuber); 
   console.log(c);
  ```

  

## Object  添加的新方法

- `Object.getPrototypeOf (object)`访问原型

- `Object.getOwnPropertyNames(object)` 以数组返回所有属性

- `Object.getOwnPropertyDescriptor(object, property)`

- `Object.create`   创建一个新对象

- `Object.defineProperty(object, property, descriptor)`  // 添加或更改对象属性

  ```javascript
  var cat = {};
  
  Object.defineProperty(cat, "name", {
    value: "Maru",
    writable: false,
    enumerable: true,
    configurable: false
  });
  
  Object.defineProperty(cat, "skill", {
    value: "exploring boxes",
    writable: true,
    enumerable: true,
    configurable: true
  });
  ```

  

  ```javascript
  //descriptor对象的配置
  {
      writable : true      // 属性值可修改
      enumerable : true    // 属性可枚举
      configurable : true  // 属性可重新配置
      writable : false     // 属性值不可修改
      enumerable : false   // 属性不可枚举
      configurable : false // 属性不可重新配置
      // 定义 getter
      get: function() { return language }  //重新指定获取对象
      // 定义 setter
      set: function(value) { language = value } //重新指定赋值对象
  }
  ```

  

- `Object.defineProperties(object, descriptors)`

- Object.seal(object)` 防止更改对象属性（而不是值）

- `Object.freeze `   防止对对象进行任何更改

- `Object.preventExtensions(object)`  阻止向对象添加属性

- `Object.isSealed(object)`  如果对象被密封，则返回 true

- `Object.isFrozen(object) `  如果对象被冻结，则返回 true

- `Object.isExtensible(object)` 如果可将属性添加到对象，则返回 true

- `Object.keys(object)` 以数组返回所有可枚举的属性

## Array 数组添加的新属性

- `Array.prototype.indexOf`
- `Array.prototype.lastIndexOf`
- `Array.prototype.every`
- `Array.prototype.some`
- `Array.prototype.forEach`
- `Array.prototype.map`
- `Array.prototype.filter`
- `Array.prototype.reduce`
- `Array.prototype.reduceRight`

## String 字符串的方法

- `length()`   返回字符串长度
- `indexOf(str[,index])`  从左往右第index下标开始默认0，查询是否有相同字符串，存在返回下标
- `lastIndexOf(str[,index])`  从右往左index下标开始默认0，查询是否有相同字符串，存在返回下标
- `search([正则表达式])`   可以放正则表达式 

## HTML事件

配合监听使用

| 事件        | 描述                         |
| ----------- | ---------------------------- |
| onclick     | 用户点击了 HTML 元素         |
| onmouseover | 用户把鼠标移动到 HTML 元素上 |
| onmouseout  | 用户把鼠标移开 HTML 元素     |
| onkeydown   | 用户按下键盘按键             |
| onload      | 浏览器已经完成页面加载       |
| onchange    | HTML 元素已被改变            |

## 语句块

针对于语句块，会自动添加分号

```
//-----例子1----
let a = 3
let b = 3
//-----等于-----
let a = 3;
let b = 3;

//----例子2----
function add(a,b){
	return 
		a+b
}
//-----等同于----
function add(a,b){
	return ;//返回undefined
	a+b;  //永远不执行
}
```

## this 的指向问题

this指向调用它最近的对象，window是一个最大的对象。

```
var number = 2;
var obj ={
	number:1,
	show:function(){
		return console.log( this.number)
	}
}
let numberShow = obj.show;  ///注意，这个是获取其方法，加括号则是执行方法，在它之上的就是最大的window
console.log(numbershow);

numberShow()
obj.show()
```

修改this指向的方法:

- `fn.call(Object,item,items)`  //接受this指向对象，接受n个对象
- `fn.apply(Object,[item,item,item])`  //接受this指向的对象，接受一个数组
- `fn.Bind(Object,item)`  //接受this指向的对象，接受item，当接受的参数匹配fn所需要的参数时候执行，就是说fn(a,b)，但是现在fn.bind(t,1),它不会执行，需要在给他一个参数才执行，也就是函数柯里化。

## 闭包

老生常谈，神奇的var配合闭包

```
var a = 1;
function fnc = (a,b=()=>a){
	var a ;
	var c = a;
	a = 2;
	console.log(a,b(),c) ; //这里由于var重复声明，但是没赋值，所以fnc不存在this.a  这里产生了闭包
	//2 1 1
}
fnc(a);
```



## 提示

关于方法和对象

```javascript
var objec = {
	off:function (){
		return 3;
	}
}
var off = object.off;  //得到是方法 /可以off()执行。
var Off = object.off(); //得到是3
```

