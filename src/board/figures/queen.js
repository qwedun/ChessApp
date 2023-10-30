import Figure from './figure.js'
class Queen {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = './assets/' + color + 'Queen.svg'
        this.name = 'queen'
    }
    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const diagonalTitles = Figure.diagonalTitles(board, this.x, this.y)
        const otherTitles = Figure.horizontalAndVerticalTitles(board, this.x, this.y)

        Figure.checkTitles(diagonalTitles, this.color, board, checkForAttack, isKingChecked, false, isRender)
        Figure.checkTitles(otherTitles, this.color, board, checkForAttack, isKingChecked, false, isRender)
    }
}

export default Queen