/*
 * Copyright (c) 2023.
 */


//----------------------------------------------------------------------------------------
typeof ms === 'undefined' ? require('../module/test_ms') : null
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
    return (save_data, line, val) => {
        save_arr.forEach(i => save_data = save_data[i] || (save_data[i] = {}))
        save_data[save_filed || line] = val
    }
}

function init_line(line) {
    return line.map(i => {
        i.check_fn = i.check_fn ||check_fn_all[i.type]
        !i.check_fn || error('err not type:', i.type, line)
        i.save_fn = i.save_fn || (i.save_data ? get_save_fn(i.save_data) : null)
        return i
    })
}

//----------------------------------------------------------------------------------------
function check_data_init(config) {
    var line = init_line(config.line)
    var max_length = line.length
    return (body, callback) => {
        var index = 0, save_data = {}
        var fn = () => {
            var item = line[index] || {}
            var field = item.field
            item.check_fn(body[field], (err, save_val) => {
                err || (item.save_fn ? item.save_fn(save_data, field, save_val, item) : save_data[field] = save_val)
                err || ++index >= max_length ? callback(err, save_data) : fn()
            }, {item, body})
        }
        fn()
    }
}
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

exports.check_data_init = (config)=>check_data_init(<option value=""></option>)
//----------------------------------------------------------------------------------------
function test() {
    var fn = check_data_init({
        line: [{
            field  : 'field', check_fn: (val, cb, item) => {
                var err = ''
                cb(err, val)
            }, type: '', save_data: '', save_fn: (save_data, field, val, item) => {
                save_data[field] = val
            }, tip : 'err',
        }, {field: 'a', check_fn: (val, cb) => cb('', val)},
            {field: 'b', check_fn: (val, cb) => cb('', val), save_data: 'b.b.c'},
            {field: 'b', check_fn: (val, cb) => cb('', val), save_data: 'b.b.'},
            {field: 'c', check_fn: (val, cb) => cb('', val), save_data: 'c.'},
            {field: 'd', check_fn: (val, cb) => cb('', val), save_data: 'd'},
            {field: 'e', check_fn: (val, cb) => cb('', val), save_data: '.'},
            {field: 'page', type: 'page'},

        ],
    })
    fn({field: 'field', a: 1, b: 2, c: 3, d: 4, e: 5, page: {index: 4}}, (err, check_data) => {
        console.log('err', err, ',check:', check_data)
    })
}

test()
//----------------------------------------------------------------------------------------
