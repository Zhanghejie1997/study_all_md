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

global.ms = {log, async, db}