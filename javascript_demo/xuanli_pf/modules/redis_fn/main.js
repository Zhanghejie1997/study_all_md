// ------------------------------------------------------------------------------------------------
var all_ms = require('../all_ms')
var set_datas_values = all_ms.set_datas_values
var get_arrar_indexof = all_ms.get_arrar_indexof

var info = all_ms.info
var error = all_ms.error
var get_redis = all_ms.get_redis
// ------------------------------------------------------------------------------------------------

var info_log = (name, type, txt) => info(['[redis_fn]', name, ' ', type, ':', txt].join(''))
var error_log = (name, type, txt) => error(['[redis_fn]', name, ' ', type, ':', txt].join(''))
var not_check = (i) => i
// ------------------------------------------------------------------------------------------------
function init_get_redis(redis_name) {
    return () => get_redis(redis_name) || error_log('not_config redis:', redis_name) || {}
}

// ------------------------------------------------------------------------------------------------
var def_check_obj = {
    key: not_check,
    keys: not_check,
    data: not_check,
}

var get_add_key = (prefix_key) => prefix_key ? {
    key: (key) => prefix_key + '_' + key,
    keys: (keys) => keys.map(this.key),
    data: (data) => object_update_key(data, this.key),
} : def_check_obj
// ------------------------------------------------------------------------------------------------
function redis_init(option) {
    option = option || {}
    var redis_name = option.redis_name || 'redis'
    var get_redis = option.get_redis || init_get_redis(redis_name)

    // 单位是秒
    var defaule_time = option.time

    var prefix_key = option.prefix_key
    var add_key = get_add_key(prefix_key)
    var get_time = (time) => time === false ? null : (time || defaule_time)

    return {
        _redis_name: '[' + redis_name + ']',
        get: function(cb, key) {
            get_fn.call(this, cb, get_redis(), add_key.key(key))
        },
        set: function(cb, key, value, time) {
            set_fn.call(this, cb, get_redis(), add_key.key(key), value, get_time(time))
        },
        mget: function(cb, keys) {
            mget.call(this, cb, get_redis(), add_key.keys(keys))
        },
        mset: function(cb, data, time) {
            mset.call(this, cb, get_redis(), add_key.data(data), get_time(time))
        },
        incr: function(cb, key) {
            incr.call(this, cb, get_redis(), add_key.key(key))
        },
        expire: function(cb, key, time) {
            expire.call(this, cb, get_redis(), add_key.key(key), get_time(time))
        },
    }
}
// ------------------------------------------------------------------------------------------------
var mget = function mget(callback, redis, keys) {
    info_log(this._redis_name, 'mget:', JSON.stringify(keys))
    redis.mget(keys, (err, values) => callback(err, values && set_datas_values(keys, values)))
}
// ------------------------------------------------------------------------------------------------
var get_fn = function get(callback, redis, key) {
    info_log(this._redis_name, 'get:', key)
    redis.get(key, (err, result) => callback(err, result))
}
// ------------------------------------------------------------------------------------------------
var set_fn = function set(callback, redis, key, value, time) {
    info_log(this._redis_name, 'set:', 'key:' + key + ',value:' + value)
    redis.set(key, value, (err, result) => err ? callback(err, result) : expire(callback, redis, key, time))
}
// ------------------------------------------------------------------------------------------------
var incr = function incr(callback, redis, key) {
    info_log(this._redis_name, 'key:', key)
    redis.incr(key, (err, result) => callback && callback(err, result))
}
// ------------------------------------------------------------------------------------------------
var is_save = get_arrar_indexof([undefined, null])

var mset = function mset(callback, redis, data, time) {
    var keys = Object.keys(data).filter(key => is_save(data[key]))

    var arr = []
    keys.forEach(key => arr.push.apply(arr, [key, data[key]]))

    info_log(this._redis_name, 'mset:', JSON.stringify(arr))

    arr.length ? redis.mset(arr, (err, result) => {
        err ? error_log(this._redis_name, 'mset:', err) : is_save(time) && keys.forEach(key => expire(null, redis, key, time))
        callback && callback(err, result)
    }) : callback('not data mset redis')
}
// ------------------------------------------------------------------------------------------------
var expire = function expire(callback, redis, key, time) {
    redis.expire(key, time, (err, result) => callback && callback(err, result))
}
// ------------------------------------------------------------------------------------------------
module.exports = {
    incr,
    mget,
    mset,
    expire,
    redis_init,
    get: get_fn,
    set: set_fn
}