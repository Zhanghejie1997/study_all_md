# js继承——种类和实现

### 原型链继承

```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

function Child (name, age) {
    this.age = age;
}

Child.prototype = new Parent();   //继承核心
var child1 = new Child('kevin', '18');
```

特点：实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）

缺点：1、新实例无法向父类构造函数传参。//大问题
			2、继承单一。
			3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）

### 借用构造函数继承

```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

function Child (name, age) {
    Parent.call(this，name);  //对应添加的新语句，重新指向
    this.age = age;
}

//Child.prototype = new Parent();   //去掉
var child1 = new Child('kevin', '18');
```

特点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））

特点：1、只继承了父类构造函数的属性，没有继承父类原型的属性。
　　　2、解决了原型链继承缺点1、2、3。
　　　3、可以继承多个构造函数属性（call多个）。
　　　4、在子实例中可向父实例传参。
缺点：1、只能继承父类构造函数的属性。
　　　2、无法实现构造函数的复用。（每次用每次都要重新调用）
　　　3、每个新实例都有父类构造函数的副本，臃肿。

### 组合继承：

缺点:会调用两次父构造函数,会在prototype中生成对象数据，并在对当前实例化对象生成属性。

```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name); //执行parent函数生成对象
    this.age = age;
}

Child.prototype = new Parent();   //组合继承核心
Child.prototype.constructor=Child; //修改实例化之后的继承原型链
var child1 = new Child('kevin', '18');
```

```
function Person(school) {
    this.school = school;
  }
  Person.prototype.skill = function () {
    console.log("学习");
  }
  function Student(school, name, age, gender) {
    Person.call(this, school);
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  Student.prototype = Person.prototype;
  let student = new Student("广铁一中", "王菲菲", 14, "女");
  console.log(Student.prototype === Person.prototype)
  console.log(student.constructor)
  console.log(student)
```



```
一次是设置子类型实例的原型的时候：
Child.prototype = new Parent();
一次在创建子类型实例的时候：
var child1 = new Child('kevin', '18');
回想下 new 的模拟实现，其实在这句中，我们会执行：
Parent.call(this, name);
```

重点：结合了两种模式的优点，传参和复用
特点：1、可以继承父类原型上的属性，可以传参，可复用。
			2、每个新实例引入的构造函数属性是私有的。
缺点：调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

### 原型式继承

```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
function Child (Obj) {
    function fn(){};
	Fn.prototype = obj;   //继承核心
    return new F(){};
}

var parent = new Person();
var child = Child(parent); //继承调用方法
var child1 = new Child('kevin', '18');
```

重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
特点：类似于复制一个对象，用函数来包装。
缺点：1、所有实例都会继承原型上的属性。
			2、无法实现复用。（新实例属性都是后面添加的）



### 寄生模式

```javascript
function Parent(){
    
} 
function Child(width, height) {
    var r = new Parent(4);   //继承核心
    r.width = width; //注入属性
    r.height = height; //注入属性
    r.getArea = function() { 注入方法
        return r.width * r.height; 
    }
    return r;
}

var rect =Child(2, 4);
```

重点：就是给原型式继承外面套了个壳子。
优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
缺点：没用到原型，无法复用。生成出来的都是一个对象

### 寄生组合式继承（常用）

```javascript
function content(obj){
    function F(){};
    f.prototype = obj;
    return new F();
}

var con = content (Parent.prototype); //继承核心，总结函数包裹父类原型方法

function Child(){
    Parent.call(this);//继承核心，继承父类原型属性
}
Child.prototype = con; //继承核心，修改其原型链
con.constructor = Child;
var child = new Child();
```

重点：修复了组合继承的问题

|                  | 原型链继承 | 构造函数继承 | 组合继承 | 原型式继承 | 寄生继承 | 寄生组合继承 |
| ---------------- | ---------- | ------------ | -------- | ---------- | -------- | ------------ |
| 继承父级属性     |            | 能           |          | 能         | 能       |              |
| 继承父级方法     | 能         |              |          | 能         | 能       |              |
| 构造函数多次使用 |            |              | 多次     | 多次       |          |              |
| 继承给子         |            |              |          | 能         |          |              |
| 能否使用原型     |            |              |          | 能         | 能       |              |
| 给父级传参       |            |              |          |            | 能       |              |
| 核心代码         |            |              |          |            |          |              |

原型链继承：直接把当前的function的constructor指向new 父类类的，能使用方法，**缺陷**但是不能初始化父类的属性值。

构造函数继承：在子类中使用`父级.call(this,...arguments)`来接收给父级传入参数，**缺陷**但是不能使用父级原型上的方法。

组合继承 ：就是又使用构造函数继承，又使用原型链继承。**缺点是**，父级的构造器使用两次,，没有本身方法构造函数都是父类的，**优化**是指向对象不使用`new 类`而是`类.prototype`，**缺陷** 构造函数都是父类的，且每个类生成都有生成一个相同的constructor的指向

原型式继承 ：使用一个函数，在函数中生成obj，使其prototype指向父类，缺点，无法服用，和作为父类继承

 寄生继承 ：就是包裹父类的constructor的一个对象，再对其添加对应属性，和方法，**缺点**，不能最为父类继承给子类

寄生组合继承：就是再组合继承和寄生继承合并，生成一个中间函数，中间函数指向父类的constructor来保存。