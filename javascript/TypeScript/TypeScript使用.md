# 	TypeScript使用

typeScript是在逻辑生成的限制，达到类型精准，就像后端的java一样。

# 数据类型

typecript定义的类型，仅在编写执行的时候判断，在生成js的时候就没了。格式 `定义声明 变量名:类型` 在变量后加冒号和类型 `:类型[|联合类型][entends 继承类型][& 交叉类型(多用于函数返回值)]`  

## 定义类型

#### 	const 常量 ：定义一次时候初始化，之后都不能修改

#### 	let  局部变量：会出现死区

#### 	var  全局变量：减少使用

#### 	断言:  <类型> |（类型 as 断言类型）

​		当函数接受类型不明确的时候，断言它为某个类型，解决的是typescript的类型属性限制问题。比如 `let a:string = 1` typeScript就会报错，使用 `let a:string = (<string>1)`或者 `let a:string =(b as string)` 就不会，还可以双重断言 `let a:string = (<string>(<any>b))` 先断言为any任意类型，再断言为string。**除非迫不得已，千万别用双重断言**。

​		如果是父子继承关系的；或者两者有相同属性名，没有继承关系的，都可以使用断言，

```typescript
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

​		总之，若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

​		同理，若 `B` 兼容 `A`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

- 综上所述：
  - 联合类型可以被断言为其中一个类型
  - 父类可以被断言为子类
  - 任何类型都可以被断言为 any
  - any 可以被断言为任何类型
  - 要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可

#### 	联合类型 (一般变量定义的时候使用): 类型|类型

​		使用 `let rem:类型|类型|类型 `  ，在冒号后使用`|`分割，或者再函数接受的时候定义

#### 	交叉类型(一般函数返回值的时候使用) :类型 & 类型

​		使用函数的时候返回类型可以是两个类型的交叉，`function concat(item:类型1,item2:类型2):类型1 & 类型2 {}` 返回的类型就是两个联合在一起

## 基础数据类型

#### 	any 任意类型

​		任意类型，默认、未指定类型就是任意类型，类型推论（定义的时候赋值，值是什么类就是什么类）

格式 。

#### 	object  对象

​		`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。使用`object`类型，就可以更好的表示像`Object.create`这样的API。`create({ prop: 0 }); // OK create(null); // OK` 其他string类型和number等等都会报错

#### 	boolean  布尔

#### 	number  数值

#### 	string 字符串

