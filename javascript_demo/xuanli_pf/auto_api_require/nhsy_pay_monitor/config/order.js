var PT_KEY = 'paycp(#(%$(%!$'
var u2     = require('/root/code/node_webs/node_modules/util2')

var get_prebuy_sign = function(args) {
    var s1 = ''
    var encrypt_fields = ['account', 'item_id', 'pay_id', 'pf_id', 'pk_id', 'total_price']
    encrypt_fields.forEach(function(key) {
        s1 += key + '=' + args[key] + '&'
    })
    var s2 = s1 + u2.encrypt_by_md5(PT_KEY).toLowerCase()
    var server_sign = u2.encrypt_by_md5(s2)
    return server_sign
}

var qs = require('querystring')

var urls = {
  "winxin_nhsy":       "http://paynhsy.ehijoy.com/pre_buy_request?app_id=20001&pf_id=weixin&pk_id=1&pay_id=1&region_id=pttest&account=20001_55852&third_account=20001_55852&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
 "alipay_nhsy":       "http://paynhsy.ehijoy.com/pre_buy_request?app_id=20001&pf_id=alipay&pk_id=2&pay_id=2&region_id=pttest&account=20001_55852&third_account=20001_55852&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "oppo_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=oppo&pk_id=11&pay_id=11&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "vivo_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=vivo&pk_id=12&pay_id=12&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "huawei_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=huawei&pk_id=13&pay_id=13&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "uc_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=uc&pk_id=14&pay_id=14&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "xiaomi_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=xiaomi&pk_id=16&pay_id=16&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "yingyongbao_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=yingyongbao&pk_id=23&pay_id=23&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "4399_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=4399&pk_id=26&pay_id=26&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
// "BiliBill_ehijoy":       "http://pay.ehijoy.com/1000004/pre_buy_request?app_id=1000004&pf_id=BiliBili&pk_id=30&pay_id=30&region_id=tpfdemo-dev-yaren&account=1000004_250978&third_account=1000004_250978&item_id=1003&item_name=test&item_count=1&item_price=1&total_price=1&extra=&cp_param&user_info&role_id&deviceid&idfa&ryos&rydevicetype&ryosversion&app_version&ip&imei&androidid&channelId=100" ,
}
for(k in urls) {
    var url  = urls[k]
    var args = qs.parse(url.split('?')[1])
    var sign = get_prebuy_sign(args)
    urls[k]  += '&sign=' + sign
} 

module.exports = urls
