# JavaScript运行时上下文和调用栈的理解（涉及var和let、const的原理）


首先是对运行时上下文和调用栈的关系及其运行过程的理解：

运行时上下文理解为运行时的当前运行环境，而JavaScript代码的执行是执行栈来完成，执行栈又称为调用栈，后面一律称为调用栈。调用栈正如其名字一样是一个LIFO的栈结构，即后进先出。

我们把调用栈的运行理解为上下文的进出栈过程，即先入栈的上下文就后出栈。

例子：

var a = 'Hello World!';

function first() {  
  console.log('Inside first function');  
  second();  
  console.log('Again inside first function');  
}

function second() {  
  console.log('Inside second function');  
}

first();  
console.log('Inside Global Execution Context');

// Inside first function
// Inside second function
// Again inside first function
// Inside Global Execution Context


上述代码运行时（即调用first函数时）我们理解为首先全局上下文最先入栈，其次是first函数 的上下文，最后是second函数的上下文入栈，而三个上下文环境的出栈顺序正好相反，second函数会最先执行完成并且其上下文出栈，其次是first函数执行完成并且上下文出栈，最后是全局上下文出栈。



 

运行时上下文的创建：

执行上下文的创建

执行上下文分两个阶段创建：1）创建阶段； 2）执行阶段

创建阶段

1、确定 this 的值，也被称为 This Binding。

2、LexicalEnvironment（词法环境） 组件被创建。

3、VariableEnvironment（变量环境） 组件被创建。

直接看伪代码可能更加直观

ExecutionContext = {  
  ThisBinding = <this value>,     // 确定this 
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
This Binding

全局执行上下文中，this 的值指向全局对象，在浏览器中this 的值指向 window 对象，而在nodejs中指向这个文件的module对象。

函数执行上下文中，this 的值取决于函数的调用方式。具体有：默认绑定、隐式绑定、显式绑定（硬绑定）、new绑定、箭头函数，具体内容会在后面【对JavaScript中this的理解】部分详解。

词法环境（Lexical Environment）

词法环境有两个组成部分

1、环境记录：存储变量和函数声明的实际位置

2、对外部环境的引用：可以访问其外部词法环境

词法环境有两种类型

1、全局环境：是一个没有外部环境的词法环境，其外部环境引用为 null。拥有一个全局对象（window 对象）及其关联的方法和属性（例如数组方法）以及任何用户自定义的全局变量，this 的值指向这个全局对象。

2、函数环境：用户在函数中定义的变量被存储在环境记录中，包含了arguments 对象。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。

直接看伪代码可能更加直观

GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {    	  // 词法环境
    EnvironmentRecord: {   		// 环境记录
      Type: "Object",      		   // 全局环境
      // 标识符绑定在这里 
      outer: <null>  	   		   // 对外部环境的引用
  }  
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {  	  // 词法环境
    EnvironmentRecord: {  		// 环境记录
      Type: "Declarative",  	   // 函数环境
      // 标识符绑定在这里 			  // 对外部环境的引用
      outer: <Global or outer function environment reference>  
  }  
}
变量环境

变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性。

在 ES6 中，词法 环境和 变量 环境的区别在于前者用于存储**函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）**绑定。

使用例子进行介绍

let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}

c = multiply(20, 30);
执行上下文如下所示

GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      a: < uninitialized >,  
      b: < uninitialized >,  
      multiply: < func >  
    }  
    outer: <null>  
  },
  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      c: undefined,  
    }  
    outer: <null>  
  }  
}

FunctionExectionContext = {  

  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      Arguments: {0: 20, 1: 30, length: 2},  
    },  
    outer: <GlobalLexicalEnvironment>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      g: undefined  
    },  
    outer: <GlobalLexicalEnvironment>  
  }  
}
变量提升的原因：

在创建阶段，函数声明存储在环境中，而变量会被设置为 undefined（在 var 的情况下）或保持未初始化（在 let 和 const 的情况下）。所以这就是为什么可以在声明之前访问 var 定义的变量（尽管是 undefined ），但如果在声明之前访问 let 和 const 定义的变量就会提示引用错误的原因。这就是所谓的变量提升。

执行阶段

此阶段，完成对所有变量的分配，最后执行代码。

如果 Javascript 引擎在源代码中声明的实际位置找不到 let 变量的值，那么将为其分配 undefined 值。

对于变量提升的详细理解：

即在代码执行是首先会执行上下文的创建，然后在分配变量并且执行代码。

所以在创建上下文的阶段我们看到let和const以及函数在函数上下文环境或者全局上下文环境中的词法环境中被绑定，而var变量是在变量环境中被绑定到上下文的。在创建完成后，let和const的状态为未初始化状态，而var为undefined的状态，我们在执行阶段才会给各个变量分配值。而在执行阶段，我们看到如果在使用某个let或const修饰的变量之前没有声明，我们这时给它赋值，因为在词法环境中没有这个变量的引用，那么会提示引用错误，因为我们能够区分未初始化和undefined的；而如果是var修饰的变量，因为在创建上下文完成后本是undefined，在声明之前访问 var 定义的变量也是，其表现是一致的，因此不做区分。

如有理解错误，还望不吝指正！！！

参考：
原文链接：https://blog.csdn.net/qq_33718648/java/article/details/90754331