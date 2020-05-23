# Sass的使用

## 1、变量

定义:`$变量名: 值;`支持值中包含变量名。对其使用`-`、`_`两个都识别，且能相互转化，就是说 `$d-d`等于 `$d_d`，且会被覆盖，多次赋值同一变量，会覆盖。 使用 ` !default` 跟在变量后面就作为默认值。如果没又值就使用默认，

使用:`$变量名 [!default] = 值  ;`

例子

```scss
$width-big-box:400px;
$border-top:20px;
$broder-box:$border-top  10px 10px 10px;
body{
	border:$border;
}
```

### 数据类型

- 数字，`1, 2, 13, 10px`
- 字符串，有引号字符串与无引号字符串，`"foo", 'bar', baz`
- 颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型，`true, false`
- 空值，`null`
- 数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

而Sass 不会特殊对待这些属性值，一律视为无引号字符串。

关于字符串：

Sass两种字符串类型：有引号字符串 (quoted strings)，如 `"Lucida Grande"` `'http://sass-lang.com'`；与无引号字符串 (unquoted strings)，如 `sans-serif` `bold`，在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 `#{}` (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名：

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");
```

编译为

```css
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

### 运算符号

- 所有数据类型均支持相等运算 `==` 或 `!=`，此外，每种数据类型也有其各自支持的运算方式。
- 关系运算 `<, >, <=, >=` 也可用于数字运算，相等运算 `==, !=` 可用于所有数据类型。
- (`+, -, *, /, %`)   `()` 圆括号优先运算
  - 除法比较特别，以下三种情况 `/` 将被视为除法运算符号：
    - 如果值，或值的一部分，是变量或者函数的返回值
    - 如果值被圆括号包裹
    - 如果值是算数表达式的一部分
  - 加法
    - 如果又一边是引号类型字符串则都是引号类型字符串
- 布尔型 `and` `or` 以及 `not` 运算
- 数组不支持任何运算方式，只能使用 [list functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#list-functions) 控制。

例子

```scss
p {
    font: 10px/8px;             // Plain CSS, no division 
    font: 10px/8px + 0px; //才可以成功
    $width: 1000px;
    width: $width/2;            // Uses a variable, does division;
    width: round(1.5)/2;        // Uses a function, does division;
    height: (500px/2);          // Uses parentheses, does division;
    margin-left: 5px + 8px/2px; // Uses +, does division;
    color: #101010 + #101010 // 等于#202020  ，两位数两位数对应相加;
    
    color: rgba($color: #000000, $alpha: 1.0); //rgba包含两个数，必须alpha相同才可以相加;
    
	color: rbga(1,1,1,0.75) + rbga(1,1,1,0.75);
    // opacify 或 transparentize 两个函数进行调整。;
    $translucent-red: rgba(255, 0, 0, 0.5);
    color: opacify($translucent-red, 0.3);  //叠加(255,0,0,0.8);
 	background-color: transparentize($translucent-red, 0.3); //相减(255,0,0,0.2);
    
    content: 'I am ${txt}' //动态添加内容 
}
```

如果要强制其不为除号使用 `#{}`，并把它变成无引号状态

```scss
div {
 	$font-size: 12px;
 	 $line-height: 30px;
  	font: #{$font-size}/#{$line-height};
}
//----其结果
div {
    font:30px/12px
}


$name:box;
$bor:border;
div.#{$name} {
    #{$bor}:1px solid #000000;
}
//------结果
div.box {
    borer:1px solid #000000;
}

```



## 2、嵌套

允许和函数调用一样，不需要再分开写css快，和重复编写头。

但是又一个问题，伪类？

引入`&`选择器，把父级引入，替换为父级节点

& 为父节点，但是也是存在可以为null的情况,可以用`@if 布尔 {} @else {}`

```scss
@mixin does-parent-exist {
  @if & {
    &:hover {
      color: red;
    }
  } @else {
    a {
      color: red;
    }
  }
}
```



### 节点嵌套

```scss
body {
	div {
	}
    h1 & {}  //放在后面，登录h1 body
	span {
	}
    &:hover {} //放在签名 body:hover
    .arr {
        h1,h2,h3{}  //嵌套
    }
}
//------等价于
body {}
body div {}
h1 body {}
body span {}
body:hover {}
body .arr h1,body .arr h2,body .arr h3 {} 
```

### 属性嵌套

```scss
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
//-------等价于
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}


nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
//-------等价于
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```



## 3、符号

`~`、`>`、`+`。

`+`  同级且在当前元素紧挨之后的。如果连续则都选取 ：在同级情况下选取a,b,b....**需要连续** 

`>`  当前元素下紧挨的元素，仅匹配当前元素的子元素 选取  a{b...}  需要**关系为子元素**

`~`  同级且在当前元素之后的。div~span 是指，div和span同级，且选取在div之后的span {a,...b...} **不需要连续** 

例子：,选择是`div2`  

- div1
  - div1-1   `.div1 > .div1-1`
    - div1-1  //无效
- div2   `.div1 + .div2`  
- div2    `.div1 + .div2`  
- div3   `.div1 + .div3`  
- div2   //无效
- div3   `.div1 + .div3`  

```scss
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
//-------等价于
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

## 4、导入

`@import '文件路径'`

命名格式为 `_名字.scss`,导入则为 `名字.scss`  这样就不会编译scss成为css。 （使用webpack则不需要考虑这个问题）

一般导入导出要区分函数和混合器，或者把其需要的内容进行封装，而不是像.box1一样直接放着。

```scss
//文件夹a.scss
.box1 {
	font-size:12px;
	.box2 {
		color:red;
	}
}
@minxin fn() {}
@function fn2() {}
```

```scss
//文件夹b.scss
body {
    @import 'a'
}
//-----等同于
body {
   .box1 {
        font-size:12px;
        .box2 {
            color:red;
        }
    }
}
```

## 5、注释

```
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

## 6、混合器——css的函数调用

`@mixin`  定义    `@mixin 混合器名 [($变量)[:默认值] [,$变量[:默认值]] ] {}`
他跟 `@font-face` `@media`很像但是不一样，对其是一个标识符

`@include`  使用  `@include 混合器名[([$接受参数名:]$传入变量名 [,[$接受参数名:]$传入参数名])] [{传入到@content中}]

`@mixin` 可以用 `=` 表示，而 `@include` 可以用 `+`

`@content`  选择其 `@include ` 之后的 {} 里面的内容



格式就像定义变量一样

- 无参数

  `@mixin 混合器名 {}`  变量名

  `@include  混合器名` 使用

- 有参数

  `@mixin 混合器名($name,$key:20px) {}`  变量名后面可以接受参数，实现类似于函数调用,设置默认值

  `@include 混合器名(2,$key)`  传参 

  //`完整形式 @include 混合器名( 接口变量 : 接受值,接口变量 : 接受值)`
  `完整形式 @include 混合器名( $name: 'id', $key : $key)` //这里不会冲突，第一个`$key`是指定义混合器的时候接受的变量为key，第二`$key`是指当前使用的变量是。

`@extend 继承元素名`  

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
div {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
//------生成
div {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

`@extend 继承元素名`  

```scss
.div1 {
	//div1
}
.div2 {
	//div2
}
.div3 {
	@extend .div1
	//div3
}
.div4 {
	@extend .div1
	//div4
}

//------结果
.div1, div3, div4 {   ///添加到这里
	//
}
.div2 {
	//div2
}
.div3 {
	//div3
}
.div4 {
	//div4
}
```

**`@mixin` 可以用 `=` 表示，而 `@include` 可以用 `+`**   （webpck不适合用)

```
=apply-to-ie6-only
  * html
    @content

+apply-to-ie6-only
  #logo
    background-image: url(/logo.gif)
```

## 函数@function

格式

定义一个函数，

使用函数，就直接函数名，对其函数接收是选填的

```scss
@function 函数名字($接受变量) {
	@return $变量 * 10 + px;
}
body {
    font-size: 函数名字($接受变量: 3);
}
```

## 内置函数

- hsl

  ```scss
  hsl($hue $saturation $lightness)
  hsl($hue $saturation $lightness / $alpha)
  hsl($hue, $saturation, $lightness, $alpha: 1)
  hsla($hue $saturation $lightness)
  hsla($hue $saturation $lightness / $alpha)
  hsla($hue, $saturation, $lightness, $alpha: 1) //=> color 
  ```

- rbg

  ```scss
  rgb($red $green $blue)
  rgb($red $green $blue / $alpha)
  rgb($red, $green, $blue, $alpha: 1)
  rgb($color, $alpha)
  rgba($red $green $blue)
  rgba($red $green $blue / $alpha)
  rgba($red, $green, $blue, $alpha: 1)
  rgba($color, $alpha) //=> color 
  ```



区别

@mixin和@function的区别

