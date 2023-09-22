//------------------------------------------------------------------------------
var http          = require('http')
var util          = require('util')
var url           = require('url')
var async         = require('async')
var nodemailer    = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var mail          = require('./config/mail')
var order         = require('./config/order')
var common        = require('./config/common')
var tc            = require('./config/thirdCallback')
//------------------------------------------------------------------------------
var code2info = {
  0: '失败',
  1: '成功',
  2: 'http请求超时',
  3: 'http请求错误'
}
//------------------------------------------------------------------------------
var sendMail = function(mailConfig, mailSubject, mailContent) {
  var mailOption = {
    from    : mailConfig.from,
    to      : mailConfig.to,
    subject : mailSubject,
    html    : mailContent
  };

  var transporter = nodemailer.createTransport(smtpTransport(mailConfig.smtpOptions));
  transporter.sendMail(mailOption, function(err, info) {
    if (err) {
      util.log({ scode: 0, msg: err.message }); return
    }

    util.log({ scode: 1, msg: info })
  })
}
//------------------------------------------------------------------------------
var getTime = function() {
    var d = new Date()

    var Y = d.getFullYear()
    var M = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
    var D = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
    var H = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()
    var m = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()
    var s = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds()

    return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s
}
//------------------------------------------------------------------------------
var httpGet = function(url, cb) {
  var req = http.get(url, function(res) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      var data = ''

      res.on('data', function(chunk) {
        data += chunk
      })

      res.on('end', function() {
        util.log('HTTP GET RESULT', data)

        var str = '', is_json = false
        try {
          str = JSON.parse(data.toString())
          is_json = true
        } catch(e) {
          util.log('RESULT is not json format', data)
          is_json = false
        } finally {
          is_json ? cb({ scode: 1, data: str }) : cb({ scode: 0 })
        }

      })
    } else {
      cb({ scode: 0 })
    }
  })

  var isTimeOut = false
  req.setTimeout(common.reqTimeout, function() {
    // cb({ scode: 2 })
    isTimeOut = true
    req.abort()
  })

  req.on('error', function(err) {
    if (isTimeOut) {
      cb({ scode: 2 }); return
    }

    cb({ scode: 3 })
    util.log('HTTP GET ERROR', err.message, err.stack)
  })

  req.end()
}
//------------------------------------------------------------------------------
var httpPost = function(u, cb, type, data) {
  var urlParse = url.parse(u)

  var options = {
    hostname: urlParse.hostname,
    path: urlParse.path,
    method: 'POST'
  }

  if (type) {
    options['headers'] = {
      'Content-Type': type
    }
  }

  var req = http.request(options, function(res) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      var data = ''

      res.on('data', function(chunk) {
        data += chunk
      })

      res.on('end', function() {
        cb({ scode: 1, data: data.toString() })
      })
    } else {
      cb({ scode: 0 })
    }
  })

  if (data) {
    util.isObject(data) ? req.write(JSON.stringify(data))
                        : req.write(data)
  }

  req.setTimeout(common.reqTimeout, function() {
    cb({ scode: 2 })
    req.abort()
  })

  req.on('error', function(err) {
    cb({ scode: 3 })
    util.log('HTTP POST', err.message, err.stack)
  })


  req.end()
}
//------------------------------------------------------------------------------
var sendSms = function(teles, msg) {

  async.eachSeries(teles,(tel,cb)=>{
    var url = 'http://sms-ehijoy.syyx.com/sms/send?game=wuhui&type=wuhuis_monitor&phone='
    + tel.toString() + '&data=' + encodeURIComponent(msg) + '&max_num=3000'

    httpGet(url, function(ret) {
      util.log('[ send sms ]', ret)
      cb()
    })
  },(err)=>{
    err && util.log('[ send sms ]',err)
  })
}
//------------------------------------------------------------------------------
var isEmptyObj = function(obj) {
  for (var i in obj) {
    return false
  }
  return true
}
//------------------------------------------------------------------------------
var getBadOrder = function(order, callback) {
  var badOrder = {}

  async.forEachOf(order, function(value, key, cb) {
    httpGet(value, function(ret) {
      if (ret.scode == 1 && ret.data.order_id) {
        util.log('[ orders ]', key, code2info[ret.scode], ret.data.order_id)
      } else {
        util.log('[ orders ]', key, code2info[ret.scode])
        badOrder[key] = value
      }
      cb()
    })
  }, function(err) {
    callback(err, badOrder)
  })
}
//------------------------------------------------------------------------------
var getBadTc = function(tc, callback) {
  var badTcs = {}
  async.forEachOf(tc, function(value1, key1, cb1) {
    var badQdUrl = {}
    async.forEachOf(value1, function(value2, key2, cb2) {
      httpPost(value2.url, function(ret) {
        if (ret.scode == 1) {
          util.log('[ thirdCallback ]', key2, code2info[ret.scode], ret.data)
        } else {
          util.log('[ thirdCallback ]', key2, code2info[ret.scode])
          badQdUrl[key2] = value2
        }
        cb2()
      })
    }, function(err) {
      badTcs[key1] = badQdUrl
      cb1(err)
    })
  }, function(err) {
    callback(err, badTcs)
  })
}
//------------------------------------------------------------------------------
var states = {
  func1 : {
    ok : {
      method : 'func1', sendTime : common.sendTime,
    },
    fail : {
      method : 'func2', sendTime : common.sendTime / 2,
    }
  },
  func2 : {
    ok : {
      method : 'func1', sendTime : common.sendTime,
    },
    fail : {
      method : 'func3', sendTime : 0,
    }    
  },
  func3 : {
    ok : {
      method : 'func2', sendTime : common.sendTime / 2,
    }
  },
}
//------------------------------------------------------------------------------
var funcOrders = function (orders, cb) {
  getBadOrder(orders, function(err, badOrders) {
    if (err) {
      util.log('funcOrders', err); return
    }

    if (isEmptyObj(badOrders)) {
      cb('ok', order)
    } else {
      cb('fail', badOrders)
    }
  })
}
//------------------------------------------------------------------------------
var funcTcs = function (tcs, cb) {
  getBadTc(tcs, function(err, badTcs) {
    if (err) {
      util.log('funcTcs', err); return
    }

    var noHaveBadTc = true
    async.forEachOf(badTcs, function(value, key, cb) {
      if (!isEmptyObj(value)) {
        noHaveBadTc = false
      }
      cb()
    }, function(err) {
      if (err) {
        util.log('funcTcs', err); return
      }

      if (noHaveBadTc) {
        cb('ok', tc)
      } else {
        cb('fail', badTcs)
      }
    })
  })
}
//------------------------------------------------------------------------------
var funcDgu = function(deliverGoodsUrl, callback) {
  httpGet(deliverGoodsUrl, function(ret) {
    if (ret.scode == 1) {
      util.log('[ deliverGoods ]', code2info[ret.scode], ret.data)
      callback('ok', deliverGoodsUrl)
    } else {
      util.log('[ deliverGoods ]', code2info[ret.scode])
      callback('fail', deliverGoodsUrl)
    }
  })
}
//------------------------------------------------------------------------------
var processor = {
  'order': {
    'func1' : funcOrders,
    'func2' : funcOrders,
    'func3' : function (orders, cb) {
      if (common.sms) {
        var keys = Object.keys(orders).toString()
        util.log('[ orders ] send sms', keys)
        var content = '(无悔)' + keys + '在' + getTime() + '下单失败'
        sendSms(common.smsList, content)
      }
      cb('ok', orders)
    }
  },
  'thirdCallback': {
    'func1' : funcTcs,
    'func2' : funcTcs,
    'func3' : function (tcs, cb) {
      if (common.sms) {
        var keys = []
        for (var x in tcs) {
          for (var y in tcs[x]) {
            keys.push(y)
          }
        }
        util.log('[ thirdCallback ] send sms', keys.toString())
        var content = '无悔' + keys.toString() + '在' + getTime() + '回调失败'
        sendSms(common.smsList, content)
      }
      cb('ok', tcs)
    }
  },
  'deliverGoods': {
    'func1' : funcDgu,
    'func2' : funcDgu,
    'func3' : function (dgu, cb) {
      if (common.sms) {
        util.log('[ deliverGoods ] send sms')
        var content = '无悔在' + getTime() + '发货失败'
        sendSms(common.smsList, content)
      }
      cb('ok', dgu)
    }
  }
}
//------------------------------------------------------------------------------
var mainLoop = function mainLoop(type, fn, obj) {
  processor[type][fn](obj, function (ret, newObj) {
      var next = states[fn][ret]
      setTimeout(function () {       
        mainLoop(type, next.method, newObj)
      }, next.sendTime)
  })
}
//------------------------------------------------------------------------------
if (common.control) {
    if (common.control.monitorOrder) {
      mainLoop('order', 'func1', order)
    }

    if (common.control.monitorThirdCallback) {
      mainLoop('thirdCallback', 'func1', tc)
    }

    if (common.control.monitorDeliverGoods) {
      mainLoop('deliverGoods', 'func1', common.deliverGoodsUrl)
    }
} else {
  mainLoop('order', 'func1', order)
  mainLoop('thirdCallback', 'func1', tc)
  mainLoop('deliverGoods', 'func1', common.deliverGoodsUrl)
}
//------------------------------------------------------------------------------
process.on('uncaughtException', function(err) {
  util.log(err.message, err.stack)
})
//------------------------------------------------------------------------------
