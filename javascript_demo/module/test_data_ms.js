/*
 * Copyright (c) 2023.
 */

require('./test_ms')
var waterfall = ms.async.waterfall

function test() {
    waterfall([cb => {
        console.log('1')
        cb()
    }, cb => {
        console.log('2')
        cb()
    }, cb => {
        console.log('3')
        cb()
    }], (err, data) => {
        console.log('1--end', err, data)
    })

    waterfall([cb => {
        console.log('21')
        cb()
    }, cb => {
        console.log('22')
        cb()
    }, cb => {
        console.log('23')
        cb(2)
    }], (err, data) => {
        console.log('2--end', err, data)
    })

    waterfall([cb => {
        console.log('31')
        cb()
    }, cb => {
        console.log('32')
        cb()
    }, cb => {
        console.log('33')
        cb(null, 3)
    }], (err, data) => {
        console.log('3--end', err, data)
    })
}

// test()




function proxy_test(){
    ms.proxy(function (rev, res){
        console.log('ddd',rev,res)
        rev('ok')
    }).then(function (data){
        console.log('then,',data)
    }).catch(function (err){
        console.log('err,',err)
    })

}

proxy_test()

// 配置不能混用
// import {showHide} from './impoer_test.js'
// console.log(showHide)