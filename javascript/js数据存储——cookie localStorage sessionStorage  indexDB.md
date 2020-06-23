# js数据存储——cookie |localStorage |sessionStorage | indexDB

前端数据存储，分成cookie、localStorage、sessionStorage、indexDB。

都是以字符串格式保存，再保存对象是否可以考虑使用JSON.stringtify()  转化 保存，读取时候使用JSON.parse()转化回来。

其中cookie存储量有限，cookie对象挂载再document上。

尔localStorage、sessionStorage挂载在window上。

```
function localStorageFn() {
    let localValue = window.localStorage.getItem('localStorage');
    if (localValue) {
      log("读取成功!:", localValue);
    } else {
      window.localStorage.setItem('localStorage', "localStorage");
    }
  }
  localStorageFn();

  function sessionStorageFn() {
    let localValue = window.sessionStorage.getItem('sessionStorage');
    if (localValue) {
      log("读取成功!:", localValue);
    } else {
      window.sessionStorage.setItem('sessionStorage', "sessionStorage");
    }
  }
  sessionStorageFn();

  

  // 函数中的参数分别为 cookie 的名称、值以及过期天数
  function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
      ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
  }
  setCookie('userName', 'xxx', 1); // cookie过期时间为1天。

  // 设置过期时间以秒为单位
  function setCookie(c_name, value, expireseconds) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expireseconds * 1000);
    document.cookie = c_name + "=" + escape(value) +
      ((expireseconds == null) ? "" : ";expires=" + exdate.toGMTString())
  }
  setCookie('userName', 'xxx', 3600);  //cookie过期时间为一个小时

  // 函数中的参数为 要获取的cookie键的名称。
  function getCookie(userName) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(userName + "=");
      if (c_start != -1) {
        c_start = c_start + userName.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  }
  var userName = getCookie('userName');
  log(userName)
```

# [indexedDB 前端数据库（使用的简单案例）](https://www.cnblogs.com/oukele/p/10727790.html)

#### 前端存储 之 indexDB

##### 1、indexedDB是什么？

- indexedDB是一个非关系型数据库
- 它不需要我们去写一些特定的SQL语句来对数据库进行操作
- 它是NoSQL的，数据形式使用的json

##### 2、indexedDB出现的意义？

- 前端存储，已经有了LocalStorage 和 Cookies ，但是它们都是比较简单的技术。
- 而indexedDB提供了 类似**数据库风格**的数据储存 和 使用方式
- Cookies只能是字符串，储存空间有限，每次HTTP接受和发送都会传递Cookies数据，它会占用额外的流量
- LocalStorage是用key-value 键值模式储存数据，想让localstorage存储对象，你需要借助JSON.stringify() 能将对象变成字符串形式，再用JSON.parse() 将字符串还原成对象，当存储的数据庞大时，这就不是最佳的方案了，localstorage就是专门为小数量数据设计的，它的api设计为同步的
- indexedDB很适合存储大量数据，它的API是异步调用的，indexedDB使用索引存储数据，各种数据库操作放在事务中执行，indexedDB支持简单的数据类型，它比localstorage强大，API也相对复杂，对于简单的数据，还是使用localstorage。
- indexedDB能提供更为复杂的查询数据的方式

##### 3、indexedDB的特性

- 对象仓库（objectStore）
  - indexedDB没有表的概念，而是使用objectStore。
  - 一个数据库中可以包含多个objectStore
  - objectStore是一个灵活的数据结构，可以存放多种类型数据，也就是说一个objectStore相当于一张表，里面储存的每条数据和一个键相关。
  - 我们可以使用每条记录中的某个字段作为键值（keyPath），也可以使用自动生成的递增数字作为键值（keyGenerator），也可以不指定。
  - 选择键的类型不同，objectStore可以存储的数据结构也有差异
- 事务性
  - 在indexedDB中，每一个对数据库操作是在一个事务的上下文中执行的。
  - 事务范围一次影响一个或多个objectstores。
  - 你通过传入一个objectstores名字的数组到创建事务 范围的函数来定义
    - 比如： db.transaction( storeName, ' readwrite' )，创建事务的第二个参数是事务模式，当请求一个事务时，必须决定是按照只读还是读写模式模式请求访问
