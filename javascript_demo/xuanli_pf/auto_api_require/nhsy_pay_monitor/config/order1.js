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
"oppo_1":        "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=1&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=14.30.3.100&isp=0&code=",
"dianxin_5":     "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=5&app_id=1404&server_id=1&account=&third_account=113890336&role_id=5886569&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=00000000000000000000&imsi=460030916552465&imei=865728028784619&ip=14.16.184.252&isp=3&code=oppo",
"liantong_6":    "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=6&app_id=1404&server_id=1&account=&third_account=oXddit19iUMrdy0f9avVxN77fDkA&role_id=6267769&item_id=60&item_name=1%E9%A6%96%E5%85%85%E7%A4%BC%E5%8C%85&request_id=0&item_count=1&item_price=500&total_price=500&currency=RMB&iccid=89860112611102986361&imsi=460012201658294&imei=864616029536669&ip=182.18.101.198&isp=2",
"weixin_7":      "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=7&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=13&item_name=20000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=1&total_price=1&currency=RMB&spbill_create_ip=192.168.5.172&trade_type=APP",
"mm_8":          "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=8&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=13&item_name=20000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=400&total_price=400&currency=RMB",
"migu_10":       "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=vivo&pk_id=10006&pay_id=10&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=34&item_name=VIP1&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=117.136.16.97&isp=1&code=006102459009",
"yisou_11":      "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=11&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=218.17.162.146",
"mingtiandl_14": "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=14&app_id=1404&server_id=1&account=&third_account=116075319&role_id=270630&item_id=59&item_name=10000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=100&total_price=100&currency=RMB&iccid=00000000000000000000&imsi=460030916552465&imei=865728028784619&ip=113.116.230.106&isp=3",
"youbei_17":     "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=17&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=58&item_name=VIP1&request_id=0&item_count=1&item_price=400&total_price=400&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=36.110.5.52&isp=1",
"zhangzhifu_23": "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=23&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=183.15.244.247&isp=3",
"31":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=31&app_id=1404&server_id=1&account=&third_account=33453928&role_id=6467049&item_id=60&item_name=1%E9%A6%96%E5%85%85%E7%A4%BC%E5%8C%85&request_id=0&item_count=1&item_price=400&total_price=400&currency=RMB&iccid=898600A01285F5593472&imsi=460077055983472&imei=869409027545956&ip=223.104.18.129&isp=1&code=1922",
"vivo_37":       "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=vivo&pk_id=10006&pay_id=37&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=117.136.80.54&isp=0&code=",
"42":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=42&app_id=1404&server_id=1&account=&third_account=132169376&role_id=10249128&item_id=63&item_name=1%E9%A6%96%E5%85%85%E7%A4%BC%E5%8C%85&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=89860315249133829188&imsi=460031243435489&imei=869804026319470&ip=36.41.151.10&isp=3&code=116022501206",
"48":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=48&app_id=1404&server_id=1&account=&third_account=oXddit0Ti2P_7kUSI7qufyhkaXOs&role_id=9351253&item_id=29&item_name=50%E4%B8%AA%E5%B0%8F%E5%96%87%E5%8F%AD&request_id=0&item_count=1&item_price=500&total_price=500&currency=RMB&iccid=89860027173001357146&imsi=460023713532853&imei=354210070436818&ip=58.251.141.28&isp=1&code=YX%2C252336%2C5%2Cd1f6%2C1812726%2C621005",
"54":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=03&pay_id=54&app_id=1404&server_id=1&account=&third_account=142069517&role_id=11996791&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=89860315145561193503&imsi=460031266705501&imei=00000098520722&ip=36.63.83.139&isp=3&code=116041202006",
"57":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=vivo&pk_id=10007&pay_id=57&app_id=1404&server_id=1&account=&third_account=2154465&role_id=11173757&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=89861114757550347840&imsi=460030916552465&imei=99000710453833&ip=58.251.141.28&isp=3&code=",
"vivo_65":       "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=vivo&pk_id=10006&pay_id=65&app_id=1404&server_id=1&account=&third_account=123456111&role_id=-1&item_id=44&item_name=30000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=123455d1111111111111&imsi=111111222222333&imei=11111222222333&ip=117.136.80.54&isp=0&code=",
"69":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=69&app_id=1404&server_id=1&account=&third_account=113929491&role_id=304664&item_id=75&item_name=60000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=600&total_price=600&currency=RMB&iccid=898600F1011550126589&imsi=460026103058104&imei=865166028756537&ip=183.16.3.29&isp=1&code=3069",
"70":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=vivo&pk_id=10006&pay_id=70&app_id=1404&server_id=1&account=&third_account=137371&role_id=14647529&item_id=76&item_name=105000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=1000&total_price=1000&currency=RMB&iccid=898600e9261572881788&imsi=460027924828643&imei=868551023601811&ip=183.15.240.152&isp=1&code=100934&net=WIFI",
"70-1":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=vivo&pk_id=10006&pay_id=70&app_id=1404&server_id=1&account=&third_account=137371&role_id=14647529&item_id=76&item_name=105000%E9%87%91%E8%B1%86&request_id=0&item_count=1&item_price=1000&total_price=1000&currency=RMB&iccid=898600e9261572881788&imsi=460027924828643&imei=868551023601811&ip=183.15.240.152&isp=1&code=100934&net=CMnet",
"81":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=81&app_id=1404&server_id=1&account=&third_account=oXdditwxaCLWVj2as9KZrmAMtAVc&role_id=6063131&item_id=34&item_name=VIP1&request_id=0&item_count=1&item_price=600&total_price=600¤cy=RMB&iccid=89860058101550311699&imsi=460004280876467&imei=867663028734769&ip=117.136.45.42&isp=1&code=abc&net=wifi",
"82":            "http://prebuy.hxddz.syyx.cn/pre_buy_request?pf_id=oppo&pk_id=02&pay_id=82&app_id=1404&server_id=1&account=&third_account=oXdditwxaCLWVj2as9KZrmAMtAVc&role_id=6063131&item_id=34&item_name=VIP1&request_id=0&item_count=1&item_price=600&total_price=600¤cy=RMB&iccid=89860058101550311699&imsi=460004280876467&imei=867663028734769&ip=117.136.45.42&isp=1&code=abc&net=wifi",
}

for(k in urls) {
    var url  = urls[k]
    var args = qs.parse(url.split('?')[1])
    var sign = get_prebuy_sign(args)
    urls[k]  += '&sign=' + sign
} 

module.exports = urls