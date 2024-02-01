import Figure from "./figures/figure";
import King from "./figures/king";


class Board {
    static findKing(board, color) {
        for (let row of board)
            for (let figure of row)
                if (figure.name === 'king' && figure.color === color)
                    return figure;
    }
    static createBoard(color) {
        const board = [];

        for (let j = 0; j < 8; j++) {
            board.push([]);
            for (let i = 0; i < 8; i++) {
                board[j].push(Figure.addFigures(i, j, color))
            }
        }
        return board
    }

    static updateBoard(board, currentPlayer, isOnline) {
        const newBoard = Board.cloneBoard(board)

        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i];
                if (!figure.name) continue

                if (figure.color !== currentPlayer)
                    figure.checkMoves(newBoard, true, false, false, currentPlayer)
            }
        }
        King.checkForKing(Board.findKing(newBoard, currentPlayer), newBoard, currentPlayer)

        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i];
                if (figure.color === currentPlayer) figure.checkMoves?.(newBoard, false, false, false, currentPlayer)
            }
        }
        return newBoard
    }
    static removeTitles(board) {
        for (let row of board)
            for (let figure of row) {

                figure.canMove = false;
                figure.underAttack = false;
            }
        return board
    }
    static cloneBoard(board) {
        const newBoard = [];
        for (let j = 0; j < 8; j++) {
            newBoard.push([])
            for (let i = 0; i < 8; i++) {
                newBoard[j][i] = Figure.createFigure(board[j][i])
            }
        }
        return newBoard
    }
    static makeOpposite(board) {
        const newBoard = [];
        for (let j = 0; j < 8; j++) {
            newBoard.push([]);
            for (let i = 0; i < 8; i++) {
                const figure = Figure.createFigure(board[7-j][7-i])
                figure.y = j;
                figure.x = i;
                newBoard[j][i] = figure;
            }
        }
        return newBoard
    }
}

export default Board;

