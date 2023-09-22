/**
 *  v_2.1版本
 *  添加 insert 的时候参数是对象自动转换
 *  v_2.2版本
 *  添加 执行失败是否判断是否有建表语句
 *  v_2.3版本 添加where_join 连接参数
 */
//---------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------
var all_ms = require("./config_js")
var last_id_sql = all_ms.last_id_sql


//---------------------------------------------------------------------------------------------------------
var create_select_line = require("./modules/create_select_line")

//------------------------------------------------------------------------------------------

exports.init = function init(obj_config, file_filename) {

    var config = init_fn_data_created(obj_config, file_filename)

    var fns = {
        config,
        last_id_sql,
        get_where_str,
        get_order_by,
        get_group_by,
        get_limit,
        get_select_str,
        get_table_dbs,
        create_select_line,
        run_sql,
        data_to_sql_data,
        get_set_data_str,
        get_update_sql,
        get_select_sql,
        get_insert_sql,
        get_inserts_sql,
        get_delete_sql,
        init_fn,
        get_duplicate,
        // run.js
        select,
        update,
        updates,
        insert,
        inserts,
        insert_lists,
        delete: deletes,
    }

    return fns
}

//---------------------------------------------------------------------------------------------------------

function init_fn_data_created(obj_config, file_filename) {
    function init_log_fn(obj_config, file_filename) {
        var filenames = (file_filename || "").split("/");

        var config = obj_config.line ? obj_config : { line: obj_config }

        config.def_dbs_name = config.dbs_name || filenames[filenames.length - 2]
        config.def_table_name = config.table_name || filenames[filenames.length - 1].split(".")[0]

        config.def_log_text = "[" + config.def_dbs_name + "]" + "[" + config.def_table_name + "]" // 日志打印

        config.info = ms.log.info
        config.error = ms.log.error

        config.def_dbs = ms.db && ms.db.mysql && ms.db.mysql[config.def_table_name];

        config.def_select_line = config.def_select_line || create_select_line(Object.keys(config["line"]), config.line)

        if (!config.not_update_line) {
            var not_update_line = {}
            Object.keys(config["line"]).filter(item => config["line"][item] == "id").forEach(item => {
                not_update_line[item] = true;
            })
            config.not_update_line = not_update_line
        }


        return config
    }

    // 打印初始化
    return init_log_fn(obj_config, file_filename)
}

//---------------------------------------------------------------------------------------------------------


function init_fn(dbs, create_dbs_sql, callback) {
    dbs = dbs || (this.config && this.config.def_dbs)

    create_dbs_sql = create_dbs_sql || (this.config && this.config.create_dbs_sql)


    if (!create_dbs_sql || !dbs) {
        return callback(null)
    }

    var info = this.config ? this.config.info : ms.log.info
    var error = this.config ? this.config.error : ms.log.error
    var sql = create_dbs_sql
    info("created_sql:", sql)
    dbs.exec_sql(sql, function(err, rows) {
        if (err) {
            err && error(this.config.info_text + "err:", err);
        }
        callback(err)
    })

}



//---------------------------------------------------------------------------------------------------------

var type_value = {
    default (val) {
        if (val === null) {
            return 'null'
        }
        return esp(val)
    },
    id(val) {
        if (val === null) {
            return 'null'
        }
        return esp(val)
    },
    string(val) {
        if (val === null) {
            return 'null'
        }
        return esp(val)
    },
    int(val) {
        if (val === null) {
            return 'null'
        }
        return esp(val)
    },
    int(val) {
        if (val === null) {
            return 'null'
        }
        return esp(val)
    },
    date(val) {
        if (val === null) {
            return 'null'
        }
        if (val.toLowerCase && val.toLowerCase() == "now()") {
            return "now()"
        }
        return esp(val)
    },
    datetime(val) {
        if (val === null) {
            return 'null'
        }
        if (val.toLowerCase && val.toLowerCase() == "now()") {
            return "now()"
        }
        return esp(val)
    },
}

//---------------------------------------------------------------------------------------------------------

