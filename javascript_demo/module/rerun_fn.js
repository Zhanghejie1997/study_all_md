//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

var def_conf = {
    restart_number: 3,
    next_time     : 100,
    rerun_time    : 2000,
}

//----------------------------------------------------------------------------------------
/**
 * 重新发送执行n次函数，直到成功
 * @param(function(callback,number)) fn
 * @param(callback) callback
 * @param(number) max
 */
function rerun_fn(run_fn, callback, max) {
    var num = 0
    var fn = () => run_fn((err, data) => (err && num < max) ? setTimeout(fn, 0) : callback(err, data), num++)
    fn()
}

//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
/**
 * 重新一个list发送执行n次函数，直到成功
 * @param(function(callback,number)) fn
 * @param number
 * @param callback
 */
function rerun_fns(list, run_fn, callback, option) {
    option = Object.assign({}, def_conf, option)

    var return_data = {}
    list.forEach((item, index) => return_data[index] = {item, index})

    var num = 0, run_index = 0, err_list = [], run_list = list.map((i, index) => index)
    var one_fn = () => {
        var i_item = return_data[run_list[run_index]]
        var cb = (err, data) => {
            Object.assign(i_item, {err: err || null, data})
            err && err_list.push(i_item)
            if (++run_index < run_list.length) {
                return setTimeout(one_fn, option.next_time)
            } else if (err_list.length && num < option.restart_number) {
                run_list = err_list.map(i => i.index), err_list = [], run_index = 0, num++
                return setTimeout(one_fn, option.rerun_time)
            } else {
                return callback(err_list.length ? err_list : null, return_data)
            }
        }
        run_fn(i_item.item, cb, i_item.index)
    }
    one_fn()
}

//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
/**
 * TODO 待补充
 * @param list
 * @param run_fn
 * @param callback
 * @param option
 */
function set_timeout_rerun_fns(list, run_fn, callback, option) {
    option = Object.assign({}, def_conf, option)

    var return_data = {}
    list.forEach((item, index) => return_data[index] = {item, index})

    var num = 0, run_index = 0, err_list = [], run_list = list.map((i, index) => index)
    var return_index = 0

    var time = setInterval(function () {
        var i_item = return_data[run_list[run_index]]
        var cb = (err, data) => {
            Object.assign(i_item, {err: err || null, data})
            err && err_list.push(i_item)

            if (++return_index < run_list.length) {
                return
            }
            if (err_list.length && num < option.restart_number) {
                run_list = err_list.map(i => i.index), err_list = [], run_index = 0, return_index = 0, num++
                return set_timeout_rerun_fns(list,)
            } else {
                return callback(err_list.length ? err_list : null, return_data)
            }
        }

        run_fn(i_item.item, cb, i_item.index)

        if (++run_index < run_list.length) {
            return clearInterval(time)
        }

    }, option.next_time)
}

//----------------------------------------------------------------------------------------
/**
 * 定时器加载list，完成后调用callback
 * @param list
 * @param run_fn
 * @param callback
 * @param option
 */
function start_load_ok(list, run_fn, callback, option) {
    var run_list = list.map((item, index) => Object.assign({item, index}))
    start_run(run_list, run_fn, callback, option, 0)
}

function start_run(run_list, run_fn, callback, option, num) {
    var run_index = 0, cb_index = 0, max_length = run_list.length, err_list = [], return_data = []

    var time = setInterval(() => {
        var item = run_list[run_index]
        var cb = (err, data) => {
            Object.assign(item, {err: err || null, data})
            err && err_list.push(item)
            if (++cb_index >= max_length) {
                if (err_list.length && num < option.restart_number) {
                    return setTimeout(() => start_run(err_list, run_fn, (err, data) => {
                        data && data.forEach(i => run_list[i.index] = i)
                        callback(err, run_list)
                    }, option, (num || 0) + 1), option.rerun_time)
                }
                return callback(err_list.length ? err_list : null, return_data)
            }
        }

        run_fn(item.item, cb, item.index)

        if (++run_index == max_length) {
            return clearInterval(time)
        }
    }, option.next_time)
}

//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
function test() {
    function test_rerun_fn() {
        var index = 0
        var fn = (cb, i) => {
            console.log('index', index, i)
            cb(index++ < 60 ? 'err' + index : null, index)
        }
        rerun_fn(fn, 10, (err, data) => console.log(err, data))
    }

    // test_rerun_fn()

    function test_rerun_fns() {
        var index = 0
        var test_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20]
        var fn = (item, cb, i) => {
            // console.log('test_rerun_fns index', item, i)
            index++
            return cb(item < 20 ? 'err' + index : null, i)
            cb(index < 10 && item > 5 && item < 20 ? 'err' + index : null, i)
        }
        rerun_fns(test_list, fn, (err, data) => console.log(err, data), {
            restart_number: 10000,
            next_time     : 1,
            rerun_time    : 1
        })
    }

    // test_rerun_fns()


    function test_start_load_ok() {
        var index = 0
        var test_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20]
        var fn = (item, cb, i) => {
            // console.log('test_rerun_fns index', item, i)
            index++
            // return cb(item < 20 ? 'err' + index : null, i)
            cb(index < 10 && item > 5 && item < 20 ? 'err' + index : null, i)
        }
        start_load_ok(test_list, fn, (err, data) => console.log(err, data), {
            restart_number: 3,
            next_time     : 1,
            rerun_time    : 5000
        })
    }

    // test_start_load_ok()
}

test()
//----------------------------------------------------------------------------------------