- 基于请求
  - 对indexedDB数据库的每次操作，描述为通过一个请求打开数据库，访问一个object store，再继续。
  - indexedDB API天生是基于请求的，这也是API异步本性指示，对于你在数据库执行的每次操作，你必须首先为这个操作创建一个请求，当请求完成，你可以响应由请求结果产生的事件和错误
- 异步
  - 在indexedDB 大部分操作并不是我们常用的调用方法，返回结果的模式，而是请求 ----> 响应的模式
  - 所谓异步API是指并不是这条指令执行完毕，我们就可以使用 request.result 来获取 indexedDB 对象了。
  - 类似于 我们使用ajax一样，语句执行完并不代表已经获取到了对象，所以我们一般在其回调函数中处理。

#### 4、玩 indexedDB 的基本步骤

1. 打开数据库并且开始一个事务
2. 创建一个 object store
3. 构建一个请求执行一些数据库操作，比如新增或者提取数据等
4. 通过监听正确类型的DOM事件可以等待操作完成
5. 在操作结果上进行一些操作（可以在 request 对象中找到）

### 代码案例：

1、打开数据库，需要当前浏览器支持indexedDB



```
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

if( !indexedDB ){
    alert('当前不支持 indexedDB 数据库');
    throw Error('当前不支持 indexed 数据库');
}
```



2、创建数据库



```
function createDB(dbName, version) {
    // 参数为:数据库名和版本号
    // 数据库存在则打开,否则创建
    let request = indexedDB.open(dbName, version);
    /**
     * request 并不会返回一个DB对象的句柄，我们得到的是一个IDBOpenDBRequest对象
     * 而我们期望得到的DB对象在其result属性中
     * 除了 result，IDBOpenDBRequest 接口定义了几个重要属性
     * onerror:请求失败的回调函数句柄
     * onsuccess:请求成功的回调函数句柄
     * onupgradeneeded:请求数据库版本变化句柄
     * 第一次打开数据库，会先触发 onupgradeneeded 事件，然后触发success事件。
     */
    console.log(request);

    // 请求数据库失败的回调函数
    request.onerror = function(err) {
        console.log(JSON.stringify(err));
        console.log('打开数据库失败,错误信息为:' + err.target.message);
    }

    // 请求数据库成功的回调函数
    request.onsuccess = function(success) {
        console.log(JSON.stringify(success));
        console.log('打开数据库成功:' + success.target.result);

        /**
         *  获取数据库实例对象，
         *  db.createObjectStore('table6',{keyPath:'stuId',autoIncrement:true});
         *  var len = db.objectStoreNames.length; --> 对象储存空间名的个数
         *  var name = db.objectStoreNames[1]; --> 对象存储空间名
         *  transaction = db.transaction(['table'],'readwrite'); --> 事务操作的对象存储空间名,事务模式:'readwrite'可读写模式
         * 
         *  // 向info储存空间加入一个info对象，获得request对象用于处理用户对数据库的操作请求
         *  // 同样拥有 onerror 、onupgradeneeded 、onsuccess 事件
         *  objectStore = transaction.objectStore('table');
         */
        let db = success.target.result;
    }

    // 数据库版本更新
    request.inuparadeneeded = function(event) {
        console.log(JSON.stringify(event));
        console.log('数据库版本有变化...');

        let db = event.target.result;

        // 判断对象储存空间名称是否存在
        if (!db.objectStoreNames.contains('table')) {


            //创建信息对象存储空间;指定keyPath选项为Id（即主键为Id）
            let objectStore = db.createObjectStore('table', {
                keyPath: 'stuId',
                autoIncrement: true
            });
            /*
             *db.createObjectStore("table1", {keyPath: "userId",autoIncrement: true});
             *db.createObjectStore("table2", {keyPath: "userId",autoIncrement: true});
             *db.createObjectStore("table3", {keyPath: "userId",autoIncrement: true});
             *db.createObjectStore("table4", {keyPath: "userId",autoIncrement: true});
             *当然了。你可以一次性的在这里建立多个对象空间 或者每次改变 version和对象空间的名字。之前创建的会存在。
             * 为什么在onupgradeneeded中创建呢？
             * 原因：当dbName和 version 这两个参数中的任何一个发生变化。都会执行重新创建一遍对象空间，
             * 注意：当dbName，保持不变，version 只能逐渐增加，假如你这次 version = 3.那么下次 version = 2.就会报错 打开数据库失败：
             * version！=0;
             * */


            // 创建索引
            // 索引名,创建索引的列,索引选项(索引属性值是否唯一:true or false)
            // 注意: 创建索引 要在创建对象空间的时候
            // unique:true 实际效果:这个索引的内容是唯一的,不能重复,无法创建两个(索引属性值)相同的内容
            objectStore.createIndex('studentIndex', 'stuId', {
                unique: true
            });
        }
    }

}
```



