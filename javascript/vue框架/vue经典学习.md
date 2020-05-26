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

# vue 父子组件的生命周期顺序

### 一、加载渲染过程

```repl
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
```

### 二、子组件更新过程

```repl
父beforeUpdate->子beforeUpdate->子updated->父updated
```

### 三、父组件更新过程

```repl
父beforeUpdate->父updated
```

### 四、销毁过程

```repl
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```