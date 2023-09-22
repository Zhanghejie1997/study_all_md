// ---------------------------------------------------------------------------------------------------------------------

var more = {max: "max", min: "min", and: "and"}
var less = {max: "min", min: "max", and: "and"}

// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param {string|number} num  数值
 * @param {string|number} less_num  比较大小的数字
 * @param {{max:string,min:string,and:string=}=} option 大的时候返回啥，小的时候返回啥
 * @returns {string} 返回option
 */
function num_less_num(num, less_num, option) {
    var num_length = num.length
    var less_num_length = less_num.length
    var _option = option || more

    if (num_length !== less_num_length) {
        return num_length > less_num_length ? _option.max : _option.min
    }

    if (num === less_num) {
        return _option.and
    }

    return num > less_num ? _option.max : _option.min
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 比较大小返回 max|min|and
 * @param {string|number} num
 * @param {string|number} less_num
 * @returns {string} max|min|and
 */
function is_less(num, less_num) {
    var a = init_num(num), b = init_num(less_num)

    if (a.symbol ^ b.symbol) {
        return a.symbol ? more.max : more.min
    }

    return num_less_num(a.val, b.val, a.symbol ? less : more)
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param {number|string} number  数值
 * @param {boolean=} number_symbol  是否改负号
 * @returns {{val: string, symbol: (boolean)}}
 */
function init_num(number, number_symbol) {
    var val_str = (number || '0').toString()
    var symbol = val_str[0] === '-'
    var val = delete_after_zero(symbol ? val_str.substring(1) : val_str)

    return {symbol: val !== '0' && symbol ^ number_symbol, val}
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 去处前置位多余的 0
 * @param {string} num 字符串数字
 * @returns {string}
 */
function delete_after_zero(num) {
    var index = 0, num_length = num.length
    while (num[index] === "0" && index < num_length) {
        index++
    }
    return num.substring(index) || '0'
}

// ---------------------------------------------------------------------------------------------------------------------
/**
 * 返回数值
 * @param {number|string} val 数值
 * @param {number|boolean=} symbol 符号
 * @returns {string} 字符串的数字
 */
function return_num(val, symbol) {
    var a = init_num(val, symbol)
    return (a.symbol ? '-' : '') + a.val
}

// ---------------------------------------------------------------------------------------------------------------------
/**
 *
 * @param {string|array} arr
 * @param {number} index
 * @returns {number}
 */
function get_num_val(arr, index) {
    return index >= 0 && arr.length > index ? parseInt(arr[index]) : 0
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 加法-返回字符串
 * @param {string|number} num
 * @param {string|number} add_num
 * @returns {string}
 */
function a_add_b(num, add_num) {
    var carry = 0, res = ''
    var i = num.length - 1, j = add_num.length - 1

    while (i >= 0 || j >= 0) {
        var number = carry + get_num_val(num, i--) + get_num_val(add_num, j--)
        carry = Math.floor(number / 10)
        res += (number % 10).toString()
    }

    return (carry ? carry.toString() : '') + res.split('').reverse().join('')
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 减法-返回字符串
 * @param {string|number} num
 * @param {string|number} sub_num
 * @returns {string}
 */
function a_sub_b(num, sub_num) {
    var carry = 0, res = ''
    var i = num.length - 1, j = sub_num.length - 1

    while (i >= 0 || j >= 0) {
        var number = carry + get_num_val(num, i--) - get_num_val(sub_num, j--)
        carry = number < 0 ? -1 : 0
        res += ((-10 * carry + number) % 10).toString()
    }

    return (carry ? '-' : '') + delete_after_zero(res.split('').reverse().join(''))
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 加法-返回字符串
 * @param {string|number} num  可以是负数
 * @param {string|number}  add_num 可以是负数
 * @param {boolean=}  symbol 第二个是否添加负号
 * @returns {string}
 */
function add(num, add_num, symbol) {
    var a = init_num(num), b = init_num(add_num, symbol)

    if (a.symbol === b.symbol) {
        return return_num(a_add_b(a.val, b.val), a.symbol)
    }

    var type = num_less_num(a.val, b.val, more)

    if (type === more.max) {
        return return_num(a_sub_b(a.val, b.val), a.symbol)
    } else if (type === more.min) {
        return return_num(a_sub_b(b.val, a.val), b.symbol)
    }

    return '0'
}


// ---------------------------------------------------------------------------------------------------------------------

/**
 * 乘法*个位-返回字符串
 * @param {string|number} num
 * @param {number} mul_num
 * @returns {string}
 */
function one_mul_string(num, mul_num) {
    var carry = 0

    var res = num.split("").reverse().map(i => {
        var num = carry + i * mul_num;
        carry = Math.floor(num / 10)
        return (num % 10).toString()
    }).reverse().join('')

    return (carry ? carry.toString() : '') + res
}

// ---------------------------------------------------------------------------------------------------------------------

/**
 * 乘法
 * @param {number|string} num
 * @param {number|string} mul_num
 * @returns {string}
 */
function mul(num, mul_num) {
    var a = init_num(num), b = init_num(mul_num)
    var a_val = a.val, b_val = b.val
    var count = b_val.split("").reverse()
        .map((num, index) => one_mul_string(a_val, parseInt(num)) + '0'.repeat(index))
        .reduce((count, num) => a_add_b(count, num))

    return return_num(count, a.symbol ^ b.symbol)
}

// ---------------------------------------------------------------------------------------------------------------------

exports.is_less = (num, less_num) => is_less(num, less_num)

exports.add = (num, sub_num) => add(num, sub_num)

exports.sub = (num, sub_num) => add(num, sub_num, true)

exports.mul = (num, mul_num) => mul(num, mul_num)
