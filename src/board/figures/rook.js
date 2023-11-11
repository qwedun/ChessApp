import Figure from './figure.js'
class Rook {
    constructor({x, y, color, firstMove}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = 'rook'
        this.src = './assets/' + color + 'Rook.svg';
        this.firstMove = firstMove;
    }

    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const otherTitles = Figure.horizontalAndVerticalTitles(board, this.x, this.y)

        Figure.checkTitles(otherTitles, this.color, board, checkForAttack, isKingChecked, false, isRender)
    }


}

export default Rook