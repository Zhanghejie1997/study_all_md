# Vue生命周期

## 单一组件——加载渲染过程

```
父beforeCreate->父created->父beforeMount->父mounted
```

## 父子子组件——加载渲染过程

```
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
```

```
父BeforeCreate
父Created
父BeforeMount
    子BeforeCreate
    子Created
    子BeforeMount
    //——————
    子Mouted
父Mouted

```

## 单一组件更新——修改值、

```
父beforeUpdate->父updated
```

## 父子组件更新——props更新

```
父beforeUpdate->子beforeUpdate->子updated->父updated
```

```
父beforeUpdate
    子beforeUpdate
    子updated
父updated
```

## 父子组件销毁过程

```
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```

## 数据加载

在执行完`beforeCreate`的时候加载完数据和函数

```
//组件本身的属性，比如name都可以获取
BeforeCreate
//加载data、methods、
Created
BeforeMount
Mouted
BeforeUpdate
Updated
BeforeDestory
Destory
```

## 常用变量使用

#### $options //vue初始化选项可以使用

- ```
  new Vue({
    customOption: 'foo',
    created: function () {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

### 

```
//this.$options 可以使用
BeforeCreate
//加载data、methods、
Created
BeforeMount  //this.$el 有这个对象
Mouted  //this.$el  数据装填好了，可以使用这个对象
BeforeUpdate
Updated
BeforeDestory
Destory
```

## //Mouted 的时候才可以使用的

#### $el //这个vue组件的dom对象	

#### $refs 用来访问真实的DOM对象实例

#### $parent //父实例，如果当前实例有的话。

#### $root //当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

#### $children  //当前实例的直接子组件。**需要注意 `$children` 并不保证顺序，也不是响应式的。**如果你发现自己正在尝试使用 `$children` 来进行数据绑定，考虑使用一个数组配合 `v-for` 来生成子组件，并且使用 Array 作为真正的来源。

#### $slots  用来访问被[插槽分发](https://cn.vuejs.org/v2/guide/components.html#通过插槽分发内容)的内容。每个[具名插槽](https://cn.vuejs.org/v2/guide/components-slots.html#具名插槽)有其相应的 property (例如：`v-slot:foo` 中的内容将会在 `vm.$slots.foo` 中被找到)。`default` property 包括了所有没有被包含在具名插槽中的节点，或 `v-slot:default` 的内容。

#### 

## 存在混入mixin的情况下

混入是对所有组件的所有进行合并，且在钩子函数（生命周期函数时候优先触发。但是在数据和方法的时候，后触发，且对已经存在的方法和变量，不覆盖，重名以组件的为主）

且根据先混入的先执行，混入两次，先混入的先执行。

```
//组件本身的属性，比如name都可以获取
—混入BeforeCreate
父BeforeCreate
父data、methods 加载
—混入ata、methods 加载，不覆盖当前组件
—混入Created
父Created
—混入BeforeMount
父BeforeMount
	—混入BeforeCreate
    子BeforeCreate
    子data、methods 加载
	—混入ata、methods 加载，不覆盖当前组件
    子Created
    —混入BeforeMount
    子BeforeMount
    //——————
    —混入Mouted
    子Mouted
—混入Mouted
父Mouted
```







# 代码

```javascript
//main.js
import Vue from 'vue';
import App from './App.vue';

