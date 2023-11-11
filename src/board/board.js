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

    static prepareForSending(board) {
        const copy = JSON.parse(JSON.stringify(board));
        const newBoard = [];

        for (let j = 0; j < 8; j++) {
            newBoard.push([])
            for (let i = 0; i < 8; i++) {
                const {x, y, firstMove, src, color, name} = {...copy[j][i]}
                const title = copy[j][i]

                if (title.hasOwnProperty('firstMove')) {
                    newBoard[j][i] = {
                        x: x,
                        y: y,
                        firstMove: firstMove,
                        src: src,
                        color: color,
                        name: name
                    }
                } else if (title.name)
                    newBoard[j][i] = {
                        x: x,
                        y: y,
                        src: src,
                        color: color,
                        name: name
                    }
                else
                    newBoard[j][i] = {x: x, y:y}
            }
        }
        return newBoard
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
                if (figure.canMove) figure.canMove = false;
                if (figure.kingCanMove) figure.kingCanMove = false;
                if (figure.canBeMoved) figure.canBeMoved = false;
                if (figure.underAttack) figure.underAttack = false;
                if (figure.canBeAttacked) figure.canBeAttacked = false;
                if (figure.isAttackingKing) figure.isAttackingKing = false;
                if (figure.underFriendlyAttack) figure.underFriendlyAttack = false;
                if (figure.underCheck) figure.underCheck = false;
                if (figure.canDefend) figure.canDefend = false;
                if (figure.kingDefender) figure.kingDefender = false;
                if (figure.kingDirection) figure.kingDirection = null;
                if (figure.isVertical) figure.isVertical = false;
                if (figure.isDiagonal) figure.isDiagonal = false;
            }
        }

        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i];
                if (!figure.name) continue

                if (figure.color !== color)
                    figure.checkMoves(board, true, false, false, currentPlayer)
            }
        }

        King.checkForKing(Board.findKing(newBoard, color), newBoard)


        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                const figure = newBoard[j][i];
                if (figure.color === color) figure.checkMoves?.(board, false, false, false, currentPlayer)
            }
        }

        return newBoard
    }
    static cloneBoard(board) {
        const newBoard = [];
        for (let j = 0; j < 8; j++) {
            newBoard.push([])
            for (let i = 0; i < 8; i++) {
                newBoard[j][i] = board[j][i]
            }
        }
        return newBoard
    }
}

export default Board;

