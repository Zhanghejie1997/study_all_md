#!/usr/bin/node
// (HOME='/home/data/publish/site_packages/_commonpay.ehijoy.com' ./test_http_send.js)
// /root/code/tools/node/node6
'use strict'
var home = process.env['HOME']
global.ms = Object.assign(global.ms || {}, {
    log         : require(home + '/code/node_webs/node_modules/log'),
    async       : require(home + '/code/node_modules/async'),
    http_request: require(home + '/code/node_webs/node_modules/http_request'),
    esp         : require(home + '/code/node_webs/node_modules/sqlstr').escape,
    fs          : require('fs'),
})

var deps = require(home + '/code/tools/deps')
var db_name = 'xd_nhsy_pay'
var main = function (option, callback) {
    option = Object.assign({num: 750, url: 'http://neon-tw-prod-xdpaycp.xdgtw.com/buy_result/cp/50/20013'}, option)
    var db_option = {
        db_list: [
            {db_type: 'mysql', db_name: db_name},
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
    return ms.db.mysql[db_name].exec_sql(sql, cb)
}

function get_orders_data(option, callback) {
    var orders_id = option.orders_id
    // var create_at = option.create_at && (option.create_at.min_and || option.create_at.max_and) ? option.create_at : null
    var where_data = []
    orders_id && orders_id.length && where_data.push(`\`order_id\` not in (${orders_id.map(i => ms.esp(i)).join(',')})`)
    // create_at && create_at.min_and && where_data.push(`\`create_at\`>= ${ms.esp(create_at.min_and)}`)
    // create_at && create_at.max_and && where_data.push(`\`create_at\`<= ${ms.esp(create_at.max_and)}`)
    where_data.push(`\`pay_at\` is null`)
    where_data.push(`\`id\` > 430010`)
    where_data.push(`\`pay_id\` in (50)`)
    where_data.push(`\`region_id\` in ('tw-game')`)
    var limit = 'limit 50000'
    var sql = `select ${Object.keys(select_line).map(i=>`\`${i}\``).join(',')} from orders_2023 ${where_data&&where_data.length?' where ' +where_data.join(' and ') :''} ${limit}`
    exec_sql(sql, callback)
}


var select_line = {
    'order_id': '订单号',
    'account' : '账号',
    'item_id' : '购买商品id',
}

//----------------------------------------------------------------------------------------
function send_http(option, data, cb, index) {
    index = index || 0
    var end_index = index + option.num
    var send_data = data.splice(index, end_index)
    send_data.forEach(i => {
        start_send(option, i, (err, data) => ms.log.info(err, data))
    })
    if (data.length <= 0) {
        return cb()
    }
    return setTimeout(() => send_http(option, data, cb, end_index), 1000)
}

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
/**
 *
 * @param option
 * @param{order_id,account,item_id} data
 * @param cb
 */
function start_send(option, data, cb) {
    var order_id = data.order_id
    var account = data.account
    var item_id = data.item_id
    var send_data = {
        "bankTrxNo"     : "2000000368817701", "clientAmount": 300.000,
        "trxNo"         : 509389498799693824,
        "clientCurrency": "TWD",
        "notifyTime"    : 1689321685283,
        "channel"       : 1,
        "trxType"       : 0,
        "userId"        : "506555643570950144",
        "outTrxNo"      : order_id,
        "platform"      : 1,
        "paymentType"   : 0,
        "products"      : [{
            "productCode"   : "global.monthcard.infinite100",
            "quantity"      : 1,
            "channelSkuCode": item_id
        }],
        "clientRegion"  : "TW",
        "totalAmount"   : 9.990,
        "appId"         : 2068001,
        "successTime"   : 1689319963191,
        "currency"      : "USD",
        "notifyId"      : 509396900781563904,
        "attach"        : {
            "gameServerId": "nh-gat-inner",
            "gameExt"     : order_id,
            "gameRoleId"  : account
        },
        "region"        : "US",
        "status"        : 0
    }
    // ms.log.info('url:',order_id)
    // return cb()
    ms.http_request.post(option.url, JSON.stringify(send_data), cb, null, 'application/json')
}

//----------------------------------------------------------------------------------------
function get_mysql_data(option, callback) {
    var create_at = {min_and: null, max_and: null}
    ms.async.waterfall([
        (cb) => get_orders_data({create_at}, (err, data) => cb(err, data)),
        (data, cb) => send_http(option, data, cb),
    ], (err) => {
        console.error('err', err)
        setTimeout(function (){
            callback(err)
        },60000)
    })
}

main(null, err => {
    err && console.error("do over", err)
    process.exit(1)
})
