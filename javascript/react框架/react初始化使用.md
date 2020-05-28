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

# jsx

## 使用

就像\`string \` 可以放字符串一样，还可以放变量使用 `{}`包裹  ，但是jsx不需要\`来包裹，且如果换行出现js自动补全分号的原因，所以使用 `()`  包裹起来。且可以使用嵌套。循环判断

### 例子：

```react
return (
	<div>
		test_Jsx
        {this.props.isShow?`<div>true</div>`:`<div>false</div>` } //嵌套
        <div>{this.props.isShow?`true`:`false` } </div>
        {this.props.arr.map(item=>{return (<div>item</div>)})} //循环
        
        //技巧
        {this.props.isReader && <h1>title</h1>} //使用技巧，true的时候显示，flase不显示
	</div>
)
```

## 事件

`onclick="function"` 点击事件

```react
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('链接被点击');
  }
 
  return (
    //事件
    <button onclick={handleClick}>
        激活按钮
    </button>
    <a href="#" onClick={handleClick}>
      点我
    </a>
  );
}
	
//-----一般使用
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
 
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
 
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

# 判断

使用函数判断来返回使用那个组件。

```react
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {    
      return <UserGreeting />;  
  }  
   return <GuestGreeting />;
}
ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,  
    document.getElementById('root')
);
```

甚至是是否显示

```react
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```





# 组件

## 受控组件/非受控组件/半受控组件

1. 受控组件：由父组件传递给子组件的数据，由父组件修改。
2. 非受控组件：自己有自己的状态属性，自己修改。

3. 半受控组件：两者都有。

## 函数组件/类组件

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

   ```react
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

   ```react
   class Clock extends React.Component {
     constructor(props) {
       super(props);
       this.state = {date: new Date()};
     }
   
     componentDidMount() {
       this.timerID = setInterval(
         () => this.tick(),
         1000
       );
     }
   
     componentWillUnmount() {
       clearInterval(this.timerID);
     }
   
     tick() {
       this.setState({
         date: new Date()
       });
     }
   
     render() {
       return (
         <div>
           <h1>Hello, world!</h1>
           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
         </div>
       );
     }
   }
   ```

   

   1. 需要继承React.Component。
   2. 使用render(){ return ( )} 函数返回。
   3. 调用  函数/变量  加this。
   4. 传参的使用:this.props.父组件传递的变量名。

## 问题

### 	1、延时处理导致的this指向问题？

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

### 2、为什么需要使用类，而不是使用函数，函数的接受成为天然的闭包存在。

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

## 验证器——prop-types插件来使用

再类使用props接收的时候对其进行类型验证，

使用`propTypes`静态对象接收

```react
static propTypes = {
    propArr: PropTypes.arrayOf(
      PropTypes.shape(
        {
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          isCompleted: PropTypes.bool.isRequired
        }
      ).isRequired
    )react
  }
propTypes = {
     optionalArray: PropTypes.array,//检测数组类型
     optionalBool: PropTypes.bool,//检测布尔类型
     optionalFunc: PropTypes.func,//检测函数（Function类型）
     optionalNumber: PropTypes.number,//检测数字
     optionalObject: PropTypes.object,//检测对象
     optionalString: PropTypes.string,//检测字符串
     optionalSymbol: PropTypes.symbol,//ES6新增的symbol类型
}
```



## 获取真实dom节点 ref

跟vue的ref一样。

```react
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();  //获取return的ref
  },
  render: function() {
    return (react
      <div>
        <input type="text" ref="myTextInput" /> //指定ref
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});
```

## 生命周期

**componentDidMount()** 与 **componentWillUnmount()** 方法被称作生命周期钩子。

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }
 
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Clock />,
  document.getElementById('example')
);
```

**代码执行顺序：**