​		字符串  使用\` \`包裹，中间使用${变量}实现嵌入。   比如 \`我的名字叫${name}\`

#### 	void  返回空

​		 表示空值，没有返回值，只能赋值`undefined` 和 `null`，不能赋值给别的对象 `let unusable: void = undefined;`  或者 `function warnUser(): void {}`

#### 	never 空 （包括null和undefined子类）

​		 表示的是那些永不存在的值的类型 ,抛出异常或根本就不会有返回值的函数  `return throw new Error(message);`  `return error("Something failed");`

#### 	null 对象值缺失

#### 	undefined  未定义的值

#### 	enum 枚举

​		枚举定义 `enum  变量名{值 = 下标,值,值}`，定义下标可以是字符串但是后续不能自动生成，  实例化`enum  枚举名   实例化对象`  或者  `let enum :枚举名 = 枚举名.属性` 

```typescript
enum name {  //定义
	up [=10], //0   //可以定义值为10，然后后续都会再次基础上加1  //方括号使用的时候要去掉
	dowm [="shie"],  //1  //可以定义名字为字符串  //方括号使用的时候要去掉
	left,  //2
	right 
}
enum  name  变量
```

#### 	Array 数组

- 定义
  - `类型[]`
    -  `let arr:类型[] = [1,2,3]` 
  - `Array<类型>` **范式：详细见后文**
    -  `let arr:Array<类型> = [1,2,3,4,5] `  
  - 接口
    - `interface NumberArray {[index: number]: number;}`    这里方括号表示接受类型的名字对应数组下标  ,且不受限制，接受类型为number
    - `let fibonacci: NumberArray = [1, 1, 2, 3, 5];`
  - 类数组
    - 比较针对 argument
    - function sum() { let args: {[index: number]: number; length: number; callee: Function;  } = arguments;
      }
  - 只读属性
    - `let  arr:ReadonlyArray<string> = [1,2,3]`
    - 再赋值的是否会出错
    - `let  list:string[] = arr as string[]`//需要断言一下

#### 	tuple 元组（特殊的数组）

​		定义数组的时候`let arr: number[]` 而定义元组`let arr:[number,string] = [1,'2']`,设置其arr为数组，但是接受类型为number，string按顺序，不可多不可少。等于限制的数组个数和类型

### 附加部分

`let a :typeof Greeter = new g()`

# 定义别名

- 定义

  `type  TypeName = (name:number, title:string) => number`   定义一个TypeName接受两个参数类型，返回一个number类型

- 使用

  `const  a:TypeName  = (number,str)=>{return number}`  在定义中已经定义好了类型了

## 函数

### 定义

`function add(x:number, y=number):nunmber {}` 定义接受类型和返回类型

### 关键词

- 定义：function
- 交叉类型：&
  - function concat<U,T>(item U,item2T):U & T { } //合并U和T变量


### 函数类型

- #### 根据声明分类
  - **函数声明**

    `function add(){}`

    `function add(x:number):number{}`

  - **函数表达式**
  
    `let add = function (){}`
  
    `let  add:(addItemX:number,addItemY:number)=>number = function (x:number,y:number):number{return x+y}`
  
    只要类型相同即可，修改名字为了增加阅读性
  
    如果不写number的函数类型，则会根据add的进行推断类型。

- #### 根据接受参数分类

  - 普通函数(参数都要,且b默认为1)
    - `function add(x:number,b = 1:number){}`
  - 可选参数
    - `function add(x:number,b = 1:number,c?:number)`
  - 有剩余参数的函数
    - `function add(x:number,...items:number[])`

### 重载

会根据类型参数的不同使用不同的函数，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

```
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {}
```

### 范式

在函数返回时候出现的无法马上确认其返回值的类型，使用`Array<any>`这样就不准确，就是可以使用范式。在函数被调用的时候来决定其返回的值的类型。`Array<T>`  (就跟java一样一样的~~)接口

- #### 格式

  在实例化对象的地方后面紧跟使用`< 类型, 类型 >`，接受类型，在使用定义名字的地方`< 类型变量, 类型变量 >`接受，在需要使用的地方使用，大多数使用T,U,当接受和使用的范式自由一个的时候接受地方可以不写。

  ```typescript
  function add<T,U>(str:T,str2:T):U {
  	return (str+str2) as U 
  }
  //根据它为字符串或数值进行加法，返回对应值
  let d = add<string,string>('3','4');
  let e = add<number,number>(3,4);
  ```

- #### 约束范式

  - 使用`extends`

    - ```typescript
      interface Lengthwise {
          length: number;
      }
      
      function loggingIdentity<T extends Lengthwise>(arg: T): T {
          console.log(arg.length);  // Now we know it has a .length property, so no more error
          return arg;
      }
      ```

      

- #### 泛型函数

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

  ```typescript
  function getProperty(obj: T, key: K) {
      return obj[key];
  }
  
  let x = { a: 1, b: 2, c: 3, d: 4 };
  
  getProperty(x, "a"); // okay
  getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
  
  //------修改
  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {  //keyof 是指k值为t的键内的
    return obj[key]
  }
  ```

  

  #### 泛型接口——实现函数

  ```typescript
  interface Scan{
      <T extends U,U>(son:T,parent:U):U;
  }
  let scan:Scan;
  scan = function <Son,Parent>(son,parent) {
      return parent
  }
  ```

  #### 泛型类

  ```typescript
  class ClassName<T>{
      style:T;
      add(x:T,y:T):T {
          return x;
      };
  }
  let a:ClassName = new ClassName<steing>();
  ```

  

### this指向问题

- 推荐使用箭头函数

- 或者指定其指向的类名 `function add(this:类名)`

  - ```typescript
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }
    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function(this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }
    ```

  - 或者

  - ```typescript
    interface UIElement {
        addClickListener(onclick: (this: void, e: Event) => void): void;
    }
    class Handler {
        info: string;
        onClickBad(this: Handler, e: Event) {
            // oops, used this here. using this callback would crash at runtime
            this.info = e.message;
        }
    }
    let h = new Handler();
    uiElement.addClickListener(h.onClickBad); // error!
    
    //改成
    class Handler {
        info: string;
        onClickBad(e: Event)=>{
            // oops, used this here. using this callback would crash at runtime
            this.info = e.message;
        }
    }
    ```

    

  

## 接口

### 定义

一个需要实现的框架如同`java`,使用关键字 `interface`,旨在typescript中存在，再生成出来的js中不存在，是概念上的。

> 什么时候使用class

当需要使用class时，我通常会考虑三个方面

- 是否需要创建多个实例
- 是否需要使用继承
- 是否需要特定的单例对象

> 什么时候使用interface

对于从服务器端获取或者业务场景中模拟的数据，提倡使用interface去定义，这些数据通常是不会经常变化和调整的，这些数据可能仅仅只表示某些状态，或者是UI上的文本。

### 属性定义

- #### 关键字：interface

- #### 继承：extends   

  - 可以不用全部实现

- #### 继承:implements

  - 必须全部实现，对所有属性，方法都实现

- #### 可选属性：？

- #### 任意属性(可以索引值)：[]

  -  `obj.property`和`obj["property"]`两种形式使用它，注意其接受类型需要全部一一直，也就是需要包括剩余的属性类型

- #### 只读属性：readonly

- #### 方法函数参数：()

  - 比如 `(item:string):string`//接受string类型，返回值为string

- #### 泛型接口——实现函数 （看函数中）

- #### 对应constructor的初始化函数：new

  - 但是typescript无法实现一个带有构造器函数的对象，所以在接受的时候可以使用构造器接口来接受类型当过滤

  - ```
    interface InitFn {
    	new(title:string,todoList:object[]): void 
    }
    
    class OneOnlt {
    	constructor(title:string,todoList:nuber[]){
    	}
    }
    
    class TweOnlt {
    	constructor(title:string,todoList:nuber[]){
    	}
    }
    ```

- ## 问题不会检查其constructor函数

  因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

- #### 类静态部分与实例部分的区别

  - 总结一下就是 ，TypeScript中不能实现一个带有构造函数的接口，但可以通过继承另一个接口，并让包含构造函数的接口返回同样的类型，在类中就能实现对该构造函数的类型检查。
  - 如果我们把包含构造函数的接口叫做静态部分，把类实现的叫做实例部分，即**类只能实现实例部分，而静态部分则可以通过传参进行类型检查**

```typescript
//实现接口类
interface InterfaceName extends Parent { // 可选是否继承  接口|类
    //属性
    item:number ;
    item2?:number ; //?表示可选属性，需要满足任意属性
    readonly item3: number;   //只读属性，只在初始化的饿是否赋值，之后都不能修改constructor()
    [propName:string]:any; // [任意属性的索引或者叫下标:它的类型]:属性对应值的类型，如果有有可选属性，且可选属性要包括在内  也就是 当前类型|可选属性的类型，
    
