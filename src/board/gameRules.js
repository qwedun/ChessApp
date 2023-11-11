import King from "./figures/king";

export function isCheckMate(currentKing, board) {
    if (!currentKing.underCheck) return

    if (board.attackingFiguresCount > 1) {
        if (!King.isKingCanMove(board, currentKing))
            alert("LOSE")
    }
    else {
        if (!King.isKingCanMove(board, currentKing) && !King.isKingCanBeDefended(board, currentKing))
            alert("LOSE")
    }
}
export function isStalemate(board, color) {

    for (let row of board)
        for (let figure of row) {
            if (figure.canBeMoved) return false
            if (figure.name && figure.canBeAttacked && figure.color !== color) return false
        }

    alert('PAT')
    return true
}