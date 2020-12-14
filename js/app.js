import {
    tetrominoes
} from "./module/tetrominoes";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// Canvas measures
const SQ = 30;

const COL = 10;
const ROW = 22;
canvas.width = COL * SQ;
canvas.height = ROW * SQ;
let empty = 0;
let level = 0;

let gameBoard;
let piece;
let gameOver = true;
let start = Date.now();

const DIRECTION = {
    up:     ["up", -1],
    right:  ["right", 1],
    down:   ["down", 1],
    left:   ["left", -1],
    rotate: ["rotate", 0]

};
// MOD of positive or negative numbers
// returns remainder of dividend by divisor
const mod = (dividend, divisor) => {
    return (dividend % divisor + divisor) % divisor;
};
//Create Game board
const createGameBoard = () => {
    gameBoard = [...Array(ROW)].map(() => Array(COL).fill(0));    
};

const drawGameBoard = () => {
    gameBoard.forEach((row, indexRow) => { //iterate through all rows 0 - 19, then
        row.forEach((col, indexCol) => { //for each row, iterate through each column 
            drawSquare(indexCol, indexRow); // and then, draw a square            
        });
    });
};

const drawSquare = (x, y, color = null) => {
    // //Draw a square
    // console.log(color)
    ctx.lineWidth = SQ / 20 // stroke width
    const stroke = ctx.lineWidth;
    
    const xPos_board = SQ * x;
    const yPos_board = SQ * y;

    ctx.fillStyle = color ? `hsl(${color[0]} ${color[1]}% ${color[2]}% / ${color[3]}%)` : `hsl(0 0% 10% / 20%)`;
    ctx.fillRect(xPos_board, yPos_board, SQ, SQ);
    ctx.strokeStyle = color ? `hsl(${color[0]} ${color[1]}% 30% / 90%)` : `hsl(0 0% 0% / 100%)`;
    ctx.strokeRect(xPos_board + (stroke / 2), yPos_board + (stroke / 2), SQ - stroke, SQ - stroke);
};

const undrawSquare = (x, y) => {
    // Undraw a square
    const xPos_board = SQ * x;
    const yPos_board = SQ * y;
    ctx.clearRect(xPos_board, yPos_board, SQ, SQ);
};


const getColor = pick => {
    const colors = [
        [276, 94, 61, 100],  // T-tetromino 
        [31, 94, 48, 100],  // L-tetromino
        [230, 98, 50, 100],  // J-tetromino
        [100, 60, 48, 100],   // S-tetromino
        [356, 100, 40, 100], // Z-tetromino
        [58, 85, 52, 100],  // O-tetromino
        [192, 44, 85, 100]  // I-tetromino 
    ]
    return colors[pick];
}




class Piece {
    constructor(tetrominoe, color, number) {
        this.tetrominoe = tetrominoe; //tetrominoe from the tetrominoe array with all of the positions
        this.color = color; //color from the colors array
        this.number = number;
        // All tetrominoes spawn horizontally and wholly above the playfield.
        // I & O spawn middle AND  J,L,S,Z & T  spawn rounded to the left.
        this.x = 3; 
        this.y = this.number < 5 ? 0 : -1; 
        console.log(`Tetromino: ${this.number}`)
        console.log(`x: ${this.x} y: ${this.y}`)
        this.position = 0;
        this.activeTetrominoe = this.tetrominoe[this.position]; //tetrominow with current position

    }

    drawPiece() {
        try {
            this.activeTetrominoe.forEach((row, rIndex) => {
                // console.log(this.activeTetrominoe[rIndex])
                row.forEach((col, cIndex) => {
                    // console.log(this.activeTetrominoe[rIndex][cIndex])            
                    if (this.activeTetrominoe[rIndex][cIndex]) { //if there is a "1" in the piece matrix
                    // console.log(gameBoard[this.y+rIndex][this.x+cIndex])
                    if(gameBoard[this.y + rIndex][this.x + cIndex] !== empty){
                            //move the position of the piece 1 space up, it does not draw it on top of previous
                            console.log('gameover')
                            gameOver = true;  
                            return;// so this does not overdraw the previous piece

                        }
                        drawSquare(this.x + cIndex, this.y + rIndex, getColor(this.number)); //draw a square
                    }
                });
            });
            
        }catch(e){
            console.log('Piece rotated Out of bounds')

        }
    }