	//方法
    fnName():void;  //没有返回值
    fnNmae2(item1:string,item2:string|number):void;  //输入item1参数类型为string，其中item1和实例化函数中接受类型名不一定一样但是类型名一样
    fnName3<T>(item2:T):T
}



//构建函数接口
interface FnName{
    (source: string, subString: string): boolean; //接受参数类型，返回参数类型
}
//实现函数的地方不需要变量名相同，需要类型相同，是指返回类型和接受类型
let fnName:FnName;
fnName= function(item1:string,item2:string) {retrun item1===item2}

interface installObj{
    new(init:string):void ; //实例化针对的是constructor 这个初始化函数的接受参数类型
}


//构建索引类型
interface StringArray{
    [index:number]:string;
    //readonly [index:number]:string;  //还可以改成为只读
}
let arr:StringArray;
arr = ['a','b'];

```

### 类-类型

只是函数接受的类型为一个类型，再其函数过程中实现它，

```typescript
function newSon(ctor:ClassParent , arg:String):newSon {
	return new ctor(arg:string[]);//实例化后返回
}
//------使用初始函数调用接口，初始化接口来实现解耦-------
interface InitFn {
    new(id:number,title:string):ArrayListTree;
}
interface ArrayLIstTree {
    tick(title:string):void;
}

