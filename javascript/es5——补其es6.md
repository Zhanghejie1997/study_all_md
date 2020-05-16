breakes5——补其es6

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

- **查**

- `Array.prototype.indexOf(item[,start])`  查询数组中是否存在返回下标,从start下标开始  

- `Array.prototype.lastIndexOf(item[,start])`  从后向前查询，start负数就倒数开始算

- `Array.prototype.toString()` 输出未字符串

  **增删除**

- `Array.prototype.push(item)`   添加到数组尾巴

- `Array.prototype.pop(item) `   删除数组最后一位，并返回

- `Array.prototype.shift(item) `  添加到数组头部

- `Array.prototype.unshift(item)`  删除数组头部，并返回

- `Array.prototype.concat(arrs,arrs)`  //添加组合到当前数组中

  **改**

- `Array.prototype.slice(start,end)`  等同于`for(i=start;i<end;i++)`  截取从下标start到下标end(不包括),

- ``Array.prototype.splice(start,count,...items)`    拼接。从下标start开始删除，count个元素，之后添加`items`个数

  **排序**

- `Array.prototype.sort((a,b)=>{return a-b}) `  排序,`a-b`升序，`b-a`降序

- `Array.prototype.reverse() `  颠倒顺序

  **迭代器：**

- `Array.prototype.forEach((value,index,array)=>{})`迭代器  

- `Array.prototype.map((value,index,array)=>{return value}) ` 迭代器，但是会返回一个新数组,lenght长度一样

- `Array.prototype.filter((value,index,array)=>{return value>18})`  迭代器，生成一个新的对象，可以不一样，返回`ture`or`false`来判断时候需要。

- `Array.prototype.reduce(total,value,index,array)=>{return total},totalIndex)`  迭代器，total 是累计器，上一次的结果，totalInex是累计的初始值

- `Array.prototype.reduceRight(total,value,index,array)=>{return total},totalIndex)` 跟送上门一样，但是是数组从后向前循环

- `Array.prototype.every((value,index,array)=>{return value>18})`  监测，监测所有内容时候都大于18。结果是`and`

- `Array.prototype.some((value,index,array)=>{return value>18})`  监测，是否存在大于18； 结果使用or 

- `Array.prototype.find((value,index,array)=>{return value>18})`  返回第一个大于18的值，返回值未`ture`or `flase`

- `Array.prototype.findIndex((value,index,array)=>{return value>18})` //返回索引

## String 字符串的方法

- `String.prototype.length()`   返回字符串长度

- `String.prototype.indexOf(str[,index])`  从左往右第index下标开始默认0，查询是否有相同字符串，存在返回下标

- `String.prototype.lastIndexOf(str[,index])`  从右往左index下标开始默认0，查询是否有相同字符串，存在返回下标

  **改**

- `String.prototype.search([正则表达式],str)`   替换可以放正则表达式 ,替换成str

- `String.prototype.replace(oldstr,newstr)` 替换oldstr为newstr，返回新字符串，只改一个

- `String.prototype.toUpperCase()`  改大写

- `String.prototype.toLowerCase()`  改小写

- `String.prototype.slice(start[,end])` 从开始到终止，如果是负数就是从后数

- `String.prototype.substr(start[,count])` 从开始到count个，如果是负数就是从后数,返回的是截取后的新的字符串

- `String.prototype.substring(start[,end])`从开始到终止，**不接受负数**，返回截取后的字符串,不包含结束的索引的字符串

- `String.prototype.trim()` 替换空格

  **重组**

- `String.prototype.split(str,lenght)` 分割，返回最多lenght个数组，切割字符串以str分割

- `String.prototype.concat(str,strs)`,当前字符串连接多个字符串

  **获取**

- `String.prototype.charAt(position)`  返回下标为postition的字符

- `String.prototype.charCodeAt(position)` 返回定索引的字符 unicode 编码

## Number 数值

number精度是64位浮点数，且在小数计算时候会不精确，需要进行放大在缩小。

```javascript
var x = 0.2 + 0.1;         // x 将是 0.30000000000000004
var x = (0.2 * 10 + 0.1 * 10) / 10;       // x 将是 0.3
```

- 类型转换，在出现`+`的时候如果两端有一个是字符串，就会把数值默认转换为字符串，其他`*/-`则会把字符串转化为数值。

- 非法值NaN，如`var a = 1 / 'dd'` 这里除一个字符串，就会产生NaN非法值

- Infinity，`while(number != Infinity ){number *= 2}` 或者  `var num = 1/0` 结果就是Infinity

- `0x` 开头就是十六进制，`0xfff`

  方法

- `num.toString([number])`  转成字符串，且进制转化，`num.toString(进制数)`

- `num.toExponential(number)`   转为为指数，保留number位小数， `9.66e+2`

- `num.toFixed(number)`  返回指定位数的小数

- `num.toPrecision(number)` 返回指定一共保留多少位

- `str.valueOf()`

## 日期

```javascript
var date = new Date([year, month, day, hours, minutes, seconds,] milliseconds) //月份从0开始算，如果有两个参数，自动识别第二参数为秒。
var date = new Date(string) //str  =  "October 13, 2014 11:13:00"
var date = new Date("2018[-02-19[T12:00:00]]")  //iso日期
var date = new Date("MM/DD/YYYY|[YYYY/MM/DD]")  //短日期
var date = new Date("Feb 19 2018");//长日期
var date = new Date("Mon Feb 19 2018 06:55:23 GMT+0100 (W. Europe Standard Time)");//完整日期
```

​		**显示日期**

- `Date.prototype.toString()`  //Sat May 16 2020 10:02:38 GMT+0800 (中国标准时间)

- `Date.prototype.toUTCString() `  //17 Sat, 16 May 2020 02:02:38 GMT

- `Date.prototype.toDateString() ` //18 Sat May 16 2020

  **对应赋值就是set**

- `getDate()`	以数值返回天（1-31）

- `getDay()`	以数值获取周名（0-6）

- `getFullYear()`	获取四位的年（yyyy）

- `getHours()`	获取小时（0-23）

- `getMilliseconds()`	获取毫秒（0-999）

- `getMinutes()`	获取分（0-59）

- `getMonth()`	获取月（0-11）

- `getSeconds()`	获取秒（0-59）

- `getTime()`	获取时间（从 1970 年 1 月 1 日至今）

## Math对象

​		**属性**

- `Math.PI` 获取Π的值

- `ath.E`          返回欧拉指数（Euler's number）

- `Math.PI`         返回圆周率（PI）

- `Math.SQRT2`      返回 2 的平方根

- `Math.SQRT1_2`    返回 1/2 的平方根

- `Math.LN2`         返回 2 的自然对数

- `Math.LN10`       返回 10 的自然对数

- `Math.LOG2E`      返回以 2 为底的 e 的对数（约等于 1.414）

- `Math.LOG10E`     返回以 10 为底的 e 的对数（约等于0.434）

  **方法**

- `Math.round(number)`  四舍五入

- `Math.ceil(number)`  返回大于number的最小整数，负数也一样，比如3.2返回4，3.2返回-3

- `Math.floor` 返回不大于number的最大整数，负数也一样，比如3.2返回3，-3.2返回-4

- `Math.pow(x,y)` 返回x的y次幂

- `Math.sqrt(x)`  返回x的平方根

- `Math.abs(x)` 返回x的绝对值

- `Math.min(...arr)` 返回最小值

- `Math.max(...ar)` 返回最大值

- `Math.random()`  返回0-1随机数

  - ```javascript
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    ```

    

  **不怎么常用**

- `Math.sin(x)` 返回角 x（以弧度计）的正弦（介于 -1 与 1 之间的值）。

- `Math.cos(x) `

- `Math.tan(x)`

## Boolean 布尔类型

​		**方法**

- `Boolean(x)`  返回`true`or `false`

  **运算符号：** ==、<、>、===、&&、||、!、?:

  (&、|) 这两个是数值的字符内进行的与或，返回是数值

  **基本逻辑：** 具备真实就是`true`，比如是一个实例。不具备真实就是`false`。如:

  > console.log(Boolean(null));
  >
  > console.log(Boolean(undefined));
  >
  > console.log(Boolean(NaN));
  >
  > console.log(Boolean(0));
  >
  > console.log(Boolean(-0));
  >
  > console.log(Boolean(''));
  >
  > console.log(Boolean(""));
  >
  > console.log(Boolean());
  >
  > console.log(Boolean(false));

## 语句——判断or循环

```javascript
if(){

}
else if(){

} else{

}

