import Figure from './figure.js'
class Rook {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = 'rook'
        this.src = './assets/' + color + 'Rook.svg';
        this.firstMove = true;
    }

    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const otherTitles = Figure.horizontalAndVerticalTitles(board, this.x, this.y)

        Figure.checkTitles(otherTitles, this.color, board, checkForAttack, isKingChecked, false, isRender)
    }


}

export default Rook