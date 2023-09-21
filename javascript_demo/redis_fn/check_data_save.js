/*
 * Copyright (c) 2023.
 */


//----------------------------------------------------------------------------------------
var info = ms.log.info
var error = ms.log.error
/**
 * @config
 * @type {{}}
 */
var config = {
    line: [{
        field  : 'field', check_fn: (val, cb, item) => {
            var err = ''
            cb(err, val)
        }, type: '', save_data: '', save_fn: (val, save_data) => {
        }, tip : '',
    }],
}

//----------------------------------------------------------------------------------------
var check_fn_all = {
    err        : (val, cb, option) => cb('err not config,' + JSON.stringify(option.item)),
    ''         : (val, cb) => cb(null, val),
    not_check  : (val, cb) => cb(null, val),
    is_null    : (val, cb, option) => cb([null, undefined, ''].indexOf(val) > -1 ? option.item.tip || (option.item.field + ' is is null') : null, val),
    is_not_null: (val, cb, option) => cb([null, undefined, ''].indexOf(val) == -1 ? option.item.tip || (option.item.field + ' is is not null') : null, val),
    page       : (val, cb, option) => {
        val = val || {}
        cb(null, {number: val.page || 20, index: val.index || 1})
    },
    def        : (val, cb, option) => cb(null, option.item.def || option.item.default),
    default    : (val, cb, option) => cb(null, option.item.def || option.item.default),

}

//----------------------------------------------------------------------------------------
function get_save_fn(save_str) {
    var save_arr = (save_str || '').split('.')
    var save_filed = save_arr.pop()
    return function (save_data, line, val) {
        save_arr.forEach(i => save_data = save_data[i] || (save_data[i] = {}))
        save_data[save_filed || line] = val
    }
}

function def_save_fn(save_data, field, save_val, item) {
    save_data[field] = save_val
}

function init_line(line) {
    return line.map(i => {
        i.check_fn = i.check_fn || check_fn_all[i.type]
        i.check_fn || error('err not type:', i.type, line)
        i.check_fn = i.check_fn || check_fn_all.err
        i.save_fn = i.save_fn || (i.save_data ? get_save_fn(i.save_data) : def_save_fn)
        return i
    })
}

//----------------------------------------------------------------------------------------
function check_data_init(config) {
    var line = init_line(config.line)
    return (body, callback) => {
        var index = 0, save_data = {}, fn = function () {
            var item = line[index] || {}
            var field = item.field, check_fn = item.check_fn, save_fn = item.save_fn
            check_fn(body[field], (err, save_val) => {
                err || save_fn(save_data, field, save_val, item)
                err || ++index >= line.length ? callback(err, save_data) : fn()
            }, {item, body})
        }
        fn()
    }
}

//----------------------------------------------------------------------------------------
function check_array(arr) {
    return (val, cb, option) => {
        cb(arr.indexOf(val) > -1 ? null : (option.item.tip || option.item.field + ' not in arr'), val)
    }
}

//----------------------------------------------------------------------------------------

exports.check_data_init = (config) => check_data_init(config)
exports.check_fn_all = check_fn_all
exports.check_array = arr => check_array(arr)
