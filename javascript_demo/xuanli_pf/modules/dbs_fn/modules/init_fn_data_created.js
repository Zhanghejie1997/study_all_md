// ------------------------------------------------------------------------------------------------
var create_select_line = require("./create_select_line")
var dbs_config = require("./dbs_config_fn")
// ------------------------------------------------------------------------------------------------
var arr = ['dbs_name', 'table_name', 'select_line']
// ------------------------------------------------------------------------------------------------
module.exports = function init_config(obj_config, filename) {
    var config = Object.assign({
        line: obj_config.line || obj_config,
        create_dbs_sql: obj_config.create_dbs_sql,
    }, dbs_config.get_table_and_name(filename))


    var lines = Object.keys(config['line'])
    config.select_line = config.select_line || create_select_line(lines, config.line)
    config.where_data_line = lines
    config.set_data_line = {}
    Object.keys(config['line']).filter(i => config['line'][i] != 'id').forEach(i => config.set_data_line[i] = 1)
    config.insert_keys = Object.keys(config.set_data_line)
    config.insert_keys_string = '(' + config.insert_keys.map(i => `\`${i}\``) + ')'

    return config
}

// ------------------------------------------------------------------------------------------------