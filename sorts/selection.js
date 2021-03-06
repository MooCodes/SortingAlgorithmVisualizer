SortArray.prototype.selectionSort = async function () {
    let i, j, min_idx

    for (i = 0; i < this.arr.length - 1; i++) {
        min_idx = i

        // change color of outer loop ele
        this.arr[i].color = 'yellow'
        this.draw()

        for (j = i + 1; j < this.arr.length; j++) {

            // reset the previous ele color as base color, but
            // only if it isn't the ele that we're looking at in the outer loop
            // and if it isn't our min_indx
            if (j - 1 !== i && j - 1 !== min_idx)
                this.arr[j - 1].color = '#6DD3CE'

            this.arr[j].color = 'red'
            this.draw()

            if (this.shouldSleep)
                await sleep(this.sleepTime)

            // found smallest ele in subarray
            if (this.arr[j].val < this.arr[min_idx].val) {
                // set appropriate colors
                if (i === min_idx) {
                    this.arr[j].color = 'blue'
                    this.draw()
                } else {
                    this.arr[min_idx].color = '#6DD3CE'
                    this.arr[j].color = 'blue'
                    this.draw()
                }

                // update new min
                min_idx = j
            }

        }

        // set the last element color as white
        this.arr[this.arr.length - 1].color = '#6DD3CE'
        this.draw()

        // swap
        await this.swap(min_idx, i)
        console.log('swapped!')

    }

    console.log('finished selection sort')

    // set the last element color as sorted color --> purple color means sorted ele
    this.arr[this.arr.length - 1].color = 'purple'
    this.draw()

}