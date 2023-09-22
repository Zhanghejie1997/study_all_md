var PT_KEY = 'yqqs(#(%$(%!$'
var u2     = require('/root/code/node_webs/node_modules/util2')

var get_prebuy_sign = function(args) {
    var s1 = ''
    var encrypt_fields = ['pf_id', 'pk_id', 'pay_id', 'item_id', 'item_count', 'total_price']
    encrypt_fields.forEach(function(key) {
        s1 += key + '=' + args[key] + '&'
    })
    var s2 = s1 + u2.encrypt_by_md5(PT_KEY).toLowerCase()
    var server_sign = u2.encrypt_by_md5(s2)
    return server_sign
}

var qs = require('querystring')

var urls = {
// module.exports = {
  "vivo_yqqs":       "http://payyqqs.syyx.com/pre_buy_request?pf_id=vivo&pk_id=20001&pay_id=2&app_id=1&server_id=1&account=&third_account=123456111&role_id=-1&item_id=5&item_name=5000%E5%AE%9D%E7%9F%B3&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123xiaye1111111111111&imsi=111111222222333&imei=11111222222333&ip=117.136.80.54&isp=0&code=&sdk_type=online"
}

for(k in urls) {
    var url  = urls[k]
    var args = qs.parse(url.split('?')[1])
    var sign = get_prebuy_sign(args)
    urls[k]  += '&sign=' + sign
} 

module.exports = urls