function get_type_value(type, value) {
    var fn = type_value[type || "default"] || type_value["default"]

    if (Array.isArray(value)) {
        return value.map(item => {
            return fn(item)
        }).join(" , ")
    }

    if (value && value.constructor === Object) {
        var obj = {}
        for (var key in value) {
            obj[key] = fn(value[key])
        }
        return obj
    }

    return fn(value)
}

//---------------------------------------------------------------------------------------------------------

function data_to_sql_data(data) {
    var line = this.config.line,
        obj = {}

    data && Object.keys(data).forEach(item => {
        if (!line[item] || data[item] === undefined) {
            return
        }
        obj[item] = get_type_value(line[item], data[item])
    })

    return obj
}

//---------------------------------------------------------------------------------------------------------
var get_key_value = (val) => order_by_str[val || 'asc'] || order_by_str['']
//---------------------------------------------------------------------------------------------------------
var order_by_str = {
    "": "asc",
    "asc": "asc",
    "1": "asc",
    "-1": "desc",
    "desc": "desc",
}
//---------------------------------------------------------------------------------------------------------

function get_order_by(data) {
    var line = this.config.line

    info('data.order_by', data.order_by)

    var order_by = data.order_by && Object.keys(data.order_by).filter(key => line[key]).map(key =>` \`${key}\` ${get_key_value(data.order_by[key])}`) || []

    data.order_by_str && order_by.push(data.order_by_str)
    data.order_by_str_before && order_by.unshift(data.order_by_str_before)

    return order_by.length > 0 ? " order by " + order_by.join(",") : ""
}

//---------------------------------------------------------------------------------------------------------

function get_group_by(data) {
    var group_by = [],
        line = this.config.line

    if (data.group_by) {
        data.group_by.forEach(key => {
            if (!line[key]) {
                return
            }
            group_by.push(" `" + key + "` ")
        })
    }

    data.group_by_str && group_by.push(data.group_by_str)

    return group_by.length > 0 ? " group by " + group_by.join(",") : ""
}

//---------------------------------------------------------------------------------------------------------

function get_limit(option) {
    var page = option.page

    if (!page) {
        return ""
    }

    var number = parseInt(page.number) || 10
    var start = parseInt(page.index) || 1
    start = (start - 1) * number

    return " limit " + start + " , " + (number) + " "
}

//---------------------------------------------------------------------------------------------------------

var type_conf = {
    "min": function(key, val) {
        return "`" + key + "`" + " > " + val
    },
    "and_min": function(key, val) {
        return "`" + key + "`" + " >= " + val
    },
    "max": function(key, val) {
        return "`" + key + "`" + " < " + val
    },
    "and_max": function(key, val) {
        return "`" + key + "`" + " <= " + val
    },
    "not_in": function(key, val) {
        var _val = Array.isArray(val) ? val.join(",") : val
        return "`" + key + "`" + " not in  (" + _val + ")"
    },
    "like": function(key, val) {
        return "`" + key + "`" + " like " + val
    },
    "is_not_null": function(key, val) {
        return "`" + key + "`" + " is not null"
    },
    "is_null": function(key, val) {
        return "`" + key + "`" + " is null"
    },
}

function get_where_str(data) {
    var line = this.config.line
    var where = [],
        where_data = this.data_to_sql_data(data.where_data)

    for (var key in where_data) {
        var value = where_data[key]
        if (!line[key] || value === undefined) {
            continue
        }

        if (Array.isArray(value)) {
            where.push(" `" + key + "` in (" + value.map(item => esp(item)).join(",") + ") ")

        } else if (value.constructor === Object) {
            for (var fe_key in type_conf) {
                value[fe_key] && where.push(type_conf[fe_key](key, value[fe_key]))
            }

        } else {
            where.push(" `" + key + "` in (" + value + ") ")
        }
    }

    data.where_data_str && (where.push(data.where_data_str))

    return where.length > 0 ? " where " + where.join(" and ") : ""
}

//---------------------------------------------------------------------------------------------------------

function get_select_str(option) {
    if (option.select_line_arr) {
        return this.create_select_line(option.select_line_arr, this.config.line)
    }
    return option.select_line_str || this.config.def_select_line
}

