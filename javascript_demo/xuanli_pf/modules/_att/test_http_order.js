#!/usr/bin/node
// (HOME='/home/data/publish/site_packages/_commonpay.ehijoy.com' ./test_http_order.js)
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
    option = Object.assign({num: 5,max_length:20, url: 'http://neon-tw-prod-xdpaycp.xdgtw.com/pre_buy_request'}, option)
    var db_option = {
        db_list: [
            {db_type: 'mysql', db_name: db_name},
        ]
    }

    ms.async.waterfall([
        // cb => deps.init({db_option}, (err, _ms) => {
        //     ms = Object.assign(ms, _ms)
        //     cb(err)
        // }),
        cb => get_mysql_data(option, cb)
    ], callback)
}


//----------------------------------------------------------------------------------------
function send_http(option, cb, index) {
    index = index || 0
    var end_index = index + option.num
    console.log('end_index', end_index)
    for (var i = index; i < end_index; i++) {
        start_send(option, i, (err, data) => ms.log.info(err, data))
    }
    if (option.max_length <= index) {
        return cb()
    }
    return setTimeout(() => send_http(option, cb, end_index), 1000)
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
    var send_data = {
        "pk_id": "11",
        "app_version": "3.3.56.59",
        "rydevicetype": "OPPO",
        "item_type": "0",
        "sign": "8d1120fefe835da0fece680d60d3b87a",
        "new_pay": true,
        "user_info": "{\"type\":\"1\",\"value\":\"-1\"}",
        "extra": "{\"roleId\":\"0\"}",
        "ryosversion": "12",
        "app_id": "20013",
        "pf_id": "oppo",
        "ryos": "Android",
        "channelId": "11",
        "oaid": "",
        "item_count": "1",
        "total_price": "600",
        "device_id": "2857ee7f58a0738f4a5be7df5fa986bd6",
        "item_id": "3010",
        "item_price": "600",
        "region_id": "tw-game",
        "item_name": "华夏宝匣",
        "server_id": "tw-game",
        "adId": "0",
        "namespace": "tw-game",
        "cp_param": "eyJhY2NvdW50IjoiMTAwMDAwNF84MDk0NDE3IiwiY2hhbm5lbEl0ZW1JZCI6IjMwMTAiLCJpdGVtX2lkIjoiMzAxMCIsIml0ZW1fbmFtZSI6Ijxjb2xvcj0jYzc0NzNkPuWNjuWkj+WuneWMozwvY29sb3I+Iiwib3JkZXJUaW1lIjoxNjgzMzU3MjcxLCJwbGF0VHlwZSI6IjExIiwidG90YWxQcmljZSI6IjYwMCJ9",
        "imei": "",
        "pay_id": "50",
        "account": "20013_1",
        "androidid": "a5ffc083e42dfdec",
        "third_account": "20013_1"
    }
    // ms.log.info('url:',order_id)
    // return cb()
    ms.http_request.post(option.url, JSON.stringify(send_data), cb, null, 'application/json')
}

//----------------------------------------------------------------------------------------
function get_mysql_data(option, callback) {
    ms.async.waterfall([
        (cb) => send_http(option, cb),
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
