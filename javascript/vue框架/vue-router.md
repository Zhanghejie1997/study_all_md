安装

```
vue install @vue/cli -g
```

[修改路由不刷新浏览器有两种方式对应前文]( http://zhanghejie.top/index.php/archives/22/)

router的模式：hash模式、history模式、abstract模式

**hash的原理**

```
<html>
<a href="#/home"> 首页</a> //#表示hash
<a href="#/about"> 关于</a>
</html>
```

```
<script>
//hash的使用
window.addEventListener('load',()=>{ //输入路径访问
	console.log(window.location.hash)
})
window.addEventListener('hashchange',()=>{ //点击事件的时候触发
	console.log(window.location.hash)
})
<script>
```

**//history api 404的发生，**

```
<html>
<a onclick="go('/home')> 首页</a>
</html>
<script>
function go(pathname){
history.pushState({},null,pathname) //更新页面路径连接，但是不会触发事件，虚假的
}
window.addEventListener('popstate',()=>{ //返回时候出现问题，添加返回时候的监听
go(location.pathname)
})
</script>
```

针对页面#的附加内容





### 在src中创建router文件index.js

```javascript
import VueRouter from 'vue-router'
//Vuerouter是一个类
import Home from '../App.vue'
import about from '../about.vue'

export default new Vuerouter ({
    mode: '' , //hash //history
    routes:[ // 规则
        {path:'/home' , component:Home},
        {path:'/about' , component:about},
        ]
})
```



**分离router下的内容**

```javascript
import VueRouter from 'vue-router'
//Vuerouter是一个类
import routes from './routes.js'

export default new Vuerouter ({
    mode: '' , //hash //history
    routes:routes;
})
```



**routes.js分离**

```javascript
import Home from '../App.vue'
import about from '../about.vue'
[
	{path:'/home' , component:Home},
    {path:'/about' , component:about},
]
```



**main.js中配置加载**

```javascript
import router from './router' //引入

Vue.use(router)

new Vue({
router,
})
```




**在.vue中使用**

```javascript
<router-view> </router-view>
```



### Vue-router部分实现

```
class HistoryRoute{
	constructor(){
		this.current = null;
	}
}
```

```javascript
class VueRouter{
	constructor(options){
        this.mode = options.mode || 'hash';
        this,routers = options.routes || [];
        //把对应path值对应component值
        this.routesMap = this.createMap(this.routes);
        //路由存放当前路径，需要控制状态
        this.history = new HistoryRoute;
        this.init() // 初始化
    }
    //返回{path:component}
    createMap(routes){
        return routes.reduce((memo,current)=>{
            return memo[current.path]=current.component;
        },{})
    }
    go () { }
    push () { }
    back () { }
    init () {
        if (this.mode === 'hash') {
          // 初始化，没有hash就跳转到#/
          window.location.hash ? '' : window.location.hash = '/';
          window.addEventListener('load', () => {
            this.history.current = window.location.hash.slice(1);// 去掉#
          });
          window.addEventListener('hashchange', () => {
            this.history.current = window.location.hash.slice(1);// 去掉#
          });
        } else {
          window.location.pathname ? '' : window.location.pathname = '/';
          window.addEventListener('load', () => {
            this.history.current = window.location.pathname;
          });
          window.addEventListener('popstate', () => {
            this.history.current = window.location.pathname;
          });
        }
  	}
}
```

```
VueRouter.install = function (Vue, opts) {
  Vue.mixin({
    beforeCreate () {
    // 跟vuex一样挂载到每个当前组件的vue实例中，使用同一个实例。
      if (this.$options && this.$options.router) {
        this._root = this;  //当前实例挂载到_root中
        this._router = this.$options.router; //把router实例挂载到_router
      } else {
        this._root = this.$parent._root;
        this._router = this.$parent._router
      }
      Object.defineProperty(this, '$route', {
        get () {
          return this._root._router;
        }
      })
      Object.defineProperty(this, '$router', {
        get () {
          return this._router;
        }
      })
      // console.log(this.$options);
      
    },
  })
      Vue.component('router-link', {
    render (h) {
      return h('a', {}, '首页');
    }
  })
  Vue.component('router-view', {
    render (h) {
      return <h1>首页</h1>;
    }
  })
};
```

