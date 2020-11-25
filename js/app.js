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
    gameBoard = [];
    for (let r = 0; r < row; r++) {
        gameBoard[r] = []; //empty 
        for (let c = 0; c < col; c++) {
            gameBoard[r][c] = empty;
        }
    }
    // console.table(gameBoard);
}

const drawGameBoard = () => {
    //loop throught all columns 0 - 9
    for (let c = 0; c < col; c++) {
        //then for each column, loop throught all rows 0 - 19
        for (let r = 0; r < row; r++) {
            // console.log('col '+c)           
            // console.log('row '+r)           
            drawSquare(c, r)

        }
    }
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
const colors = [14,45,207,174,66,340,262]





class Piece {
    constructor(tetrominoe, color) {
        this.tetrominoe = tetrominoe;//tetrominoe from the tetrominoe array
        this.color = color;//color from the colors array
        this.x = 3;//position X in the canvas
        this.y = 0;//position Y in the canvas
        this.point = this.tetrominoe[1][1];//axis point
        this.activeTetrominoe = this.tetrominoe; //current view of the piece
    }

    drawPiece = () => {
        console.table(this.activeTetrominoe)
        //loop throught all columns 0 - 9
        for (let col = 0; col < this.activeTetrominoe.length; col++) {
            for(let row = 0; row < this.activeTetrominoe.length; row++){
                // console.log(this.activeTetrominoe[col][row])
                if(this.activeTetrominoe[col][row] === 1){//if there is a "1" in the piece matrix
                    drawSquare(this.x + row,this.y + col,this.color)//draw a square
                }
                
            }
        }
    }

    rotate = (clockwise = true) =>{
        if(clockwise){
            console.log('clockwise')
        }

    }
}
let piece = new Piece(tetrominoes[3],colors[6])

createGameBoard();
drawGameBoard()
piece.drawPiece()