1. 当 `` 被传递给 `ReactDOM.render()` 时，React 调用 `Clock` 组件的构造函数。 由于 `Clock` 需要显示当前时间，所以使用包含当前时间的对象来初始化 `this.state` 。 我们稍后会更新此状态。
2. React 然后调用 `Clock` 组件的 `render()` 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 `Clock` 的渲染输出。
3. 当 `Clock` 的输出插入到 DOM 中时，React 调用 `componentDidMount()` 生命周期钩子。 在其中，`Clock` 组件要求浏览器设置一个定时器，每秒钟调用一次 `tick()`。
4. 浏览器每秒钟调用 `tick()` 方法。 在其中，`Clock` 组件通过使用包含当前时间的对象调用 `setState()` 来调度UI更新。 通过调用 `setState()` ，React 知道状态已经改变，并再次调用 `render()` 方法来确定屏幕上应当显示什么。 这一次，`render()` 方法中的 `this.state.date` 将不同，所以渲染输出将包含更新的时间，并相应地更新 DOM。
5. 一旦 `Clock` 组件被从 DOM 中移除，React 会调用 `componentWillUnmount()` 这个钩子函数，定时器也就会被清除。

## react

组件API

- 设置状态：setState

  - ```
    setState(object nextState[, function callback])
    ```

    ```
    class Counter extends React.Component{
      constructor(props) {
          super(props);
          this.state = {clickCount: 0};
          this.handleClick = this.handleClick.bind(this);
      }
      
      handleClick() {
        this.setState(function(state) {
          return {clickCount: state.clickCount + 1};
        });
      }
      render () {
        return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);
      }
    }
    ReactDOM.render(
      <Counter />,
      document.getElementById('example')
    );
    ```

    

- 替换状态：replaceState

  - ```
    replaceState(object nextState[, function callback])
    ```

    - **nextState**，将要设置的新状态，该状态会替换当前的**state**。
    - **callback**，可选参数，回调函数。该函数会在**replaceState**设置成功，且组件重新渲染后调用。

    **replaceState()**方法与**setState()**类似，但是方法只会保留**nextState**中状态，原**state**不在**nextState**中的状态都会被删除。

- 设置属性：setProps

  - ```
    setProps(object nextProps[, function callback])
    ```

    - **nextProps**，将要设置的新属性，该状态会和当前的**props**合并
    - **callback**，可选参数，回调函数。该函数会在**setProps**设置成功，且组件重新渲染后调用。

- 替换属性：replaceProps

  - ```
    replaceProps(object nextProps[, function callback])
    ```

    - **nextProps**，将要设置的新属性，该属性会替换当前的**props**。
    - **callback**，可选参数，回调函数。该函数会在**replaceProps**设置成功，且组件重新渲染后调用。

    **replaceProps()**方法与**setProps**类似，但它会删除原有 props。

- 强制更新：forceUpdate

  - ```
    forceUpdate([function callback])
    ```

    ### 参数说明

    - **callback**，可选参数，回调函数。该函数会在组件**render()**方法调用后调用。

    forceUpdate()方法会使组件调用自身的render()方法重新渲染组件，组件的子组件也会调用自己的render()。但是，组件重新渲染时，依然会读取this.props和this.state，如果状态没有改变，那么React只会更新DOM。

    forceUpdate()方法适用于this.props和this.state之外的组件重绘（如：修改了this.state后），通过该方法通知React需要调用render()

    一般来说，应该尽量避免使用forceUpdate()，而仅从this.props和this.state中读取状态并由React触发render()调用。

- 获取DOM节点：findDOMNode

  - ```
    DOMElement findDOMNode()
    ```

    - 返回值：DOM元素DOMElement

    如果组件已经挂载到DOM中，该方法返回对应的本地浏览器 DOM 元素。当**render**返回**null** 或 **false**时，**this.findDOMNode()**也会返回**null**。从DOM 中读取值的时候，该方法很有用，如：获取表单字段的值和做一些 DOM 操作。

- 判断组件挂载状态：isMounted

  - ```
    bool isMounted()
    ```

    - 返回值：**true**或**false**，表示组件是否已挂载到DOM中