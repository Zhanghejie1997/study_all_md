# Sass的使用

数据类型

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

  

## 2、嵌套

允许和函数调用一样，不需要再分开写css快，和重复编写头。

但是又一个问题，伪类？

引入`&`选择器，把父级引入，替换为父级节点

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

```scss
//文件夹a.scss
.box1 {
	font-size:12px;
	.box2 {
		color:red;
	}
}
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

`@mixin`  定义  
他跟 `@font-face` `@media`很像但是不一样，对其是一个标识符

`@include`  使用

格式就像定义变量一样

`@mixin 混合器名 {}`  变量名

`@mixin 混合器名($name,$key:20px) {}`  变量名后面可以接受参数，实现类似于函数调用,设置默认值

`@include  混合器名` 使用

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

