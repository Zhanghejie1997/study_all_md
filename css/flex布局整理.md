# 弹性布局flex和gird整理

## flex 适合立体多样式处理

#### 父元素

```
.flex{
	display:flex;
	flex-direction:row | row-reverse | column | column-reverse;
	//设置主轴方向：横着根据order从小到大|从大到小|竖着从小到大|从大到小
    flex-wrap:nowrap | wrap | wrap-reverse;
    //换行属性：不换|换行，第一行在上方|换行，第一行在下方 
    flex-flow:<flex-direction> || <flex-wrap>;
    //上两个简写 
    justify-content:flex-start | flex-end | center | space-between | space-around;
    //div靠齐模式：左边|右边|总结|两边扩大间距为0|间距相同两边间距为总结的一半
    align-items:flex-start | flex-end | center | baseline | stretch;
    //以什么对其:上边对其|下边对其|中间对其|第一行文字基线对其|上下拉伸
    align-content:flex-start|flex-end|center|space-between|space-around|stretch;
    //根轴线的对齐方式:跟justify-content同理，不过是副轴值跟align-items同理
    ///////如果项目只有一根轴线，该属性不起作用。
}
```

分化

```
.flex

.flex-dr{}
.flex-dr-re{}
.flex-dh{}
.flex-dh-re{}

.flex-vw{}
.flex-vw-re{}

.flex-jc-left{}
.flex-jc-right{}
.flex-jc-centent{}
.flex-jc-between{}
.flex-jc-around{}

.flex-ai:
.flex-ac:
```

子元素

```
.flex-item{
	order:integer;
	//数值，默认为0，可以是负数
	flex-grow:number;
	//放大比例，根据当前flex大小，有空间就放大，如果值为0则不放大
	flex-shrink:number;
	//缩小比例，当内容不足时候，都等比例缩小，0则不改变，在flex-warp:nowarp，有效默认为1，且加起来总和小于1时候会移除，且不会小于min-height和min-width
	flex-basis:<length> | auto;
	//设置主轴的大小，优先级比width和height高
	//优先级：max-widht/min-width/max-height/min-height > flex-basis>widht/height>内容的size
	flex:flex-grow|flex-shrink|flex-basis;
	//无单位则是flex-grow，有单位就是flex-basis
	align-self:auto | flex-start | flex-end | center | baseline | stretch;
	//自己的对其方式，覆盖自己的align-items;
}
```

## grid  适合二维处理

父元素

```
grid{
  display: grid;
  grid-template-rows: 33.3% 33.3% 33.3%; //水平分栏，repeat(3,40px)
  // repeat(3,minmax(40px,auto))
  grid-template-columns:[name] 33.3% 33.3% 33.3%; //垂直分栏/
  //1fr 空余空间平分分数 ，有5个这平分5取一份	
  grid-template-areas:"name name name" "name1 name2 . ";   
  //设置名字供子模块使用 .表示占位   如果不能围成矩形则内容无法使用。
  
  grid-template:"name name name" 25px "name4 name5 name6" 25px / auto 50px 25px
  //简单写前面是rows后面是columns。
  
  grid-cow-gap: 10px //行间距
  grid-column-gap:10px  // 列间距
  grid-gap:10px;//上面简写 两个的间距
  
  //同flex 的justify-content	
  justify-items: stretch(默认)|start|end|content;
  //x轴 填满|靠左侧|靠右侧|居中
  justify-content: stretch(默认)|start|end|content|space-around|space-between|space-evenly;
  //控制垂直的线模块和模块位置 填满|靠左侧|靠右侧|居中
  align-items: stretch(默认)|start|end|content;
  //y轴 填满|靠上侧|靠下侧|居中
  align-content: stretch(默认)|start|end|content;
  //y轴 填满|靠上侧|靠下侧|居中
  
   grid-auto-columns:  60px; 
   grid-auto-rows:  60px; 
   //应用网格线条默认为，当选择内容are的位置超越表格时候自动生成线条的间隔
   grid-auto-flex:   row | column | row dense | column dense; 
   //自动布局，会把位置打乱
   
   
   //总结grid方法
   grid:grid-template-rows/grid-template-columns  grid-template-area  grid-auto-rows/grid-auto-columns  grid-auto-flow grid-row-gap/grid-column-gap;
   grid: "header  header  header" 20px "header  header  header"20px 20px / 50px 1fr auto  
}
```



