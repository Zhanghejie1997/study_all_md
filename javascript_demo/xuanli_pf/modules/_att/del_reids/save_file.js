#!/root/code/tools/node/node6
'use strict'

var dbs
var home = process.env['HOME']
var fs   = require('fs')
var d 
global.ms  = Object.assign(global.ms || {}, {
    log         : require(home + '/code/node_webs/node_modules/log'),
    async       : require(home + '/code/node_modules/async'),
    u2          : require(home + '/code/node_webs/node_modules/util2'),
    http_request: require(home + '/code/node_webs/node_modules/http_request'),
    esp         : require(home + '/code/node_webs/node_modules/sqlstr').escape,
})

const deps = require(home + '/code/tools/deps')
const option = {
    db_option : {
        db_list : [
            { db_type : 'mysql', db_name : 'cp_pay'},
        ]
    }
}

var main = function(){
    d = process.argv[2]
    ms.async.waterfall([
        (cb) => {
            deps.init(option, (err, _ms) => {
                ms = Object.assign(ms, _ms)
                cb(err)
            })
        },
        (cb) => {
            dbs = ms.db.mysql['cp_pay']
            get_need_do_data(cb)
        },
        (data, cb) => {
            do_api(data, cb)
        }
    ], function(err){
        console.error("do over", err)
        process.exit(1)
    })
}

var get_need_do_data = function(callback) {
    var sql = `select order_id from orders_2023 where app_id = 1000003 and create_at >= '${d}' and create_at < date_add('${d}', INTERVAL 1 DAY) and order_id like '9999%'`
    console.error('get_need_do_data sql', sql)
    dbs.exec_sql(sql, callback)
}

var do_api = function(item, callback) {
    var file_path = `/root/${d.replace(/-/g, '')}.orderid`
    var data = item.map(i => i.order_id).toString().replace(/,/g, '\n')
    fs.writeFile(file_path, data, callback)
}

main()