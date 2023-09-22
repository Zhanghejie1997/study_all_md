#!/root/code/tools/node/node6
'use strict'

var dbs
var rds
var home = process.env['HOME']
var notify = require(home + '/code/node_webs/node_modules/common_notify_stat2')
global.ms = Object.assign(global.ms || {}, {
    log         : require(home + '/code/node_webs/node_modules/log'),
    async       : require(home + '/code/node_modules/async'),
    u2          : require(home + '/code/node_webs/node_modules/util2'),
    http_request: require(home + '/code/node_webs/node_modules/http_request'),
    esp         : require(home + '/code/node_webs/node_modules/sqlstr').escape,
})

const deps = require(home + '/code/tools/deps')
const option = {
    db_option: {
        db_list: [
            {db_type: 'mysql', db_name: 'cp_pay'},
            {db_type: 'redis', db_name: 'yq_cp_pay'},
        ]
    }
}

var date = process.argv[2].replace(/-/g, '')

var main = function () {
    ms.async.waterfall([
        (cb) => {
            deps.init(option, (err, _ms) => {
                ms = Object.assign(ms, _ms)
                cb(err)
            })
        },
        (cb) => {
            dbs = ms.db.mysql['cp_pay']
            rds = ms.db.redis['yq_cp_pay']
            get_need_do_data(cb)
        },
        (data, cb) => {
            console.log('data -length:', data.length)
            if (data.length == 0) {
                return cb('not data')
            }
            ms.async.eachSeries(data, do_api, cb)
        }
    ], function (err) {
        console.error("do over", err)
        process.exit(1)
    })
}


var fs = require('fs')
var get_need_do_data = function (callback) {
    var data
    try {
        data = fs.readFileSync(`/root/${date}.orderid`, 'utf8').split('\n').map(i => i.trim())
    } catch (err) {
        console.error('err', err)
    }
    console.log('data', data)
    return callback(null, data)
}


var do_api = function (item, callback) {
    var order_id = item
    if (order_id.substr(0, 4) != '9999') {
        return callback()
    }

    // console.log('ddd',order_id , date)
    // console.log('ddd',order_id.substr(7, 6) , date.substr(2, 6))
    if (order_id.substr(7, 6) != date.substr(2, 6)) {
        console.error('err data:', date, order_id, order_id.substr(7, 6))
        return callback()
    }
    var key = `commonpay.order.${item}`
    var val = 10 //秒
    console.error('do_api key,val', key, val)
    rds.expire(key, val, function (err, res) {
        console.error("do_api over", item.order_id)
        console.error("do_api error", err, res)
        return callback()
    })
}

main()

// ./del.js 20230621 >> ./log.20230621 2>&1
// ./del.js 20230622 >> ./log.20230622 2>&1
// ./del.js 20230623 >> ./log.20230623 2>&1
// ./del.js 20230624 >> ./log.20230624 2>&1
// ./del.js 20230625 >> ./log.20230625 2>&1
// ./del.js 20230626 >> ./log.20230626 2>&1
// ./del.js 20230627 >> ./log.20230627 2>&1
// ./del.js 20230628 >> ./log.20230628 2>&1
// ./del.js 20230629 >> ./log.20230629 2>&1
// ./del.js 20230630 >> ./log.20230630 2>&1

// ./del.js 20230701 >> ./log.20230701 2>&1
// ./del.js 20230702 >> ./log.20230702 2>&1
// ./del.js 20230703 >> ./log.20230703 2>&1
// ./del.js 20230704 >> ./log.20230704 2>&1
// ./del.js 20230705 >> ./log.20230705 2>&1



// ./del.js 20230706 >> ./log.20230706 2>&1
// ./del.js 20230707 >> ./log.20230707 2>&1
// ./del.js 20230708 >> ./log.20230708 2>&1
// ./del.js 20230709 >> ./log.20230709 2>&1
// ./del.js 20230710 >> ./log.20230710 2>&1


// ./del.js 20230711 >> ./log.20230711 2>&1
// ./del.js 20230712 >> ./log.20230712 2>&1
// ./del.js 20230713 >> ./log.20230713 2>&1




// 执行倒着位置 2023-07-20 13:44:40
// ./del.js 20230714 >> ./log.20230714 2>&1
// ./del.js 20230715 >> ./log.20230715 2>&1
// ./del.js 20230716 >> ./log.20230716 2>&1
// ./del.js 20230717 >> ./log.20230717 2>&1
// ./del.js 20230718 >> ./log.20230718 2>&1
// ./del.js 20230719 >> ./log.20230719 2>&1
// ./del.js 20230720 >> ./log.20230720 2>&1
