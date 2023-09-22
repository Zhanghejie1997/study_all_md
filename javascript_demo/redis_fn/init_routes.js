/*
 * Copyright (c) 2023.
 */


//----------------------------------------------------------------------------------------

var code_run_fn = {
    '301': (res, data, err, option) => res.redirect(option.url || data),
    '302': (res, data, err, option) => res.redirect(option.url || data),
    '200': (res, data, err) => res.send(err ? {ok: 0, err} : {ok: 1, data}),
}

//----------------------------------------------------------------------------------------
/**
 * 设置登录信息打到body上面
 * @param req
 */
function set_account(req) {
    var body = req.body || {}
    body.account = req.account
    return req
}

//----------------------------------------------------------------------------------------

/**
 * 只支持post的请求，没有转发等功能
 * @param req
 * @param res
 * @param run_fn
 */
function init_post(req, res, run_fn) {
    var is_lock = 0
    run_fn(set_account(req), res, function (err, data) {
        is_lock++ || code_run_fn['200'](res, data, err)
    })
}


//----------------------------------------------------------------------------------------
/**
 * @class option
 * @type {{code: string, url: string}}
 */
var option = {
    code: '',
    url : '',
}

//----------------------------------------------------------------------------------------
/**
 * 只支持根据option的参数进行
 * @param req
 * @param res
 * @param((function(req|object,res|object,callback))) run_fn
 */
function init_post_option(req, res, run_fn) {
    var is_lock = 0
    run_fn(set_account(req), res, function (err, data, option) {
        if (is_lock++) {
            return
        }
        var fn = (option && code_run_fn[option.code]) || code_run_fn['200']
        return fn(res, data, err, option)
    })
}

//----------------------------------------------------------------------------------------


exports.init_post = (req, res, run_fn) => init_post(req, res, run_fn)
exports.init_post_option = (req, res, run_fn) => init_post_option(req, res, run_fn)