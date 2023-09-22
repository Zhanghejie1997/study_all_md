

/*
 * Copyright (c) 2023.
 */

//----------------------------------------------------------------------------------------
require('../../module/test_ms')
var fn = require('../check_data_save')
var check_data_init = fn.check_data_init
var check_array = fn.check_array
var check_fn_all = fn.check_fn_all

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
            {field: 'is_not_null', type: 'is_null'},
            {field: 'type', check_fn:check_array(['1','2','3','4',1,2,3,4])},
            {field: 'page', type: 'page'},

        ],
    })
    fn({field: 'field', a: 1, b: 2, c: 3, d: 4, e: 5,is_not_null:true, page: {index: 4},type:4}, (err, check_data) => {
        console.log('err', err, ',check:', check_data)
    })

    fn({field: 'field', a: 1, b: 2, c: 3, d: 4, e: 5,is_not_null:true, page: {index: 4},type:8}, (err, check_data) => {
        console.log('err', err, ',check:', check_data)
    })
}

test()
//----------------------------------------------------------------------------------------
