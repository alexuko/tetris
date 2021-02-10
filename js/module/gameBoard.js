export default class Gameboard {

    constructor(rowSize, colSize) {
        this.row = rowSize;
        this.col = colSize;
    }
    //Create Game board
    createGameBoard() {
        return [...Array(this.row)].map(() => Array(this.col).fill(0));
    }
}