3、删除数据库 or 关闭数据库



```
// 关闭与删除数据库
function deleteDB(dbName) {

    try {
        // 删除数据库使用 indexedDB对象的deleteDatabase方法
        let request = indexedDB.deleteDatabase(dbName);

        request.onerror = function() {
            console.log('删除[' + dbName + ']数据库失败!!!!');
        }

        request.onsuccess = function() {
            console.log('删除[' + dbName + ']数据库成功!!!!');
        }

    } catch (e) {
        console.log('删除[' + dbName + ']数据库出现错误，' + e.getMessage);
    }
}

// 关闭数据库
function colseDB(dbName){
    dbName.close();
}
```



4、新增数据



```
// 新增数据
// 数据库名称,对象仓库（表名）,传入的参数
function insert(dbName, objectStoreName, argument) {
    // 打开数据库
    let request = indexedDB.open(dbName);
    // 请求数据库成功的回调函数
    request.onsuccess = function(success) {
        // 获取数据库实例对象
        let db = success.target.result;
        // 对某个表 进行事务操作的事务权限控制 
        let transaction = db.transaction(objectStoreName, 'readwrite');
        // 对表进行操作
        let objectStore = transaction.objectStore(objectStoreName);

        // 使用add方法,此方法是异步的
        // 有success,error事件
        //objectStore.add(argument);
        // 使用定义add方法
        let add = objectStore.add(argument);
        
        let msg = JSON.stringify(argument);
        
        // 添加成功的回调函数
        add.onsuccess = function(e) {
            console.log(e);
            console.log('向表[' + objectStoreName + ']新增一条数据为[' + msg + ']成功！！');
        }
        add.error = function(e) {
            console.log('向表[' + objectStoreName + ']新增一条数据为[' + msg + ']失败！！');
        }
    }

}

var stu1 = {
    name: '欧可乐',
    age: 19,
    sex: '男'
};

 insert('studentDB','student',stu1);

```



5、查询数据



```
// 查询数据
// 数据库名,对象仓库(表名),查询参数(键名对应的值)
function getData(dbName, objectStoreName, selectArgument){
    // 打开数据库
    let request = indexedDB.open(dbName);
    // 请求打开数据库的回调函数
    request.onsuccess = function(success){
        let db = success.target.result;
        let transaction = db.transaction([objectStoreName],'readwrite');
        let objectStore = transaction.objectStore(objectStoreName);
        let getResult = objectStore.get(selectArgument);

        getResult.onsuccess = function(e){
            console.log( e.target.result);
        }

    }

}

getData('studentDB','student',1);
```



6、更新数据



```
// 更新数据
// 数据库名,表名,要更新数据的标志(id),新的数据
function update(dbName, objectStoreName, id, newsData) {
    // 打开数据库
    let request = indexedDB.open(dbName);
    // 请求打开数据库的回调函数
    request.onsuccess = function(success) {
        // 获取到数据库的表
        let db = success.target.result;
        // 对表操作进行事务权限控制
        let transaction = db.transaction(objectStoreName, 'readwrite');
        // 对表进行操作
        let objectStore = transaction.objectStore(objectStoreName);
        // 根据键值 获取某个实例中的某条数据
        let getResult = objectStore.get(id);
        // 实例成功的回调函数
        getResult.onsuccess = function(e) {
            // 源数据
            let msg = e.target.result;
            let old = JSON.stringify(msg);
            // 重新赋值
            msg.name = newsData.name;
            msg.age = newsData.age;
            msg.sex = newsData.sex;
            objectStore.put(msg);
            console.log('更新主键为 stuId:' + msg.stuId + '的数据,原数据:[' + old + ']，新数据为:[' + JSON.stringify(e.target.result) +
                        '],更新成功!!!');
        }
        // 实例失败的回调函数
        getResult.onerror = function(e) {
            console.log('数据更新失败！！');
        }
    }
}

let stu2 = {
    name: '小可乐',
    age: 18,
    sex: '男'
}
update('studentDB', 'student', 1, stu2);
```



