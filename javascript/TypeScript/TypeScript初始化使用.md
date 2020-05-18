# TypeScript初始化使用

## 安装
`npm install -g typescript`

概念：TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

使用vue脚手架配置一下也可以。

`vue add @vue/typescript`  yyyy

- [vue-class-component](https://github.com/vuejs/vue-class-component)：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)：在 `vue-class-component` 上增强更多的结合 Vue 特性的装饰器
- [ts-loader](https://github.com/TypeStrong/ts-loader)：TypeScript 为 Webpack 提供了 `ts-loader`，其实就是为了让webpack识别 .ts .tsx文件
- [tslint-loader](https://github.com/wbuchwalter/tslint-loader)跟[tslint](https://github.com/palantir/tslint)：我想你也会在`.ts` `.tsx`文件 约束代码格式（作用等同于eslint）
- [tslint-config-standard](https://github.com/blakeembrey/tslint-config-standard)：`tslint` 配置 `standard`风格的约束
- 

react也有脚手架。



# 数据类型

注意使用构造器创造的不一定是对应的数据类型。`let bool:boolean = new Boolean(1)`这是一个Boolean对象。

## 原始数据类型（Primitive data types）

### 数据类型

- `any`  任意类型，默认、未指定类型就是任意类型，类型推论（定义的时候赋值，值是什么类就是什么类）

   格式   `let   number[:number[|string]]`   可支持联合类型，就可以接受多种类型

   `let number:number = 1`   `let string :string = 'str'`

- `boolean`   布尔类型

- `number`  数值类型 

   其中 `0b1010` 和 `0o744` 是 [ES6 中的二进制和八进制表示法](http://es6.ruanyifeng.com/#docs/number#二进制和八进制表示法)，它们会被编译为十进制数字。

- `string `  字符串  使用`` 包裹，中间使用${变量}实现嵌入。

- `void`  表示空值，没有返回值，只能赋值`undefined` 和 `null`，不能赋值给别的对象

   ```typescript
   function alertName(): void {
       alert('My name is Tom');
   }
   let unusable: void = undefined;
   ```

- `null`  空对象   跟void不同，null和undefined是所有的子类，就是可以赋值给number对象或者别的对象。

- `undefined`   未赋值

## 元组

定义数组的时候

`let arr: number[]`

`let arr:[number,string] = [1,'2']`,设置其arr为数组，但是接受类型为number，string按顺序，不可多不可少

## enum枚举

```typescript
enum name {  //定义
	up, //0
	dowm,  //1
	left,  //2
	right
}

enum name day  ;//实例化day
    
enum Days {Sun = 7, Mon = 8 , Tue, Wed, Thu, Fri, Sat};//手动赋值
```

```typescript
const enum Directions {  //参数枚举
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
//---编译结果
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```



### 联合类型

-  可支持联合类型，就可以接受多种类型

   ```typescript
   function getString(something: string | number): string {
       return something.length; //报错，因为number没有length，不是共有属性
       return something.toString(); //不报错，因为两个类型都有这个属性。
   }
   ```

   ```typescript
   let myFavoriteNumber: string | number;
   myFavoriteNumber = 'seven';  //推断它为string类型
   console.log(myFavoriteNumber.length); // 5
   myFavoriteNumber = 7;         //推断它为number类型
   console.log(myFavoriteNumber.length); // 编译时报错
   ```

   

### 对象接口：interface 

关键词`interface` 定义接口，添加为接口类，默认属性个数不能多，不能少，类型相同。不是真实的类，是typescript定义的接口

```typescript
interface Obj{ //定义对象接口
	name: string,
    age?: number,   //？问好表示可选择，就是可以有可以没有
    [propName: string]: any;   //可以别的属性
}
let obj: Obj = {  //继承 
    name: 'title',
    age: 1
}
```

#### 可选属性：？

再定义的时候变量名后加问好 `?`

#### 任意属性： [propName: string]

 ` [propName: string]: any;`  

//注意，任意属性也包括可选属性,也就是说如果可选属性是string，那任意属性也要有string

#### 只读属性：readonly  

`readonly  id : number`  在变量前添加关键字 `readonly  `，只能在初始化的时候赋值，之后就不能再修改了



## 对象类型（Object types）

### 数组

#### 定义数组类型：[]

`let numArr: number[] = [1,2,3,4]`  添加方括号

#### 数组泛型：Array<类型>

`let fibonacci: Array<number> = [1, 1, 2, 3, 5];`

#### 用接口表示数组

```typescript
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

#### 类数组

再function函数中存在`arguments`;它是**类数组**

```typescript
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

### 函数

#### 函数类型

- ##### 函数声明

​		`function add(){}`

- ##### 函数表达式

  `let add = function (){}`

#### 用接口定义函数的形状

格式为 `[functionName](itemName[?]: type): fnType`   ,函数名选填，接受参数 选填，接受类型可以为数组，再实现函数的的时候使用`...arr:number[]` 就可以继承。

```typescript
interface SearchFunc {
    (source: string, subString: string, vue?:any ): boolean;  //添加可选参数
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string = "33") { //添加默认值
    return source.search(subString) !== -1;
}

function add(array,...items:number[]):number {   //接受剩余参数到items中
    
}
```

#### 重载

当输入为number，对应九尾number，当输入为string输出为string，最后一个为实现函数。注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

```typescript
function reverse(x: number): number;   //有先
function reverse(x: string): string;	//有先
function reverse(x: number | string): number | string {}
```

#### 类型断言

是一种ts版本的react的jsx，解决再函数中出现定义接受类型时候出现类型不同，不存在共同方法，或者属性，来临时确定他的类型。它不是真实存在的需要类型转换，是指执行前的时候判断，而不是执行时候判断

`值 as 类型`   或者   `<类型>值` 

注意不能太过于使用   as  any

```typescript
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {//断言他是Fish，这样才可以使用.swim，用来欺骗typescript。
        return true;
    }
    return false;
}
```



当出现可以兼容的时候才可以使用断言

```typescript
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

let tom: Cat = {
    name: 'Tom',
    run: () => { console.log('run') }
};
let animal: Animal = tom;

//-------或者--------
interface Animal {
    name: string;
}
interface Cat extends Animal {
    run(): void;
}

//---------或者-----------
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

function testAnimal(animal: Animal) {
    return (animal as Cat);
}
function testCat(cat: Cat) {
    return (cat as Animal);
}
```

结构相同，可以成立。

总之，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

同理，若 `B` 兼容 `A`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

#### 双重断言:除非迫不得已，千万别用双重断言。

任何类型都可以被断言为 any

any 可以被断言为任何类型

```typescript
interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}

function testCat(cat: Cat) {
    return (cat as any as Fish);
}
```

## 声明文件

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class `声明全局类
- `declare enum `声明全局枚举类型
- `declare namespace `声明（含有子属性的）全局对象
- `interface `和 `type` 声明全局类型
- `export` 导出变量
- `export namespace `导出（含有子属性的）对象
- `export default `ES6 默认导出
- `export = commonjs `导出模块
- `export as namespace` UMD 库声明全局变量
- `declare global `扩展全局变量
- `declare module `扩展模块
- /// <reference /> 三斜线指令

下例中，`declare var` 并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：

```typescript
declare var jQuery: (selector: string) => any;
jQuery('#foo');
//------结果------
jQuery('#foo');
```

格式需要一个`jQuery.d.ts`文件

```typescript
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any;
```

使用哪里使用就哪里调用文件
```
// src/index.ts

jQuery('#foo');
```

使用方法

- 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
- npm 包：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
- UMD 库：既可以通过 `<script>` 标签引入，又可以通过 import 导入
- 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构
- 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
- 模块插件：通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

```typescript
// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}

// src/jQuery.d.ts
//嵌套命名空间
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    namespace fn {
        function extend(object: any): void;
    }
}
```

## 内置对象

### es

`Boolean`、`Error`、`Date`、`RegExp` 等。

### DOM 和 BOM 的内置对象

`Document`、`HTMLElement`、`Event`、`NodeList` 等。

# 进阶

## 类型别名

适应`type  typeName = string ` 这样就可以使用typeName来代替string

## 类

### es6的类

```javascript
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
    static isAnimal(a) {
        return a instanceof Animal;
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

### es7

```javascript
class Animal {
    name = 'Jack';
	static num = 42;
    constructor() {
        // ...
    }
}

let a = new Animal();
console.log(a.name); // Jack
```



### ts的类

使用继承**extends**继承类和**implements**继承接口，且必须对父级的**abstaract**实现和接口方法实现才可以实例化对象。

可以合并：针对相同属性相同类型，则属性合并为一个，当方法的时候，则存在两个，优先接受详细的类型参数。

```typescript
class Animal{
	public name;
    readonly title; //只读，只允许再初始化时候赋值一次
    static display(){ //静态方法
        
    }; 
    public constructor(name) {   //公有
        this.name = name;
    }
    private sayHi() { //私有
        
    }
    protected say() { //受保护
        
    }
    //有抽象函数的对象不能实例化，需要补全其函数才可以一般用于父类，然后子类继承
    public abstract toString() {  //抽象函数    
        
    }
}
class Cat extends Animal{
    public constructor(name) {
        super(name);
    }
    public toString() {
        return ""
    }
}
let animal: Animal  =  new Animal('a')  //报错，有抽象函数不能能实现
let cat: Cat = new Cat('a')  //成功
```

```typescript
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm,Light {
    alert() {
        console.log('SecurityDoor alert');
    }
    lightOn(){};
    lightOff(){};
}

```

```typescript
interface Alarm {
    price: number;
    alert(s: string): string;
}
interface Alarm {
    weight: number; 
    price: number;// 属性名相同，所以类型必须相同
    alert(s: string, n: number): string;
}
//----合并后
interface Alarm {
    price: number;
    weight: number;
    alert(s: string): string;
    alert(s: string, n: number): string;
}
```



### 范式

在函数返回时候出现的无法马上确认其返回值的类型，使用`Array<any>`这样就不准确，就是可以使用范式。在函数被调用的时候来决定其返回的值的类型。`Array<T>`  (就跟java一样一样的~~)

#### 泛型函数

格式 `function fnName[<U [extends 类名|T],T [= string]]>](item:<T>,item2:Array<U>):<T>{}`,一个的时候可以不写。可以继承类名或者范式T,可以继承，可以默认值。

当你使用T不知道类型的时候，就不能写其特殊的属性和方法，必须要共有

```typescript
//接受的参数类型有几个
function addArr<T,U>(arr:Array<T>,item:U extends Lengthwise):Array<T> {//就是范式
	arr.push(item);
	return arr;
}
let arr = addArr<number,number>([3],1); //addArr<指定范式T,U的类型>不写也会自动推算出来

//--- 错误示范
function addArr<T>(items:T) {
    return T.length //失败
}
addArr<Array<string>>(arr)   
```

#### 泛型接口

```typescript
interface Scan{
    <T extends U,U>(son:T,parent:U):U;
}
let scan:Scan;
scan = function <Son,Parent>(son,parent){return parent}
```

#### 泛型类

```typescript
class ClassName<T>{
    style:T;
    add(x:T,y:T):T;
}
```

### 交叉类型

```
function concat<U,T>(item U,item2T):U & T {  //合并U和T变量

}
```

[参考文章](https://www.tslang.cn/docs/handbook/basic-types.html)

[参考文章2](https://www.tslang.cn/docs/handbook/basic-types.html)

[参考文章3](https://www.runoob.com/typescript/ts-type.html)