//-----------------------------------------------------------------------------
var http = require('http')
var url  = require('url')
var qs   = require('querystring')
var util = require('util')
var exec = require('child_process').exec
//-----------------------------------------------------------------------------
var api = http.createServer(function(req, res) {
    var url_obj  = url.parse(req.url)
    var pathname = url_obj.pathname
    var param    = qs.parse(url_obj.query)
    util.log(pathname, param)

    if (pathname !== '/hxddz_pay_monitor') {
        http_res(res, 404, 0, http.STATUS_CODES[404]); return
    }

    if (!param.do) {
        http_res(res, 200, 0, 'Lack Parament'); return
    }

    if (['start', 'stop', 'list'].indexOf(param.do) === -1) {
        http_res(res, 200, 0, 'Bad Parament'); return
    }
    
    if (param.do === 'list') {
        var cmd_str = 'ps -ef | grep "node4 app.js" | grep -v grep | wc -l'
        exec_cmd(cmd_str, res)
    } else {
        exec_cmd('./monitor.sh ' + param.do, res)
    }
})
//-----------------------------------------------------------------------------
api.listen(8124, '0.0.0.0' ,function() {
    util.log('hxddz pay monitor api start on 8124 ...')
})
//-----------------------------------------------------------------------------
api.on('error', function(err) {
    util.log('hxddz pay api error', err)
    process.exit()
})
//-----------------------------------------------------------------------------
var exec_cmd = function(cmd_str, res) {
    exec(cmd_str, { maxBuffer: 1024 * 1024 * 100 }, function(err, stdout, stderr) {
        if (err || stderr) {
            util.log('cmd:', cmd_str, 'msg:', err || stderr)
            http_res(res, 200, 0, err || stderr)
        }

        stdout = stdout.replace(/\n$/g, '')
        util.log('cmd:', cmd_str, 'msg:', stdout)

        if (!/ok/.test(stdout) && /monitor/.test(cmd_str)) {
            http_res(res, 200, 0, stdout); return
        }
        
        http_res(res, 200, 1, stdout)
    })
}
//-----------------------------------------------------------------------------
var http_res = function(res, http_code, status_code, msg) {
    res.writeHead(http_code, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': 'http://kfd.syyx.cn'
    })
    res.end(JSON.stringify({ retcode: status_code, msg: msg }))
}