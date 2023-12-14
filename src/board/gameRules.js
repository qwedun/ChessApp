import King from "./figures/king";
import Figure from "./figures/figure";

export class GameRules {
    static isCheckMate(currentKing, board) {

        if (board.attackingFiguresCount > 1) {
            if (!King.isKingCanMove(board, currentKing))
                return true
        } else {
            if (!King.isKingCanMove(board, currentKing) && !King.isKingCanBeDefended(board, currentKing))
                return true
        }
        return false
    }
    static isStalemate(board, color) {
        console.log(board)
        for (let row of board)
            for (let figure of row) {
                if (figure.canBeMoved) return false
                if (figure.name && figure.canBeAttacked && figure.color !== color) return false
            }
        return true
    }
    static moveFigures(board, currentFigure, figure, type) {
        if ((figure.canCastleLeft || figure.canCastleRight) && currentFigure.name === 'king') type.current = 'castle'
        else if (figure.underAttack) type.current = 'capture'
        else if (figure.canMove) type.current = 'move'
        Figure.moveFigures(currentFigure, figure, board);
    }
    static isPawnPassed(board, isOnline, currentPlayer, setPawnIndex) {
        for (let i = 0; i < 8; i++) {
            const figure = board[0][i];
            if (figure.color === currentPlayer && figure.name === 'pawn') {
                setPawnIndex(i)
                return true
            }
        }
        return false
    }
}