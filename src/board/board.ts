import Figure from "./figures/figure";
import King from "./figures/king";
import { BoardType, IFigure } from "../types/types";


class Board {
    static findKing(board: BoardType, color: string){
        for (let row of board)
            for (let figure of row)
                if (figure.name === 'king' && figure.color === color)
                    return figure
        return {} as IFigure
    }
    static createBoard(color: string) {
        const board: BoardType = [];

        for (let j = 0; j < 8; j++) {
            board.push([]);
            for (let i = 0; i < 8; i++) {
                board[j].push(Figure.addFigures(i, j, color))
            }
        }
        return board
    }

    static updateBoard(board: BoardType, currentPlayer: string) {
        const newBoard = Board.cloneBoard(board)

        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i];
                if (!figure.name) continue

                if (figure.color !== currentPlayer)
                    figure.checkMoves?.(newBoard, true, false, false, currentPlayer)
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
    static removeTitles(board: BoardType) {
        for (let row of board)
            for (let figure of row) {

                figure.canMove = false;
                figure.underAttack = false;
            }
        return board
    }
    static cloneBoard(board: BoardType) {
        const newBoard: BoardType = [];
        for (let j = 0; j < 8; j++) {
            newBoard.push([])
            for (let i = 0; i < 8; i++) {
                newBoard[j][i] = Figure.createFigure(board[j][i])
            }
        }
        return newBoard
    }
    static makeOpposite(board: BoardType) {
        const newBoard: BoardType = [];
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