//---------------------------------------------------------------------------------------------------------

function get_table_dbs(option) {
    option = option || {}
    var config = this.config || {}
    var table_name = option.table_name || config.def_table_name
    var dbs_name = option.dbs_name || config.def_dbs_name
    var dbs = option.dbs || ms.db.mysql[dbs_name]
    return { table_name, dbs_name, dbs }
}

//---------------------------------------------------------------------------------------------------------


function get_select_sql(option, dbs_config) {
    dbs_config = dbs_config || this.config
    var select_line = this.get_select_str(option)
    var where_str = this.get_where_str(option)
    var group_by_str = this.get_group_by(option)
    var order_by_str = this.get_order_by(option)
    var limit = this.get_limit(option)

    var sql = ["select", select_line, "from", dbs_config.table_name, where_str, group_by_str, order_by_str, limit, ";"].join(" ")
    return sql
}

//---------------------------------------------------------------------------------------------------------

function get_set_data_str(option) {
    var set_data_obj = this.data_to_sql_data(option.set_data)
    var set_data_arr = []
    var not_update_line = (this.config && this.config.not_update_line) || {}

    for (var key in set_data_obj) {
        if (not_update_line[key]) {
            continue
        }
        set_data_arr.push(" `" + key + "` = " + set_data_obj[key])
    }
    option.set_data_str && (set_data_arr.push(option.set_data_str))

    return set_data_arr.join(" , ")
}

//---------------------------------------------------------------------------------------------------------

function get_update_sql(option, dbs_config) {

    var set_data = this.get_set_data_str(option)
    dbs_config = dbs_config || this.config
    var where_str = this.get_where_str(option)

    if (set_data == "") {
        return ""
    }

    var sql = ["update", dbs_config.table_name, "set", set_data, where_str, ";"].join(" ")

    return sql
}

//---------------------------------------------------------------------------------------------------------

function get_delete_sql(option, callback) {
    var dbs_config = this.get_table_dbs(option)

    dbs_config = dbs_config || this.config
    var where_str = this.get_where_str(option)
    var sql = `delete from  ${dbs_config.table_name} ${where_str};`

    return sql
}

//---------------------------------------------------------------------------------------------------------
function get_duplicate(option) {
    var arr = []
    if (option.duplicate) {
        var obj = this.data_to_sql_data(option.duplicate)
        for (var key in obj) {
            arr.push(key + " = " + obj[key])
        }
    }

    option.duplicate_str && arr.push(option.duplicate_str)

    return arr.length > 0 ? "on duplicate key update " + arr.join(",") : ""
}

//---------------------------------------------------------------------------------------------------------


function get_insert_sql(option, dbs_config) {
    var insert_data = this.data_to_sql_data(option.set_data)


    var ignore = option.ignore ? "ignore" : ""
    var duplicate = this.get_duplicate(option)
    dbs_config = dbs_config || this.config

    var line_keys = [],
        values = []
    var not_update_line = (this.config && this.config.not_update_line) || {}
    for (var key in insert_data) {
        if (not_update_line[key]) {
            continue
        }
        line_keys.push("`" + key + "`")
        if (Array.isArray(insert_data[key])) {
            values.push(insert_data[key].toString())
        } else if (insert_data[key].constructor === Object) {
            values.push(JSON.stringify(insert_data[key]))
        } else {
            values.push(insert_data[key])
        }

    }

    if (line_keys.length == 0) {
        return ""
    }


    var sql = `insert ${ignore} into ${dbs_config.table_name} (${line_keys.join(",")}) values(${values.join(",")}) ${duplicate} ${option.insert_add_str || ""}`

    return sql
}

//---------------------------------------------------------------------------------------------------------