switch(表达式){
	case 值:  //这里是===
		brack;
	case 值:
		brack;
    default:
        brack;
}
```

```javascript
innerloop:for (i = 0; i < 5; i++) {
     text += "数字是 " + i + "<br>";
}
for(let i in obj){}  //对象则对应key，数组对应value

innerloop:while(a>10){
    break; //退出整个循环
    continue ;//退出当前一次循环
    break innerloop; //退出innerloop整个循环
    continue  innerloop;//退出innerloop当前一次循环
}
do{
    
}while(a>10)
```

- 标签退出，对循环进行标签，`标签名:` 
- `break [标签名]`   退出当前整个循环体
- `continue [标签名]`   退出当前当前一次循环

## 类型转换

​		类型监测

- `typeof  变量`   返回是字符串。

  > NaN 的数据类型是数值
  >
  > 数组的数据类型是对象
  >
  > 日期的数据类型是对象
  >
  > null 的数据类型是对象
  >
  > 未定义变量的数据类型是 *undefined*
  >
  > 尚未赋值的变量的数据类型也是 *undefined*

- 

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

new一个也是对象

```javascript
let a = new Obj();
//----------等同于-------------
function Obj(){
    let _obj = {};
    Obj.call(_obj,arguments); //装填属性
    _obj.__proto__ = Obj.protyType;  //链接方法
    return _obj;  //返回的是一个对象，其方法内this的默认指向也就是_obj。
}
```



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

