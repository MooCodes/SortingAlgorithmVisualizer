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

        // add outline
        // c.strokeStyle = 'black'
        // c.strokeRect(this.x, this.y, this.width, this.val)
    }
}

function SortArray(n) {
    this.running = false
    this.sleepTime = 5
    this.shouldSleep = true
    this.size = n

    // sets the appropriate time in ms for the sort to sleep
    this.calculateSleepTime = () => {
        if (this.size < 30)
            this.sleepTime = 50
        else if (this.size < 60)
            this.sleepTime = 25
        else if (this.size < 90)
            this.sleepTime = 5
        else
            this.sleepTime = 1
    }

    this.generateEleArray = function (n) {
        // creates a new array of Ele's
        this.size = n // update size
        this.calculateSleepTime()
        console.log('creating array of size: ', n)

        // define the arr
        this.arr = Array(n).fill().map((x, i) => {
            console.log('hi: ', i)
            return new Ele(Math.round(Math.random() * (300 - 25) + 25), i * ((canvas.width / n)), canvas.width / (n * 1.1))
        })
    }

    this.generateEleArray(n) // the arr of eles of size n

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

        if (this.shouldSleep)
            await sleep(this.sleepTime)

        this.arr[i].color = '#6DD3CE'
        this.arr[j].color = 'purple'
        this.draw()
    }

}


// From: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
let sleep = (ms) => {
    return new Promise(r => setTimeout(r, ms))
}

const sortArr = new SortArray(70)

const init = () => {
    sortArr.draw()
}

init()

// wrappers around button logic

const DisplayNewArray = async (n) => {
    // don't generate new arr if a sort is currently running,
    if (sortArr.running) return

    sortArr.generateEleArray(n)
    sortArr.draw()
}

const SelectionSort = async () => {
    // exit if already running
    if (sortArr.running) return

    sortArr.running = true
    await sortArr.selectionSort()
    sortArr.running = false
}

const MergeSort = async () => {
    if (sortArr.running) return

    sortArr.running = true
    await sortArr.mergeSort()
    sortArr.running = false
}

const generateArrayBtn = document.querySelector("#generateArray")
const slider = document.querySelector("#slider")
const sliderMsg = document.querySelector("#slider-msg")
const selectionSortBtn = document.querySelector("#selectionSort")
const mergeSortBtn = document.querySelector("#mergeSort")
let buttons = [generateArrayBtn, slider, sliderMsg, selectionSortBtn, mergeSortBtn]

let disableButtons = (cond) => {
    if (cond)
        buttons.forEach(btn => btn.setAttribute('disabled', ''))
    else
        buttons.forEach(btn => btn.removeAttribute('disabled', ''))
}

selectionSortBtn.onclick = async () => {
    // disable the buttons
    disableButtons(true)

    await SelectionSort()

    // renable buttons
    disableButtons(false)
}

mergeSortBtn.onclick = async () => {
    // disable the buttons
    disableButtons(true)

    await MergeSort()

    // renable buttons
    disableButtons(false)
}

generateArrayBtn.onclick = () => {
    DisplayNewArray(parseInt(slider.value))
}

slider.oninput = (e) => {
    DisplayNewArray(parseInt(e.target.value))
}