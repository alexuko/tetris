import {
    tetrominoes
} from "./module/tetrominoes";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// Canvas measures
const SQ = 30;

const COL = 10;
const ROW = 20;
let empty = 0;
let level = 1;
canvas.width = COL * SQ;
canvas.height = ROW * SQ;

let gameBoard;
let piece;

const DIRECTION = {
    up: ["up", -1],
    right: ["right", 1],
    down: ["down", 1],
    left: ["left", -1],
    rotate: ["rotate", 0]

};
// MOD of positive or negative numbers
// returns remainder of dividend by divisor
const mod = (dividend, divisor) => {
    return (dividend % divisor + divisor) % divisor;
};
//Create Game board
const createGameBoard = () => {
    // gameBoard = [...Array(ROW)].map(r => Array(COL).fill(0));
    gameBoard = [...Array(ROW)].map(() => Array(COL).fill(0));
    gameBoard[7][4] = 1;
    gameBoard[7][5] = 1;
    gameBoard[7][6] = 1;
    gameBoard[7][7] = 1;
    gameBoard[7][8] = 1;
    drawSquare(4,7,120)
    drawSquare(5,7,120)
    drawSquare(6,7,120)
    drawSquare(7,7,120)
    drawSquare(8,7,120)
    
    
};

const drawGameBoard = () => {
    gameBoard.forEach((row, indexRow) => { //iterate through all rows 0 - 19, then
        row.forEach((col, indexCol) => { //for each row, iterate through each column 
            drawSquare(indexCol, indexRow); // and then, draw a square            
        });
    });
};

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
};

const undrawSquare = (x, y) => {
    // Undraw a square
    const xPos_board = SQ * x;
    const yPos_board = SQ * y;
    ctx.clearRect(xPos_board, yPos_board, SQ, SQ);
};

const colors = [14, 45, 207, 174, 66, 340, 262];

class Piece {
    constructor(tetrominoe, color) {
        this.tetrominoe = tetrominoe; //tetrominoe from the tetrominoe array with all of the positions
        this.color = color; //color from the colors array
        this.x = 3; //position X in the canvas
        this.y = -3; //position Y in the canvas
        this.position = 0;
        this.activeTetrominoe = this.tetrominoe[this.position]; //tetrominow with current position

    }

    drawPiece() {
        this.activeTetrominoe.forEach((row, rIndex) => {
            // console.log(this.activeTetrominoe[rIndex])
            row.forEach((col, cIndex) => {
                // console.log(this.activeTetrominoe[rIndex][cIndex])            
                if (this.activeTetrominoe[rIndex][cIndex] === 1) { //if there is a "1" in the piece matrix
                    // console.log(gameBoard[this.y+rIndex][this.x+cIndex])
                    drawSquare(this.x + cIndex, this.y + rIndex, this.color); //draw a square
                }
            });
        });
    }

    erasePiece() {
        this.activeTetrominoe.forEach((row, rIndex) => {
            row.forEach((col, cIndex) => {
                if (this.activeTetrominoe[rIndex][cIndex] === 1) { //if there is a "1" in the piece matrix
                    undrawSquare(this.x + cIndex, this.y + rIndex); //draw a square
                    drawSquare(this.x + cIndex, this.y + rIndex); //draw a square
                }
            });
        });
    }
 
    goTo ( dir ) {
        
        if(dir[0] === 'up'   )  this.y -= 1;            
        if(dir[0] === 'left' )  this.x -= 1;
        if(dir[0] === 'right')  this.x += 1;
        if(dir[0] === 'down' )  this.y += 1;
        
    }

