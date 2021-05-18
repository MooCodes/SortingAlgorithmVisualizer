const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const sortBtn = document.querySelector('#sortBtn')

// set canvas width/height
canvas.width = 800
canvas.height = 500

// Representation of an element of the array (rectangles seen on the screen)
class Ele {
    constructor(val, x) {
        this.val = val
        this.height = val // the height of each ele
        this.x = x
        this.y = 0
        this.color = 'white'
    }
 
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.x + 10, this.y, 20, this.val)
        // c.strokeStyle = this.color
        //c.strokeRect(this.x + 10, this.y, 20, this.val)
    }

    // getters and setters for pos. to animate the swap
    get getX() {
        return this.x
    }
    set setX(val) {
        this.x = val
    }
    get getY() {
        return this.y
    }
    set setY(val) {
        this.y = val
    }
}

// Representation of the array to be sorted
class SortingArray {
    constructor() {
        this.arr = this.generateEleArray()
    }

    // creates array of Ele's
    generateEleArray = () => Array(20).fill().map((x, i) => {
        return new Ele(Math.round(Math.random() * (300 - 25) + 25), i * 40)
    })

    // draw each ele in the array
    draw() {
        // clear the screen
        c.clearRect(0, 0, canvas.width, canvas.height)

        // draw the array
        this.arr.forEach(ele => ele.draw())
    }

    async swap(i, j) {
        // update the new x values for the eles
        // animation for changing the x and y values of the eles
        let tempX = this.arr[i].x
        this.arr[i].x = this.arr[j].x
        this.arr[j].x = tempX

        // swap colors
        // let tempColor = this.arr[i].color
        // this.arr[i].color = this.arr[j].color
        // this.arr[j].color = tempColor

        // swapping the elements position in the array
        console.log('hello, im swapping')
        let temp = this.arr[i]
        this.arr[i] = this.arr[j]
        this.arr[j] = temp

        this.draw()

        await sleep(50)

        this.arr[i].color = 'white'
        this.arr[j].color = 'green'
        this.draw()

    }

    async selectionSort() {
        let i, j, min_idx

        for (i = 0; i < this.arr.length - 1; i++) {
            min_idx = i

            // change color of outer loop ele
            this.arr[i].color = 'yellow'
            this.draw()

            for (j = i + 1; j < this.arr.length; j++) {

                // reset the previous ele color as white, but
                // only if it isn't the ele that we're looking at in the outer loop
                // and if it isn't our min_indx
                if (j - 1 !== i && j - 1 !== min_idx)
                    this.arr[j-1].color = 'white'

                this.arr[j].color = 'red'
                this.draw()

                await sleep(50)

                // found smallest ele in subarray
                if (this.arr[j].val < this.arr[min_idx].val) {
                    // set appropriate colors
                    if (i === min_idx) {
                        this.arr[j].color = 'blue'
                        this.draw()
                    } else {
                        this.arr[min_idx].color = 'white'
                        this.arr[j].color = 'blue'
                        this.draw()
                    }

                    // update new min
                    min_idx = j
                }

            }

            // set the last element color as white
            this.arr[this.arr.length - 1].color = 'white'
            this.draw()

            // swap
            await this.swap(min_idx, i)
            console.log('swapped!')

        }

        console.log('finished selection sort')

        // set the last element color as sorted color
        this.arr[this.arr.length - 1].color = 'green'
        this.draw()
    }
}

const sortingArr = new SortingArray()

let sleep = (ms) => {
    return new Promise(r => setTimeout(r, ms))
}

let init = () => {
    sortingArr.draw()
}

let runSort = () => {
    init()
}

sortBtn.addEventListener('click', () => {
    sortingArr.selectionSort()
    sortBtn.style.display = 'none'
})

runSort()