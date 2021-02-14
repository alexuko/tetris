export default class Piece {
    
    constructor(tetrominoe, color, number) {
        this.tetrominoe = tetrominoe; //tetrominoe from the tetrominoe array with all of the positions
        this.color = color; //color from the colors array
        this.number = number;
        // All tetrominoes spawn horizontally and wholly above the playfield.
        // I & O spawn middle AND  J,L,S,Z & T  spawn rounded to the left.
        this.x = 3; 
        this.y = this.number < 5 ? 0 : -1; 
        // console.log(`Tetromino: ${this.number}`)
        // console.log(`x: ${this.x} y: ${this.y}`)
        this.position = 0;
        this.activeTetrominoe = this.tetrominoe[this.position]; //tetrominow with current position
        
    }

    moveTo (dir) {
        if(!dir || dir === 'rotate') return;
        //directions a piece can move to
        if (dir[0] === 'up')    this.y -= 1;
        if (dir[0] === 'left')  this.x -= 1;
        if (dir[0] === 'right') this.x += 1;
        if (dir[0] === 'down')  this.y += 1;
         
    }

    lastOccupiedRowOrCol(isRow) {
        let row = 0,col = 0;
        for (let r = 0; r < this.activeTetrominoe.length; r++) {
            for (let c = 0; c < this.activeTetrominoe[r].length; c++) {
                //forget about zeros
                if (!this.activeTetrominoe[r][c]) continue;
                // compares current values with initial values (row and col variables)
                // if current values are bigger then replace variable value from either row or col 
                row = r > row ? r : row;
                col = c > col ? c : col;
            }
        }
        // returns either column or row         
        return isRow ? row : col;

    }

}