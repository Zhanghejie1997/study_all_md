# VUE的虚拟dom——和双向绑定的更新

## MVC:模型(model)、视图(view)、控制（controller）、,

1. 视图（View）：用户界面。 传送指令到 Controller
2. 控制器（Controller）：业务逻辑 完成业务逻辑后，要求 Model 改变状态

3. 模型（Model）：数据保存 将新的数据发送到 View，用户得到反馈

## MVP:模型(model)、视图(view)、被动视图(Passive View）

1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter 非常厚，所有逻辑都部署在那里。

## MVVM：模型(model)、视图(view)、视图模型(view model)

​	用mvp的Presenter 

唯一的区别是，它采用双向绑定（data-binding）：View 的变动，自动反映在 ViewModel，反之亦然。

优点：只要修改model，就会自动更新真实页面。

### 缺点：

1.数据绑定使得 Bug 很难被调试。你看到界面异常了，有可能是你 View 的代码有 Bug，也可能是 Model 的代码有问题。数据绑定使得一个位置的 Bug 被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了。

2.一个大的模块中model也会很大，虽然使用方便了也很容易保证了数据的一致性，当时长期持有，不释放内存就造成了花费更多的内存。

3.数据双向绑定不利于代码重用。客户端开发最常用的重用是View，但是数据双向绑定技术，让你在一个View都绑定了一个model，不同模块的model都不同。那就不能简单重用View了。

## 虚拟dom——vdom

就是使用js在模拟dom结构的树形结构，对于开发来说，对一次dom元素的修改，就需要对整个容器进行修改，及其大降低性能，使用vdom就是使用纯js计算，计算出之后再进行dom操作，就能大大提高效率。

优点：

1. 最终表现在DOM上的修改只是变更的部分，可以保证非常高效的渲染。
2. 提升了性能（JavaScript对象比DOM对象性能高），抽象了DOM的具体实现（对DOM进行了一层抽象）
3. 很好的维护、更好的开发。

缺点：

1. 首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。
2. 会比手动更新的慢。
3. 占用内存，需要diff算法比较，耗时间。



其更新需要，进行diff算法，更新页面

# 渲染和更新

对其数据添加set、get的绑定。

```javascript
function defineReaction(obj,key,val) {
	let dep = new Dep();
	Object.defineProperty(obj,key,{
        get() {
            dep.depend();//添加到Dep类种，实现是有使用这个变量，后期更新的时候就会检查。
            return val;
        },
        set(newVal) {
			val = newVal;
            dep.notify(); //在dep中通知有数据被赋值，就是说被修改了
        }
	})
}
```

什么是Dep

```
	class Dep {
		constructor(){
			this.subs = []
		},
		//增加订阅者
		addSub(sub){
			this.subs.push(sub);
		},
        //判断是否增加订阅者
		depend () {
		    if (Dep.target) {
		     	this.addSub(Dep.target)
		    }
		},

		//通知订阅者更新
		notify(){
			this.subs.forEach((sub) =>{
				sub.update()
			})
		}
	}
Dep.target = null;
```