```
gird-item{
	//定位定制大小有  ,看线条，如果不存在线条则生成
	 grid-column-start/end   /列
     grid-row-start/end   /行
	 grid-row-start: 3;
     grid-row-end: 6;
     grid-row:3/6;//上面两个合并/分割。起点3终点是6也
     grid-area:3 / 3 / 6 / 6; //上面 合集row-start  column-start
     //header|main|section|aside|nav|footer  父类中设置grid-template-areas的名字，相同名字为一块
     
     justify-self：stretch(默认)|start|end|content;   //对应 justify-items
     align-self:  stretch(默认)|start|end|content;   //对应 align-items
}
```

grid：

​		针对的是线条的控制，可以控制线条的粗细（也就是间隔），再对其分割出来的元素进行位置控制。

​		流程针对于二维布局。

flex：

​		针对的是块的控制，不方便控制两个之间的空隙，且针对一维，允许换行。











兼容性：（webpack的自动补全）

```
.flex {
display: box; /* OLD - Android 4.4- */
display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
display: -ms-flexbox; /* TWEENER - IE 10 */
display: -webkit-flex; /* NEW - Chrome */
display: flex;
}
.flex-hc {
/* 09版 */
-webkit-box-pack: center;
/* 12版 */
-webkit-justify-content: center;
-moz-justify-content: center;
-ms-justify-content: center;
-o-justify-content: center;
justify-content: center;
/* 其它取值如下：
align-items 主轴原点方向对齐
flex-end 主轴延伸方向对齐
space-between 等间距排列，首尾不留白
space-around 等间距排列，首尾留白
*/
}

.flex-vc {
/* 09版 */
-webkit-box-align: center;
/* 12版 */
-webkit-align-items: center;
-moz-align-items: center;
-ms-align-items: center;
-o-align-items: center;
align-items: center;
}

.flex1 {
-webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
-moz-box-flex: 1; /* OLD - Firefox 19- */
width: 20%; /* For old syntax, otherwise collapses. */
-webkit-flex: 1; /* Chrome */
-ms-flex: 1; /* IE 10 */
flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.flex-h {
/* 09版 */
-webkit-box-orient: horizontal;
/* 12版 */
-webkit-flex-direction: row;
-moz-flex-direction: row;
-ms-flex-direction: row;
-o-flex-direction: row;
flex-direction: row;
}

.flex-v{
-webkit-box-orient: vertical;
/* 12版 */
-webkit-flex-direction: column;
-moz-flex-direction: column;
-ms-flex-direction: column;
-o-flex-direction: column;
flex-direction: column;
}

.flex-vw {
/* 09版 */
/*-webkit-box-lines: multiple;*/
/* 12版 */
-webkit-flex-wrap: wrap;
-moz-flex-wrap: wrap;
-ms-flex-wrap: wrap;
-o-flex-wrap: wrap;
flex-wrap: wrap;
}

.flex-1 {
-webkit-box-ordinal-group: 1; /* OLD - iOS 6-, Safari 3.1-6 */
-moz-box-ordinal-group: 1; /* OLD - Firefox 19- */
-ms-flex-order: 1; /* TWEENER - IE 10 */
-webkit-order: 1; /* NEW - Chrome */
order: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
.flex-2 {
-webkit-box-ordinal-group: 2; /* OLD - iOS 6-, Safari 3.1-6 */
-moz-box-ordinal-group: 2; /* OLD - Firefox 19- */
-ms-flex-order: 2; /* TWEENER - IE 10 */
-webkit-order: 2; /* NEW - Chrome */
order: 2; /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
```

