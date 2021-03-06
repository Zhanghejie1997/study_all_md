**Sass和Less的比较**

**不同之处**

**1、Less环境较Sass简单**

Cass的安装需要安装Ruby环境，Less基于JavaScript，是需要引入Less.js来处理代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放在项目中，有less.app、SimpleLess、CodeKit.app这样的工具，也有在线编辑地址。


**2、Less使用较Sass简单**

LESS 并没有裁剪 CSS 原有的特性，而是在现有 CSS 语法的基础上，为 CSS 加入程序式语言的特性。只要你了解 CSS 基础就可以很容易上手。


**3、从功能出发，Sass较Less略强大一些**

①sass有变量和作用域。
\- $variable，like php；
\- #｛$variable｝like ruby；
\- 变量有全局和局部之分，并且有优先级。


②sass有函数的概念；
\- @function和@return以及函数参数（还有不定参）可以让你像js开发那样封装你想要的逻辑。
-@mixin类似function但缺少像function的编程逻辑，更多的是提高css代码段的复用性和模块化，这个用的人也是最多的。
-ruby提供了非常丰富的内置原生api。

③进程控制：
-条件：@if @else；
-循环遍历：@for @each @while
-继承：@extend
-引用：@import

④数据结构：
-$list类型=数组；
-$map类型=object；
其余的也有string、number、function等类型

**4、Less与Sass处理机制不一样**

前者是通过客户端处理的，后者是通过服务端处理，相比较之下前者解析会比后者慢一点

 

**5、关于变量在Less和Sass中的唯一区别就是Less用@，Sass用$。**

 

 **相同之处**

Less和Sass在语法上有些共性，比如下面这些：

1、混入(Mixins)——class中的class；
2、参数混入——可以传递参数的class，就像函数一样；
3、嵌套规则——Class中嵌套class，从而减少重复的代码；
4、运算——CSS中用上数学；
5、颜色功能——可以编辑颜色；
6、名字空间(namespace)——分组样式，从而可以被调用；
7、作用域——局部修改样式；
8、JavaScript 赋值——在CSS中使用JavaScript表达式赋值。

 

------

 

 **为什么选择使用Sass而不是Less？**

 

1、Sass在市面上有一些成熟的框架，比如说Compass，而且有很多框架也在使用Sass，比如说Foundation。

2、就国外讨论的热度来说，Sass绝对优于LESS。
3、就学习教程来说，Sass的教程要优于LESS。在国内LESS集中的教程是LESS中文官网，而Sass的中文教程，慢慢在国内也较为普遍。

4、Sass也是成熟的CSS预处理器之一，而且有一个稳定，强大的团队在维护。

5、同时还有Scss对sass语法进行了改良，Sass 3就变成了Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。

6、bootstrap（Web框架）最新推出的版本4，使用的就是Sass。

 

------

 

**既然大家都基本了解了这些概念性东西，****那么，下一次就让我们来说一下Sass吧~**

**1、Sass的安装和使用**

**2、Sass的基本用法**

**3、Sass的代码重用**

[参考1](https://www.cnblogs.com/roashley/p/7731865.html)