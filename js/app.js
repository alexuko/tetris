import {
    test
} from './module/test'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Canvas measures
const sq = 40;

const col = 10;
const row = 20;
let empty = 0;
canvas.width = col * sq;
canvas.height = row * sq;
let gameBoard;

//Create Game board
const createGameBoard = () => {
    /*
    gameBoard = [];
    for (let r = 0; r < row; r++) {
        gameBoard[r] = []; //empty 
        for (let c = 0; c < col; c++) {
            gameBoard[r][c] = empty;
        }
    }
    */
    // return [...Array(row)].map( r => Array(col).fill(0));
    gameBoard = [...Array(row)].map(r => Array(col).fill(0))
    console.table(gameBoard);
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
    ctx.lineWidth = sq / 10; // stroke width
    const stroke = ctx.lineWidth;
    const xPos_board = sq * x;
    const yPos_board = sq * y;

    ctx.fillStyle = color ? `hsl(${color} 90% 50% / 100%)` : `hsl(${color} 0% 10% / 20%)`;
    ctx.fillRect(xPos_board, yPos_board, sq, sq);
    ctx.strokeStyle = color ? `hsl(${color} 100% 25% / 40%)` : `hsl(${color} 0% 5% / 100%)`;
    ctx.strokeRect(xPos_board + (stroke / 2), yPos_board + (stroke / 2), sq - stroke, sq - stroke);
}

const undrawSquare = (x, y) => {
    // Undraw a square
    const xPos_board = sq * x;
    const yPos_board = sq * y;
    ctx.clearRect(xPos_board , yPos_board, sq, sq);
}

let tetrominoes = [
    // [0] T-tetrominoe
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // [1] L-tetrominoe
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // [2] J-tetrominoe
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    // [3] Z-tetrominoe
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    // [5] O-tetrominoe
    [
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 0]
    ],
    // [6] I-tetrominoe
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

]
const colors = [14, 45, 207, 174, 66, 340, 262]


class Piece {
    constructor(tetrominoe, color) {
        this.tetrominoe = tetrominoe; //tetrominoe from the tetrominoe array
        this.color = color; //color from the colors array
        this.x_start = 3; //position X in the canvas
        this.y_start = 0; //position Y in the canvas
        this.point = this.tetrominoe[1][1]; //axis point
        this.activeTetrominoe = this.tetrominoe; //current view of the piece
    }

    drawPiece = () => {
        this.activeTetrominoe.forEach((row, rIndex) => {
            // console.log(this.activeTetrominoe[rIndex])
            row.forEach((col, cIndex) => { 
                // console.log(this.activeTetrominoe[rIndex][cIndex])            
                if (this.activeTetrominoe[rIndex][cIndex] === 1) { //if there is a "1" in the piece matrix
                    drawSquare(this.x_start + cIndex, this.y_start + rIndex, this.color); //draw a square
                }
            })
        });
    }
    
    erasePiece = () => {
        this.activeTetrominoe.forEach((row, rIndex) => {
            row.forEach((col, cIndex) => {             
                if (this.activeTetrominoe[rIndex][cIndex] === 1) { //if there is a "1" in the piece matrix
                    undrawSquare(this.x_start + cIndex, this.y_start + rIndex); //draw a square
                    drawSquare(this.x_start + cIndex, this.y_start + rIndex); //draw a square
                }
            })
        });
    }

    rotate = (clockwise = true) => {
        if (clockwise) {
            console.log('clockwise')
        }

    }
    moveDown = () => {
        this.erasePiece();
        this.y_start += 1;
        this.drawPiece();
    }
    
    moveRight = () => {
        this.erasePiece();
        this.x_start += 1;
        this.drawPiece();
    }

    moveLeft = () => {
        this.erasePiece();
        this.x_start -= 1;
        this.drawPiece();
    }
}
let piece = new Piece(tetrominoes[6], colors[0])

const keyControl = (e) => {
    if(e.type === "keydown"){
        if(e.key === "ArrowUp" || e.keyCode === 38){
            console.log('up')
        }
        if(e.key === "ArrowRight" || e.keyCode === 39){
            piece.moveRight();
        }
        if(e.key === "ArrowLeft" || e.keyCode === 37){
            piece.moveLeft();
        }
        if(e.key === "ArrowDown" || e.keyCode === 40){
            piece.moveDown();
        }
    }
    if(e.type === "keyup"){
        console.log(e)
    }
}
// window.addEventListener('keydown', keyDownController)
// window.addEventListener('keyup', keyDownController)
['keydown', 'keyup'].forEach( e => window.addEventListener(e,keyControl))
createGameBoard();
drawGameBoard()
piece.drawPiece()