7、删除数据



```
// 删除数据
// 数据库名,表名,主键
function deleteData(dbName, tableName, id){
    // 打开数据库
    let request = indexedDB.open(dbName);
    // 请求打开数据库成功的回调函数
    request.onsuccess = function(success){
        // 获取实例
        let db = success.target.result;
        // 事务权限控制
        let transaction = db.transaction(tableName, 'readwrite');
        // 进行操作
        let objectStore = transaction.objectStore(tableName);
        // 进行删除
        let deleteMsg = objectStore.delete(id);
        deleteMsg.onsuccess = function(e){
            console.log('成功删除主键stuId为：' + id+',的数据，状态为:'+e.isTrusted);
        }
    }
}

deleteData('studentDB','student',1);
```



8、清除表数据



```
// 清空表数据
// 数据库名称,表名
function clearData(dbName, tableName) {
    // 请求打开数据库
    let request = indexedDB.open(dbName);
    // 请求成功的回调函数
    request.onsuccess = function(e) {
        // 获取实例
        let db = e.target.result;
        // 表名事务权限控制
        let transaction = db.transaction(tableName, 'readwrite');
        // 进行操作
        let objectStore = transaction.objectStore(tableName);
        // 清除数据
        let clearResult = objectStore.clear();
        // 清除成功的回调函数
        clearResult.onsuccess = function(e) {
            console.log('表名[' + tableName + ']数据清除成功,状态为：' + e.isTrusted );
        }
    }
}
clearData('studentDB', 'student');
```



9、使用索引查询



```
// 利用索引查询
// 数据库,表名,索引名, 查询的值
function searchIndex(dbName, tableName, indexName, indexValue) {
    // 请求打开数据
    let request = indexedDB.open(dbName);
    // 请求打开数据库成功的回调函数
    request.onsuccess = function(e) {
        // 获取到实例
        let db = e.target.result;
        // 赋予事务权限
        let transaction = db.transaction(tableName, 'readwrite');
        // 基于权限进行操作
        let objectStore = transaction.objectStore(tableName);
        // 索引
        let index = objectStore.index(indexName);
        // 获取结果
        let result = index.get(indexValue);
        // 结果获取成功的回调函数
        result.onsuccess = function(e) {
            console.log('索引名:' + indexName + ',索引值:' + indexValue + ',查询的结果:[' + JSON.stringify( e.target.result ) + ']');
        }
    }
}
searchIndex('studentDB','student','studentIndex',2);
```



10、使用游标读取全部的数据



```
// 使用 游标
// 数据库名称,表名
function readAll(dbName, tableName) {
    // 请求打开数据库
    let request = indexedDB.open(dbName);
    // 请求成功的回调函数
    request.onsuccess = function(e) {
        // db = e.target.result // 获取实例
        // transaction = db.transaction(tableName,'readwrite'); // 权限控制
        // objectStore = transaction.objectStore(tableName); // 进行操作对象
        let objectStore = e.target.result.transaction(tableName, 'readwrite').objectStore(tableName);
        // 打开游标
        let cursor = objectStore.openCursor();

        // 储存值
        let arr = [];

        // 成功打开游标的回调函数
        cursor.onsuccess = function(e) {
            let result = e.target.result;

            if (result) {
                // 将数据一条一条保存到arr中
                arr.push(result.value);
                result.continue();
            } else {
                if (!arr) {
                    console.log('没有数据....');
                } else {
                    console.log('[' + tableName + ']表中的数据为:' + JSON.stringify(arr));
                }
            }
        }
    }
}
readAll('studentDB', 'student');
```

