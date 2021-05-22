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
        this.color = '#6DD3CE'
        this.width = width
        this.baseColor = '#6DD3CE'
    }
 
    draw() {
        // add shadow blur
        // c.shadowBlur = 1
        // c.shadowColor = 'black'

        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.width, this.val)

        c.strokeStyle = 'black'
        c.strokeRect(this.x, this.y, this.width, this.val)
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

        this.arr[i].color = '#6DD3CE'
        this.arr[j].color = 'purple'
        this.draw()
    }
}

SortArray.generateEleArray = function(n) {
    // creates a new array of Ele's
    console.log('creating array of size: ', n)
    return Array(n).fill().map((x, i) => {
        console.log('hi: ', i)
        return new Ele(Math.round(Math.random() * (300 - 25) + 25), i * ((canvas.width / n)), canvas.width / (n * 1.1))
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

const generateArrayBtn = document.querySelector("#generateArray")
const slider = document.querySelector("#slider")
const selectionSortBtn = document.querySelector("#selectionSort")
selectionSortBtn.onclick = () => SelectionSort()


generateArrayBtn.onclick = () => {
    DisplayNewArray(parseInt(slider.value))
}

slider.oninput = (e) => {
    DisplayNewArray(parseInt(e.target.value))
}