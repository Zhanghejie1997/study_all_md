function try_fn(fn, data) {
    var val
    try {
        val = fn.apply(this, data)
    } catch (e) {
        console.log('err', e)
        val = e
    }
    return val
}

var start_test = (type, fn, test_data, option) => {

    var _option = Object.assign({ok_log: false, err_log: true, item_log: false}, option)

    console.log(`start ${type} `)
    console.time(type)

    test_data.forEach((i, index) => {
        i.val = try_fn(fn, i.data)
        i.is_test_ok = i.val.toString() === i.result.toString()
        if (i.is_test_ok ? _option.ok_log : _option.err_log) {
            console.log(`${type}_${index}: ${i.is_test_ok ? 'ok' : 'err:' + JSON.stringify(i)}  ,  val:${i.val}, ${_option.item_log && i.is_test_ok ? 'item:' + JSON.stringify(i) : ''}`)
        }
    })

    var err = test_data.filter(i => !i.is_test_ok).length, ok = test_data.filter(i => i.is_test_ok).length
    console.log(`end---- ${type} ,ok:${ok},err:${err}`)
    console.timeEnd(type)
    return err
}



typeof exports === "object" || (exports = {})
exports.test = test_fn()

function test_fn() {
    var string_number = typeof require === 'function' ? require('./string_number.js') : exports

    var add = string_number.add
    var sub = string_number.sub
    var mul = string_number.mul

    var random_count = 0
    var random_number = 100000

    var add_start = function () {
        var test_fn = [
            {data: [1, 2], result: "3"},
            {data: [9, 2], result: "11"},
            {data: [9, -2], result: "7"},
            {data: [-9, -2], result: "-11"},
            {data: [-9, 2], result: "-7"},
            {data: [-99, 22], result: "-77"},
            {data: [22, -99], result: "-77"},
            {data: [122, -99], result: "23"},
            {data: [0, -0], result: "0"},
            {data: [-9], result: "-9"},
            {data: [null, -9], result: "-9"},
            {data: [undefined, -9], result: "-9"},
            {data: [undefined, null], result: "0"},

            {data: ["1", "2"], result: "3"},
            {data: ["9", "2"], result: "11"},
            {data: ["9", "-2"], result: "7"},
            {data: ["-9", "-2"], result: "-11"},
            {data: ["-9", "2"], result: "-7"},
            {data: ["-9", "2"], result: "-7"},
            {data: ["-9"], result: "-9"},
            {data: ["-99", "22"], result: "-77"},
            {data: ["99", "-22"], result: "77"},
            {data: ["99", "-122"], result: "-23"},
            {data: ["199", "-122"], result: "77"},
            {data: ["0", "-0"], result: "0"},

            {data: [null, "-9"], result: "-9"},
            {data: [undefined, "-9"], result: "-9"},
            {data: [undefined, null], result: "0"},
            {data: ["99", "-99"], result: "0"},
            {data: ["-99", "99"], result: "0"},
            {data: ["-99", "100"], result: "1"},
            {data: ["-99", "98"], result: "-1"},
        ]
        var i = 0
        while (i++ < random_count) {
            var num_1 = Math.floor(Math.random() * (random_number) - random_number / 2),
                num_2 = Math.floor(Math.random() * (random_number) - random_number / 2)
            var data   = [num_1, num_2],
                result = (num_1 + num_2).toString()
            test_fn.push({data, result})
        }
        return start_test('add', add, test_fn, {ok_log: false, item_log: false})
    }()

    var sub_start = function () {
        var test_fn = [
            {data: [1, 2], result: "-1"},
            {data: [9, 2], result: "7"},
            {data: [9, -2], result: "11"},
            {data: [-9, -2], result: "-7"},
            {data: [-9, 2], result: "-11"},
            {data: [-99, 22], result: "-121"},
            {data: [22, -99], result: "121"},
            {data: [122, -99], result: "221"},
            {data: [-9], result: "-9"},
            {data: [null, -9], result: "9"},
            {data: [undefined, -9], result: "9"},
            {data: [undefined, null], result: "0"},

            {data: ["1", "2"], result: "-1"},
            {data: ["9", "2"], result: "7"},
            {data: ["9", "-2"], result: "11"},
            {data: ["-9", "-2"], result: "-7"},
            {data: ["-9", "2"], result: "-11"},
            {data: ["-9", "2"], result: "-11"},
            {data: ["-9"], result: "-9"},
            {data: ["-99", "22"], result: "-121"},
            {data: ["99", "-22"], result: "121"},
            {data: ["99", "-122"], result: "221"},
            {data: ["199", "-122"], result: "321"},
            {data: ["99", "99"], result: "0"},
            {data: ["-99", "-99"], result: "0"},

            {data: [null, "-9"], result: "9"},
            {data: [undefined, "-9"], result: "9"},
            {data: [undefined, null], result: "0"},
        ]
        var i = 0
        while (i++ < random_count) {
            var num_1 = parseInt(Math.random() * (random_number) - random_number / 2),
                num_2 = parseInt(Math.random() * (random_number) - random_number / 2)
            var data   = [num_1, num_2],
                result = num_1 - num_2
            test_fn.push({data, result})
        }
        return start_test('sub', sub, test_fn)
    }()

    var mul_start = function () {
        var test_fn = [
            {data: [1, 2], result: "2"},
            {data: [9, 2], result: "18"},
            {data: [9, -2], result: "-18"},
            {data: [-9, -2], result: "18"},
            {data: [-9, 2], result: "-18"},
            {data: [null, -9], result: "0"},
            {data: [undefined, -9], result: "0"},
            {data: [undefined, null], result: "0"},

            {data: ["1", "2"], result: "2"},
            {data: ["9", "2"], result: "18"},
            {data: ["9", "-2"], result: "-18"},
            {data: ["-9", "-2"], result: "18"},
            {data: ["-9", "2"], result: "-18"},
            {data: [null, "-9"], result: "0"},
            {data: [undefined, "-9"], result: "0"},
            {data: [undefined, null], result: "0"},

            {data: ["-90", "20"], result: "-1800"},
            {data: ["-9", "20"], result: "-180"},
            {data: ["-90", "2"], result: "-180"},
            {
                data  : ["-1000000000000000000000000000001", "1000000000000000000000000000001"],
                result: "-1000000000000000000000000000002000000000000000000000000000001"
            },
        ]
        var i = 0
        while (i++ < random_count) {
            var num_1 = Math.floor(Math.random() * (random_number) - random_number / 2),
                num_2 = Math.floor(Math.random() * (random_number) - random_number / 2)
            var data   = [num_1, num_2],
                result = (num_1 * num_2).toString()
            test_fn.push({data, result})
        }
        return start_test('mul', mul, test_fn)
    }()

}
