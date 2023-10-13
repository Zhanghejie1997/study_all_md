/*
 * Copyright (c) 2023.
 */

//----------------------------------------------------------------------------------------

var log = {
    info : console.info,
    error: console.error,
    log  : console.log,

}

//----------------------------------------------------------------------------------------
// 数据库

var db = function init_db() {
    var mysql = {}, redis = {}
    var mysql_dbs_name = [], redis_dbs_name = []
    var mysql_init = {
        exec_sql: (sql, cb, test_data) => {
            console.log('sql:', sql)
            cb(null, test_data)
        }
    }
    var redis_init = {
        get: (key, cb) => cb(null, key + '_'),
        set: (key, set, cb) => cb(null, key),
    }
    mysql_dbs_name.forEach(i => mysql[i] = mysql_init)
    redis_dbs_name.forEach(i => redis[i] = redis_init)

    return {mysql, redis}
}()

//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

function proxy(fn) {
    var obj = {
        fn, success: [], err: [], success_index: 0,err_index:0
    }
    var err_fn=function (){
        if(obj.err_index){
            var fn = obj.err[obj.err_index++]
            fn && fn(err_fn, obj.err[0])
        }
    }
    var success_fn = function () {
        if(obj.err_index){
            var fn = obj.success[obj.success_index++]
            fn && fn(success_fn, obj.err[0])
        }
    }
    setTimeout(function () {
        fn(success_fn, obj.err[0])
    }, 2)
    return {
        then(fn) {
            obj.success.push(fn)
            return this
        },
        catch(fn){
            obj.err.push(fn)
            return this
        }
    }
}

//----------------------------------------------------------------------------------------
var async = {
    waterfall: (tasks, cb) => {
        var index = 0, max_length = tasks.length, fn = function () {
            if (arguments[0] || ++index >= max_length) {
                return cb.apply(null, arguments)
            }
            var args = Array.prototype.slice.call(arguments, 1)
            args.push(fn)
            tasks[index].apply(undefined, args)
        }

        tasks[index] ? tasks[index](fn) : cb()
    }
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

global.ms = {log, async, db, proxy}