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

### 定义别名

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

- #### 别名：type  别名 = 类名  

  - ```typescript
    type Name = string ;
    type Name1 = ()=> string ;
    type Name2 = Name1|number ;
    
    let user:Name = 'student'
    
    type Name3<T> = {value:T}  //加入范式
    type Tree<T> = {
        value: T;
        left: Tree<T>;
        right: Tree<T>;
    }
    
    ```

  - ```typescript
    //加入交叉类型
    type LinkedList<T> = T & { next: LinkedList<T> };
    
    interface Person {
        name: string;
    }
    
    var people: LinkedList<Person>;
    var s = people.name;
    var s = people.next.name;
    var s = people.next.next.name;
    var s = people.next.next.next.name;
    ```

    

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

### this--链式编程

类种函数返回类型是this，继承之后返回也是 当前的class，就可以使用链式编程

```typescript
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();


class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}

let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
```

### 参数类型限制

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



### 附加-自定义类保护

在不知道使用类型是什么，但是需要进行判断，使用其属性

```typescript
//----------第一种---------------
//类型保护与区分类型，使用类型断言处理<>或者as
if((<Bird>pet).fly){
    (pet as Bird).fly();
}else{
    (<Fish>pet).swim();
}

//----------第二种---------------
//用户自定义类型区分，使用 is 谓词
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```

减少使用null,undefined

由于接受到的参数有可能的为未定义和空值

```
function f(sn: string | null): string {
    if (sn == null) {
        return "default";
    }
    else {
        return sn;
    }
}
//------------修改----------------
function f(sn: string | null): string {
    return sn || "default";
}


```

使用！来声明给typescript选择当前的值不为空或者undefined

```
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
```

## 别名type

重新命名变量或者类，或者

### 字符串字面量类型

其接受值就在其内，有点像枚举的接受过滤。

```
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```

### 类别名：type  别名 = 类名  

`extends`和 `implements`（自己也不能 `extends`和 `implements`其它类型

```typescript
  type Name = string ;
  type Name1 = ()=> string ;
  type Name2 = Name1|number ;
  
  let user:Name = 'student'
  
  type Name3<T> = {value:T}  //加入范式
  type Tree<T> = {
      value: T;
      left: Tree<T>;
      right: Tree<T>;
  }
  
```

 ```typescript
  //加入交叉类型
  type LinkedList<T> = T & { next: LinkedList<T> };
  
  interface Person {
      name: string;
  }
  
  var people: LinkedList<Person>;
  var s = people.name;
  var s = people.next.name;
  var s = people.next.next.name;
  var s = people.next.next.next.name;
 ```

###   接口别名

在编译器中将鼠标悬停在 `interfaced`上，显示它返回的是 `Interface`，但悬停在 `aliased`上时，显示的却是对象字面量类型。

```typescript
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

**识别并过滤接口**

```typescript
interface Square {
    kind: "square"; //标识
    size: number;
}
interface Rectangle {
    kind: "rectangle"; //标识
    width: number;
    height: number;
}
interface Circle {
    kind: "circle"; //标识
    radius: number;
}

type Shape = Square | Rectangle | Circle;  //重点

//如果shape更新了，添加新的对象，而area没对应新的接口怎么办，
//开启typescript严格模式。--strictNullChecks
//或者添加一个default
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        //折中检查是否有更新
        default: return assertNever(s); // error here if there are missing cases
    }
}
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
```

## keyof

判断是否在 keyof  类型 的属性种

```typescript
let personProps: keyof Person;  

//限制其name必须为obj的属性之一
function add<T,U extends keyof T>(obj:T,name:U):T {
    obj[name]='test';
    return obj;
}
```

### 映射类型--针对接口和类使用

```typescript
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

