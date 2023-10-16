//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// 兔子
function count(num) {
    var a = 1, b = 1, c
    while (num-- > 2) {
        c = a + b, b = a, a = c
    }
    return a
}


//----------------------------------------------------------------------------------------
// 快排，涉及新数组空间
// function quick_sort(arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }
//     var left = [], right = [], mid = arr[0], max_length = arr.length
//     for (let i = 1; i < max_length; i++) {
//         (arr[i] < mid ? left : right).push(arr[i])
//     }
//
//     return [...quick_sort(left), mid, ...quick_sort(right)]
// }

//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------
// 不涉及新空间
function quick_sort(arr) {
    function sort(arr, start, end) {
        var mid = arr[start], l_index = start, r_index = end,v

        while (r_index > l_index) {
            //移动右指针
            while (r_index > l_index && arr[r_index] >= mid) {
                r_index--
            }
            //交换位置
            if (arr[r_index] <= mid) {
                v = arr[l_index], arr[l_index]=arr[r_index], arr[r_index]=v
            }
            //移动左指针
            while (r_index > l_index && arr[l_index] <= mid) {
                l_index++
            }
            if (arr[l_index] >= mid) {//交换位置
                v = arr[l_index],arr[l_index]=arr[r_index],arr[r_index]=v
            }
        }
        l_index > start && sort(arr, start, l_index - 1)//左边递归
        r_index < end && sort(arr, r_index + 1, end)//右边递归
        return arr
    }

    return sort(arr, 0, arr.length - 1)
}

//----------------------------------------------------------------------------------------


function test() {
    // '0'.repeat(11).split('').forEach((num, index) => console.log(index, count(index)))
    // console.log('quick_sort', quick_sort([1, 2, 3]))
    // console.log('quick_sort', quick_sort([2, 3, 1]))
    // console.log('quick_sort', quick_sort([3, 2, 1]))
    console.log('quick_sort', JSON.stringify(quick_sort([9, 8, 7, 6, 5, 4, 3, 2, 1,])))
    console.log('quick_sort', JSON.stringify(quick_sort([11, 9, 8, 12, 7, 6, 5, 4, 3, 2, 1,])))
    console.log('quick_sort', JSON.stringify(quick_sort([9, 8, 7, 6, 12, 10, 11, 5, 4, 3, 2, 1,])))
}


function test2() {
    // '0'.repeat(11).split('').forEach((num, index) => console.log(index, count(index)))
    console.log('quick_sort', quickSort([1, 2, 3]))
    console.log('quick_sort', quickSort([2, 3, 1]))
    console.log('quick_sort', quickSort([3, 2, 1]))
    console.log('quick_sort', quickSort([9, 8, 7, 6, 5, 4, 3, 2, 1,]))
    console.log('quick_sort', quickSort([11, 9, 8, 12, 7, 6, 5, 4, 3, 2, 1,]))
    console.log('quick_sort', quickSort([9, 8, 7, 6, 12, 10, 11, 5, 4, 3, 2, 1,]))
}

test()
// test2()