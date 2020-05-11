# Vuex解析

### store传入参数

```javascript
vuex.Store({
	state:{  //存放状态变量
		num:1,
	},
	getters:{ //存放获取方法
		getNum(state){
			return state.num;
		},
		setNum:(state) => (num){  //柯里化，返回一个函数来修改
			return state.num + num;
		}
	},
    // 使用方法可以追踪状态，而不是直接使用
    // 同步执行，
	mutations:{ //提交数据方法
		addNum (state,payload) {
          state.num ++ ;
        },
        addNumFn: (state,payload)=>(num) {
          state.num += num;
        },
	},
   //支持异步执行 
    actions:{
        addNum (context,payload) {   // context.stote获取对stote状态码
          	setTimeout(() => {
                context.commit('addNumFn',payload);
                resolve()
              }, 1000)
            context.commit('addNum');
            context.commit.state.name
        }
    },
    // 模块化
    module:{
        a: {
        	state:{
                num:3
            },
            mutations:{
                addNum (state) {
                    state.num ++ ;
                },
                addNumFn: (state)=>(num) {
                    state.num += num;
                },
            }
        },
    },
}
```

### 基本使用

```
this.$store.state.num  //直接使用
this.$store.getters.getNum   //使用getters内方法使用
this.$store.commit('gettersFn',payload);  //使用mutations方法提交
this.$store.dispatch('gettersFn',payload)    //使用actions触发,载荷形式
this.$store.dispatch({//使用actions触发，对象形式
		type:'gettersFn',   //固定使用type
        amount:payload})    //amount可以随意修改
```



### 便捷使用——辅助函数`mapState`、`mapMutations`、`mapGetters`、`mapActions`的使用

```
// 在vue组件使用中
import {mapState、mapMutations、mapGetters、mapActions} from 'vuex'
export default{
	name:'vue',
	methods:{
	
		// mapstate扩展使用
		...mapState({
			number:'num', //重新命名
			//新建方法，不推荐，推荐使用getters
			getNumber:function (state){
				return state.num ;
			}
		})
		//直接使用
		
		// mapMutations扩展使用
		...mapMutations([
			'addNum',  // 将 `this.addNum()` 映射为 `this.$store.commit('increment')`
			"addNumFn", 
		])
		//或者定义重命名
		...mapMutations({
			addNumber:'addNum', //重新命名 
			//将 `this.addNumberFn()` 映射为 `this.$store.commit('addNumFn')`
			addNumberFn:"addNumFn" 
		}),
		getNumer(){
			return this.addNumber;
		},
		getNumberFn(num){
			return this.addNumberFn(num);
		},
		
		
		// mapGetters的扩展使用
		...mapGetters({
          // 把 `this.add` 映射为 `this.$store.getters.addNum`
          addNumber: 'addNum'
        }),
		getNumber(){
        	//直接当成函数使用
			return addNumber()+100;
		},
		
		//mapActions扩展使用
		...mapActions({
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
			addNumber:'addNum'
		})
	}
}
```

引用store.js

```javascript
import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex);//用插件会调用默认的库的install方法；

export default new Vuex.Store({
	state:{  //存放变量
	
	}
})
```

### 结构

```
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```





### 刷新问题，刷新时候store会初始化，针对其解决就存储到sessionStorage中，加载时候触发，刷新时候保存

```
created () {
    var store = require('store');

    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("storedata") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("storedata"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
    });
    // 兼容iphone手机
    window.addEventListener("pagehide",()=>{
        sessionStorage.setItem("storedata",JSON.stringify(this.$store.state))
    });
  },
```



### 源码解析——模拟编写

### vuex.js模拟源码挂载在到vue中

```javascript
let Vue;
// vue会自动执行install函数
const install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      //每个组件都会执行的方法，来做到添加到每个组件中都有store对象，检查父类时候有有就拿一个store
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
};

export default {
  install, Store,
};

```



