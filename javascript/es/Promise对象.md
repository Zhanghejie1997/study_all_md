# Promise对象

## 定义

promise有三个状态：
1、pending[待定]初始状态
2、fulfilled[实现]操作成功
3、rejected[被否决]操作失败

当promise状态发生改变，就会触发then()里的响应函数处理后续步骤；
promise状态一经改变，不会再变。

## 使用

定义一个Promise对象，其中在第一次使用时候，确认其状态，有接收函数决定，使用那个回调函数，第一个回调函数和第二个回调函数，resolve，reject，在之后的`then`使用中就可以使用return当作`resolve`或者使用`reject`来提示出错。

```JavaScript
let promise = new Promise((resolve, reject) => {
    console.log('promise');
    // reject();
    resolve();
  }).then(
    res=>{console.log('res1');return 'res'}, //执行下面then的第一个方法
    err=>{console.log('err1');reject()},    //执行下面的then的第二个方法
  ).then(
    res=>{console.log('res2');return 'res'},
    err=>{console.log('err2');reject()},
  ).then(
    res=>{console.log('res3');return 'res'},
    err=>{console.log('err3');reject()},
  ).then(
    res=>{console.log('res4');return 'res'},
    err=>{console.log('err4');reject()},
  ).then(
    res=>{console.log('res over');},
    err=>{console.log('err over');},
  )
```

### 异常

两种使用，一种是promise自带的`reject`回调函数，第二种是使用 throw  new Error('');，使用throw

catch也会返回一个promise实例，并且是resolved状态。

如果有异常会找最近解决异常的方法，比如then中的reject的回调函数，或者cathch方法

```javascript
let promise = new Promise((resolve, reject) => {
    console.log('promise');
    // reject();
    resolve();
    // return 'res'
  }).then(
    res => {
      console.log('res1');
      if (res) {
        return 'res';
      } else {
        throw new Error('err'); //发射异常
      }
    },
    err => { console.log('err1'); reject() },
  ).catch(err=>{    //捕获异常
    console.log(err);
    return	'err'  //给下面
  }).then(
	res=>{
    },
    err=>{
        console.log(err);  //这里就会获取上面的err
    }
	)
```

如果进行多个then传值，在其对应的每一个then中的resolve所对应的函数res中，使用return new Promise()一个Promise对象，且给与它状态，resole或者reject，在之后的then中就可以获取值，

## 方法all和race

all等待都执行完在执行，race谁先执行完谁执行。

```javascript
  let promises = [];
  let arr = [1, 2, 3, 4, 5];
  for (let index = 0; index < arr.length; index++) {
    promises.push(new Promise((resolve, reject) => {
      if (arr[index] > 0) {
        console.log('ok');
        
        resolve(index);
      } else {
        console.log('no');
        reject(index);
      }
    })
    )
  }
  let res=Promise.all(promises)
  .then(res=>{console.log('all res')},err=>{console.log('one err')})
  let err=Promise.race(promises)
  .then(res=>{console.log('frist is res')},err=>{console.log('frist is err')})
  console.log(res,err);
```



```JavaScript
 let promise = new Promise((resolve, reject) => {
    console.log('fn1');
    resolve('fn1()');
  }).then(
    res => {
      console.log('fn2  ' + res);
      return new Promise((resolve, reject) => {
        resolve('fn2()')
      })
    }, err => { }
  ).then(
    res => {
      console.log('fn3  ' + res);
      return new Promise((resolve, reject) => {
        resolve('fn3()')
      })
    }, err => { }
  ).then(
    res => {
      console.log('fn4  ' + res);
      return new Promise((resolve, reject) => {
        resolve('fn4()')
      })
    }, err => { }
  ).then(
    res => {
      console.log('all run ' + res)
    }, err => { }
  );
//-----结果
fn1
fn2  fn1()
fn3  fn2()
fn4  fn3()
all run fn4()

```

