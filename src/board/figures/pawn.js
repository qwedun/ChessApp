import Figure from './figure.js'
class   Pawn {
    constructor({x, y, color, firstMove}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = './assets/' + color + 'Pawn.svg'
        this.firstMove = firstMove
        this.name = 'pawn'
    }

     static setAttack(y, x, board, color, checkForAttack, isKingChecked, isRender) {
        Figure.pawnTitles(board, x, y, color).forEach(title => {
            if (title.name || checkForAttack) {

                if (!title.name && !isKingChecked)
                    Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                else if (title.color !== color) {

                    if (title.isAttackingKing && isKingChecked)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    else if (!isKingChecked)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)
                } else {
                    title.underFriendlyAttack = true;
                }
            }
        })
    }

    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const x = this.x;
        const y = this.y;

        if (y === 0 || y === 7) return
        if (this.isDiagonal || this.kingDirection === 2 || this.kingDirection === 0) return;

        if (this.color === 'white') {
            if (this.firstMove) {
                const titles = [[board[y - 1][x], board[y - 2][x]]];
                Figure.checkTitles(titles, 'white', board, checkForAttack, isKingChecked, true, isRender)
            }
            else {
                const titles = [[board[y - 1][x]]]
                Figure.checkTitles(titles, 'white', board, checkForAttack, isKingChecked, true, isRender)
            }
            Pawn.setAttack(y, x, board, 'white', checkForAttack, isKingChecked, isRender)

        } else {
            if (this.firstMove) {
                const titles = [[board[y + 1][x], board[y + 2][x]]];
                Figure.checkTitles(titles, 'black', board, checkForAttack, isKingChecked, true, isRender)
            }
            else {
                const titles = [[board[y + 1][x]]]
                Figure.checkTitles(titles, 'black', board, checkForAttack, isKingChecked, true, isRender)
            }
            Pawn.setAttack(y, x, board, 'black', checkForAttack, isKingChecked, isRender)
        }
    }
}

export default Pawn