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
    

}