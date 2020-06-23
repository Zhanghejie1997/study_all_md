## JS闭包——上下文和this配合食用

**壹 ❀ 引**

我觉得每一位JavaScript工作者都无法避免与闭包打交道，就算在实际开发中不使用但面试中被问及也是常态了。就我而言对于闭包的理解仅止步于一些概念，看到相关代码我知道这是个闭包，但闭包能解决哪些问题场景我了解的并不多，这也是我想整理一篇闭包的原因。我们来看一段代码，很明显这是一个闭包，那么请问闭包指代的是下方代码中的哪一部分呢？本文开始。



```
function outer() {
    let name = '听风是风';

    function insider() {
        console.log(`欢迎来到${name}的博客`);
    };
    return insider;
};
outer()(); //欢迎来到听风是风的博客
```



 **贰 ❀ 什么是闭包？**

如果在面试中被问及什么是闭包，大部分情况下得到的答复是（至少我以前是）A函数嵌套B函数，B函数使用了A函数的内部变量，且A函数返回B函数，这就是闭包。

这段描述当然没问题，那么为了让下次面试回答的更为漂亮，就让我们从更专业的角度重新认识闭包。

**1.闭包起源**

闭包翻译自英文单词 closure ([ˈkloʊʒər] 倒闭，关闭，停业)，闭包的概念最早出现在1964 年的学术期刊《The Computer Journal》上，由 P. J. Landin 在《[The mechanical evaluation of expressions](https://academic.oup.com/comjnl/article/6/4/308/375725)》一文中提及。

![img](https://img2018.cnblogs.com/i-beta/1213309/201911/1213309-20191120220202989-2070676170.png)

在这个JavaScript，Java甚至C语言都还没诞生的60年代，主流的编程语言是基于 [lambda 演算](https://baike.baidu.com/item/Lambda表达式/4585794?fr=aladdin)的函数式编程语言。而在这个最早的闭包概念描述中使用了大量函数式术语，想传达的意思大概是带有一系列信息的λ表达式，对于函数式语言来说λ表达式就是函数。

早期的闭包由环境（执行环境、标识符列表）与表达式两部分组成，而将此组成对应到JavaScript中，环境部分正好对应了JS执行上下文中的函数词法环境与标识符列表，表达式部分则对应了JS中的函数体。

所以到这里，我们知道JavaScript中的闭包与最初闭包概念是高度吻合的，将带有一系列信息的λ表达式对应到JavaScript中来，所谓闭包其实就是一个自带了执行环境（由外层函数提供，即便外层函数销毁依旧可以访问）的特殊函数；那么回到文章开头的提问，这段代码中的闭包指代的就是内部函数 insider，而非外部函数outer所包含的范围，这一点一定得弄清楚。

**2.闭包的特征**

了解了JavaScript闭包的起源，我们接着来看看其它文档对于闭包的解释，加深印象并汇总一下闭包有哪些特性。

百度百科：

> 闭包就是能够读取其他函数内部变量的函数。例如在javascript中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“定义在一个函数内部的函数“。

《JavaScript高级编程指南》：

> 闭包是指有权访问另外一个函数作用域中的变量的函数。

MDN（几年前的解释，现已更新）：

> 闭包是指那些能够访问自由变量的函数。

MDN早期解释是比较有趣的，何为自由变量？自由变量是指在函数中使用的，但既不是函数arguments参数也不是函数局部变量的变量。看个例子：

```
let a = 1;//自由变量

function fn() {
    console.log(a);
};
fn(); //1
```

比如这个例子中，变量 a 不属于函数 fn，但函数 fn 因为作用域链的关系，还是可以正常使用变量 a。

说到这里肯定有同学就疑惑了，MDN的描述不对吧，首先 fn 是一个函数，其次 fn 用到了自由变量 a，那岂不是 fn 也是个闭包？

事实就是如此，在《JavaScript权威指南》一书中明确提到，从理论角度来说，JavaScript中所有的函数都是闭包....

是不是有点颠覆了你对于闭包的认知？上面说的是理论角度，站在技术实践角度来说，闭包无非满足以下两点：

一、闭包首先得是一个函数。

二、闭包能访问外部函数作用域中的自由变量，即使外部函数上下文已销毁。

所以MDN现在对于闭包的描述已修改为“闭包是由函数以及创建该函数的词法环境组合而成，这个环境包含了这个闭包创建时所能访问的所有局部变量”了，这不就符合了我们在前面对于闭包特征的理解。我们通过一个例子加深对闭包特征的印象：



```
let fn = function () {
    let num = 1; //自由变量
    return {
        a: function () {
            console.log(num);
        },
        b: function () {
            num++;
        }
    };
};

let closure = fn();
//到这里outer函数已执行完毕，执行上下文被释放
closure.a(); // 1
```



在上方的例子中，外层函数fn执行返回了两个闭包 a，b。我们知道函数每次被调用执行都会创建一个新的执行上下文，当函数执行完毕函数执行上下文被弹出执行栈并销毁，所以在 let closure = fn() 执行完毕时函数fn的执行上下文已不复存在，但我们执行closure.a()可以看到依旧能访问到外层函数的局部变量num。

为了让这种感觉更为强烈，我们直接销毁掉函数fn再次调用闭包函数，可以看到闭包不仅是访问甚至还能操作外层函数中的变量。

```
fn = null;
closure.b();
closure.a(); // 2
```

是不是很神奇？那为什么外层函数上下文都销毁了，闭包还能访问到自由变量呢，这就得说说闭包作用域链的特别之处了。

 **叁 ❀ 用奇妙的执行上下文看闭包**

JavaScript中的作用域是指变量与函数的作用范围。当在某作用域使用某变量时，首先会在本作用域的标识符中查找有没有，如果没有就会去父级找，还没有就一直找到源头window为止（window也没有就报错），这个查找的过程便形成了我们所说的作用域链。

那么在JavaScript中这个过程具体是怎么样的呢，我在 [一篇文章看懂JS执行上下文](https://www.cnblogs.com/echolun/p/11438363.html) 一文中有详细描述执行上下文的执行过程，所以这里我就简单描述下，我们先来看个例子：



```
let scope = "global scope";

function checkscope() {
    //这是一个自由变量
    let scope = "local scope";
    //这是一个闭包
    function f() {
        console.log(scope);
    };
    return f;
};

let foo = checkscope();
foo();
```



我们使用伪代码分别表示执行栈中上下文的变化，以及上下文创建的过程，首先执行栈中永远都会存在一个全局执行上下文。

```
//创建全局上下文
ECStack = [GlobalExecutionContext];
```

此时全局上下文中存在两个变量scope、foo与一个函数checkscope，上下文用伪代码表示具体是这样：



```
//全局上下文创建
GlobalExecutionContext = {
    // this指向全局对象
    ThisBinding: < Global Object > ,
    // 词法环境
    LexicalEnvironment: {
        //环境记录
        EnvironmentRecord: {
            Type: "Object", // 对象环境记录
            // 标识符绑定在这里 函数，let const创建的变量在这
            scope: < uninitialized > ,
            foo: < uninitialized > ,
            checkscope: < func >
        }
        // 全局环境外部环境引入为null
        outer: < null >
    }
}
```



全局上下文创建阶段结束，进入执行阶段，全局执行上下文的标识符中像scope、foo之类的变量被赋值，然后开始执行checkscope函数，于是一个新的函数执行上下文被创建，按照执行栈前进后出的特点，执行栈现在是这样：

```
ECStack = [checkscopeExecutionContext,GlobalExecutionContext];
```

那么checkscope函数执行上下文也进入创建阶段，它的上下文我们同样用伪代码表示：



```
// 函数执行上下文
checkscopeExecutionContext = {
    //由于函数是默认调用 this绑定同样是全局对象
    ThisBinding: < Global Object > ,
    // 词法环境
    LexicalEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative", // 声明性环境记录
            // 标识符绑定在这里  arguments与局部变量在这
            Arguments: {},
            scope: < uninitialized > ,
            f: < func >
        },
        // 外部环境引入记录为</Global>
        outer: < GlobalLexicalEnvironment >
    }
}
```



由于 checkscope() 等同于 window.checkscope() ，所以在 checkExectionContext 中this指向全局，而且外部环境引用outer也指向了全局（作用域链），其次在标识符中我们可以看到记录了形参arguments对象以及一个变量scope与一个函数 f 。

函数 checkscope 执行到返回返回函数 f 时，函数执行完毕，checkscope 的执行上下文被弹出执行栈，所以此时执行栈中又只剩下全局执行上下文：

```
ECStack = [GlobalExecutionContext];
```

代码执行又走到了foo()，foo函数被执行，于是foo的执行上下文被创建，执行栈中现在是这样：

```
ECStack = [fooExecutionContext, GlobalExecutionContext];
```

foo的执行上下文是这样：



```
fooExecutionContext = {
    //由于函数是默认调用 this绑定同样是全局对象
    ThisBinding: < Global Object > ,
    // 词法环境
    LexicalEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative", // 声明性环境记录
            // 标识符绑定在这里  arguments与局部变量在这
            Arguments: {},
        },
        // 外部环境引入记录为</checkscope>
        outer: < checkscopeEnvironment >
    }
}
```



foo执行也等同于是window调用，所以this同样指向全局window，但outer外部环境引入有点不同，这里指向了外层函数 checkscope，为啥是checkscope？

我们知道JavaScript采用的是词法作用域，也就是静态作用域，函数的作用域在定义时就确定了，而不是执行时确定。看个小例子来巩固下静态作用域：



```
var a = 1;

function fn1() {
    console.log(a);
};

function fn2() {
    var a = 2;
    fn1(a);
};

fn2(); //1
```



这里输出1，这是因为 fn1 定义在全局作用域中，它能访问的作用域就是全局，即便我们在 fn2中 调用，它依旧只能访问定义它地方的作用域。

明白了这个概念，这下总能理解foo执行上下文outer外部环境引入为啥是 checkscopeExecutionContext 了吧。

那也不对啊，现在执行栈中一共就 fooExecutionContext 与 GlobalExecutionContext 这两个，checkscopeExecutionContext 早被释放了啊，怎么还能访问到 checkscope 中的变量。

正常来说确实是不可以，但是JavaScript骚就骚在这里，即使 checkscope 执行上下文被释放，因为闭包 foo 外部环境 outer 的引用，从而让 checkscope作用域中的变量依旧存活在内存中，无法被释放。

这也是为什么谈到闭包我们总是强调手动释放自由变量。

这也是为什么文章开头我们说闭包是自带了执行环境的函数。

那么闭包的理解就点到这里，让我们总结一句，闭包是指能使用其它作用域自由变量的函数，即使作用域已销毁。

如果你在阅读上下文这段有疑惑，如果你好奇为什么var存在变量声明提升而let没有，还是强烈阅读博主这篇文章 [一篇文章看懂JS执行上下文 ](https://www.cnblogs.com/echolun/p/11438363.html)

 **肆 ❀ 闭包有什么用？**

说闭包聊闭包，结果闭包有啥用都不知道，甚至遇到了一个闭包第一时间都没反应过来这是闭包，这就是我以前的常态。那么我们专门说说闭包有啥用，不管用不用得上，作为了解也没坏处。

**1.模拟私有属性、方法**

在Java这类编程语言中是支持创建私有属性与方法的，所谓私有属性方法其实就是这些属性方法只能被同一个类中的其它方法所调用，但是JavaScript中并未提供专门用于创建私有属性的方法，但我们可以通过闭包模拟它，比如：



```
let fn = (function () {
    var privateCounter = 0;

    function changeBy(val) {
        privateCounter += val;
    };
    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            console.log(privateCounter);
        }
    };
})();
fn.value(); //0
fn.increment();
fn.increment();
fn.value(); //2
fn.decrement();
fn.value(); //1
```



这个例子中我们通过自执行函数返回了一个对象，这个对象中包含了三个闭包方法，除了这三个方法能访问变量privateCounter与 changeBy函数外，你无法再通过其它手段操作它们。

构造函数大家不陌生吧，构造函数中也有闭包，直接上例子：



```
function Echo(name) {
    //这是一个私有属性
    var age = 26;
    //这些是构造器属性
    this.name = name;
    this.hello = function () {
        console.log(`我的名字是${this.name},我今年${age}了`);
    };
};
var person = new Echo('听风是风');
person.hello();//我的名字是听风是风,我今年26了
```



如果大家对于我说构造函数中使用了闭包有疑问，可以阅读博主这篇文章[ js new一个对象的过程，实现一个简单的new方法](https://www.cnblogs.com/echolun/p/10903290.html) 这篇文章，其实new过程都会隐性返回一个对象，这个对象中也包含了构造函数中构造器属性中的方法。

如果某个属性方法在所有实例中都需要使用，我们一般推荐加在构造函数的prototype原型链上，还有种做法就是利用私有属性。比如这个例子中所有实例都可以正常使用变量 age。同时我们将age称为私有属性的同时，我们也会将this.hello称为特权方法，因为你只有通过这个方法才能访问被保护的私有属性age啊。

我在JavaScript模式 [精读JavaScript模式(七)，命名空间模式，私有成员与静态成员](https://www.cnblogs.com/echolun/p/10404011.html) 这篇文章中有介绍私有属性方法，静态属性法，特权方法，有兴趣也可以读读看（内链推的飞起...）。

**2.工厂函数**

什么是工厂函数？工厂函数给我的感觉与构造函数或者class类似，调用工厂函数就会生产该类（构造函数）的实例，我们举一个MDN的简单例子：



```
function makeAdder(x) {
    return function (y) {
        console.log(x + y);
    };
};

var a = makeAdder(5);
var b = makeAdder(10);
a(2); // 7
b(2); // 12
```



在这个例子中，我们利用了闭包自带执行环境的特性（即使外层作用域已销毁），仅仅使用一个形参完成了两个形参求和的骚操作，是不是很奈斯。当然例子函数还有个更专业的名词，叫函数柯里化。

**3.其它应用**

闭包其实在很多框架中都是随处可见的，比如angularjs中可以自定义过滤器，而自定义过滤器的方式同样也是一个闭包，比如这样：

```
angular.module('myApp',[])
    .filter('filterName',function () {
        return function () {
            //do something
        };
    })
```

如果我没记错，vue创建过滤器的方式貌似也是闭包....

 **伍 ❀ 闭包使用注意**

说了这么多，闭包总给我们一种高逼格的感觉，其实说到底也就是自带执行环境的函数而已，如果你要使用闭包有些地方还真的注意一下。

**1.闭包的性能与内存占用**

我们已经知道了闭包是自带执行环境的函数，相比普通函数，闭包对于内存的占用还真就比普通函数大，毕竟外层函数的自由变量无法释放。



```
function bindEvent(){
    let ele = document.querySelector('.ele');
    ele.onclick = function () {
        console.log(ele.style.color);
    };
};
bindEvent();
```



比如这个例子中，由于点击事件中使用到了外层函数中的DOM ele，导致 ele 始终无法释放，大家都知道操作DOM本来是件不太友好的事情，你现在操作别人不说，还抓着不放了，你良心不会痛？

比如这个例子你要获取color属性，那就单独复制一份color属性，在外层函数执行完毕后手动释放ele，像这样：



```
function bindEvent() {
    let ele = document.querySelector('.ele');
    let color = ele.style.color;
    ele.onclick = function () {
        console.log(color);
    };
    ele = null;
};
bindEvent();
```



**2.闭包中的this**

闭包中的this也会让人产生误解，我们在前面说了静态作用域的概念，即函数作用域在定义时就已经确定了，而不是调用时确定。this这个东西我们也知道，this在最终调用时才确定，而不是定义时确定，跟静态作用域有点相反。



```
var name = "听风是风";
var obj = {
    name: "行星飞行",
    sayName: function () {
        return function () {
            console.log(this.name);
        };
    }
};

obj.sayName()(); // ？
```



猜猜这里输出什么，很遗憾这里输出外层的听风是风，具体为什么其实在上文中通过执行上下文看闭包就解释了，下面的解释看不懂就回去重新读一遍。

函数每次执行都会创建执行上下文，而上下文又由this、词法环境、变量环境以及外部环境引用等组成，我们只说作用域是可以继承的，没人说this指向也可以继承吧。我们上面的代码改改：

```
var a = obj.sayName()
a(); //等同于window.a()
```

this指向是不能像作用域一样存在链式的，执行第二个方法时其实是window在调用，这下明白没？

那么有同学就要问了，那我要用在闭包中使用外层函数的this咋办，这还不简单，保存this呗：



```
var name = "听风是风";
var obj = {
    name: "行星飞行",
    sayName: function () {
        var that = this;
        return function () {
            console.log(that.name);
        };
    }
};
obj.sayName()();//行星飞行
```



 **陆 ❀ 总**

那么到这里，我们从闭包的起源解释了JavaScript闭包的来源，了解到闭包其实就是自带了执行环境的函数，如果在以后的面试中有面试官问你闭包，我希望你能通过在这里学到的知识秀的对方头皮发麻。

除了知道闭包的概念，我们还从执行上下文的角度解释了为何闭包还能使用已销毁父级函数的自由变量，并复习了作用域，作用域链以及静态作用域的概念。

说闭包用闭包，我们介绍了几种常规的闭包用法，以及在实际使用中我们应该注意的点。

那么到这里闭包文章就算写完了，下一篇写this。

[引用](https://www.cnblogs.com/echolun/p/11897004.html)