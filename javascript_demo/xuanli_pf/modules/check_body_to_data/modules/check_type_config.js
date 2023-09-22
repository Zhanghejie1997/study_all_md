// ------------------------------------------------------------------------------------------------
var all_ms = require("../../all_ms")
var is_function = all_ms.is_function
var eachSeries = all_ms.eachSeries
var is_array = all_ms.is_array
var set_data_value = all_ms.set_data_value
// ------------------------------------------------------------------------------------------------

function get_check_data_type(data, def) {
    if (def !== undefined) {
        return is_function(def) ? 'default_function' : 'default_not_function'
    }
    if (!data) {
        return 'not_check'
    }
    if (is_array(data)) {
        return 'array'
    }
    if (is_function(data)) {
        return 'function'
    }
    if (item.check.split("|").length > 1) {
        return "arr_function"
    }
    return check_get_function[data] ? data : '_not_check'
}
// ------------------------------------------------------------------------------------------------

var check_get_function = {
    'not_null': (check, key, data, callback) => {
        var value = data[key]
        return callback(value === null && check.tip, value)
    },
    '_not_check': (check, key, data, callback) => {
        var value = data[key]
        return callback(null, value)
    },
    'not_check': (check, key, data, callback) => {
        var value = data[key]
        return callback(null, value)
    },
    'default_not_function': (check, key, data, callback) => {
        return callback(null, check.default)
    },
    'default_function': (check, key, data, callback) => {
        return check.default(check, key, data, callback)
    },
    'array': (check, key, data, callback) => {
        var value = data[key]
        console.log('check.check', check, key, value, check.check.indexOf(value) == -1);
        return check.check.indexOf(value) == -1 ? callback(check.tip || key + ' is not value in check') : callback(null, value)
    },
    'arr_function': (check, key, data, callback) => {
        check._arr_function_fn || (check._arr_function_fn = get_arr_function_fn(check.check.split("|")))
        check._arr_function_fn(check, key, data, callback)
    },
    'function': (check, key, data, callback) => {
        check.check(check, key, data, callback)
    }
}

// ------------------------------------------------------------------------------------------------
function get_check_fn(type) {
    return check_get_function[type] || check_get_function["_not_check"]
}
// ------------------------------------------------------------------------------------------------
function get_arr_function_fn(arr) {
    return function(check, key, data, callback) {
        eachSeries(arr, (fn_key, cb) => {
            get_check_fn(fn_key)(check, key, data[key], (err, value) => {
                err ? cb() : cb(1, set_data_value(key, value))
            })
        }, (err, data) => {
            callback(data ? null : (check.tip || (key + " values is not " + check.check)), data)
        })
    }
}

// ------------------------------------------------------------------------------------------------
exports.get_check_run = (check) => check_get_function[check._check_type]
// ------------------------------------------------------------------------------------------------
exports.check_get_function = check_get_function
exports.get_check_data_type = get_check_data_type