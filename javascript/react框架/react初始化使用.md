# react初始化使用

终端命令

```cmd
npm install -g create-react-app  //安装 
create-react-app my-app //my-app为自己的demo名称
```

页面引用

```
<script src="../build/react.development.js"></script>
<script src="../build/react-dom.development.js"></script>
<script src="../build/babel.min.js"></script>
```

## 开始使用

简化引用，就不需要下文的React.Component和ReactDom.render 

```javascript
import React,{Component} from 'react'
import {render} from 'react-dom'

<div id="example"></div>

```

## 使用语法

再使用html语句使用使用return(<div></div>) ,而在使用到对象属性的使用使用{this.property} (property为对应属性名),使用到父组件传递给子组件值的时候使用{this.props.property} (property为对应属性名)；

## 组件

#### 受控组件/非受控组件/半受控组件

1. 受控组件：由父组件传递给子组件的数据，由父组件修改。
2. 非受控组件：自己有自己的状态属性，自己修改。

3. 半受控组件：两者都有。

#### 函数组件/类组件

父组件调用

```javascript
<Child user="name" title="title">
    {this.user}  //由子组件的的children属性接受
</Child>
```

1. 函数组件。

   ```javascript
   function Child ({user,title,children}){
       const showMessage = ()=>{
           console.log(user);
       }
       const showUser = ()=>{
            setTimeout(showMessage, 3000);
       }
       return (
       	<div onClick="showUser">
           	user	
           </div>
       )
   }
   ```

   1. 函数需要使用箭头函数,解决函数的指向问题。

   2. 使用return返回。

   3. 调用  函数/变量 不加this。

   4. 传参的使用:函数接受名.父组件传递变量名。

   5. 无法调用state，和react的其他特性。(注解：可以16.8之后可以使用 react hooks  来操作)。

      ```
      const [count, setCount] = useState(0)
      const [count, setCount] = useState(initialState)
      参数： initialState 可以直接是当前state的初始值，也可以是一个函数，函数的返回值将作为state的值，参数只会在组件的初始渲染中起作用
      
      返回值：返回的是一个数组，一个是当前state的值，另一个是更新state的方法，这里面setState方法与class中的setState不同在于，此setState 不会合并state 中的值
      
      如果需要定义多个state 只需要多次调用useState 方法就行。
      后续补充
      ```

2. 类组件：

   ```javascript
   import React,{Component} from 'react'
   class Child extends Component{
       constructor(){
           super();
       }
       render(){
           const props = this.props; 
           const showUser = () =>{
               console.log(props.user)
           }
           const show = ()=>{
               setTimeout(showUset,3000)
           }
           return (
           	<div>
               	{this.props.user}||{this.props.children}
               </div>
           )
       }
   }
   ```

   1. 需要继承React.Component。
   2. 使用render(){ return ( )} 函数返回。
   3. 调用  函数/变量  加this。
   4. 传参的使用:this.props.父组件传递的变量名。

# 问题

​	1、延时处理导致的this指向问题？

​			由于触发时候当前组件消失，导致this指向问题的，由于react是单向数据流，可以使用闭包来解决问题。	

```javascript
class ProfilePage extends React.Component {
  render() {
    // 内部变量
    const props = this.props;

    const showMessage = () => {
      alert('Followed ' + props.user); //产生闭包
    };

    const handleClick = () => {
      setTimeout(showMessage, 1000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

2、为什么需要使用类，而不是使用函数，函数的接受成为天然的闭包存在。

```javascript
function ProfilePage({props}) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 1000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```

总结：闭包的使用更加精巧，也在并行模式下写出不容易有bug的代码。

### 





## 父子传递值

```javascript
//父组件
constructor(){
    super();
    this.start = [1,2,3,4];
}
render(){
	return (
    	<child title="title"></child>
    	<child title={this.title}></child>
    )
}
```

```javascript
子组件
render(){ 
    return (   //jsx
    	<div>
        	{this.props.title}   //注释，如果是对象则保存，需要提供对象的属性，展示对象的值
        <div>
    )
}
```



### 父子组件:

方法一

```javascript
<script type="text/babel">
const title = "传递给子组件";
class App extends React.Component{
    render(){  
        return (
            <div>
            子组件接收：{this.props.titleson}  //接收到父组件传递的值，到子组件的props中
            </div>
        )
	}
}

 ReactDOM.render(
     <div>
     	父组件 <App titleson={title}/>   //类名组件化，并把值传递给子组件
     </div>,
     document.getElementById('example')  //填装的位置
	//document.querySelector('#example')
 );
</script>
```

方法二

```javascript
<script type="text/babel">
const title = "传递给子组件";
class App extends React.Component{
    render(){  
        return (
            <div>
            子组件接收：{this.props.titleson}  //接收到父组件传递的值，到子组件的props中
            </div>
        )
	}
}

const app = new App({titleson:title}).render()  //传入参数，但是需要调用render()方法

 ReactDOM.render(
     app,   //使用中间变量来传递
     document.getElementById('example')  //填装的位置
 );
</script>
```

render的等价于

```javascript
class Appextends React.Component{
	render(){
		return (
			React.createElement('div',{className:'app',id:'app'},
				React.createElement('div',{className:'child',id:'child'，style={{color:'#66ccff'}} },child)
			)
		)
	}
}
//React.createElement(type,[props],[...children])
//style中的{{}}标示为{}，
//第一个参数事标签，第二个参数事标签属性，第三个包括第三个之后参数是标签的内容，支持递归
```

等价于

```
class App extends React.Component{
	render()
		return (
			<div id="app" className="app">
				<div id="child" className="child">child</div>
			</div>
		)
	}
}
```
