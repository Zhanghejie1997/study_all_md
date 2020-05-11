# vue底层流程

1. 获取绑定id的dom树

   1. 把dom树解析，生成vnode类，生成虚拟dom。

   2. 类中有类型、值、对应属性date中，对其解析出{{}}绑定的数据。

   3. 柯里化的函数（把虚拟dom生成为真实dom树）中包含虚拟dom的模板，留下传入参数，进行更新。

   4. 更新 使用二次提交（类似于数据库的事务）且虚拟dom和真实dom一一对应，每次改变数据就会生成一个新的vnode，监测到于原来不一样才更新，

   5. <img src="C:\Users\巧嫒\Desktop\Snipaste_2020-04-18_00-20-24.png" alt="Snipaste_2020-04-18_00-20-24" style="zoom:60%;" />

      ```javascript
      function JGVue(options){  //主要函数
      	this.data = options.data;
      	this.el = options.el;
      	
      	this.mount(); //挂载
      }
      JGVue.prototype.mount=function (){
      	//提供一个render方法：生成虚拟dom
      	this.render=this.createRenderFn();
      	
      	this.mountComponent();
      }
      JGVue.prototype.mountCompont = function(){
      	let mount=()={
      		this.update(this.render())
      	}
      	//就是全局watcher
      	new Watcher(this,mount);
      }
      // 缓存为抽象语法树，和数据结合
      JGVue.prototype.createRenderF = function (){
      	let ast = getVNode(this._data);
          //将AST+data = >VNode
          return function render(){
              let _tmp = combone( ast , this._data);
              return _tmp;
          }
      }
      //生成修改树  //下面需要使用
      JGVue.prototype.initDate = function(){
      	//遍历this._data成员。
      	let key = Object.keys(this._data);
      	//响应式化
      	observe(this._data,this);
      	//代理，在访问this的属性的时候，相当于在访问this._date中的属性
      	fot(let i = 0 ;i<keys.length ; i++){
      		//将要_this._data[keys[i]]映射到this[keys[i]]中
      		proxy(this,'_data',keys[i]);  // 注意es6有Proxy对象
      	}
      }
      //修改响应式目标，把对this下面的属性操作修改到_data中
      function proxy(target,prop,key){
          Object.defineProperty(target,key,{
              enumerable:true,
              configurable:true,
              get(){
                  return target._data[prop][key]
              },
              set(newValue){
                  target._data[prop][key]=newValue
              }
          })
      }
      ```
      
   6. 把数据绑定，生成响应式 reactify(date),添加的响应式
   
   ```javascript
      functino defineReactive(target,key,value,enumerable//时候能遍历){
   	if( typeof value==="object" && value !=null ){
      		reactify(value);  //递归
      	}
      	Object.defineProperty(target,key,{
      		configurble:true,
      		enumerable:!!enumerable,  //时候能遍历
      		get(){
      			return value;   //形成闭包缓存在value中
      		}
      		set(newValue){
              	//临时使用
              	if(typeof newValue === 'object' && newValue != null){
                      value = reactify(newValue);  //对其进行响应式添加，
                  }
      			else{
                      value = newValue
                  }
              	//有缺陷，2.X修改为3.0使用proxy修复了
      			//修改了就需要改变html中的，就在watcher;
              	this.mountComponent() //假的临时使用更新的，局部方法，到时候需要解耦，使用watcher
      		}
      	})
      }
      //会修改为observe
      function reactify(o){
      	let key = Object.keys(o); //获取o的键值队的键,就是类似于vue中date的数据，
      	for(let i = o ;i< key.length ; i++){
          	let key = keys[i];
          	let value = o[key];
          	if(Array.isArray(value)){ //如果是数组则需要把每个元素都添加响应式，需要遍历
          		value.__proto__ =  array_methods ; //数组制作成为响应式，添加一个中间拦截
          		for(let j = 0 ;j < value.length; j++){
          			reactify(value[j]); //递归
          		}
          	}else{
          		defineReactive.call(o,key,value,true);
          	}
      	}
      }
      let array_methods=Object.create(Array.prototype);  //生成Array的拦截
      let Array_moethod=[
      	'pop','push','shift','unshift','reverse','sort','splice'
      ]
      Array_moethod.forEach(method=>{  
          array_methods[method] = function (){  //添加拦截
              //放置新添加的方法
              Array.prototype[method].apply(this.arguments); 使用原生方法
       }
      })
   
   ```

   7. 出现一个问题，给变量赋值一个对象或者一个数组的时候没法渲染2.0使用无法有效解决，

   8. 源数据树和更新数据树做对比，生成两个数维护困难，initDate()方法。

   9. 解耦针对mountComponent更新页面=>更新是当前页面的虚拟dom，对应为了组件化
   
   10. 使用发布订阅模式。不在写死。也是事件模型，如on，emit，off，做到可以添加事件，移除事件
   
       event.emit('时间名'，参数)，对@click也可以添加事件。
   
       ```
    var event = (function(){
        var enentObjs={};
        return{
        	//注册事件
        	on:function ( type,handler ){
        		(enentObjs[type]||enentObjs[ type ] == [] ).push(handler);
        	},
           //移除事件，没参数就移除所有事件，有参数就移除事件名下的所有参数，两个参数移除某一个事件的具体函数
        	//移除函数和存储函数需要等值判断，使用一个变量存储函数。
            off:function (type,handler){
               if(arguments.lenght === 0 ){
                   enentObjs={};
               }else if( arguments.lenght ===1 ){
                   enentObjs[type]=[];
               }else if( arguments.lenght ===2 ){
                   //使用循环该函数对应的type事件，需要使用倒叙循环；
                   let _events = enentObjs[type];
                   if( !_events ) {return}
                   for(let i = _events.length-1 ; i >= 0 ; i-- ){
                       if( _events[i] ===handler ){
                           _events.splice( i,1 );
                       }
                   }
               }
           },
           //发射事件
           emit:function (type){
               let args = Array.prototype.slice.call( arguments,1 ); //去掉第一个函数名
               let _events = eventObjs[type];
               if( _events ){return;}
               for ( let i = 0 ; i<_events.length ; i++ ){
                   _events[i].apply( null,args );
               }
           }
            //或者
             emit:function (type , ...items){
               let _events = eventObjs[type];
               if( _events ){return;}
               for ( let i = 0 ; i<_events.length ; i++ ){
                   _events[i].apply( null,items ); //重定向this
               }
        }
        }
    })
       ```

       

   11. 一个虚拟dom下的组件对应一个响应式下的data,对应一个watcher。

       在读取的时候，调用depend方法，将其对应的watcher存入全局watcher（是一个容器，用来存储watcher，一旦更新就清空）中。

       在模板渲染的时候，虚拟dom生成的时候会读取
   
       设置的时候，调用notify方法，将全局所有watcher触发--说明数据变更
   
   12.  
   
   13. ```javascript
        //将要对象obj变成响应式，vm就是vue实例
       function observe(obj,vm){
           if(Array.isArray(obj)){
               obj.__proto__ = Array_moethod;//中间拦截对象
            for( let i = 0;i<obj.length;i++ ){
                   observe(obj[i],vm);
            }
           }else{
            let keys=Object.keys(obj);
               for( let i = 0;i<keys.length;i++){
                   let prop=keys[i];
                   defineReactive.call(this,obj,prop,obj[prop],true) //制作响应式
               }
           }
       }
       function defineReact(vm,target,key,value,enumble){
           let that = this;
           if(typeof value==="object" && value !=null  && Array.isArray(value)){
       		observe(value,that);  //递归
       	}
           let dep = new Dep(); //
       	Object.defineProperty(target,key,{
       		configurble:true,
       		enumerable:!!enumerable,  //时候能遍历
       		get(){
                   dep.depend();//依赖收集
       			return value;   //形成闭包缓存在value中
       		}
       		set(newValue){
               	if(newValue === value ){return;}
               	if(typeof newValue === 'object' && newValue != null){
                       observe(newValue);
                   }
       			
               	value = newValue
                   
               	
               	dep.notify(); 
       		}
       	})
       }
       ```
   
       
   
       1. ### watcher和Dep 
   
       watcher在响应式对象中的get的时候添加依赖收集，
   
       不过组件是自治的，需要考虑多个watcher，每一个watcher描述一个渲染行为，子组件发送数据更新，页面需要更新渲染，vue推荐复杂的计算表达式，不推荐复杂的插值表达式。
   
       需要把属性对应的watcher关联起来，就是将当前的watcher存储到相关的dep中。就是双向链表，让watcher知道需要渲染了什么属性（存在dep中），让属性知道谁渲染它了。
   
       ```JavaScript
       let watcherid = 0;
       class watcher{
           constructor(vm,expOrfn){
               this.watcherid = watcherid++;
               this.vm=vm; //当前的组件vue实例
               this.getter=expOrfn; //更新页面的方法
               this.deps=[];//依赖收集
               this.depIds={};//一个set类，确保不重复；
               this.get();
           }
           //计算触发getter
           get(){
               pushTarget(this);
               
               this.getter.call(this.vm,this.vm);
               
               popTarget();
           }
           //执行的时候是懒加载，还是同步，h还是异步
           //现在只考虑异步，简化版本
           run(){
               this.get();//临时使用的。真实是使用queuewatcher触发nextTick
           }
           //对外公开的函数，用于属性发生变化时候触发的接口
           update(){
               run()
           }
           //清空依赖队列
           cleanupDep(){
               
           }
           //将当期
           addDep( dep ){
               this.deps.push( dep );
           }
       }
       ```
   
       ```javascript
       Dep.target = null;
       let targetStrack = []
       function pushTarget(target){
           targetStrack.unshift(target);
           Dep.target = target;
       }
       
       function popTarget(){
       	Dep.target = Dep.targetStrack.shift();
       }
       ```
   
       
   
       ```JavaScript
       let depid = 0;
       class dep {
           constructor(){
               this.depid = depid++;
               this.subs = [];  //存放需要渲染什么属性的watcher  
           }
           //触发关联的watcher的update方法，起到更新做用
       	notify(){
               let deps = this.subs.slice();
               deps.forEach( watcher=>{
                   watcher.update();
               })
           }
       	//添加一个watcher
           addSub( sub ){
               this.subs.push( sub );
           }
       	//删除一个watcher
       	removeSub( sub ){
           	for(let i = this.subs.lenght-1 ;i >= 0 ;i-- ){
                   if(sub === this.subs[i]){
                       this.subs.splic(i,1);
                   }
               }
       	}
       	//将当前的dep和watcher关联
       	depend(){
               if( Dep.target){
                   this.addSub( Dep.target ); //当前的watcher关联到dep中
                   Dep.target.addDep(this);//把当前的dep跟watcher关联
               }
           }
           
       }
       ```
   
       关联之后就是
   
       watcher对象{deps:[dep,dep,dep]};
   
       其中dep对象{subs:[watcher]
   
   16. 
   
   17. 
   
   16. 
   
   17. 
   
2. 页面生成流程
   	从页面获取文档，生成抽象语法树。
   	设置数据为响应式。
   		在get中设置添加依赖，并添加dep
   			其中有读取的时候，dep绑定到watcher
   		在set中设置
   			有修改的时候，且内容不一样的时候。
   			设置为响应式。
   			触发dep的notify();
   				如果属性没有触发get则dep没绑定watcher中就不触发更新
   				触发watcher的更新方法，更新于watcher绑定下的deps数组绑定的对应属性。
   	使用柯里化函数，缓存语法树，并对其匹配的元素进行读取，触发dep的绑定watcher事件。从而依赖收集。
   	生成到虚拟dom上
   	在转化到真实dom上
   父子组件通信
   	有一个公共bus总线存放触发条件和方法，（发布订阅模式）
   	父组件的触发条件和方法放入到bus数组中。（订阅）
   	当有子组件调用时候emit，触发的时候就在bus总线中查找对应的父组件放入的触发条件进行匹配，然后执行其放入的函数。（发布任务）

3. 

   ```javascript
   
   ```

   

   

   