#### 常用方法剥离，由于存储格式大多数为b{a:fn(),b:fn(),c:fn()}；能快速获取对象属性对应的函数，并用callback，把key和对应函数执行。

```
// 遍历obj的元素，并执行回调函数
const forEach = (obj = {}, callback) => {
  Object.keys(obj).forEach((key) => {
    callback(key, obj[key]);
  });
};
```



#### 主要对象store，

```javascript
class Store {
  constructor(options) {
    //映射对象为响应式
    this.vm = new Vue({
      data: {
        //options变成响应式
        state: options.state,
      },
    });
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    // 初始化module树形模块数据
    this.modules = new ModuleCollection(options);
    // 安装模块
    installModule(this, this.state, [], this.modules.root);
  }

  // 接受dispath，执行对应type存储的函数，就达成可以一次调用，多个方法
  dispath = (type, payload) => {
    this.actions[type].forEach((fn) => fn(payload));
  }

  commit = (type, payload) => {
    this.mutations[type].forEach((fn) => fn(payload));
  }

  // 访问state转向为vm 下的对象，注释，由于模块原因，需要对模块生成树形结构的转化在 注释1
  get state() {
    return this.vm.state;
  }
}
```



#### store的初始化

```javascript
// 解析modlue模块的属性结构，生成树形结构
// 注释1：对modlue数据转为
// {state:{a:1,'模块名字':{}}}
class ModuleCollection {
  constructor(options) {
    this.register([], options);
  }

  // 递归函数，传入path为树形结构存储对象，rootmodule为数据
  register(path, rootModule) {
    const newModule = {
      raw: rootModule,
      children: {},
      state: rootModule.state,
    };
    if (path.length === 0) {
      this.root = newModule;
    } else {
      const parent = path.slice(0, -1).reduce(
        (root, current) => this.root.children[current],
        this.root,
      );
      parent.children[path[path.length - 1]] = newModule;
    }
    if (rootModule) { // 递归终止
      forEach(rootModule.modules, (moduleName, module) => {
        // 递归，传递path为modle名，module，为下面的rootmodule下面的模块
        this.register(path.concat(moduleName), module);
      });
    }
  }
}
```



#### 安装模块，把使用到的触发方法内容放入

```javascript

// 挂载并递归rootmodlue.childer下的所有对象也就是module模块
const installModule = (store, state, path, rootmodule) => {
  // 判断是否是子模块
  if (path.length > 0) {
    // 截取掉最后一位，并遍历
    const parent = path.slice(0, -1).reduce((states, current) => states[current], state);
    // 绑定vue，所以是vue的专属，不能替代
    Vue.set(parent, path[path.length - 1], rootmodule.state);
  }
  const { getters } = rootmodule.raw;
  // 劫持getters指向问题，
  if (getters) {
    forEach(getters, (gettersName, fn) => {
      Object.defineProperty(store.getters, gettersName, {
        get: () => fn(rootmodule.state),
      });
    });
  }
  // 对mutations的对象进行放入值和对应rootmodule.state的模块state绑定
  const { mutations } = rootmodule.raw;
  if (mutations) {
    forEach(mutations, (mutationsName, fn) => {
      // eslint-disable-next-line no-param-reassign
      const arr = store.mutations[mutationsName] || (store.mutations[mutationsName] = []);
      arr.push((...payload) => fn(rootmodule.state, payload));
    });
  }
  const { actions } = rootmodule.raw;
  if (actions) {
    forEach(actions, (actionsName, fn) => {
      // eslint-disable-next-line no-param-reassign
      const arr = store.actions[actionsName] || (store.actions[actionsName] = []);
      arr.push((...payload) => fn(state, payload));
    });
  }
  forEach(rootmodule.children, (childrenName, modlue) => {
    installModule(store, state, path.concat(childrenName), modlue);
  });
};



```



//namesapce 命名空间

//registeerModule  动态创建vuex

//store.subscribe()  vue中间件

后续补充