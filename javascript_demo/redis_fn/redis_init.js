/*
 * Copyright (c) 2023.
 */

//----------------------------------------------------------------------------------------
var info = ms.log.info.bind(this, '[redis]')
var error = ms.log.error.bind(this, '[redis]')
//----------------------------------------------------------------------------------------

var def_config = {
    info      : info,
    error     : error,
    redis_name: '',
    redis_fn  : null,
    key_prefix: '',
    def_time  : 60 * 60 * 24 * 7,
}
var def_redis_fn = (redis_name) => {
    return () => ms.db.redis[redis_name]
}

//----------------------------------------------------------------------------------------
function get_option(option) {
    var _option = Object.assign({}, def_config, option)
    var redis_name = _option.redis_name

    if (redis_name) {
        _option.redis_fn = _option.redis_fn || def_redis_fn(redis_name)
        _option.info && (_option.info = _option.info.bind(this, '[' + redis_name + ']'))
        _option.error && (_option.error = _option.error.bind(this, '[' + redis_name + ']'))
    }

    _option.get_key = (key) => _option.key_prefix + key
    return _option
}

//----------------------------------------------------------------------------------------
function init(option) {
    var _option = get_option(option)
    return {
        _option,
        get_key     : (key, cb) => {
            var redis = _option.redis_fn(), key = _option.get_key(key)
            _option.info(`get:key=${key}`)
            get_key(redis, key, (err, data) => {
                err && _option.error(`key=${key},err=${err}`)
                cb(err, data)
            })
        },
        set_key     : (key, val, cb) => this.set_key_time(key, val, _option.def_time, cb),
        set_key_time: (key, val, key_time, cb) => {
            var redis = _option.redis_fn(), key = _option.get_key(key), time = key_time || _option.def_time
            var log = `set:key=${key},val=${val},time=${time}`
            _option.info(log)
            set_key(redis, key, val, time, (err, data) => {
                err && _option.error(`${log},err=${err}`)
                cb(err, data)
            })
        },
        mget        : (keys, cb) => {
            var redis = _option.redis_fn(), time = _option.def_time, arr = keys.map(key=> _option.get_key(key))
            var log = `mget:key=${key}`
            _option.info(log)
            mget(redis, keys, (err, data)=>{
                err && _option.error(`${log},err=${err}`)
                cb(err, data)
            })
        },
        mset        : (data, cb) => {
            var redis = _option.redis_fn(), arr = [], time = _option.def_time
            Object.keys(data).forEach(key => arr.push(_option.get_key(key), data[key]))

            var log = `mset:arr=${arr.join(' ')},time=${time}`
            _option.info(log)
            mset(redis, data, time, (err, data) => {
                err && _option.error(`${log},err=${err}`)
                cb(err, data)
            })
        },
        mset_time   : (data, time, cb) => mset(_option.redis_fn(), data, time, cb),
        hmget       : (key, line, cb) => mget(),
        hmset       : (key, data, cb) => mget(),
        add         : (key, cb) => incr(_option.get_key(key), cb),
        incr        : (key, cb) => incr(_option.get_key(key), cb),
    }
}


//----------------------------------------------------------------------------------------
function get_key(redis, key, callback) {
    redis.get(key, callback)
}


//----------------------------------------------------------------------------------------
function incr(redis, key ,callback){

}
//----------------------------------------------------------------------------------------
function set_key(redis, key, value, time, callback) {

}

//----------------------------------------------------------------------------------------
function mset(redis, data, time, callback) {
    var data = Array.isArray(data) ? data : Object.keys(data).map()
    redis.mset(arr)
}

function mget(redis, key, callback) {

}


//----------------------------------------------------------------------------------------
module.exports = {
    init: (option) => init(option),
    get_key,
    set_key,
}