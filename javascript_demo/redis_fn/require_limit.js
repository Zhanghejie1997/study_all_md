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
    max_limit: 1000,
    index    : 0,
    set_time : 5000,

}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
/**
 *
 * @param{def_option} option
 * @return {(function(req, callback))}
 */
function limit_init(option) {
    var _option = Object.assign({}, def_option, option)
    return (req, run_fn, callback) => {
        if (_option.index > _option.max_limit) {
            return callback('exceeded_request_limit')
        }
        _option.index++
        run_fn(req, () => {
            _option.index--
            callback.apply(this, arguments)
        })
    }
}

//----------------------------------------------------------------------------------------

exports.limit_init = (option) => limit_init(option)

//----------------------------------------------------------------------------------------