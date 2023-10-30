import Figure from './figure'
class Bishop {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = './assets/' + color + 'Bishop.svg';
        this.name = 'bishop'
    }

    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const diagonalTitles = Figure.diagonalTitles(board, this.x, this.y)

        Figure.checkTitles(diagonalTitles, this.color, board, checkForAttack, isKingChecked, false, isRender)
    }
}

export default Bishop