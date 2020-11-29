import {tetrominoes} from './module/tetrominoes';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Canvas measures
const SQ = 30;

const COL = 10;
const ROW = 20;
let empty = 0;
let level = 1;
canvas.width = COL * SQ;
canvas.height = ROW * SQ;

let gameBoard;

//Create Game board
const createGameBoard = () => {
    gameBoard = [...Array(ROW)].map(r => Array(COL).fill(0))
    // gameBoard.forEach((r, ir) => {
    //     r.forEach((c, ic) => {
    //         gameBoard[ir][ic] = ic;
    //     })

    // })
    // console.table(gameBoard);
}

const drawGameBoard = () => {
    gameBoard.forEach((row, indexRow) => { //iterate through all rows 0 - 19, then
        row.forEach((col, indexCol) => { //for each row, iterate through each column 
            drawSquare(indexCol, indexRow); // and then, draw a square            
        })
    });
}

const drawSquare = (x, y, color = 0) => {
    // //Draw a square
    ctx.lineWidth = SQ / 10; // stroke width
    const stroke = ctx.lineWidth;
    const xPos_board = SQ * x;
    const yPos_board = SQ * y;

    ctx.fillStyle = color ? `hsl(${color} 90% 50% / 100%)` : `hsl(${color} 0% 10% / 20%)`;
    ctx.fillRect(xPos_board, yPos_board, SQ, SQ);
    ctx.strokeStyle = color ? `hsl(${color} 100% 25% / 40%)` : `hsl(${color} 0% 5% / 100%)`;
    ctx.strokeRect(xPos_board + (stroke / 2), yPos_board + (stroke / 2), SQ - stroke, SQ - stroke);
}

const undrawSquare = (x, y) => {
    // Undraw a square
    const xPos_board = SQ * x;
    const yPos_board = SQ * y;
    ctx.clearRect(xPos_board, yPos_board, SQ, SQ);
}


const colors = [14, 45, 207, 174, 66, 340, 262];
const DIRECTION = {
    right: ['right', 1],
    left:  ['left', -1],
    down:  ['down',  1]
}


class Piece {
    constructor(tetrominoe, color) {
        this.tetrominoe = tetrominoe; //tetrominoe from the tetrominoe array
        this.color = color; //color from the colors array
        this.x = 3; //position X in the canvas
        this.y = 0; //position Y in the canvas
        this.activeTetrominoe = this.tetrominoe; //current view of the piece
        this.axis = this.activeTetrominoe[1][1]; //axis point
    }

    drawPiece = () => {
        this.activeTetrominoe.forEach((row, rIndex) => {
            // console.log(this.activeTetrominoe[rIndex])
            row.forEach((col, cIndex) => {
                // console.log(this.activeTetrominoe[rIndex][cIndex])            
                if (this.activeTetrominoe[rIndex][cIndex] === 1) { //if there is a "1" in the piece matrix
                drawSquare(this.x + cIndex, this.y + rIndex, this.color); //draw a square
            }
            })
        });
    }
    
    erasePiece = () => {
        this.activeTetrominoe.forEach((row, rIndex) => {
            row.forEach((col, cIndex) => {
                if (this.activeTetrominoe[rIndex][cIndex] === 1) { //if there is a "1" in the piece matrix
                undrawSquare(this.x + cIndex, this.y + rIndex); //draw a square
                drawSquare(this.x + cIndex, this.y + rIndex); //draw a square
            }
        })
    });
    }
    
    rotate = (clockwise = true) => {
        console.log('this.x ' + this.x)
        console.log('this.y ' + this.y)
        console.log('this.axis ' + this.axis)
        

        if (clockwise) {
            console.log('clockwise')
        }
        
    }
    moveUp = () => {
        this.erasePiece();
        this.y -= 1;
        this.drawPiece();
        
    }
    moveDown = () => {
        if(!this.collision(DIRECTION.down)){
        // if(!this.hitBottom(DIRECTION.down)){
            this.erasePiece();
            this.y += DIRECTION.down[1];
            this.drawPiece();
            
        }

    }
    
    moveRight = () => {
        //check if there is no collision and if there is not, 
        //then move tetrominoe to the right
        if (!this.collision(DIRECTION.right)) {
        // if (!this.hitWall(DIRECTION.right)) {
            this.erasePiece();
            this.x += DIRECTION.right[1];
            this.drawPiece();
        }
    }
    
    moveLeft = () => {
        //check if there is no collision and if there is not, 
        //then move tetrominoe to the left 
        if (!this.collision(DIRECTION.left)) {
        // if (!this.hitWall(DIRECTION.left)) {
            this.erasePiece();
            this.x -= -DIRECTION.left[1];
            this.drawPiece();
        }
    }

    collision = (dir) => {        
        for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
            for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                // get new X coordinates for each square of the tetrominoe
                // e.g 3 + 0 + 1 (moveRight) = 4    
                // e.g 3 + 0 - 1 (moveLeft) =  2    
                let new_x = this.x + c + dir[1]; 
                let new_y = this.y + r + dir[1];
                if(dir[0] === 'down'){// if Direction is going DOWN then check "Y" limits
                    if(new_y >= ROW) return true;  
                    if(new_y <= ROW) continue; // current square from tetrominoe is ok. So check NEXT
                }else{// if Direction is either LEFT or RIGHT then check "X" limits
                    if(new_x < 0 || new_x >= COL) return true; 
                }

            }
        }
        return false; // if no collision then if ok to move tetrominoe
    }    
    
}


let piece = new Piece(tetrominoes[3][0], colors[0])

let start = Date.now()
const update = () => {
    let now = Date.now()
    let timeCounter = now - start;
    const sec = 1000 / level;
    
    if (timeCounter > sec) {
        piece.moveDown()
        start = Date.now();
    }

    requestAnimationFrame(update);
}

const keyControl = (e) => {
    if (e.type === "keydown") {
        if (e.key === "ArrowUp" || e.keyCode === 38) {
            // piece.rotate()
            piece.moveUp()
        }
        if (e.key === "ArrowRight" || e.keyCode === 39) {
            piece.moveRight();
            start = Date.now();
        }
        if (e.key === "ArrowLeft" || e.keyCode === 37) {
            piece.moveLeft();
            start = Date.now();
        }
        if (e.key === "ArrowDown" || e.keyCode === 40) {
            piece.moveDown();
        }
    }
    if (e.type === "keyup") {
        // console.log(e)
    }
}


['keydown', 'keyup'].forEach(e => window.addEventListener(e, keyControl))

createGameBoard();
drawGameBoard()
piece.drawPiece()
// update()
