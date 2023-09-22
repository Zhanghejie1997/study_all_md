var PT_KEY = 'shangyoo_hxddz_0739210!@#$$'
var u2     = require('../../code/node_webs/node_modules/util2')

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
  "vivo_37":       "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=vivo&pk_id=10006&pay_id=37&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=117.136.80.54&isp=0&code=",
  "oppo_1":        "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=1&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=14.30.3.100&isp=0&code=",
  "weixin_7":      "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=7&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=13&item_name=20000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=1&total_price=1&currency=RMB&spbill_create_ip=192.168.5.172&trade_type=APP",
  "mm_8":          "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=8&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=13&item_name=20000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=400&total_price=400&currency=RMB",
  "migu_10":       "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=vivo&pk_id=10006&pay_id=10&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=34&item_name=VIP1&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=117.136.16.97&isp=1&code=006102459009",
  "yisou_11":      "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=11&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=218.17.162.146",
  "youbei_17":     "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=17&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=58&item_name=VIP1&request_id=0&item_count=1&item_price=400&total_price=400&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=36.110.5.52&isp=1",
  "zhangzhifu_23": "http://pay.hxddz.syyx.com/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=23&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=183.15.244.247&isp=3"
}

for(k in urls) {
    var url  = urls[k]
    var args = qs.parse(url.split('?')[1])
    var sign = get_prebuy_sign(args)
    urls[k]  += '&sign=' + sign
} 

module.exports = urls
