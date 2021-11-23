SortArray.prototype.mergeSort = async function() {
    console.log('hello from merge')
    // let arr = [5, 3, 7, 8, 1, 2, 6, 3, 2];
    await console.log('before: ', this.arr)
    await this.myMergeSort(this.arr, 0, this.arr.length - 1)
    await console.log('after: ', this.arr)
    
    // draw updated arr to see if sorted
    this.draw()
}

SortArray.prototype.merge = async function(arr, low, mid, hi) {
    let n1 = mid - low + 1
    let n2 = hi - mid

    let L = new Array(n1)
    let R = new Array(n2)

    let i = 0
    let j = 0

    for (i = 0; i < n1; i++) {
        L[i] = arr[low + i]
    }

    for (j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j]
    }

    i = 0
    j = 0

    let k = low

    while (i < n1 && j < n2) {
        if (L[i].val <= R[j].val) {
            arr[k] = L[i]
            i++
        } else {
            arr[k] = R[j]
            j++
        }
        arr[k].x = (k * (this.canvas.width / arr.length))
        // // draw here potentially (updated x pos.)
        arr[k].color = 'purple'
        this.draw()
        k++
        await sleep(this.sleepTime)
    }

    while (i < n1) {
        arr[k] = L[i]
        arr[k].x = (k * (this.canvas.width / arr.length))
        // // draw here potentially (updated x pos.)
        arr[k].color = 'purple'
        this.draw()
        i++
        k++
        await sleep(this.sleepTime)
    }

    while (j < n2) {
        arr[k] = R[j]
        arr[k].x = (k * (this.canvas.width / arr.length))
        // // draw here potentially (updated x pos.)
        arr[k].color = 'purple'
        this.draw()
        j++
        k++
        await sleep(this.sleepTime)
    }

}

SortArray.prototype.myMergeSort = async function(arr, low, hi) {
    if (low >= hi) {
        return
    }

    let mid = low + parseInt((hi - low) / 2)

    await this.myMergeSort(arr, low, mid) // mergesort left half
    await this.myMergeSort(arr, mid+1, hi) //
    await this.merge(arr, low, mid, hi)
}