// 我们自己的
// 有日期后缀
var config = {
    line: {
        "iid"            : "id",
        "date"           : "date",
        "server_id"      : "varchar",
        "uid"            : "varchar",
        "account_type"   : "varchar",
        "channel"        : "varchar",
        "version"        : "varchar",
        "imei"           : "varchar",
        "login_time"     : "date",
        "ip"             : "varchar",
        "vip_level"      : "varchar",
        "location"       : "varchar",
        "mobile_model"   : "varchar",
        "WIFI"           : "varchar",
        "sys_ver"        : "varchar",
        "user_source"    : "varchar",
        "pid"            : "varchar",
        "before_adid"    : "varchar",
        "ad_id"          : "varchar",
        "nParam1"        : "varchar",
        "nParam2"        : "varchar",
        "nParam3"        : "varchar",
        "nParam4"        : "varchar",
        "sParam1"        : "varchar",
        "sParam2"        : "varchar",
        "sParam3"        : "varchar",
        "sParam4"        : "varchar",
        "sParam5"        : "varchar",
        "sParam6"        : "varchar",
        "need_sec_decode": "varchar",
    },
}


module.exports = require('./init').init(config, __filename)