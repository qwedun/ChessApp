import Figure from "./figures/figure";
import King from "./figures/king";
import Pawn from "./figures/pawn";
import Bishop from "./figures/bishop";
import Knight from "./figures/knight";
import Rook from "./figures/rook";
import Queen from "./figures/queen";
import Title from "./figures/title";
class Board {

    static changeTurn(currentTurn, setCurrentTurn) {
        if (currentTurn === 'white') {
            setCurrentTurn('black');
        }
        else {
            setCurrentTurn('white');
        }
    }

    static prepareForSending(figure) {
        const {name, color, x, y, firstMove} = JSON.parse(JSON.stringify(figure));
        return JSON.stringify({
            name: name,
            color: color,
            x: x,
            y: y,
            firstMove: firstMove
        })
    }

    static createBoardFromJSON(json) {
        const newBoard = [];
        for (let j = 0; j < 8; j++) {
            newBoard.push([])
            for (let i = 0; i < 8; i++) {
                const figure = json[j][i];
                if (figure.name === 'pawn')
                    newBoard[j][i] = new Pawn({...figure});
                else if (figure.name === 'rook')
                    newBoard[j][i] = new Rook({...figure});
                else if (figure.name === 'bishop')
                    newBoard[j][i] = new Bishop({...figure})
                else if (figure.name === 'knight')
                    newBoard[j][i] = new Knight({...figure})
                else if (figure.name === 'queen')
                    newBoard[j][i] = new Queen({...figure})
                else if (figure.name === 'king')
                    newBoard[j][i] = new King({...figure})
                else
                    newBoard[j][i] = new Title({...figure})
            }
        }
        return newBoard
    }

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

    static updateBoard(board, color, currentPlayer) {
        const newBoard = Board.cloneBoard(board)

        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i]
            }
        }

        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i];
                if (!figure.name) continue

                if (figure.color !== color)
                    figure.checkMoves(newBoard, true, false, false, currentPlayer)
            }
        }

        King.checkForKing(Board.findKing(newBoard, color), newBoard, currentPlayer)


        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i];
                if (figure.color === color) figure.checkMoves?.(newBoard, false, false, false, currentPlayer)
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
}

export default Board;

