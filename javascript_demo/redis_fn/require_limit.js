/*
 * Copyright (c) 2023.
 */
//----------------------------------------------------------------------------------------
/**
 * 请求限制频率
 */
//----------------------------------------------------------------------------------------

/**
 * @class def_option
 * @type {{max_limit: number, set_time: number, index: number}} 最大请求限制，清空时间，开始值
 */
var def_option = {
    max_limit  : 1000,
    index      : 0,
    set_timeout: 5000,
    run_fn     : (cb) => cb()
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
/**
 *
 * @param{def_option} option
 * @return {(function(object, callback))}
 */
function limit_init(option) {
    var _option = Object.assign({}, def_option, option)
    var run_fn = _option.run_fn, set_time = _option.set_timeout

    return (req, callback) => {
        if (_option.index >= _option.max_limit) {
            return callback('exceeded_request_limit')
        }

        var lock = true, an_lock = function () {
            if (lock) {
                time && clearTimeout(time)
                lock = null, time = null, _option.index--
                callback.apply(this, arguments)
            }
        }
        var time = set_time && setTimeout(() => an_lock('time out ' + set_time), set_time)
        run_fn(req, an_lock)
    }
}

//----------------------------------------------------------------------------------------

exports.limit_init = (option) => limit_init(option)

//----------------------------------------------------------------------------------------