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

关键词`interface` 定义接口，添加为接口类，默认属性个数不能多，不能少，类型相同。

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

### 类型断言

是一种ts版本的react的jsx

`值 as 类型`   或者   `<类型>值`