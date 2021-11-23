SortArray.prototype.mergeSort = async () => {
    console.log('hello from merge')
    var theArr = [5, 3, 7, 8, 1, 2, 6, 3, 2];
    console.log('a before merge: ', theArr)
    // for (let i = 0; i < theArr.length; i++) {
    //     console.log(theArr[i])
    // }
    console.log(theArr[1])
    await myMergeSort(theArr, 0, theArr.length - 1)
    console.log('a after merge: ', theArr)
    // for (let i = 0; i < theArr.length; i++) {
    //     console.log(theArr[i])
    // }
    // TODO: call merge 
}

const merge = async (arr, low, mid, hi) => {
    for (let m = 0; m < arr.length; m++) {
        console.log(arr[m])
    }
    let n1 = mid - low + 1
    let n2 = hi - mid

    let L = new Array(n1)
    let R = new Array(n2)

    let i = 0
    let j = 0

    for (i = 0; i < n1; i++)
        L[i] = arr[low + i]

    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j]

    i = 0
    j = 0

    let k = low

    console.log(L, R)

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i]
            i++
        } else {
            arr[k] = R[j]
            j++
        }
        k++
    }

    while (i < n1) {
        arr[k] = L[i]
        i++
        k++
    }

    while (j < n2) {
        arr[k] = R[j]
        j++
        k++
    }

}

const myMergeSort = async (arr, low, hi) => {
    if (low >= hi) {
        return
    }

    let mid = low + parseInt((hi - low) / 2)
    console.log('low: ', low, 'mid: ', mid, 'high: ', hi)
    await myMergeSort(arr, low, mid) // mergesort left half
    await myMergeSort(arr, mid+1, hi) //
    await merge(arr, low, mid, hi)
}