function get_inserts_sql(option, dbs_config) {
    var insert_datas = option.set_data.map(item => { return this.data_to_sql_data(item) })

    var ignore = option.ignore ? "ignore" : ""
    var duplicate = this.get_duplicate(option)

    dbs_config = dbs_config || this.config

    var line_keys = []
    var not_update_line = (this.config && this.config.not_update_line) || {}

    var arr_line = Object.keys(dbs_config.line || (this.config && this.config.line)).filter(key => {
        return !not_update_line[key]
    })

    var values = insert_datas.map(item => {
        return "(" + arr_line.map(key => {
            return item[key] !== undefined ? item[key] : 'null'
        }).join(",") + ")"
    })

    line_keys = arr_line.map(key => {
        return "`" + key + "`"
    })

    if (insert_datas.length == 0) {
        return ""
    }

    var sql = `insert ${ignore} into ${dbs_config.table_name} (${line_keys.join(",")}) values${values.join(",")} ${duplicate} ${option.insert_add_str || ""}`

    return sql
}

function is_function(value) {
    return Object.prototype.toString.call(value) == '[object Function]'
}

//---------------------------------------------------------------------------------------------------------

function run_sql(sql, dbs_config, callback, restart) {
    if (is_function(dbs_config)) {
        callback = dbs_config
        dbs_config = null
    }


    dbs_config = dbs_config || this.get_table_dbs()
    var table_name = dbs_config.table_name || ""
    var dbs_name = dbs_config.dbs_name || ""
    var dbs = dbs_config.dbs
    var config = this.config

    var log_text = "[" + dbs_name + "]" + "[" + table_name + "] " + ":"

    if (!sql) {
        return callback(table_name + " sql is not")
    }

    config && config.info(log_text, sql)

    if (!dbs) {
        config && config.error("dbs is null, need to add configuration:", dbs_config.dbs_name)
        return callback("dbs is null, need to add configuration", dbs_config.dbs_name)
    }

    dbs.exec_sql(sql, (err, result) => {
        if (err && /er_no_such_table/i.test(err) && config.create_dbs_sql && !restart) {
            return this.init_fn(dbs, config.create_dbs_sql, (err) => err ? callback(err) : this.run_sql(sql, dbs_config, callback, true))
        }
        err && (config && config.error(log_text, err))
        callback && callback(err, result)
    })
}

//---------------------------------------------------------------------------------------------------------


function select(option, callback) {
    option = option || {}
    var dbs_config = this.get_table_dbs(option)
    var sql = this.get_select_sql(option, dbs_config)

    this.run_sql(sql, dbs_config, callback)
}

//---------------------------------------------------------------------------------------------------------
function update(option, callback) {
    option = option || {}
    var dbs_config = this.get_table_dbs(option)

    var sql = this.get_update_sql(option, dbs_config)

    this.run_sql(sql, dbs_config, callback)
}

//---------------------------------------------------------------------------------------------------------

function updates(datas, option, callback) {
    option = option || {}
    var dbs_config = this.get_table_dbs(option)

    var sql = datas.map(data => {
        return this.get_update_sql(data, dbs_config)
    })

    this.run_sql(sql.join(""), dbs_config, callback)
}

//---------------------------------------------------------------------------------------------------------

function insert(option, callback) {
    option = option || {}

    var dbs_config = this.get_table_dbs(option)

    var sql = this.get_insert_sql(option, dbs_config) + this.last_id_sql

    this.run_sql(sql, dbs_config, callback)
}
//---------------------------------------------------------------------------------------------------------

function inserts(datas, option, callback) {
    option = option || {}
    var dbs_config = this.get_table_dbs(option)

    var sql = datas.map(data => {
        return this.get_insert_sql(data, dbs_config)
    })

    this.run_sql(sql.join(""), dbs_config, callback)
}
//---------------------------------------------------------------------------------------------------------

function insert_lists(option, callback) {
    option = option || {}
    var dbs_config = this.get_table_dbs(option)

    var sql = this.get_inserts_sql(option, dbs_config)

    this.run_sql(sql, dbs_config, callback)
}


//---------------------------------------------------------------------------------------------------------

function deletes(option, callback) {
    option = option || {}
    var dbs_config = this.get_table_dbs(option)

    var sql = this.get_delete_sql(option, dbs_config)

    this.run_sql(sql, dbs_config, callback)
}

//---------------------------------------------------------------------------------------------------------