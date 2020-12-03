import {
    tetrominoes
} from './module/tetrominoes';

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
    
    //Testing
    // gameBoard[5][3] = 1;
    // gameBoard[5][4] = 1;
    // gameBoard[5][5] = 1;
    // drawSquare(3,5,2)
    // drawSquare(4,5,2)
    // drawSquare(5,5,2)
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
    up:    ['up'   , -1],
    right: ['right',  1],
    down:  ['down' ,  1],
    left:  ['left' , -1]
}
// MOD of positive or negative numbers
// returns remainder of dividend by divisor
const mod = (dividend, divisor) => {
    return (dividend % divisor + divisor) % divisor;
}

class Piece {
    constructor(tetrominoe, color) {
        this.tetrominoe = tetrominoe; //tetrominoe from the tetrominoe array with all of the positions
        this.color = color; //color from the colors array
        this.x = 3; //position X in the canvas
        this.y = 0; //position Y in the canvas
        this.position = 0; 
        this.activeTetrominoe = this.tetrominoe[this.position]; //tetrominow with current position
        
    }

    drawPiece = () => {
        this.activeTetrominoe.forEach((row, rIndex) => {
            // console.log(this.activeTetrominoe[rIndex])
            row.forEach((col, cIndex) => {
                // console.log(this.activeTetrominoe[rIndex][cIndex])            
                if (this.activeTetrominoe[rIndex][cIndex] === 1) { //if there is a "1" in the piece matrix
                    // console.log(gameBoard[this.y+rIndex][this.x+cIndex])
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
        let rotation = clockwise ? 1 : -1;
        // this.position =  clockwise ? (this.position + rotation) % this.tetrominoe.length
        //                           : ((this.position + rotation) + this.tetrominoe.length) % this.tetrominoe.length;

        this.erasePiece()
        // position 0 - 1 = -1 + 4 = 3 % 4 = 3
        // position 0 + 1 = 1 % 4 = 1
        // position 1 + 1 = 2 % 4 = 2
        
        this.position = mod(this.position + rotation, this.tetrominoe.length);
        this.activeTetrominoe = this.tetrominoe[this.position]
        
        // this.kick()
        this.drawPiece()
        // console.log('this.x ' + this.x + ' - this.y '+ this.y)


    }

     moveDown = () => {
        if (!this.collision(DIRECTION.down)) {
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
        // console.log('**********************')
        for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
            for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                // get new X coordinates for each block of the tetrominoe
                let xCoord = this.x + c;
                let yCoord = this.y + r;
                // console.log('prev xCoord ' + xCoord)
                // console.log('prev yCoord ' + yCoord)
                try{
                    if (dir[0] === 'down') {
                        // Direction is DOWN then check "Y" limits
                        // Add the direction value to the yCoord (1 OR -1) we wanna move to,
                        // So we can check if that space within the gameboard is either occupied Or out of bounds. 
                        yCoord += dir[1];
                        console.log('after yCoord ' + yCoord)
                        // console.log(gameBoard[yCoord][xCoord])
                        if(gameBoard[yCoord][xCoord] ===  undefined || gameBoard[yCoord][xCoord] !==  empty) return true;
                        // Direction is DOWN then check "Y" limits
                        // if (yCoord >= ROW) return true; //reached the limit, is has collided
                        // if (yCoord <= ROW) continue; // current square from tetrominoe is ok. So check NEXT
                    } else {
                        // Direction is either LEFT or RIGHT then check "X" limits
                        // Add the direction value to the xCoord (1 OR -1) we wanna move to,
                        // So we can check if that space within the gameboard is either occupied Or out of bounds. 
                        xCoord += dir[1];
                        if(gameBoard[yCoord][xCoord] === undefined || gameBoard[yCoord][xCoord] !== empty) return true;
                        // if (xCoord < 0 || xCoord >= COL) return true;
                        // if (xCoord > 0 || xCoord < COL) continue;
                    }

                }catch(error){
                    console.log('Out of Bounds')
                    return true;
                }

            }
        }
        return false; // if no collision then if ok to move tetrominoe
    }
    kick = () => {
        const prevX = this.x;
        const prevY = this.y;
        let kick = 0;
        let direction;
        for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
            for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                let new_x = this.x + c 
                let new_y = this.y + r 
                //if rotation overlap right wall
                
                if(new_x >= COL) {
                    direction = DIRECTION.left;
                    kick++;
                }
                //if rotation overlap left wall
                if(new_x < 0) {
                    direction = DIRECTION.right;
                    kick++;
                }
                //if rotation overlap bottom
                if(new_y >= ROW) {
                    direction = DIRECTION.up;
                    kick++;                    
                }
            }
        }
        //rotation did not collide with anything, therefore just return 
        if(direction === undefined) return; 
        // rotation collide on the right wall, then move piece to the left
        // rotation collide on the left wall, then move piece to the right
        console.log('this.x' + this.x)
        console.log('this.y' + this.y)
        console.log('direction' + direction)
        console.log('kick' + kick)
        if(direction[0] === 'left' || direction[0] === 'right'){
            this.x = this.x + (direction[1] * kick);            
        }
        if(direction[0] === 'up'){
            console.log(prevY)
            this.y = this.y + (direction[1] * kick) < ROW - this.activeTetrominoe.length ? 
                     this.y + (direction[1] * (kick - 1)) : 
                     this.y + (direction[1] * kick) ;
            console.log(this.y)
            
        }       

    }

}


let piece = new Piece(tetrominoes[2], colors[0])

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
    // console.log(e)
    if (e.type === "keydown") {
        if (e.key === "KeyZ" || e.keyCode === 90) {
            piece.rotate(false);
        }
        if (e.key === "ArrowUp" || e.keyCode === 38) {
            piece.rotate()
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