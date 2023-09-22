// ------------------------------------------------------------------------------------------------
var check_data = require("./check_data")
// ------------------------------------------------------------------------------------------------
var get_value_type = require("../../get_value_type")
var is_array = get_value_type.is_array
var is_object = get_value_type.is_object

//---------------------------------------------------------------------------------------------------------
function get_type_fn(filter_fn, map_fn, return_str) {
    return (config, data, arr_str, arr_str_before) => {
        var config_line = config.line
        var arr = data ? Object.keys(data).filter(filter_fn(config_line, data)).map(map_fn(config_line, data)) : []
        arr_str && arr.push(arr_str)
        arr_str_before && arr.unshift(arr_str_before)
        return arr.length > 0 ? return_str + arr.join(' , ') : ''
    }
}

//---------------------------------------------------------------------------------------------------------
var get_type = function () {
    var config = {
        ''    : 'asc',
        'asc' : 'asc',
        '1'   : 'asc',
        '-1'  : 'desc',
        'desc': 'desc',
    }
    return (type) => config[type] || config['']
}()
//---------------------------------------------------------------------------------------------------------
var get_group_by = get_type_fn((conf, data) => i => conf[i], (conf, data) => i => `\`${i}\``, ' group by ')
var get_order_by = get_type_fn((conf, data) => i => conf[i], (conf, data) => i => `\`${i}\` ${get_type(data[i])}`, ' order by ')
//---------------------------------------------------------------------------------------------------------
// exports.get_group_by = function(config.line, group_by, group_by_str) {
//     var arr = group_by ? group_by.filter(i => config.line[i]).map(i => `\`${i}\``) : []
//     group_by_str && arr.push(group_by_str)
//     return arr.length > 0 ? ' group by ' + arr.join(' , ') : ''
// }
//---------------------------------------------------------------------------------------------------------
// exports.get_order_by = function(config.line, order_by, order_by_str, order_by_str_before) {
//     var arr = order_by ? Object.keys(order_by).filter(i => config.line[i]).map(i => `\`${i}\` ${get_type(order_by[i])}`) : []
//     order_by_str && order_by.push(order_by_str)
//     order_by_str_before && order_by.unshift(order_by_str_before)
//     return arr.length > 0 ? ' order by ' + arr.join(' , ') : ''
// }
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
var get_limit = function get_limit(config, limit) {
    if (!limit) {
        return ''
    }

    var number = parseInt(limit.number) || 10
    var start = parseInt(limit.index) || 1
    start = (start - 1) * number

    return ` limit ${start} , ${number} `
}
//---------------------------------------------------------------------------------------------------------
var get_set_data_str = function get_set_data_str(config, set_data, set_data_str) {
    var data = check_data(set_data, config.line, config.set_data_line)
    var arr = Object.keys(data).map(key => `\`${key}\` = ${data[key]}`)
    set_data_str && (arr.push(set_data_str))
    return arr.join(" , ")
}

// ------------------------------------------------------------------------------------------------
var config = {
    'min'        : (key, val) => `\`${key}\` > ${val}`,
    'and_min'    : (key, val) => `\`${key}\` >= ${val}`,
    'min_and'    : (key, val) => `\`${key}\` >= ${val}`,
    'max'        : (key, val) => `\`${key}\` < ${val}`,
    'and_max'    : (key, val) => `\`${key}\` <= ${val}`,
    'max_and'    : (key, val) => `\`${key}\` <= ${val}`,
    'in'         : (key, val) => `\`${key}\` in (${val.join(',')})`,
    'not_in'     : (key, val) => `\`${key}\` not in (${val.join ? val.join(',') : val})`,
    'like'       : (key, val) => `\`${key}\` like ${val.join ? val.join(',') : val}`,
    'is_not_null': (key, val) => `\`${key}\` is not null`,
    'is_null'    : (key, val) => `\`${key}\` is null`,
    '='          : (key, val) => `\`${key}\` = ${val}`,
}
// ------------------------------------------------------------------------------------------------
var add_val_is_obj = function (config) {
    var _keys = Object.keys(config)
    return (arr, key, data) => {
        var data_keys = Object.keys(data)
        var arrs = _keys.length > data_keys.length ? data_keys : _keys
        arrs.forEach(i => {
            config[i] && data[i] && arr.push(config[i](key, data[i]))
        })
    }
}(config)
// ------------------------------------------------------------------------------------------------
var add_val = (arr, key, val) => arr.push(config['in'](key, is_array(val) ? val : [val]))
// ------------------------------------------------------------------------------------------------

var get_where_str = function get_where_str(config, where_data, where_data_str, where_join) {
    var config_line = config.line
    var data = check_data(where_data, config_line)

    var where_arr = []
    Object.keys(data).forEach(key => {
        var val = data[key]
        var fn = (is_object(val) ? add_val_is_obj : add_val)
        fn(where_arr, key, val)
    })

    where_data_str && (where_arr.push(where_data_str))

    return where_arr.length > 0 ? " where " + where_arr.join(where_join || " and ") : ""
}

// ------------------------------------------------------------------------------------------------
module.exports = {
    get_where_str,
    get_group_by,
    get_order_by,
    get_set_data_str,
    get_limit,
    check_data,
    get_where_str_fn   : (config, option) => get_where_str(config, option.where_data, option.where_data_str, option.where_join),
    get_group_by_fn    : (config, option) => get_group_by(config, option.group_by, option.group_by_str),
    get_order_by_fn    : (config, option) => get_order_by(config, option.order_by, option.order_by_str, option.order_by_str_before),
    get_set_data_str_fn: (config, option) => get_set_data_str(config, option.set_data, option.set_data_str),
}