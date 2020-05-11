react卡壳

问题  属性propState.number + 1只添加1

```javascript
this.setState((propState) => {
	return { number: propState.number + 1 }
})
```

但是  整理的函数会执行两次

```javascript
console.log(3);
this.setState((propState) => {
    console.log("d");
    return { number: propState.number.map(item=>{
        item.is=!item.is;
        item.id=item.id+10;
        return item;
    })}
})
```

```
Totle.js:61 3
Totle.js:64 d
Totle.js:64 d
执行结果
```

第一个参数是对象会执行两边。

解决

数据更新setState中不执行对象的计数功能而在外面执行，问题，针对是setState的异步问题。