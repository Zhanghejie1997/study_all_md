# 简洁化if...else

 **壹 ❀ 引**

在JavaScript开发中，条件判断语句的使用频率是极高的，而对于条件判断简单易读的if else应该都是大家的首选。可是代码写的久了，我们总是希望自己的代码看着能更为简洁规范（逼格更高），那么今天我们就由浅到深介绍几种实用小技巧，帮大家减少代码中的if else。说在开头，本文并未有消灭或歧视 if else的意思，if else的好用都知道，这里只是在某些特定场景为大家额外提供一种思路罢了，如何使用还请自行抉择，那么本文开始。

 **贰 ❀ 短路求值**

在函数定义时，常有若函数调用未提供参数则使用默认值的情景，当然我们可以使用if else来解决这个问题：



```
function fn(name) {
    if(!name){
        name = '听风是风';
    };
    console.log(name);
};
fn();//听风是风
fn('行星飞行');//行星飞行
```

有没有更优雅的做法呢？当然，我们可以使用短路求值，像这样：

```
function fn(name) {
    name = name || '听风是风';
    console.log(name);
};
fn();//听风是风
fn('行星飞行');//行星飞行
```

我们简单复习下 ||或 和 &&与 的概念，||表示两者任意一个为真便为真，&&表示两者都为真才是真，任意一个为假就是假。

为什么这个特定能用在变量赋值呢？其实这是利用了 || 前者为真后者不判断，&&前者为假后者不判断的特点，来看个例子：



```
function fn() {
    console.log(1);
};
true || fn(); //不执行
false && fn(); //不执行
false || fn(); //1
true && fn() //1
```



所以上面的短路求值中，当name有值时后面的默认值就被忽略了不判断，而name无值时便会判断后者取到默认值。

短路求值除了用在变量赋值外，还能用于函数调用，比如在下方例子为假时才调用某个方法：



```
let name = false;
function fn() {
    console.log(1);
};
//if
if (!name) {
    fn();//1
};
//短路
!name && fn();//1
```



 对于函数形参短路赋值其实有个缺点，假设我的参数就是0，false或者null，因为短路的特性会被认为假，这样我们无法拿到想要的值，更佳的做法是使用ES6的形参默认值，像这样：



```
function fn(param) {
    param = param || 1;
    console.log(param);
};
fn(0); //1
fn(null); //1
fn(false); //1

//使用形参默认值
function fn1(param = 1) {
    console.log(param);
};
fn1(); //1
fn1(0); //0
fn1(null); //null
fn1(false); //false
```



 **叁 ❀ 三元运算符**

三元运算符我想大家都不会陌生，在开发中三元运算的使用场景其实非常多，比如我希望为条件为 true时变量为1，反之为0，通过三元运算符我们可以这样做：



```
let blo = true;
let num;
if (blo) {
    num = 1;
} else {
    num = 0;
};
console.log(num);//1

//三元运算符
blo =false;
blo ? num = 1 : num = 0;
console.log(num);//0
```



比如我们希望条件为true时调用函数fn，为false时什么也不做，使用三元看起来也会更加舒服：



```
let blo = true;
let fn = function () {
    console.log(1);
};
//if
if (blo) {
    fn(); //1
};

//三元
blo ? fn() : null;//1
```



在开发中函数常常需要 return 一份数据回去，有时候根据条件不同我们可能要分别对应返回不同的数据，三元也能解决这个问题：



```
let fn = function () {
    let flo = true;
    if (flo) {
        return 1;
    } else {
        return 2;
    };
};
let f = fn(); //1

let fn1 = function () {
    let flo = true;
    //三元
    return flo ? 1 : 2;
};
let f1 = fn1();//1
```



三元结合return的操作非常适合我们递归处理时做收尾工作，如果满足条件继续递归，不满足跳出递归，比如我们要求正整数N到0之间所有整数之和，可以这么写：

```
let result = 0;
function add(n){
    result += n
    return n>=2 ? add(n-1) : result;
};
let num = add(10);//55
```

怎么样？看着是不是特别简洁舒服。需要注意的是，三元运算符的表达式只能是单语句，否则无法使用，比如下方例子中由于执行语句超过了2句，这就无法使用三元运算符改写了：

```
let i = 5;
if (i > 0) {
    //执行语句超过2句
    console.log(1);
    i = 0;
};
```

 **肆 ❀ switch case**

短路求值与三元运算符固然好用，但其实有一个遗憾，它们都只能解决非A即B的条件判断，凡是条件判断超过两种就显得十分无力了。那难道我们只能使用 else if 吗，其实可以使用switch case。

例如A情况我们希望A情况输出a，B情况输出b，C情况输出c，其它情况输出d，用 else if 与switch case分别是这样：



```
let name = 'B';
//if else if
if (name === 'A') {
    console.log('a');
} else if (name === 'B') {
    console.log('b');
} else if (name === 'C') {
    console.log('c');
} else {
    console.log('d');
};

//switch case
switch (name) {
    case 'A':
        console.log('a');
        break;
    case 'B':
        console.log('b');
        break;
    case 'C':
        console.log('c');
    default:
        console.log('d');
};
```



