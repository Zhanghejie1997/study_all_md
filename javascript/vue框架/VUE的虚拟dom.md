# VUE的虚拟dom

MVC:模型(model)、视图(view)、控制（controller）、,

1. 视图（View）：用户界面。 传送指令到 Controller
2. 控制器（Controller）：业务逻辑 完成业务逻辑后，要求 Model 改变状态

3. 模型（Model）：数据保存 将新的数据发送到 View，用户得到反馈

MVP:模型(model)、视图(view)、被动视图(Passive View）

1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter 非常厚，所有逻辑都部署在那里。

MVVM：模型(model)、视图(view)、视图模型(view model)

​	用mvp的Presenter 

唯一的区别是，它采用双向绑定（data-binding）：View 的变动，自动反映在 ViewModel，反之亦然。

优点：

缺点：