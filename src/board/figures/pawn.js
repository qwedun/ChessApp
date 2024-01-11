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

     static setAttack(y, x, board, color, checkForAttack, isKingChecked, isRender, currentPlayer) {
         const pawn = board[y][x];

         Figure.pawnTitles(board, x, y, color, currentPlayer).forEach(title => {
             
             if (title.enPassant && !pawn.kingDefender && !isKingChecked)
                 Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

            else if (title.name || checkForAttack) {

                if (!title.name && !isKingChecked)
                    Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                else if (title.color !== color) {
                    if (pawn.kingDefender && title.canAttackKing && !checkForAttack)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    if (title.isAttackingKing && isKingChecked && (!pawn.kingDefender || checkForAttack))
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    else if (!isKingChecked && (!pawn.kingDefender || checkForAttack))
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)
                } else {
                    title.underFriendlyAttack = true;
                }
            }
        })
    }
    checkMoves(board, checkForAttack, isKingChecked, isRender, currentPlayer) {
        const x = this.x;
        const y = this.y;
        const color = this.color

        if (y === 0 || y === 7) return

        if (this.color === currentPlayer) {
            const titles = (this.firstMove) ? [[board[y - 1][x], board[y - 2][x]]] : [[board[y - 1][x]]];

            Pawn.setAttack(y, x, board, color, checkForAttack, isKingChecked, isRender, currentPlayer);
            if (this.isDiagonal || this.kingDirection === 2 || this.kingDirection === 0) return;
            Figure.checkTitles(titles, color, board, checkForAttack, isKingChecked, true, isRender);
        } else {
            const titles = (this.firstMove) ? [[board[y + 1][x], board[y + 2][x]]] : [[board[y + 1][x]]];

            Pawn.setAttack(y, x, board, color, checkForAttack, isKingChecked, isRender, currentPlayer);
            if (this.isDiagonal || this.kingDirection === 2 || this.kingDirection === 0) return;
            Figure.checkTitles(titles, color, board, checkForAttack, isKingChecked, true, isRender);
        }
    }
}

export default Pawn