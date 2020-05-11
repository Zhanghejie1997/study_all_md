# webpack

#### 核心

1. entry	

   ​	入口

2. output

   ​	出口

3. loader

   ​	处理非JavaScript文件

4. plugins

   ​	插件，打包优化，压缩

5. mode

   ​	development开发环境，本地测试，production生产模式，需要优化





# vue的webpack配置

再vue.config.js中配置

```javascript
module.exports={
	configureWebpack:config=>{},
	chainWebpack:config=>{}
}
```

在这两个中配置，用法不同区别

chainWebpack：通过操作对象的形式，来修改webpack配置

configureWebpack：通过链式编程的形式来修改，来修改webpack配置

chainWebpack用法

```javascript
module.exports={
	chainWebpack:config=>{
		config.when(process.env.NODE_ENV === 'production', config=>{
			config.entry('app').clear().add('./src/main-prod.js')
			//发布模式下清空重新制定入口
            
            config.set('externals',{
                vue:'Vue',
                'vue-router':'VueRouter',
                axios:'axios',
                lodash:'_',
                echarts:'echarts',
            })
            //通过externals外部加载CDN资源
            //并在html头部中添加导入外部包 https://cdn.staticfile.org/
 			config.plugin('html').tap(args=>{
                args[0].isProd=true
                return args
            })
            //标识符给页面头部判断是否需要加载玩不cdn
            //页面使用<%= htmlWebpackPlugin.options.isProd?'':'dev' %>
            // <% if(htmlWebpackPlugin.options.isProd) { %>   <link />
            // <%  }  %>
		})
		config.when(process.env.NODE_ENV === 'development',config=>{
			config.entry('app').clear().add('./src/main.js')
			//开发模式下清空重定义入口
		})
	}
}
```

configureWebpack:







### 路由懒加载

导入npm install --save-dev @babel/plugin-syntax-dynamic-import

//配置json

{
"plugins": ["@babel/plugin-syntax-dynamic-import"]
}

修改import

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
```