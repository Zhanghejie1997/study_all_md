# vue经典学习

# 常用

- #### v-text

  - **详细**：

    更新元素的 `textContent`。如果要更新部分的 `textContent`，需要使用 `{{ Mustache }}` 插值。

  - **示例**：

    ```
    <span v-text="msg"></span>
    <!-- 和下面的一样 -->
    <span>{{msg}}</span>
    ```

- #### v-html

  - **详细**：

    更新元素的 `innerHTML`。**注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译**。如果试图使用 `v-html` 组合模板，可以重新考虑是否通过使用组件来替代。

- #### v-show

  - 使用css`display:none`隐藏

- #### v-if

  - 当和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高。
  - 不生成dom元素
  - 判断

- #### v-else

  - **不需要表达式**
  - **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`。

- #### v-else-if

  - **限制**：前一兄弟元素必须有 `v-if` 或 `v-else-if`。

  - ```
    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    ```

- #### v-for

  - 循环

  - ```
    <div v-for="item in items" :key="item.id">
      {{ item.text }}
    </div>
    ```

    

- #### v-on

  - **参数**：`event`

  - **修饰符**：

    - `.stop` - 调用 `event.stopPropagation()`。
    - `.prevent` - 调用 `event.preventDefault()`。
    - `.capture` - 添加事件侦听器时使用 capture 模式。
    - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
    - `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
    - `.native` - 监听组件根元素的原生事件。
    - `.once` - 只触发一次回调。
    - `.left` - (2.2.0) 只当点击鼠标左键时触发。
    - `.right` - (2.2.0) 只当点击鼠标右键时触发。
    - `.middle` - (2.2.0) 只当点击鼠标中键时触发。
    - `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

  - ```
    <!-- 方法处理器 -->
    <button v-on:click="doThis"></button>
    
    <!-- 动态事件 (2.6.0+) -->
    <button v-on:[event]="doThis"></button>
    
    <!-- 内联语句 -->
    <button v-on:click="doThat('hello', $event)"></button>
    
    <!-- 缩写 -->
    <button @click="doThis"></button>
    
    <!-- 动态事件缩写 (2.6.0+) -->
    <button @[event]="doThis"></button>
    
    <!-- 停止冒泡 -->
    <button @click.stop="doThis"></button>
    
    <!-- 阻止默认行为 -->
    <button @click.prevent="doThis"></button>
    
    <!-- 阻止默认行为，没有表达式 -->
    <form @submit.prevent></form>
    
    <!--  串联修饰符 -->
    <button @click.stop.prevent="doThis"></button>
    
    <!-- 键修饰符，键别名 -->
    <input @keyup.enter="onEnter">
    
    <!-- 键修饰符，键代码 -->
    <input @keyup.13="onEnter">
    
    <!-- 点击回调只会触发一次 -->
    <button v-on:click.once="doThis"></button>
    
    <!-- 对象语法 (2.4.0+) -->
    <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
    ```

    在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：

    ```
    <my-component @my-event="handleThis"></my-component>
    
    <!-- 内联语句 -->
    <my-component @my-event="handleThis(123, $event)"></my-component>
    
    <!-- 组件中的原生事件 -->
    <my-component @click.native="onClick"></my-component>
    ```

- #### v-bind

  - 动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。

    在绑定 `class` 或 `style` attribute 时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

  - 可以简写 `:`

  - **修饰符**：

    - `.prop` - 作为一个 DOM property 绑定而不是作为 attribute 绑定。([差别在哪里？](https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html#answer-6004028))

    - `.camel` - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase。(从 2.1.0 开始支持)

    - `.sync` (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 `v-on` 侦听器。

    - ```
      <!-- 绑定一个 attribute -->
      <img v-bind:src="imageSrc">
      
      <!-- 动态 attribute 名 (2.6.0+) -->
      <button v-bind:[key]="value"></button>
      
      <!-- 缩写 -->
      <img :src="imageSrc">
      
      <!-- 动态 attribute 名缩写 (2.6.0+) -->
      <button :[key]="value"></button>
      
      <!-- 内联字符串拼接 -->
      <img :src="'/path/to/images/' + fileName">
      
      <!-- class 绑定 -->
      <div :class="{ red: isRed }"></div>
      <div :class="[classA, classB]"></div>
      <div :class="[classA, { classB: isB, classC: isC }]">
      
      <!-- style 绑定 -->
      <div :style="{ fontSize: size + 'px' }"></div>
      <div :style="[styleObjectA, styleObjectB]"></div>
      
      <!-- 绑定一个全是 attribute 的对象 -->
      <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
      
      <!-- 通过 prop 修饰符绑定 DOM attribute -->
      <div v-bind:text-content.prop="text"></div>
      
      <!-- prop 绑定。“prop”必须在 my-component 中声明。-->
      <my-component :prop="someThing"></my-component>
      
      <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
      <child-component v-bind="$props"></child-component>
      
      <!-- XLink -->
      <svg><a :xlink:special="foo"></a></svg>
      ```

      

- #### v-model

  - **限制**：
    - `<input>`
    - `<select>`
    - `<textarea>`
    - components
  - **修饰符**：
    - [`.lazy`](https://cn.vuejs.org/v2/guide/forms.html#lazy) - 取代 `input` 监听 `change` 事件
    - [`.number`](https://cn.vuejs.org/v2/guide/forms.html#number) - 输入字符串转为有效的数字
    - [`.trim`](https://cn.vuejs.org/v2/guide/forms.html#trim) - 输入首尾空格过滤
  - 在表单控件或者组件上创建双向绑定。细节请看下面的教程链接。

- #### v-slot

  - 插槽，给子组件传递使用，需要两边都配置才可以使用

  - **限用于**

    - `<template>`
    - 组件 (对于一个单独的带 prop 的默认插槽)

  - ```
    <!-- 具名插槽 -->
    <base-layout>
      <template v-slot:header> //设置其对应的子组件插槽名字为header
        Header content
      </template>
    
      Default slot content
    	
      <template v-slot:footer>
        Footer content
      </template>
    </base-layout>
    
    <!-- 接收 prop 的具名插槽 -->
    <infinite-scroll>
      <template v-slot:item="slotProps">
        <div class="item">
          {{ slotProps.item.text }}
        </div>
      </template>
    </infinite-scroll>
    
    <!-- 接收 prop 的默认插槽，使用了解构 -->
    <mouse-position v-slot="{ x, y }">
      Mouse position: {{ x }}, {{ y }}
    </mouse-position>
    ```

  - ```
    //父组件
    <son :title.sync="syncNumber">
        <template v-slot:head> //
            <div>
            	head
            </div>
        </template>
        <div>parentSolt</div>
    </son>
    
    //子组件
    <template>
    <div>
      <slot name="head"></slot>
      <slot ></slot>
      <slot ></slot>
      <slot name="default"></slot>
    
      sync:{{title}}
      <a href="#" @click="$emit('update:title',title+1)">syncNumber+=1</a>
      <slot name="end"></slot>
    </div>
    </template>
    ```

- #### v-pre

  - **用法**：

    跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

  - 不进行渲染

- #### v-cloak

  - **不需要表达式**

  - **用法**：

    这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

  - **示例**：

    ```
    [v-cloak] {
      display: none;
    }
    ```

    ```
    <div v-cloak>
      {{ message }}
    </div>
    ```

    

    不会显示，直到编译结束。

- #### v-once

  - **不需要表达式**

  - **详细**：

    只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

    ```
    <!-- 单个元素 -->
    <span v-once>This will never change: {{msg}}</span>
    <!-- 有子元素 -->
    <div v-once>
      <h1>comment</h1>
      <p>{{msg}}</p>
    </div>
    <!-- 组件 -->
    <my-component v-once :comment="msg"></my-component>
    <!-- `v-for` 指令-->
    <ul>
      <li v-for="i in list" v-once>{{i}}</li>
    </ul>
    ```

  - **参考**：

    - [数据绑定语法- 插值](https://cn.vuejs.org/v2/guide/syntax.html#插值)
    - [组件 - 对低开销的静态组件使用 `v-once`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#通过-v-once-创建低开销的静态组件)

  - ```
    once (fn:function) :function (){
        let called = flase;
        return ( !called ){
            called = true;
            fn.apply(this,arguments)
        }
    }
    ```

    使用闭包,保存called,使用函数柯里化,返回函数

    