那么我们希望A或B情况输出1，C情况输出2，其它情况输出3呢，switch case其实也能做到：



```
let name = 'B';
//if else if
if (name === 'A' || name === 'B') {
    console.log(1);
} else if (name === 'C') {
    console.log(2);
} else {
    console.log(3);
};

//switch case
switch (name) {
    case 'A':
    case 'B':
        console.log(1);
        break;
    case 'C':
        console.log(2);
    default:
        console.log(3);
};
```



当然我想大多数人还是会觉得switch case写起来贼麻烦，尽管它的可读性确实比 else if 更高，没关系，就算作为了解也没有坏处。

 **伍 ❀ 对象配置**

条件超过三种，else if 写起来不太优雅，switch case又觉得麻烦，有没有更棒的做法呢？我在实际开发遇到过这样一个情景，我需要根据用户不同的操作类型对同一份数据进行不同加工，比如新增，修改，删除等。那么我用else if是这么做的：



```
function del() {
    //删除操作
};

function add() {
    //新增
};

function update() {
    //更新
};

function process(operateType) {
    if (operateType === 'del') {
        del()
    } else if (operateType === 'add') {
        add()
    } else if (operateType === 'update') {
        update()
    };
};
process('del');//删除
```



一种很棒的做法就是通过对象配置，将你的操作类型作为key，具体操作的函数作为value，像这样：



```
function del() {
    //删除操作
};

function add() {
    //新增
};

function update() {
    //更新
};
let typeFn = {
    'del': del,
    'add': add,
    'update': update
};

function process(operateType) {
    typeFn[operateType]();
};
process('del'); //删除
```



怎么样，有没有眼前一亮呢？我们将需求升级，现在除了判断操作type类型外，还得额外附加一个状态类型，else if是这样，这里简单描述下：



```
function process(operateType, status) {
    if (operateType === 'del' && status === 1) {
        del()
    } else if (operateType === 'add'&& status === 2) {
        add()
    } else if (operateType === 'update'&& status === 3) {
        update()
    };
};
```



不太优雅，通过对象配置做法，我们其实只用将参数简单配置就OK了，像这样是不是更清爽呢：



```
let typeFn = {
    'del_1': del,
    'add_2': add,
    'update_3': update
};

function process(operateType,status) {
    typeFn[`${operateType}_${status}`]();
};
process('del',1); //删除
```



什么，对象配置的调用方式语义化不太明显？那各位可曾对ES6的map数据结构有了解呢，如果你觉得这样的调用不太实在，我们再改改，将调用条件与函数配置成map数据，像这样：



```
let typeFn = new Map([
    ['del_1', function () {/*do something*/ }],
    ['add_2', function () {/*do something*/ }],
    ['update_3', function () {/*do something*/ }],
]);

function process(operateType, status) {
    typeFn.get(`${operateType}_${status}`)();
};
process('del', 1); //删除
```



我们通过map数据的get方法去数据中找到方法执行，这下可读性总强一点了吧，诸君可否满意呢？

 **陆 ❀ 数组配置**

在处理条件判断时，我们常会遇到条件与对应结果全部已知的情况，比如我们要根据用户的经验设置等级头衔，[0,100)--萌新，[100,200)--骑士，[200,300)--英雄，[300-无限大]--传说，那么用else if怎么写已经没有悬念了：



```
function youAreMyHero(experience) {
    if (experience < 100) {
        return '萌新';
    } else if (experience < 200 && experience >= 100) {
        return '骑士';
    } else if (experience < 300 && experience >= 200) {
        return '英雄';
    } else if (experience >= 300) {
        return '传说';
    };
};
let level = youAreMyHero(351); //传说
```



对于这种条件与结果已知的情况，我们其实可以通过数组配置的形式将条件结果抽离出来，像这样：



```
function youAreMyHero(param) {
    let experience = [300, 200, 100];
    let level = ['传说', '英雄', '骑士', '萌新'];

    for (let i = 0; i < experience.length; i++) {
        if (param >= experience[i]) {
            return level[i];
        };
    };
    return level[level.length - 1];
};

let level = youAreMyHero(250); //英雄
```



这么做的好处就是便于管理条件与执行结果，如果后面新增了等级判断，我们不用去修改业务逻辑中的 else if 语句长度，只用单纯维护我们抽离的数据即可。

 **柒 ❀ 总**

那么到这里，我们大致介绍了五种可取代if else的方式，我们知道短路运算符除了短路求值，还能用于函数调用；三元运算符也不仅仅是处理变量赋值，在return场景结合三元用起来居然如此舒适。

在文章后半段，我们还了解了对象配置，利用map数据结构，以及数据实行来解决特殊场景。我并不推荐为了追求高逼格而牺牲代码可读性，但我更希望在你以后的代码中不仅仅只有if else，那么到这里本文结束。