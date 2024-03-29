/*
 * Copyright (c) 2023.
 */

function arr_filter(filter_fun) {
    return (item, index) => filter_fun(item, index)
}

//----------------------------------------------------------------------------------------
// 运算加速
function run_accelerate(init_fn) {
    var cache = {}
    return (data) => cache[data] ? cache[data] : cache[data] = cache[data] || init_fn(data)
}

//----------------------------------------------------------------------------------------
function factorial(n){
    var count = 1
    while (n){
        count *= n--
    }
    return count
}

console.log('factorial(n)',factorial(6),6*5*4*3*2*1)
function test_fn() {

    var test_1 = function () {
        var arr = [1, 2, 3, 4, 5, 6]
        var filter_fn = arr_filter(i => i < 4)
        arr.filter(filter_fn)
        console.log('filter_fn', arr.filter(filter_fn))
    }()
    var test_2 = function () {
        var run_fn = i => i  * 300000000000
        var test_arr = []
        for (let i = 0; i < 7500; i++) {
            test_arr.push(parseInt(Math.random() * 100 + 5))
        }
        // var test_arr = [4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000, 4000, 5000, 600, 7000, 4000, 2000]
        var run = run_accelerate(run_fn)
        console.time('d')

        var arr = test_arr.map(i => run(i))
        console.timeEnd('d')

        console.time('dd')
        var arr = test_arr.map(run_fn)
        console.timeEnd('dd')


    }()
    function check() {
        
    }
}

test_fn()