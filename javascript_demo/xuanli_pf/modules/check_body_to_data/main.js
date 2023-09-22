// ------------------------------------------------------------------------------------------------

var all_ms = require("../all_ms")

var waterfall = all_ms.waterfall
var is_null_array = all_ms.is_null_array
var is_object = all_ms.is_object
var get_new_obj = all_ms.get_new_obj
var get_arrar_indexof = all_ms.get_arrar_indexof
var get_waterfall_map = all_ms.get_waterfall_map

// ------------------------------------------------------------------------------------------------
var check_type_config = require('./modules/check_type_config')

var get_check_run = check_type_config.get_check_run
var get_check_data_type = check_type_config.get_check_data_type
// ------------------------------------------------------------------------------------------------
var value_to_arr = (string) => (string || '').split('|')
// ------------------------------------------------------------------------------------------------
var get_init_config = get_new_obj(get_filter_data)
// ------------------------------------------------------------------------------------------------
var config_all_fun_key = ['next_tick', 'marge_data', 'end_next_tick']

function get_filter_data(data) {
    return {
        filter: get_filter_to_fn(data.filter),
        next: config_all_fun_key.filter(i => data[i]).map(i => data[i])
    }
}
// ------------------------------------------------------------------------------------------------
var value_to_arr_key = ['key', 'set_data']

function get_filter_to_fn(filter) {
    return filter.map(i => {
        value_to_arr_key.forEach(key => i[key] = value_to_arr(i[key]))
        i._check_type = get_check_data_type(i.check, i.default) // function
        return i
    })
}
// ------------------------------------------------------------------------------------------------
var is_self_create = get_arrar_indexof(['default_function', 'function'])

function save_data(check, check_data, key, value) {
    if (value === undefined) { return }

    var set_data = {}
    is_self_create(check._check_type) && is_object(value) ? (set_data = value) : (set_data[key] = value)

    return check.set_data.forEach(i => i ? (check_data[i] = Object.assign(check_data[i] || {}, set_data)) : Object.assign(check_data || {}, set_data))
}
// ------------------------------------------------------------------------------------------------
function start_check(filter, data, callback) {
    var check_data = {}
    if (is_null_array(filter)) {
        return callback(null, check_data)
    }
    waterfall(filter.map(item => cb => check_keys(item, check_data, data, cb)), (err, data) => callback(err, check_data))
}
// ------------------------------------------------------------------------------------------------
function check_keys(check, check_data, data, callback) {
    waterfall(check.key.map(key => cb => get_check_run(check)(check, key, data, (err, result) => {
        result === undefined || save_data(check, check_data, key, result)
        return cb(err)
    })), (err, result) => {
        console.log(err);
        callback(err, result)
    })
}
// ------------------------------------------------------------------------------------------------
function next_run(next_fn, data, callback) {
    if (is_null_array(next_fn)) {
        return callback(null, data)
    }
    waterfall(next_fn.map(get_waterfall_map(data)), callback)
}
// ------------------------------------------------------------------------------------------------
module.exports = function(config, option) {
    var _option = option || {}
    var _config = get_init_config(config)

    var check = (type_conf, data, callback) => waterfall([
        (cb) => start_check(type_conf.filter, data, cb),
        (new_data, cb) => next_run(type_conf.next, new_data, cb)
    ], callback)
   
    return get_new_obj(item => (data, cb) => check(item, data, cb))(_config)
}
// ------------------------------------------------------------------------------------------------
