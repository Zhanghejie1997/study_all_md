// ------------------------------------------------------------------------------------------------
var all_ms = require('../../all_ms')
var info = all_ms.info
var error = all_ms.error
var get_dbs = all_ms.get_dbs
// ------------------------------------------------------------------------------------------------
module.exports = {
    run(dbs, sql, callback) {
        run_sql({ dbs }, sql, callback)
    },
    run_sql(dbs_config, sql, callback) {
        run_sql(dbs_config, sql, callback)
    }
}

// ------------------------------------------------------------------------------------------------
function run_sql(dbs_config, sql, callback, restart) {
    var table_name = dbs_config.table_name || ''
    var dbs_name = dbs_config.dbs_name || ''
    var dbs = dbs_config.dbs || get_dbs(dbs_name)

    var log_text = [dbs_name, table_name].map(i => i ? '[' + i + ']' : '').join('')

    if (!sql) {
        return callback(table_name + 'sql is not')
    }

    if(!dbs_config.config || dbs_config.config.log !== false){
        info(log_text + ':' + sql.slice(0, 2000))
    }

    dbs ? dbs.exec_sql(sql, (err, result) => {
        if (err && /er_no_such_table/i.test(err) && dbs_config.create_dbs_sql && !restart) {
            var create_sql = typeof dbs_config.create_dbs_sql == 'string' ? dbs_config.create_dbs_sql : dbs_config.create_dbs_sql(dbs)
            return run_sql(dbs_config, create_sql, (err) => err ? callback(err) : run_sql(dbs_config, sql, callback, !restart), !restart)
        }
        err && (error(log_text, err))
        callback && callback(err, result)
    }) : callback(log_text + ' dbs is null, need to add configuration:' + dbs_config.dbs_name)
}