# vue经典学习

```
once (fn:function) :function (){
    let called = flase;
    return ( !called ){
        called = true;
        fn.apply(this,arguments)
    }
}
```

使用闭包,保存called,使用函数柯里化,返回函数