Vue.mixin({
  name: 'mixin',
  data() {
    console.log(`mixin混入:混入组件名:${this.$options.name}:data(from  ${this.from() || '函数读取不到'} )`);
    return {
      name: 'mixin2',
    };
  },

  beforeCreate() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeCreate(from  '函数读取不到'} )`);
  },
  created() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:created(from ${this.from() || '函数读取不到'} )`);
  },
  beforeMount() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeMount(from ${this.from() || '函数读取不到'} )`);
  },
  mounted() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:mounted(from ${this.from() || '函数读取不到'} )`);
  },
  beforeUpdate() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeUpdate(from ${this.from() || '函数读取不到'} )`);
  },
  updated() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:updated(from ${this.from() || '函数读取不到'} )`);
  },
  beforeDestroy() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeDestroy(from ${this.from() || '函数读取不到'} )`);
  },
  Destroy() {
    console.log(`mixin混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:Destroy(from ${this.from() || '函数读取不到'} )`);
  },
  methods: {
    from() {
      return 'Minxin3';
    },
  },
});
Vue.mixin({
  name: 'mixin2',
  data() {
    console.log(`mixin2混入:混入组件名:${this.$options.name}:data(from  ${this.from() || '函数读取不到'} )`);
    return {
      name: 'mixin22',
    };
  },

  beforeCreate() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeCreate(from  '函数读取不到'} )`);
  },
  created() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:created(from ${this.from() || '函数读取不到'} )`);
  },
  beforeMount() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeMount(from ${this.from() || '函数读取不到'} )`);
  },
  mounted() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:mounted(from ${this.from() || '函数读取不到'} )`);
  },
  beforeUpdate() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeUpdate(from ${this.from() || '函数读取不到'} )`);
  },
  updated() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:updated(from ${this.from() || '函数读取不到'} )`);
  },
  beforeDestroy() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:beforeDestroy(from ${this.from() || '函数读取不到'} )`);
  },
  Destroy() {
    console.log(`mixin2混入:数据：${this.name || '读不到'}:混入组件名:${this.$options.name}:Destroy(from ${this.from() || '函数读取不到'} )`);
  },
  methods: {
    from() {
      return 'Minxin3';
    },
  },
});



//App.vue
export default {
  name: 'App1',
  components: { Home },
  data() {
    console.log('App:data(from App)');
    return {
      name: 'App2',
      number: 1,
      count: 1,
      isShow: true,
    };
  },
  beforeCreate() {
    console.log('App:beforeCreate(from App)');
  },
  created() {
    console.log(`App:created(from App ${this.from()})`);
  },
  beforeMount() {
    console.log('App:beforeMount(from App)');
  },
  mounted() {
    console.log('App:mounted(from App)');
  },
  beforeUpdate() {
    console.log('App:beforeUpdate(from App)');
  },
  updated() {
    console.log('App:updated(from App)');
  },
  beforeDestroy() {
    console.log('App:beforeDestroy(from App)');
  },
  Destroy() {
    console.log('App:Destroy(from App)');
  },
  methods: {
    from() {
      return 'App3';
    },
    show() {
      console.log('show fun');
    },
    add() {
      this.number += 1;
      this.count += 1;
      console.log(this.number);
    },
  },
  render: (h) => h('h1'),
};

```



面试测试

```
//main.js
import Vue from 'vue';
import App from './App.vue';

Vue.mixin({
  name: 'mixin',
  data() {
    console.log(`${this.$options.name}:data (from mixin)`);
    return {
      name: 'mixin2',
    };
  },

  beforeCreate() {
    console.log(`${this.name}:beforeCreate(from mixin)`);
  },
  mounted() {
    console.log(`${this.name} ,${this.from()}`);
  },

  methods: {
    from() {
      return 'Minxin3';
    },
  },
});

const vm = new Vue({
  name: 'Root1',
  // store,
  // router,
  data() {
    console.log('Root:data(from Root)');
    return {
      name: 'Root2',
    };
  },
  methods: {
    from() {
      return 'Root3';
    },
  },
  mounted() {
    console.log('Root:mounted(from Root)');
  },


  render: (h) => h(App),
}).$mount('#app');

//App.vue
export default {
  name: 'App1',
  components: { Home },
  data() {
    console.log('App:data(from App)');
    return {
      name: 'App2',
      number: 1,
      count: 1,
      isShow: false,
    };
  },
  mounted() {
    console.log('App:mounted(from App)');
  },
  methods: {
    from() {
      return 'App3';
    },
    show() {
      console.log('show fun');
    },
    add() {
      this.number += 1;
      this.count += 1;
      console.log(this.number);
    },
  },
  render: (h) => h('h1'),
};
```



```
//答案
undefined :beforCreate (from Mixin);

Root:Data(from Root);
Root1:data(from mixin);

	undefined :beforCreate (from Mixin);
	
    App:data(from App);
    App1:Data(from mixin);
    
    App2:mounted(from App3);
    App2:mounted(from App)
    
Root2:mounted(from Root3);
Root:mounted(from Root)

```