class TodoList extends ArrayListTree {
    constructor(arg:string[]) {}
    tick(list:string) {}
}

function initTodoLIst(ctor:InitFn,arg:string[]) {
    return new ctor(arg);
}
let a = initTodoList(todoList , [1,2,3]);
```

问题

```javascript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

### 混合-类型

```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```



## 类



- #### 关键字：class

- #### 只读属性：readonly

  - 只能初始化赋值一次

- #### 静态属性：static 

  - 不用实例化就可以使用，其属性是再类上，使用`className.静态属性` ，有且只有一个

- #### 抽象方法：abstract

- #### 继承：extends

  - 可以继承接口或者类

- #### 权限：public 共有、protected受保护、private私有

- #### 选取类型的类型本身：typeof 类型

  - `let a:Parent = new Parent()` 实例化一个Parent对象
  - `let a:typeof Parent = Parent`  获取是class这个类，可以对其静态static属性进行修改

- #### 存取器：set、get

- #### 交叉类型：类型&类型

- #### 泛型接口——实现函数 （看函数中）

- #### 区分静态属性和实例部分

  - 是指如static就是静态部分，放置在类型名中，获取方式`类型名.静态属性名`
  - constructor函数也是静态部分

```typescript
abstract class ClassName extends ClassParen {  //有抽象方法就是抽象类
    //属性
	public name:string = ; //公有，外部能直接方法，派生对象可以访问
    protected parenId:number = 1 ; //受保护，外部不能访问，派生对象可以访问
    private id:string = '';  //私有，外部不能访问，派生对象可以不能访问
	
    readonly title:string  = ; //只读属性
    static  onlyOne:string ='className' ; //静态属性，其属性挂载再类上面，使用className.静态属性 
    //初始化
	public constructor(name:string){
        super();
        this.name = name 
    };
    
    //方法 详细看函数部分
    public function <T extuedn U,U> minxin(item:T,item2:U):T {  //泛型，接受参数
        return item
    }
	public abstract tostring():string;  // abstract 抽象方法，需啊哟实现不然不能实例化
    
}
```



# 高级类型









# 测试例子

```
 function findPeople(age:number,name?:string):string{
      if(name){
        return 'find the '+ age + 'years and name is'+ name;
      }else{
        return 'find the '+ age +'and no name!';
      }
    } function findMan(age:number):string{
      return 'find the '+ age + 'years'
    }
    function findRest(age:number,...xuqiu:string[]):string{
      let yy = "";
      for(let i=0; i< xuqiu.length;i++){
         yy = yy + xuqiu[i];
         if(i < xuqiu.length -1){
              yy = yy +'、'
         }
      }
      return '需求有：'+yy;
    }
    function findRest(age:number,...xuqiu:string[]):string{
      let yy = "";
      for(let i=0; i< xuqiu.length;i++){
         yy = yy + xuqiu[i];
         if(i < xuqiu.length -1){
              yy = yy +'、'
         }
      }
      return '需求有：'+yy;
    }
```

```
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```





[参考文章](https://www.tslang.cn/docs/handbook/basic-types.html)

[参考文章2](https://www.tslang.cn/docs/handbook/basic-types.html)

[参考文章3](https://www.runoob.com/typescript/ts-type.html)