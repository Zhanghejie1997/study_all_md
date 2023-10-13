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
function quick_sort(arr, left, right) {
    var i = left || 0, j = right || arr.length - 1, c
    while (i != j) {
        while (arr[i] > arr[j] && i <= j) {
            c = arr[i], arr[i] = arr[j], arr[j] = c
            j--
        }
        while (arr[i] < arr[j] && i >= j) {
            c = arr[i], arr[i] = arr[j], arr[j] = c
            i++
        }
    }
    console.log(left, i, right)
    quick_sort(arr, left, i)
    quick_sort(arr, i, right)
    return arr
}

//----------------------------------------------------------------------------------------


function test() {
    // '0'.repeat(11).split('').forEach((num, index) => console.log(index, count(index)))
    console.log('quick_sort', quick_sort([9, 8, 7, 6, 5, 4, 3, 2, 1,]))
    console.log('quick_sort', quick_sort([11, 9, 8, 12, 7, 6, 5, 4, 3, 2, 1,]))
    console.log('quick_sort', quick_sort([9, 8, 7, 6, 12, 10, 11, 5, 4, 3, 2, 1,]))
}

test()