type Readonly<T> = {  //接受一个接口或者类，修改属性为全部只读。
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

instrface Parent {
	[name: string]:number
}
instrface Son<T> {
	[name: string]:number
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



# 模块

## 			导出模块

### es6的模块导入导出——使用结构赋值

- #### import 导入（编译时加载）

  - 写在头部，编译时候对其加载，不能写在if种无效

- #### require 导入（运行时加载）

- #### export 导出

- #### as 重命名

- ```typescript
  //------------导出------------
  class AddNumber{}
  function getNuber(){}
  function postNumber(){}
  export function delectNumber(){}  //手动导出
  //默认导出
  export default AddNumber  //默认导出,一个文件最多一个
  export default {getNuber,postNumber}  //默认导出,一个文件最多一个,导出是一个方法
  
  export {getNumber,postNumber as postArr}//统一导出为map格式 ，as 改名
  
  export * from './api' //可以在文件夹种多个导出，做到中间阶层功能
  export {getNumber as numberArr} from './api'  //对api的getNumber重新改名导出，解决命名冲突问题
  
  //-------------导入-----------
  import {AddNumber as Number} from './api'
  let addNumber = new Number();
  
  import {getNumber} from './api'
  let arr = getNumber();
  
  import * as fromName from './api'
  let arr = fromName.getNumber()
  let addNumberClass =new fromName.AddNumber()
  
  import ClassName from './api'  //默认导出defalut的值，如果导出是{}对象类型就需要ClassName.属性
  let arrNumberClass  = new ClassName();
  let getNumber  = ClassName.getNumber();
  ```

- 重新分类

  ```typescript
  //----------导出----------------
  class Tree{};
  function getNumber() {};
  function postNumber() {};
  export Tree;  //手动导出
  export function delectNumber() {};  //手动导出
  //规范点 就要吗都写，或者，最后导出
  //export {fn,class}  //统一
  
  //----------导入---------------- 
  //注意需要括号，没有括号是获取默认
  import {Tree} from './api'  //不需要写js。需要结构赋值
  import {getNumber,postNumber,delectNumber} from './api'  //不需要写js
  let tree = new Tree();
  let arr = gitNumber();
  
  //---------------默认导入导出-----------
  //----------导出----------------
  export default Tree; //默认导出  一个文件只能由一个
  export {getNumber,postNumber}
  //----------导入---------------- 
  import ClassName from './api' //默认导出Tree，可以随便命名
  import ClassName,{getNumber,postNumber} from './api' //默认导出Tree，可以随便命名
  
  
  //------------------命名冲突----------------------
  //----------导出----------------
  export {getNumber,postNumber as newFnName,Tree} //改名字了
  //----------导入---------------- 
  import {getNumber as newName, newFnName as nowName,Tree} //再改名字
  let tree = new Tree();
  let arr = newName();
  let arrList = nowName();
  
  //-----------------整个模块导出-------------------
  //----------导出----------------
  export  {fn1,fn2,fn3}
  //----------导入---------------- 
  import * as FnArr from './api' //重新命名模块名
  let a = FnArr.fn1();
  
  
  //------------------复写模块---------------------
  export {Fn1 as newFn1} from './api'  //重命名
  export * from './api' //整体输出///注意导入的模块不会有defalut
  export {defalut} from './api' 设置使用api的默认接口
  export {Fn as defalut} from './api' 把fn设置为默认接口
  export { defalut as init} from './api' 把默认接口改成init
  //es 2020提案 才有的默认导出并重命名  export * as NewName from './api'
  
  
  
  
  //-------------------动态加载--------------------
  //--------------导出-----------
  if(status) {
      import('./api1')
  }else {
      impoet('./api2')
  }
  ```

- 使用运行时加载

  - ### 为了支持CommonJS和AMD的`exports`, TypeScript提供了`export =`语法。

  - 如果使用这个语法，`就必须使用import module = require("module")`来获取其模块

- ```typescript
  //-----------导出------------
  class ClassName{}
  export = ClassName;
  //-----------导入------------
  import Zip = require("./ZipCodeValidator"); //导入文件名
  let className = new Zip();	
  
  //-----------导出------------
  class ClassName{}
  export = {ClassName,fn,fn};
  //-----------导入------------
  import Zip = require("./ZipCodeValidator"); //导入文件名
  let className = new Zip.ClassName();	
  let arr = Zip.fn();
  ```

  [更多模块及原理实现，解析之后的参考](https://www.tslang.cn/docs/handbook/modules.html)

## 命名空间

不常用了推荐使用模块

# 声明文件——解决模块使用时候的ts编译检查问题

推荐使用`.d.ts`文件来管理需要引用的模块命名和使用类型

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

## 静态属性

当存在一个类名和空间名一致的时候

```typescript
//函数定义必须再命名空间前面
function addFn() {
    console.log(addFn.num++);
};
namespace addFn() {
    export let num = 0;
};

//枚举，有问题
enum enumName {
    red,
    gree,
}
namespace enumName {
    export const bule = 3;
}
 //生成出来的{0:'red',1:'gree','red':1,'gree':2,'bule':3}//就没有3:'bule'
    
    
//类的声明
class Tree {
	constructor() {};
	show() {};
}
namespace Tree {
	export let arrLength:number = 2;
	export const rule = /^0-9+$/;
}
//其中Tree就有两个静态属性读音arrLength
//使用  Tree.arrLength   Tree.rule
```

# tsx

# 装饰器——实验性特性

## 配置启动

你必须在命令行或`tsconfig.json`里启用`experimentalDecorators`编译器选项：

`tsc --target ES5 --experimentalDecorators`或者

```json
//tsconfig.json文件夹
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

## 为什么要用装饰器

[什么是装饰器参考](http://zhanghejie.top/index.php/archives/26/)

可能有些时候，我们会对传入参数的类型判断、对返回值的排序、过滤，对函数添加节流、防抖或其他的功能性代码，基于多个类的继承，各种各样的与函数逻辑本身无关的、重复性的代码。
 所以，对于装饰器，可以简单地理解为是非侵入式的行为修改。

流程有点像现在这个class本身，添加一个新的class1，把class传入class1中报错，在需添加方法的地方（同名方法），先执行class1的class1调用class的，再执行本身写再class中的。

## 格式

- 分装饰器函数和装饰器工厂，其对应需要是一个函数，或者返回一个函数再调用加一个@,,区别有参数和括号，其执行顺序为 先执行**装饰器工厂**   **从上到下**   得到装饰器函数 ，再执行 **装饰器函数** **从下到上**，一个函数允许有多个装饰器.
- 类装饰器不能用在声明文件中( `.d.ts`)，也不能用在任何外部上下文中（比如`declare`的类）。
- 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
- 注意 如果你要返回一个新的**构造函数**，你必须注意处理好原来的**原型链**。 在运行时的装饰器调用逻辑中 *不会*为你做这些
- 在class中`get`和`set`针对同一个属性的时候只需要写一次

## 加载器顺序

### 例子

```typescript
function ClassDecorator() {
    return function (target) {
        console.log("I am class decorator");
    }
}
function MethodDecorator() {
    return function (target, methodName: string, descriptor: PropertyDescriptor) {
        console.log("I am method decorator");
    }
}
function Param1Decorator() {
    return function (target, methodName: string, paramIndex: number) {
        console.log("I am parameter1 decorator");
    }
}
function Param2Decorator() {
    return function (target, methodName: string, paramIndex: number) {
        console.log("I am parameter2 decorator");
    }
}
function PropertyDecorator() {
    return function (target, propertyName: string) {
        console.log("I am property decorator");
    }
}

@ClassDecorator()  //第四
class Hello {
    @PropertyDecorator()  //第一个
    greeting: string;


    @MethodDecorator() //第三，其方法里面先执行
    greet( @Param1Decorator() p1: string, @Param2Decorator() p2: string) { }  //先最后p2,p1
}
```

### 结果

```
I am property decorator
I am parameter2 decorator
I am parameter1 decorator
I am method decorator
I am class decorator
```

### 总结

1、有多个参数装饰器时：从最后一个参数依次向前执行

2、方法和方法参数中参数装饰器先执行。

3、类装饰器总是最后执行。

4、方法和属性装饰器，谁在前面谁先执行。因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行。上述例子中属性和方法调换位置。

## 函数的参数

类的装饰器参数

1. function，他的初始化函数。constructor

函数的装饰器参数

1. 静态成员的类的构造函数或实例成员的类的原型。
2. 成员的名称。
3. 成员的*属性描述符*。

## 区分：类，属性，访问器，方法以及方法参数，访问器装饰

相同点：类装饰器其实，class是es6的语法糖，其实构成还是function，所以其装饰器的接收值还是function

有默认参数 ，拿怎么接收参数呢——**函数柯里化**，也就是闭包，使用函数接收然后使用，并返回一个函数作为其使用方法。

### 1、类装饰器

```typescript
//类构造器，装饰器工厂
function addAge(args:number) {
    return function (target:function) {  //接收的就是这个class
        target.constructor.age = args;
    }
}
//固定使用constructor接收。 装饰器函数
function addAgeFn(constructor:function) {
	constructor.prototype.age = 18 ;
}
//装饰器工厂
@addAge(123)  //修改了People的args
//装饰器函数
@addAgeFn
class People {
    name:string;
    arg:number; 
    constructor(name:string) {
        this.name = name; 
    }
}
```



```typescript
//重写类继承。
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```

### 2、函数装饰器

参数

- 1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 2、成员的名字。
- 3、成员的属性描述符。

```
//第一个参数
//装饰器装饰的是静态成员函数，是类的构造函数()
//装饰是实例的时候，装饰其类的原型对象(就是说是类的函数种使用就是指类的元素对象)
//第二个参数
//成员的名字，也就是使用它
//第三个参数
//是成员属性的描述符，configurable（可配置）、writeable（可写）、enumerable（可枚举）就是Object.defineProprty(obj,name,{})
//如果函数有返回值，就会被替换掉本身的
```



```typescript
function addAge(value:boolean){
    return function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
   console.log(value)//接收参数
   console.log(target);
   console.log("prop " + propertyKey);
   console.log("desc " + JSON.stringify(descriptor) + "\n\n");
	};
}

@addAge
function fn(){
    
}
class Tree {
    index:number;
    constructor():void {}
    @addAge
    public function show():void {
        
    }
}
```

### 3、参数访问器

参数

- 1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 2、参数的名字。
- 3、参数在函数参数列表中的索引。 //跟上面不一样

```typescript
function PathParam(paramName: string) {
    return function (target, methodName: string, paramIndex: number) {
        !target.$Meta && (target.$Meta = {});  //不存在就生成一个，这里target就是这个HelloService
        target.$Meta[paramIndex] = paramName;
    }
}

class HelloService {
    constructor() { }
    getUser( @PathParam("userId") userId: string) { }
}
console.log((<any>HelloService).prototype.$Meta); // {'0':'userId'}
```

### 4、属性装饰器

参数

- 1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 2、成员的名字。

```typescript
function DefaultValue(value: string) {
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    }
}

class Hello {
    @DefaultValue("world") greeting: string;
}
console.log(new Hello().greeting);// 输出: world
```



### 5、访问器装饰

针对一个的get和set只要有要给

```typescript
class Tree {
	length:number;
    @addNumber(true)
	get size() {
		return this.length;
	}
	set size(value:number) {
		this.length = size;
	}
}
```













[参考文章](https://www.tslang.cn/docs/handbook/basic-types.html)

[参考文章2](https://www.tslang.cn/docs/handbook/basic-types.html)

[参考文章3](https://www.runoob.com/typescript/ts-type.html)