    merge() {
        try{
            for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
                for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                    if (!this.activeTetrominoe[r][c]) continue;
                    gameBoard[this.y + r][this.x + c] = 1;
                }
            }

        }catch(error) {
            console.log('game over')
        }
        
    }
    moveDown() {
        if (!this.collision(DIRECTION.down)){
            this.erasePiece()
            this.goTo(DIRECTION.down)
            this.drawPiece()
        }else{
            this.merge()
            piece = getRandomPiece()         
        }
    }


    moveUp() {
        if (!this.collision(DIRECTION.up)) {
            this.erasePiece()
            this.goTo(DIRECTION.up)
        }
    }

    moveRight(rotateAction = false) {
        if (!rotateAction) {
            if (!this.collision(DIRECTION.right)) {//check if there is no collision and if there is not,
                this.erasePiece()
                this.goTo(DIRECTION.right);
                this.drawPiece()
            }
            
        } else {
            this.goTo(DIRECTION.right)
            return;
        }
    }



    moveLeft(rotateAction = false) {
        //check if there is no collision and if there is not, 
        //then move tetrominoe to the left
        if (!rotateAction) {
            if (!this.collision(DIRECTION.left)) {
                this.erasePiece()
                // if (!this.hitWall(DIRECTION.left)) {
                this.goTo(DIRECTION.left);
                this.drawPiece()
            }
        } else {
            this.goTo(DIRECTION.left)
            return;
        }
    }

    
    rotate(clockwise = false, rotTimes = 0) {
        console.log('rotTimes '+ rotTimes)        
        let rotation = clockwise ? 1 : -1;
        // this.position =  clockwise ? (this.position + rotation) % this.tetrominoe.length
        //                           : ((this.position + rotation) + this.tetrominoe.length) % this.tetrominoe.length;
        if(rotTimes === 0) this.erasePiece();
        
        rotTimes++;
        // position 0 - 1 = -1 + 4 = 3 % 4 = 3
        // position 0 + 1 = 1 % 4 = 1
        // position 1 + 1 = 2 % 4 = 2
        this.position = mod(this.position + rotation, this.tetrominoe.length);
        this.activeTetrominoe = this.tetrominoe[this.position];
        
        if (this.collision(DIRECTION.rotate)) this.wallKick();//arrage the piece to a correct place within the gameboard
                
        // if (!this.collision(DIRECTION.rotate) && !this.overlap()) this.drawPiece();

        // if (this.overlap() && rotTimes <= 8 ) this.rotate(!rotation,rotTimes)
        
        
        this.drawPiece()
        

    }

    collision(dir) {
        // console.log('**********************')        
        for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
            for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                // get new X coordinates for each block of the tetrominoe
                let xCoord = this.x + c;
                let yCoord = this.y + r;
                // console.log('prev xCoord ' + xCoord)
                // console.log('prev yCoord ' + yCoord)
                try {
                    
                    if (dir[0] === 'rotate') {//check for collision on rotation
                        // console.log('Now')
                        // console.log(`yC:${yCoord} xC:${xCoord}`)
                        // console.log('board '+ (gameBoard[yCoord][xCoord] !== empty))
                        // Check if any SQUARE that builds up the tetrominoe is out of bounds 
                        // or overlaps an already occupied space
                        if (yCoord >= ROW   || // if new yCoord is (Grater or Equals) than ROW(20)  
                            xCoord < 0      || // if xCoord is (less) than the left wall (0)
                            xCoord >= COL   || // if xCoord is (Grater or Equals) than the right wall (10)
                            gameBoard[yCoord][xCoord] !== empty)     
                            return true;
                        //check if overlap another piece
                           //if right side of the tetrominoe overlaps
                        

                    } else if (dir[0] === "down") {
                        // Direction is DOWN then check "Y" limits
                        // Add the direction value to the yCoord (1 OR -1) we wanna move to,
                        // So we can check if that space within the gameboard is either occupied Or out of bounds. 
                        yCoord += dir[1];
                        // Direction is DOWN then check "Y" limits
                        if (yCoord >= ROW || gameBoard[yCoord][xCoord] !== empty) return true; //reached the limit, is has collided
                        if (yCoord <= ROW) continue; // current square from tetrominoe is ok. So check NEXT
                    } else {
                        // Direction is either LEFT or RIGHT then check "X" limits
                        // Add the direction value to the xCoord (1 OR -1) we wanna move to,
                        // So we can check if that space within the gameboard is either occupied Or out of bounds. 
                        xCoord += dir[1];
                        // if (gameBoard[yCoord][xCoord] === undefined || gameBoard[yCoord][xCoord] !== empty) return true;
                        
                        if (xCoord < 0 || xCoord >= COL || gameBoard[yCoord][xCoord] !== empty) return true;
                        if (xCoord > 0 || xCoord < COL) continue;
                    }

                } catch (error) {
                    if(yCoord > -3 )continue;
                    console.log("Out of Bounds");
                    return true;
                }


            }
        }
        return false; // if no collision then if ok to move tetrominoe
    }

    overlap(){
        try{
            let new_x, new_y;
            for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
                for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                    if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                    new_x = this.x + c;
                    new_y = this.y + r;
                    if(gameBoard[new_y][new_x] !== empty) return true;
                }
            }
            console.log('does not overlap')
            return false;

        }catch(e){
            console.log('out of bounds')
            return false;
        }
    }

    wallKick() {
        let r, c, new_x, new_y, calc, Xoffset = 0,Yoffset = 0;

        for (r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
            for (c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                new_x = this.x + c;
                new_y = this.y + r;
               
                // if tetrominoe Square coordinate value (1) is equals than 
                // gameboard Square value then they overlap
                console.log('Now')
                console.log(`yC:${new_y} xC:${new_x}`)
                console.log('board '+ (gameBoard[new_y][new_x] !== empty))
                // console.log('r.length ' + this.activeTetrominoe.length - 1)
                const lastTetRow = this.activeTetrominoe.length-1;
                if(this.activeTetrominoe[lastTetRow][c] === gameBoard[new_y][new_x]){
                    console.log('bottom kick')
                    break;
                }
                if(this.activeTetrominoe[r][c] === gameBoard[new_y][new_x]) {
                // if(this.activeTetrominoe[r][c] === gameBoard[new_y][new_x] ){
                    // let side = Math.floor(this.activeTetrominoe/2) >= 2 ? 'right' : 'left';
                    let side = c >= (this.activeTetrominoe.length / 2) ? 'right' : 'left';
                    // console.log(side)
                    // if right side of tetrominoe overlaped then move to left ELSE move to right
                    Xoffset = (side === 'left') ? -1 : 1;

                }
                //Right Wall Kick
                if (new_x >= COL) {
                    calc = new_x - (COL - 1);
                    // 10 - 9 = 1 --> Xoffset = 0 -> 1 > 0 = TRUE  --> Xoffset = 1
                    // 11 - 9 = 2 --> Xoffset = 1 -> 1 > 2 = FALSE --> Xoffset = 2
                    calc > Xoffset ? Xoffset = calc : Xoffset;
                    
                }
                //Left Wall kick
                if (new_x < 0 ) new_x < Xoffset ? Xoffset = new_x : Xoffset;
                
                //bottom Kick
                if (new_y >= ROW) {
                    calc = new_y - (ROW - 1);
                    calc > Yoffset ? Yoffset = calc : Yoffset;
                }



            }
        }
        if (Yoffset) {
            console.log("Y OFFSET");
            for (let kick = 0; kick < Math.abs(Yoffset); kick++) {
                if ((Yoffset + ROW) >= ROW) this.goTo(DIRECTION.up);
            }
        }
        if (Xoffset) {
            console.log("X OFFSET");
            for (let kick = 0; kick < Math.abs(Xoffset); kick++) {
                if (Xoffset < 0) {
                    // console.log(`this.moveRight(true)`); 
                    this.moveRight(true)
                }
                if ((Xoffset + COL) >= COL) {
                    // console.log(`this.moveLeft(true)`)
                    this.moveLeft(true)
                }
            }
        }
        // console.table(gameBoard)
    }

}
const getRandomPiece = () => {
    const rand = Math.floor( Math.random() * tetrominoes.length);
    console.log(rand)
    return new Piece(tetrominoes[rand],colors[rand])
}



let start = Date.now();

const update = () => {
    let now = Date.now();
    let timeCounter = now - start;
    const sec = 1000 / level;

    if (timeCounter > sec) {
        piece.moveDown();
        start = Date.now();
    }

    // eslint-disable-next-line no-unused-vars
    requestAnimationFrame(update);
};

const keyControl = (e) => {
    // console.log(e)
    if (e.type === "keydown") {
        if (e.key === "KeyZ" || e.keyCode === 90) {
            piece.rotate(false);
        }
        if (e.key === "ArrowUp" || e.keyCode === 38) {
            piece.rotate(true);
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
};

const init = () => {
    createGameBoard();
    drawGameBoard();
    piece = getRandomPiece()
    piece.drawPiece();    
    // update()
}
["keydown", "keyup"].forEach(e => window.addEventListener(e, keyControl));
init()