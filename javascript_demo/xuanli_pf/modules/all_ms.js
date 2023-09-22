exports.esp = ms.sqlstr ? ms.sqlstr.escape : require(process.env['HOME'] + '/code/node_webs/node_modules/sqlstr').escape
exports.info = ms.log ? ms.log.info : console.error
exports.error = ms.log ? ms.log.error : console.error
// ------------------------------------------------------------------------------------------------

exports.get_dbs = (dbs_name) => ms.db.mysql[dbs_name]
exports.get_redis = (redis_name) => ms.db.redis[redis_name]

// ------------------------------------------------------------------------------------------------
var async = ms.async || require('async')
exports.waterfall = async.waterfall
exports.eachSeries = async.eachSeries
// ------------------------------------------------------------------------------------------------
exports.is_array = (data) => Array.isArray(data)
exports.is_null_array = (val) => !val || val.length == 0
exports.is_function = (data) => typeof data === 'function'
exports.is_object = (data) => Object.prototype.toString.call(data) === '[object Object]'

// ------------------------------------------------------------------------------------------------
exports.object_update_key = (data, update_key_fn) => {
    var obj = {}
    return Object.keys(data).forEach(key => obj[update_key_fn(key)] = data[key]) || obj
}
// ------------------------------------------------------------------------------------------------
exports.get_new_obj = function(filter_fn) {
    return (data) => {
        var obj = {}
        return Object.keys(data).forEach(i => { obj[i] = filter_fn(data[i], i) }) || obj
    }
}
// ------------------------------------------------------------------------------------------------
exports.set_data_value = function(key, value, data) {
    data = data || {}
    data[key] = value
    return data
}
// ------------------------------------------------------------------------------------------------
exports.set_datas_values = function(keys, values, data) {
    data = data || {}
    return keys.forEach((key, i) => data[key] = values[i]) || data
}
// ------------------------------------------------------------------------------------------------
exports.get_arrar_indexof = function(arr) {
    return (val) => arr.indexOf(val) > -1
}

exports.get_waterfall_map = function(data) {
    return (fn, index) => index ? (_data, cb) => fn(_data, cb) : (cb) => fn(data, cb)
}