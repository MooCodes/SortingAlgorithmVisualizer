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
        this.color = 'white'
    }
 
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.x + 10, this.y, 20, this.val)
        // c.strokeStyle = this.color
        // c.strokeRect(this.x + 10, this.y, 20, this.val)
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

function SortArray() {
    // creates a new array of Ele's
    this.generateEleArray = () => Array(20).fill().map((x, i) => {
        return new Ele(Math.round(Math.random() * (300 - 25) + 25), i * 40)
    })

    this.arr = this.generateEleArray() // the arr of eles

    // draws each ele in the array
    this.draw = () => {
        // clear the screen
        c.clearRect(0, 0, canvas.width, canvas.height)
        // draw the array
        this.arr.forEach(ele => ele.draw())
    }

    this.swap = async (i, j) => {
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
}

// From: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
let sleep = (ms) => {
    return new Promise(r => setTimeout(r, ms))
}

const sortArr = new SortArray()

console.log(sortArr)

let init = () => {
    sortArr.draw()
}

init()