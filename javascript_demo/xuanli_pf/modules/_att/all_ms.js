
exports.esp = ms.sqlstr ? ms.sqlstr.escape : require(process.env['HOME'] + '/code/node_webs/node_modules/sqlstr').escape
exports.info = ms.log ? ms.log.info : console.error
exports.error = ms.log ? ms.log.error : console.error

// ------------------------------------------------------------------------------------------------------------------------------------------

exports.get_dbs = (dbs_name) => ms.db.mysql[dbs_name]
exports.get_redis = (redis_name) => ms.db.redis[redis_name]

// ---------------------------------------------------------------------------------------------------------------------

exports.waterfall = ms.async && ms.async.waterfall ? ms.async.waterfall : waterfall

exports.eachSeries = ms.async.eachSeries

// ---------------------------------------------------------------------------------------------------------------------

exports.is_array = (data) => Array.isArray(data)
exports.is_null_array = (val) => !val || val.length == 0
exports.is_function = (data) => typeof data === 'function'
exports.is_object = (data) => Object.prototype.toString.call(data) === '[object Object]'

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 修改object，key名称
 * @param {object} data
 * @param {function(*):(string|number)} update_key_fn
 * @returns {Object}
 */
exports.object_update_key = (data, update_key_fn) => {
    var obj = {}
    return Object.keys(data).forEach(key => obj[update_key_fn(key)] = data[key]) || obj
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param {function(val, *=):(*)} filter_fn
 * @returns {function(Object): *}
 */
exports.get_new_obj = function (filter_fn) {
    return (data) => {
        var obj = {}
        return Object.keys(data).forEach(i => obj[i] = filter_fn(data[i], i)) || obj
    }
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param {string|number|null} key
 * @param {*} value
 * @param {Object=} data
 * @returns {object}
 */
exports.set_data_value = function (key, value, data) {
    data = data || {}
    data[key] = value
    return data
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param {string[]|number[]} key
 * @param {string[]|number[]} value
 * @param {Object=} data
 * @returns {object}
 */
exports.set_datas_values = function (keys, values, data) {
    data = data || {}
    return keys.forEach((key, i) => data[key] = values[i]) || data
}

// ---------------------------------------------------------------------------------------------------------------------


exports.get_arrar_indexof = function (arr) {
    return (val) => arr.indexOf(val) > -1
}

// ---------------------------------------------------------------------------------------------------------------------

exports.get_waterfall_map = function (data) {
    return (fn, index) => index ? (_data, cb) => fn(_data, cb) : (cb) => fn(data, cb)
}

// ---------------------------------------------------------------------------------------------------------------------