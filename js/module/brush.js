//Our Brush is only going to draw squares 

export default class Brush {
    constructor(sqrSize){
        this.SQ = sqrSize;
    }

    drawSquare (ctx, x, y, color){
        ctx.lineWidth = this.SQ / 20 // stroke width
        const stroke = ctx.lineWidth;
        
        const xPos_board = this.SQ * x;
        const yPos_board = this.SQ * y;
        // console.log(gameBoard[y][x])
        ctx.clearRect(xPos_board, yPos_board, this.SQ, this.SQ);
        ctx.fillStyle = color[0] !== 0  ? `hsl(${color[0]} ${color[1]}% ${color[2]}% / ${color[3]}%)` : `hsl(${color[0]} ${color[1]}% ${color[2]}% / ${color[3]}%)` ;
        ctx.fillRect(xPos_board, yPos_board, this.SQ, this.SQ);
        ctx.strokeStyle = color[0] !== 0 ? `hsl(${color[0]} ${color[1]}% 30% / 90%)` : `hsl(${color[0]} ${color[1]}% 0% / 100%)`;
        ctx.strokeRect(xPos_board + (stroke / 2), yPos_board + (stroke / 2), this.SQ - stroke, this.SQ - stroke);
    }
    
    undrawSquare (ctx, x, y) {
        const xPos_board = this.SQ * x;
        const yPos_board = this.SQ * y;
        ctx.clearRect(xPos_board, yPos_board, this.SQ, this.SQ);
    }
}