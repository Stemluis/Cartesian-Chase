let grid = null
let size = 70
let gapSize = 1

let numRows = 8
let numCols = 8

let num = 0
let lastPos = [numRows - 1, 0]
let firstTime = true

let erase = false
let enabled = false
let alerted = false
let won = false

function setup() {
	grid = createGrid()
	createCanvas(grid[numRows - 1][numCols - 1].x + size + gapSize, grid[numRows - 1][numCols - 1].y + size + gapSize)
	createCanvas(windowWidth, windowHeight);
}

class Block {
	constructor(x, y, size) {
			this.x = x
			this.y = y
			this.size = size
			this.color = 'white'
	}
	render(){
		if (this.color == 'red') {
        fill(color(255, 0, 0))
    }else if (this.color == 'green') {
        fill(color(0, 255, 0))
    } else if (this.color == 'white'){
        fill(color(255, 255, 255))
    }
    rect(this.x, this.y, this.size, this.size)
	}
}

function mouseClicked(){
	let xBox = floor(mouseX / size)
  let yBox = floor(mouseY / size)
  if ((xBox == lastPos[1] + 1 && yBox == lastPos[0] - 1) || (xBox == lastPos[1] + 1 && yBox == lastPos[0]) || (xBox == lastPos[1] && yBox == lastPos[0] - 1)){
      grid[yBox][xBox].color = 'red'
      lastPos[0] = yBox
      lastPos[1] = xBox
      num += 1

  }
}

function keyPressed(){
	if (key == 'c'){
		reset()
		clear()
	}
}

function createGrid(){
	let g = []
	for (var r = 0; r < numRows; r++) {
		g[r] = []
		for (var c = 0; c < numCols; c++){
			g[r].push(new Block((c) * (size) + c * (gapSize), (r) * (size) + r * (gapSize), size))
		}
	}
	return g
}

function changeSize(){
		clear()
		numRows = document.getElementById('numRows').value
		numCols = document.getElementById('numColumns').value
		grid = createGrid()
		reset()
		createCanvas(grid[numRows - 1][numCols - 1].x + size + gapSize, grid[numRows - 1][numCols - 1].y + size + gapSize);
}

function players(rand){
    if (num == 0){
        grid[lastPos[0]][lastPos[1]].color = 'red'
    }

    if (lastPos[0] == 0){
        lastPos[1] = lastPos[1] + 1
    } else if (lastPos[1] == numCols - 1){
        lastPos[0] = lastPos[0] - 1
    } else {
        if (rand == 1){
            lastPos[0] = lastPos[0] - 1
        } else if (rand == 2){
            lastPos[1] = lastPos[1] + 1
        } else if (rand == 3){
            lastPos[0] = lastPos[0] - 1; lastPos[1] = lastPos[1] + 1
        }
    }
    num += 1

    if (num > 0){
        grid[lastPos[0]][lastPos[1]].color = 'green'
    }
}

function reset(){
    num = 0
		alerted = false
		console.log(numRows + "\t" + numCols)
    lastPos = [numRows - 1, 0]
    for (let r = 0; r < numRows; r++){
        for (let c = 0; c < numCols; c++){
            grid[r][c].color = 'white'
        }
    }
}

function draw() {
	clear()
	if (num % 2 == 0 && !(lastPos[0] == 0 && lastPos[1] == numCols - 1)){
        players(floor(random(1,4)))
				console.log(grid[lastPos[0]][lastPos[1]].color)
  }else if (lastPos[0] == 0 && lastPos[1] == numCols - 1){
				clear()
				reset()
	}
	for (var r = 0; r < numRows; r++) {
		for (var c = 0; c < numCols; c++) {
			grid[r][c].render()
		}
	}
}
