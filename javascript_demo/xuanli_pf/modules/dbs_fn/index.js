// ------------------------------------------------------------------------------------------------
var init_fn_data_created = require("./modules/init_fn_data_created")
var get_table_dbs = require("./modules/get_table_dbs")
var run_sql = require("./modules/run_sql").run_sql
// ------------------------------------------------------------------------------------------------
var create_sql_str = require("./modules/create_sql_str")
// ------------------------------------------------------------------------------------------------
var all_ms = require('../all_ms')
var waterfall = all_ms.waterfall

// ------------------------------------------------------------------------------------------------

exports.init = function(_option, filename) {
    var config = init_fn_data_created(_option, filename)
    return {
        config,
        get_table_dbs: (option) => get_table_dbs(config, option),

        select_page: (option, callback) => select_page(config, option, callback),
        select: (option, callback) => get_and_run_sql('select_sql', config, option, callback),
        update: (option, callback) => get_and_run_sql('update_sql', config, option, callback),
        updates: (options, callback) => get_and_run_sql('updates_sql', config, options, callback),
        insert: (option, callback) => get_and_run_sql('insert_sql', config, option, callback),
        inserts: (option, callback) => get_and_run_sql('inserts_sql', config, option, callback),
        delete: (option, callback) => get_and_run_sql('delete_sql', config, option, callback),

        select_sql: (option) => get_sql("select_sql", config, option),
        update_sql: (option) => get_sql("update_sql", config, option),
        update_sql: (option) => get_sql("update_sql", config, option),
        updates_sql: (options) => get_sql("updates_sql", config, options),
        insert_sql: (option) => get_sql("insert_sql", config, option),
        inserts_sql: (option) => get_sql("inserts_sql", config, option),
        delete_sql: (option) => get_sql("delete_sql", config, option),
    }
}
// ------------------------------------------------------------------------------------------------

function get_and_run_sql(type, config, option, callback) {
    option = option || {}
    var dbs_config = get_table_dbs(config, option)
    var sql = create_sql_str[type](dbs_config, option)
    return run_sql(dbs_config, sql, callback)
}
// ------------------------------------------------------------------------------------------------
function get_sql(type, config, option) {
    option = option || {}
    var dbs_config = get_table_dbs(config, option)
    return create_sql_str[type](dbs_config, option)
}
// ------------------------------------------------------------------------------------------------

function select_page(config, option, callback) {
    waterfall([
        (cb) => {
            var page_option = Object.assign({}, option, { select_line_str: 'count(*) as count', page: undefined })
            get_and_run_sql('select_sql', config, page_option, (err, result) => {
                cb(err, result && result[0] ? result[0].count : 0)
            })
        },
        (count, cb) => {
            if (!count) {
                return cb(null, { count, data: [] })
            }
            get_and_run_sql('select_sql', config, option, (err, data) => cb(err, { count, data }))
        }
    ], callback)
}