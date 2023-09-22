#!/root/code/tools/node/node6
'use strict'
var home = process.env['HOME']
global.ms = Object.assign(global.ms || {}, {
    log  : require(home + '/code/node_webs/node_modules/log'),
    async: require(home + '/code/node_modules/async'),
    xlsx : require(home + '/code/node_modules/node-xlsx'),
    esp  : require(home + '/code/node_webs/node_modules/sqlstr').escape,
    fs   : require('fs'),
})

var deps = require(home + '/code/tools/deps')

var main = function (option, callback) {
    option = Object.assign({xls: 'data_file'}, option)
    var db_option = {
        db_list: [
            {db_type: 'mysql', db_name: 'xd_nhsy_pay'},
        ]
    }

    ms.async.waterfall([
        cb => deps.init({db_option}, (err, _ms) => {
            ms = Object.assign(ms, _ms)
            cb(err)
        }),
        cb => get_mysql_data(option, cb)
    ], callback)
}

function exec_sql(sql, cb) {
    ms.log.info('sql:', sql)
    return ms.db.mysql['xd_nhsy_pay'].exec_sql(sql, cb)
}

function get_orders_data(option, callback) {
    var orders_id = option.orders_id
    var create_at = option.create_at && (option.create_at.min_and || option.create_at.max_and) ? option.create_at : null
    var where_data = []
    orders_id && orders_id.length && where_data.push(`\`order_id\` not in (${orders_id.map(i => ms.esp(i)).join(',')})`)
    create_at && create_at.min_and && where_data.push(`\`create_at\`>= ${ms.esp(create_at.min_and)}`)
    create_at && create_at.max_and && where_data.push(`\`create_at\`<= ${ms.esp(create_at.max_and)}`)
    where_data.push(`\`pay_at\` is not null`)
    var sql = `select ${Object.keys(select_line).map(i=>`\`${i}\``).join(',')} from orders_2023 ${where_data&&where_data.length?' where ' +where_data.join(' and ') :''}`
    exec_sql(sql, callback)
}


var select_line = {
    'order_id': '订单号',
    'account' : '账号',
    'item_id' : '购买商品id',
}
//----------------------------------------------------------------------------------------
function send_http(){

}
//----------------------------------------------------------------------------------------
function get_mysql_data(option, callback) {
    var create_at = {min_and: null, max_and: null}
    ms.async.waterfall([
        (cb) => get_orders_data({create_at}, (err, data) => cb(err, data)),
        (data, cb) => send_http(option, data, cb),
    ], (err) => {
        console.error('err', err)
        callback(err)
    })
}

main(null, err => {
    err && console.error("do over", err)
    process.exit(1)
})
