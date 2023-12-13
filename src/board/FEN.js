import Title from "./figures/title";
import Pawn from "./figures/pawn";
import Rook from "./figures/rook";
import Queen from "./figures/queen";
import Knight from "./figures/knight";
import Bishop from "./figures/bishop";
import King from "./figures/king";
import {chessNotationString, setEnPassant} from "../helpers/helpers";

export class FEN {
    static createFenString = (board, currentTurn, data, currentFigure, isAttacked)  => {

        const kingsCanCastleFen = this.isKingsCanCastleFen(data, board);
        const boardFen = this.boardFen(board);
        const turnsWithoutCapturing = this.turnsWithoutCapturing(data[data.length - 2]?.FEN, currentFigure, isAttacked)
        const pawnPassFen = this.isPawnPassFen(boardFen, data[data.length - 2]?.FEN)
        const turnsCount = Math.floor((data.length + 1) / 2);

        const fenString = `${boardFen} ${currentTurn[0]} ${kingsCanCastleFen} ${pawnPassFen} ${turnsWithoutCapturing} ${turnsCount}`

        return fenString
    }
    static turnsWithoutCapturing = (prevFen, currentFigure, isAttacked) => {
        if (!prevFen) return '0';
        if (currentFigure.name === 'pawn') return '0';
        if (isAttacked) return '0';
        return +this.getDataFromFen(prevFen).turnsWithoutCapturing + 1;
    }
    static createBoardFromFen = (fenString) => {
        const newBoard = [];

        const {board} = this.getDataFromFen(fenString);
        const {passedPawn} = this.getDataFromFen(fenString);
        const rows = board.split('/');

        for (let i = 0; i < 8; i++) {

            newBoard.push([]);
            const row = rows[i];

            for (let j = 0; j < 8; j++) {

                let char = row[j];

                if (char === '1') {
                    newBoard[i][j] = new Title({x: j, y: i})
                }
                else {
                    let options
                    if (char.toUpperCase() === char) {
                        options = {x: j, y: i, color: 'white'};
                    } else {
                        options = {x: j, y: i, color: 'black'}
                    }
                    if (char === 'p') {
                        if (i === 1)
                            newBoard[i][j] = new Pawn({...options, firstMove: true});
                        else newBoard[i][j] = new Pawn(options);
                    } else if (char === 'P') {
                        if (i === 6)
                            newBoard[i][j] = new Pawn({...options, firstMove: true});
                        else newBoard[i][j] = new Pawn(options);
                    }
                    char = char.toLowerCase();
                    if (char === 'r') newBoard[i][j] = new Rook(options);
                    else if (char === 'q') newBoard[i][j] = new Queen(options);
                    else if (char === 'n') newBoard[i][j] = new Knight(options);
                    else if (char === 'b') newBoard[i][j] = new Bishop(options);
                    else if (char === 'k') newBoard[i][j] = new King(options);
                }
            }

        }

        if (passedPawn === '-') return newBoard;

        else {
            setEnPassant(passedPawn, newBoard);
            return newBoard;
        }
    }

    static boardFen = (board) => {
        let fenString = '';

        for (let row of board) {
            for (let title of row) {

                if (!title.name) fenString += '1'

                else {
                    let titleName;
                    const {color, name} = title

                    if (color === 'black')
                        name === 'knight' ? titleName = name[1] : titleName = name[0]
                    else
                        name === 'knight' ? titleName = name[1].toUpperCase() : titleName = name[0].toUpperCase()

                    fenString += titleName;
                }
            }
            fenString += '/'
        }
        return fenString.slice(0, -1);
    }

    static isKingsCanCastleFen = (data, board) => {

        let blackCastleLeft = 'q', blackCastleRight = 'k';
        let whiteCastleLeft = 'Q', whiteCastleRight = 'K';

        data.push({FEN: this.boardFen(board)});

        for (let state of data) {

            const {board} = this.getDataFromFen(state.FEN);
            const rows = board.split('/');

            if (rows[0][4] !== 'k') {
                blackCastleLeft = '';
                blackCastleRight = '';
            }
            if (rows[7][4] !== 'K') {
                whiteCastleLeft = '';
                whiteCastleRight = '';
            }
        }

        for (let state of data) {

            const {board} = this.getDataFromFen(state.FEN);
            const rows = board.split('/');

            if (blackCastleLeft)
                if (rows[0][0] !== 'r') blackCastleLeft = '';

            if (blackCastleRight)
                if (rows[0][7] !== 'r') blackCastleRight = '';

            if (whiteCastleLeft)
                if (rows[7][0] !== 'R') whiteCastleLeft = '';

            if (whiteCastleRight)
                if (rows[7][7] !== 'R') whiteCastleRight = '';
        }

        if (!(whiteCastleLeft || whiteCastleRight || blackCastleRight || blackCastleLeft))
            return '-'

        return whiteCastleRight + whiteCastleLeft + blackCastleRight + blackCastleLeft;
    }
    static isPawnPassFen = (board, prevFen) => {
        if (!prevFen) return '-';

        const {board: prevBoard} = this.getDataFromFen(prevFen);

        const rows = board.split('/');
        const prevRows = prevBoard.split('/');

        let index = 1;

        for (let i = 0; i < 8; i++) {
            if (rows[index][i] === 'p') continue

            if (prevRows[index][i] === 'p' && rows[index + 2][i] === 'p' && rows[index][i] === '1')
                return chessNotationString(index + 1, i, 'white');
        }
        index = 6;
        for (let i = 0; i < 8; i++) {
            if (rows[index][i] === 'P') continue

            if (prevRows[index][i] === 'P' && rows[index - 2][i] === 'P' && rows[index][i] === '1')
                return chessNotationString(index - 1, i, 'white');
        }
        return '-';
    }
    static getDataFromFen = (fen) => {
        const data = fen.split(' ');
        return {
            board: data[0],
            turn: data[1],
            kingsCanCastle: data[2],
            passedPawn: data[3],
            turnsWithoutCapturing: data[4],
            turnsCount: data[5],
        }
    }
}