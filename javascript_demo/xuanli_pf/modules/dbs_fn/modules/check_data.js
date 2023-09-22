// ------------------------------------------------------------------------------------------------
var all_ms = require("../../all_ms")
var esp = all_ms.esp
// ------------------------------------------------------------------------------------------------
var get_value_type = require("../../get_value_type")
var is_array = get_value_type.is_array
var is_object = get_value_type.is_object
// ------------------------------------------------------------------------------------------------
var is_now = (val) => val.toLowerCase && val.toLowerCase() == 'now()'
// ------------------------------------------------------------------------------------------------
var config = {
    'default': (val) => esp(val),
    'id': (val) => esp(val),
    'string': (val) => esp(val),
    'int': (val) => esp(val),
    'date': (val) => is_now(val) ? 'now()' : esp(val),
    'date-day': (val) => is_now(val) ? 'now()' : esp(val),
}
// ------------------------------------------------------------------------------------------------
var get_value = (type, val) => val === null ? 'null' : (config[type] || config['default'])(val)
// ------------------------------------------------------------------------------------------------
function get_type_value(type, value, count) {
    if (!type) {
        return
    }

    if (is_array(value)) {
        return value.map(item => get_value(type, item))
    } else if (is_object(value) && !count) {
        var obj = {}
        Object.keys(value).forEach(i =>  obj[i] = get_type_value('default', value[i], count++))
        return obj
    }
    return get_value(type, value)
}

// ------------------------------------------------------------------------------------------------
module.exports = function check_data(data, config_line, not_type) {
    var obj = {}
    var is_in = not_type || config_line || {}
    if (!data) {
        return {}
    }
    Object.keys(data).forEach(i => data[i] !== undefined && is_in[i] && (obj[i] = get_type_value(config_line[i], data[i])))
    return obj
}