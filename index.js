const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

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
        c.strokeStyle = "white"
        c.strokeRect(this.x, this.y, 40, this.val)
    }

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

class SortingArray {

    constructor() {
        this.arr = this.generateEleArray()
    }

    // creates array of Ele's
    generateEleArray = () => Array(20).fill().map((x, i) => {
        console.log('yuh')
        return new Ele(Math.round(Math.random() * (200 - 25) + 25), i * 40)
    })

    // draw each ele in the array
    draw() {
        this.arr.forEach(ele => ele.draw())
    }
}

const sortingArr = new SortingArray()

let init = () => {

}

let update = () => {
    requestAnimationFrame(update)

    // draw the array
    sortingArr.draw()
}

let runSort = () => {
    init()
    update()
    console.log('yuh')
}

runSort()