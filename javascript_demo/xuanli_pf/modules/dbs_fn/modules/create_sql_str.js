// ------------------------------------------------------------------------------------------------

var create_select_line = require('./create_select_line')
var select_fn = require('./select_fn')

var get_set_data_str_fn = select_fn.get_set_data_str_fn
var get_where_str_fn = select_fn.get_where_str_fn
var get_group_by_fn = select_fn.get_group_by_fn
var get_order_by_fn = select_fn.get_order_by_fn
var get_limit = select_fn.get_limit
var check_data = select_fn.check_data
var last_id_sql = require("./config_js").last_id_sql

// ------------------------------------------------------------------------------------------------
function get_select_str_fn(config, option) {
    if (option.select_line_arr) {
        return create_select_line(option.select_line_arr, config.line)
    }
    return option.select_line_str || config.select_line
}

// ------------------------------------------------------------------------------------------------
function select_sql(config, option) {
    var select_line = get_select_str_fn(config, option)
    var where_str = get_where_str_fn(config, option)
    var group_by_str = get_group_by_fn(config, option)
    var order_by_str = get_order_by_fn(config, option)

    var limit = get_limit(config, option.page || option.limit)

    var sql = ['select', select_line, 'from', config.table_name, where_str, group_by_str, order_by_str, limit, ';'].join(' ')
    return sql
}

// ------------------------------------------------------------------------------------------------
function update_sql(config, option) {

    var set_data = get_set_data_str_fn(config, option)
    if (set_data == '') {
        return ''
    }

    var where_str = get_where_str_fn(config, option)
    var sql = ['update', config.table_name, 'set', set_data, where_str, ';'].join(' ')

    return sql
}

// ------------------------------------------------------------------------------------------------

function updates_sql(config, options) {
    return options.map(option => update_sql(config, option)).filter(i => i).join('')
}

// ------------------------------------------------------------------------------------------------

function delete_sql(config, option) {
    var where_str = get_where_str_fn(config, option)
    var sql = ['delete from ', config.table_name, where_str, ';'].join(' ')
    return sql
}

// ------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
function get_duplicate(option) {

    var obj = option.duplicate ? check_data(option.duplicate, config.line, config.set_data_line) : null
    var arr = obj ? Object.keys(obj).map(key => `\`${key}\` = ${obj[key]}`) : []

    option.duplicate_str && arr.push(option.duplicate_str)

    return arr.length > 0 ? 'on duplicate key update ' + arr.join(' , ') : ''
}

// ------------------------------------------------------------------------------------------------
function insert_sql(config, option) {
    var set_data = check_data(option.set_data, config.line, config.set_data_line)
    var duplicate = get_duplicate(option)
    if (Object.keys(set_data).length == 0) {
        return ''
    }

    var ignore = option.ignore ? 'ignore' : ''
    var table_name = config.table_name

    var insert_keys = Object.keys(set_data)

    var set_data_str = '(' + insert_keys.map(key => set_data[key]).join(',') + ')'

    var insert_keys_str = '(' + insert_keys.map(key => '`' + key + '`').join(' , ') + ')'
    var get_last_id_sql = option.get_last_id === false ? '' : last_id_sql
    var sql = ['insert', ignore, 'into', table_name, insert_keys_str, 'values', set_data_str, duplicate].join(' ')
    sql += get_last_id_sql
    return sql
}

// ------------------------------------------------------------------------------------------------
function inserts_sql(config, option) {
    var insert_keys = config.insert_keys
    var duplicate = get_duplicate(option)
    var set_data_arr = option && option.set_data ? option.set_data.map(set_data_item => {
        var set_data = check_data(set_data_item, config.line, config.set_data_line)

        if (Object.keys(set_data).length == 0) {
            return ''
        }

        return '(' + insert_keys.map(key => set_data[key] || ' null ').join(' , ') + ')'
    }).filter(i => i) : []

    if (set_data_arr.length == 0) {
        return ''
    }
    var set_data_str = set_data_arr.join(' , ')

    var ignore = option.ignore ? 'ignore' : ''
    var table_name = config.table_name
    var insert_keys_str = '(' + insert_keys.map(i => '`' + i + '`').join(',') + ')'
    var get_last_id_sql = option.get_last_id ? last_id_sql : ''

    var sql = ['insert', ignore, 'into', table_name, insert_keys_str, 'values', set_data_str, duplicate].join(' ')
    sql += get_last_id_sql
    return sql
}

// ------------------------------------------------------------------------------------------------


exports.select_sql = select_sql
exports.update_sql = update_sql
exports.updates_sql = updates_sql
exports.delete_sql = delete_sql
exports.insert_sql = insert_sql
exports.inserts_sql = inserts_sql