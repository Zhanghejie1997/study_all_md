/*
 * Copyright (c) 2023.
 */


//----------------------------------------------------------------------------------------
var i = 0
function check(data, callback) {
    setTimeout(function () {
        console.log('i++',++i)
        callback(null, data, i,i,i)
    }, data.time || 5000)
}

var limit_check = require('../require_limit').limit_init({run_fn: check, max_limit: 10})

//----------------------------------------------------------------------------------------
function test() {
    function test_1() {
        var test = [
            {id: 1, time: 5500},
            {id: 2, time: 4000},
            {id: 3, time: 4000},
            {id: 4, time: 4000},
            {id: 5, time: 4000},
            {id: 6, time: 4000},
            {id: 7, time: 4000},
            {id: 8, time: 4000},
            {id: 9, time: 4000},
            {id: 10, time: 4000},
            {id: 11, time: 4000},
            {id: 12, time: 4000},
            {id: 13, time: 4000},
        ]
        test.forEach(i => limit_check(i, (err, data,i_1,i_2,i_3) => {
            console.log('id:', i.id, err, data,{i_1,i_2,i_3})
        }))
    }

    test_1()
    setTimeout(test_1, 6000)
}

test()