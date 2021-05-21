const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// set canvas width/height
canvas.width = 900
canvas.height = 500

// Representation of an element of the array (rectangles seen on the screen)
class Ele {
    constructor(val, x, width) {
        this.val = val
        this.height = val // the height of each ele
        this.x = x
        this.y = 0
        this.color = 'black'
        this.width = width
    }
 
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.width, this.val)
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
    this.running = false
    this.arr = SortArray.generateEleArray(20) // the arr of eles
    this.delayTime = 50
    this.shouldDelay = true

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

        if (this.shouldDelay)
            await sleep(this.delayTime)

        this.arr[i].color = 'white'
        this.arr[j].color = 'green'
        this.draw()
    }
}

SortArray.generateEleArray = function(n) {
    // creates a new array of Ele's
    console.log('creating array of size: ', n)
    return Array(n).fill().map((x, i) => {
        console.log('hi: ', i)
        return new Ele(Math.round(Math.random() * (300 - 25) + 25), i * (canvas.width / n), canvas.width / (n * 2))
    })
}

// From: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
let sleep = (ms) => {
    return new Promise(r => setTimeout(r, ms))
}

const sortArr = new SortArray(c)

console.log(sortArr)

// wrappers around button logic

const DisplayNewArray = async (n) => {
    // if a sort is currently running,
    // finish the sort by not having it sleep anymore
    // and then wait a bit for it to finish completely
    // in order to display a new array
    if (sortArr.running) {
        sortArr.shouldDelay = false
        await sleep(50)
        sortArr.shouldDelay = true
    }

    console.log('new n: ', n)

    sortArr.arr = SortArray.generateEleArray(n)
    sortArr.draw()
}

const SelectionSort = async () => {
    // exit if already running
    if (sortArr.running) return

    sortArr.running = true
    await sortArr.selectionSort()
    sortArr.running = false
}

let init = () => {
    sortArr.draw()
}

init()

let generateArrayBtn = document.querySelector("#generateArray")
let slider = document.querySelector("#slider")

generateArrayBtn.onclick = () => {
    DisplayNewArray(parseInt(slider.value))
}

slider.oninput = (e) => {
    console.log(e.target.value)
    DisplayNewArray(parseInt(e.target.value))
}