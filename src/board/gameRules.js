import King from "./figures/king";
import Figure from "./figures/figure";

export class GameRules {
    static isCheckMate(currentKing, board) {
        if (!currentKing.underCheck) return

        if (board.attackingFiguresCount > 1) {
            if (!King.isKingCanMove(board, currentKing))
                alert("LOSE")
        } else {
            if (!King.isKingCanMove(board, currentKing) && !King.isKingCanBeDefended(board, currentKing))
                alert("LOSE")
        }
    }
    static isStalemate(board, color) {

        for (let row of board)
            for (let figure of row) {
                if (figure.canBeMoved) return false
                if (figure.name && figure.canBeAttacked && figure.color !== color) return false
            }

        alert('PAT')
        return true
    }
    static moveFigures(board, currentFigure, figure, setType) {
        if ((figure.canCastleLeft || figure.canCastleRight) && currentFigure.name === 'king') setType('castle')
        else if (figure.underAttack) setType('capture')
        else if (figure.canMove) setType('move')
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