    erasePiece() {
        this.activeTetrominoe.forEach((row, rIndex) => {
            row.forEach((col, cIndex) => {
                if (this.activeTetrominoe[rIndex][cIndex]) { //if there is a "1" in the piece matrix
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
        if(!gameOver){
            if (!this.collision(DIRECTION.down)){
                this.erasePiece()
                this.goTo(DIRECTION.down)
                this.drawPiece()
            }else{
                this.merge()
                piece = getRandomPiece()         
                piece.drawPiece();
            }
        }else console.log('game over' + gameOver);
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
        try{
            console.log('rotTimes '+ rotTimes)        
            // Check if the piece will rotate clockwise or counterclockwise
            let rotation = clockwise ? 1 : -1;
            // If this is the first time that the piece rotates then erase the piece
            if(rotTimes === 0) this.erasePiece();
            // Increment the number of rotation times
            rotTimes++;
            // position 0 - 1 = -1 + 4 = 3 % 4 = 3
            // position 0 + 1 = 1 % 4 = 1
            // position 1 + 1 = 2 % 4 = 2
            // Move to prev or next tetrominoe position
            this.position = mod(this.position + rotation, this.tetrominoe.length);
            // get the position from the original tetrominoe and pass it to the active tetrominoe
            this.activeTetrominoe = this.tetrominoe[this.position];
            
            // Check if the piece overlapped with the wall, if it did then call wallkick()
            //arrage the piece to a correct place within the gameboard
            if (this.collision(DIRECTION.rotate)) this.wallKick();
            
            // Check that piece did not overlapped with another piece after rotation
            if (!this.piecesOverlapped()) {
                // If it did not then redraw the piece and finish method
                this.drawPiece()
                return;
            }
            // if piece overlapped then fix overlap
            this.fixOverlap();
            // if piece still overlapping then rotate piece until a suitable nerby space for it 
            if (this.piecesOverlapped() && rotTimes <= 8 ) this.rotate(rotation,rotTimes)
            
            // Once piece does not overlap then redraw piece on the Gameboard
            this.drawPiece()
        }catch(e){
            console.log(e)
        }
        

    }

    fixOverlap(){    
            let new_x, new_y;
            for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
                for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                    if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                    new_x = this.x + c;
                    new_y = this.y + r;
                    let   last = this.activeTetrominoe.length - 1;// in 5 tetrominoes will be "2"                
                    
                    // console.log('*******Now********')
                    // console.log(`r:${r} C:${c}`)
                    // console.log(`this.y:${this.y} this.x:${this.x}`)
                    // console.log(`yC:${new_y} xC:${new_x}`)
                    // console.log(`last ${last}`)
                    // console.log(`board ${gameBoard[new_y][new_x]}  so ${gameBoard[new_y][new_x]}`)
                    // *****************   I have to check overlap for the "I" piece  ************************
                    if (c === 0 && this.activeTetrominoe[r][0] !== empty && gameBoard[new_y][new_x] !== empty) {
                        console.error(`hit left`)
                        this.goTo(DIRECTION.right);
                    }
                    else if (c === last && this.activeTetrominoe[r][last] !== empty && gameBoard[new_y][new_x] !== empty) {
                        console.error(`hit right`)
                        this.goTo(DIRECTION.left)
                    }
                    else if (r === last && this.activeTetrominoe[last][c] !== empty && gameBoard[new_y][new_x] !== empty) {
                        console.error(`hit bottom`)
                        this.goTo(DIRECTION.up)
                    }
              
                }
            }
            

    
    }
    piecesOverlapped(){
        try{
            let new_x, new_y;
            for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
                for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                    if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                    new_x = this.x + c; // New x (column) position from each square of the tetrominoe
                    new_y = this.y + r; // New y (row)    position from each square of the tetrominoe
                    // if any of the squares lands on a non empty position in the board then, it overlapped
                    if(gameBoard[new_y][new_x] !== empty) {// If its = 1
                        console.log('pieces overlapped')
                        return true
                    }
                }
            }
            console.log('does not overlap')
            // Piece did not overlapped 
            return false;

        }catch(e){
            console.log(`out of bounds ${e}`)

        }
    }


    collision(dir) {
        // console.log('**********************')        
        for (let r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows
            for (let c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of the columns
                if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                // get new X coordinates for each block of the tetrominoe
                let xCoord = this.x + c;
                let yCoord = this.y + r;
                try {
                    
                    if (dir[0] === 'rotate') {//check for collision on rotation
                        // For testing
                        // console.log('Now')
                        // console.log(`yC:${yCoord} xC:${xCoord}`)
                        // console.log('board '+ (gameBoard[yCoord][xCoord] !== empty))
                        // Check if any SQUARE that builds up the tetrominoe is out of bounds 
                        // or overlaps an already occupied space
                        if (yCoord >= ROW   ||
                            yCoord < 0      || // if new yCoord is (Grater or Equals) than ROW(20)  
                            xCoord < 0      || // if xCoord is (less) than the left wall (0)
                            xCoord >= COL   ){
                                console.log(`collision()/rotate wall or floor collision`)
                                return true;
                            }  

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
                    if(yCoord > -3 ) continue;
                    console.log("Out of Bounds");
                    return true;
                }


            }
        }
        return false; // if no collision then if ok to move tetrominoe
    }

 
    wallKick() {
        let r, c, new_x, new_y, calc, Xoffset = 0,Yoffset = 0;

        for (r = 0; r < this.activeTetrominoe.length; r++) { //loop through all of the rows            
            for (c = 0; c < this.activeTetrominoe[r].length; c++) { //for each row loop through all of its columns
                if (!this.activeTetrominoe[r][c]) continue; // skip zeros in the tetrominoe matrix
                new_x = this.x + c;
                new_y = this.y + r;
                
                // RIGHT WALL KICK
                // 10 - 9 = 1 --> Xoffset = 0 -> 1 > 0 = TRUE  --> Xoffset = 1
                // 11 - 9 = 2 --> Xoffset = 1 -> 1 > 2 = FALSE --> Xoffset = 2
                if (new_x >= COL) {
                    calc = new_x - (COL - 1);
                    calc > Xoffset ? Xoffset = calc : Xoffset;                    
                }

                // LEFT WALL KICK
                // -1 < 0 --> true, then new_x(-1) < Xoffset = 0 --> true, then  Xoffset = -1
                // -2 < 0 --> true, then new_x(-2) < Xoffset = -1 --> true, then  Xoffset = -2                
                if (new_x < 0 ) new_x < Xoffset ? Xoffset = new_x : Xoffset;
                
                // BOTTOM WALL KICK
                // 20 >= 20 --> true, 
                // then calc (20 - (20 - 1)) = 1   
                // 1 > 0 --> true, then Yoffset = 1   
                if (new_y >= ROW) {
                    calc = new_y - (ROW - 1);
                    calc > Yoffset ? Yoffset = calc : Yoffset;
                }
                if(new_y < 0){
                    new_y < Yoffset ? Yoffset = new_y : Yoffset; 
                }
            }
        }

        if (Yoffset) {
            console.log("Y OFFSET");
            // a kick or 2  in upwards dierection will occur bringing the piece up
            for (let kick = 0; kick < Math.abs(Yoffset); kick++) {
                if ((Yoffset + ROW) >= ROW) this.goTo(DIRECTION.up);
                if (Yoffset < 0) this.goTo(DIRECTION.down);
            }
        }
        if (Xoffset) {
            console.log("X OFFSET");
            for (let kick = 0; kick < Math.abs(Xoffset); kick++) {
                // piece went beyond left wall
                if (Xoffset < 0) {
                    // a kick or 2 in right dierection will occur 
                    this.moveRight(true)
                }
                // piece went beyond right wall
                if ((Xoffset + COL) >= COL) {
                    // a kick or 2 in left dierection will occur 
                    this.moveLeft(true)
                }
            }
        }
        // console.table(gameBoard)
    }

}
const getRandomPiece = () => {
    // rand will hold a random number between 0 and the bag of tetrominoes lenght 
    // and return a number. Math.floor() will convert the double to the nearest lower int 
    const rand = Math.floor( Math.random() * tetrominoes.length);
    // console.log(`piece number ${rand}`)
    return new Piece(tetrominoes[rand],getColor(rand),rand)
}





const update = () => {
    if(!gameOver){
        let now = Date.now();
        let timeCounter = now - start;
        const sec = 1000 / level;
    
        if (timeCounter > sec) {
            piece.moveDown();
            start = Date.now();
        }
    
        // eslint-disable-next-line no-unused-vars
        requestAnimationFrame(update);
    }
};

const keyControl = (e) => {
    if(!gameOver){
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

    }
};

const init = () => {
    createGameBoard();
    drawGameBoard();
    gameOver = false;
    level = 1;
    piece = getRandomPiece()
    piece.drawPiece();    
    // update()
}
["keydown", "keyup"].forEach(e => window.addEventListener(e, keyControl));
init()