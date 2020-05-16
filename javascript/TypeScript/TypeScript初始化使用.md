# TypeScript初始化使用

## 安装
````npm
npm install -g typescript
````
概念：TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

使用vue脚手架配置一下也可以。react也有脚手架。

# 数据类型

注意使用构造器创造的不一定是对应的数据类型。`let bool:boolean = new Boolean(1)`这是一个Boolean对象。

## 原始数据类型（Primitive data types）

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

   

## 对象类型（Object types）



