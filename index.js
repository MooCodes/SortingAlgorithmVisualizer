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
    }
    
    draw() {
        // c.fillStyle = "#FF0000"
        // c.fillRect(this.x, this.y, 40, this.val)
        c.strokeStyle = "black"
        c.strokeRect(this.x, this.y, 40, this.val)
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
        return new Ele(Math.round(Math.random() * (200 - 25) + 25), i * 40)
    })

    // draw each ele in the array
    draw() {
        this.arr.forEach(ele => ele.draw())
    }

    async swap(i, j) {
        // update the new x values for the eles
        // animation for changing the x and y values of the eles
        let tempX = this.arr[i].x
        this.arr[i].x = this.arr[j].x
        this.arr[j].x = tempX

        // swapping the elements position in the array
        console.log('hello, im swapping')
        let temp = this.arr[i]
        this.arr[i] = this.arr[j]
        this.arr[j] = temp

        await sleep(5000)
    }

    async selectionSort() {
        let i, j, min_idx

        for (i = 0; i < this.arr.length - 1; i++) {
            min_idx = i
            for (j = i + 1; j < this.arr.length; j++) {
                //console.log(this.arr[j], this.arr[min_idx])
                if (this.arr[j].val < this.arr[min_idx].val)
                    min_idx = j
            }

            // swap
            await this.swap(min_idx, i)
            console.log('swapped!')
        }
    }
}

const sortingArr = new SortingArray()

let sleep = (ms) => {
    return new Promise(r => setTimeout(r, ms))
}

let init = () => {

}

let update = () => {
    requestAnimationFrame(update)

    c.clearRect(0, 0, canvas.width, canvas.height)

    // draw the array
    sortingArr.draw()
}

let runSort = () => {
    init()
    update()
}

sortBtn.addEventListener('click', () => {
    sortingArr.selectionSort()
    sortBtn.style.display = 'none'
})

runSort()