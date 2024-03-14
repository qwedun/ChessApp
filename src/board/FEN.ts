import Cell from "./figures/cell";
import Pawn from "./figures/pawn";
import Rook from "./figures/rook";
import Queen from "./figures/queen";
import Knight from "./figures/knight";
import Bishop from "./figures/bishop";
import King from "./figures/king";
import {chessNotationString, setEnPassant} from "../helpers/helpers";
import { COLORS } from "../constants/constants";
import { BoardType, IFigure, IFirestoreData } from "../types/types";

export class FEN {
    static createFenString = (board: BoardType, currentTurn: string,
                              data: IFirestoreData[], currentFigure: IFigure,
                              isAttacked: boolean): string  => {

        const kingsCanCastleFen = this.isKingsCanCastleFen(data, board);
        const boardFen = this.boardFen(board);
        const {board: boardFenSimple} = this.getDataFromFen(boardFen);
        const turnsWithoutCapturing = this.turnsWithoutCapturing(data[data.length - 2]?.FEN, currentFigure, isAttacked)
        const pawnPassFen = this.isPawnPassFen(boardFenSimple, data[data.length - 1]?.FEN)
        const turnsCount = Math.floor((data.length + 1) / 2);

        return `${boardFen} ${COLORS[currentTurn[0]]} ${kingsCanCastleFen} ${pawnPassFen} ${turnsWithoutCapturing} ${turnsCount}`
    }
    static turnsWithoutCapturing = (prevFen: string, currentFigure: IFigure, isAttacked: boolean) : number => {
        if (!prevFen) return 0;
        if (currentFigure.name === 'pawn') return 0;
        if (isAttacked) return 0;
        return +this.getDataFromFen(prevFen).turnsWithoutCapturing + 1;
    }
    static createBoardFromFen = (fenString: string) : BoardType => {
        const newBoard: BoardType = [];

        const {board} = this.getDataFromFen(fenString);
        const {passedPawn} = this.getDataFromFen(fenString);
        const rows = board.split('/');

        for (let i = 0; i < 8; i++) {

            newBoard.push([]);
            const row = rows[i];

            for (let j = 0; j < 8; j++) {

                let char = row[j];

                if (char === '1') {
                    newBoard[i][j] = new Cell({x: j, y: i, enPassant: false})
                }
                else {
                    let options
                    if (char.toUpperCase() === char) {
                        options = {x: j, y: i, color: 'white', firstMove: false};
                    } else {
                        options = {x: j, y: i, color: 'black', firstMove: false}
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

    static boardFen = (board: BoardType): string => {
        let fenString = '';

        for (let row of board) {
            let localIndex = 0;
            for (let title of row) {

                if (!title.name) {
                    localIndex += 1
                    if (title.x === 7) {
                        fenString += String(localIndex);
                        localIndex = 0;
                    }
                }
                else {
                    let titleName;
                    const {color, name} = title

                    if (color === 'black')
                        name === 'knight' ? titleName = name[1] : titleName = name[0]
                    else
                        name === 'knight' ? titleName = name[1].toUpperCase() : titleName = name[0].toUpperCase()

                    if (!localIndex) fenString += titleName;
                    else fenString += String(localIndex) + titleName
                    localIndex = 0
                }
            }
            fenString += '/'
        }
        return fenString.slice(0, -1);
    }

    static isKingsCanCastleFen = (data: IFirestoreData[], board: BoardType): string => {

        let blackCastleLeft = 'q', blackCastleRight = 'k';
        let whiteCastleLeft = 'Q', whiteCastleRight = 'K';

        data.push({FEN: this.boardFen(board), currentFigure: '', type: '', timestamp: 0});

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

            if (rows[0][0] !== 'r') blackCastleLeft = '';
            if (rows[0][7] !== 'r') blackCastleRight = '';
            if (rows[7][0] !== 'R') whiteCastleLeft = '';
            if (rows[7][7] !== 'R') whiteCastleRight = '';
        }

        data.pop();

        if (!(whiteCastleLeft || whiteCastleRight || blackCastleRight || blackCastleLeft))
            return '-'

        return whiteCastleRight + whiteCastleLeft + blackCastleRight + blackCastleLeft;
    }
    static isPawnPassFen = (board: string, prevFen: string): string => {
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

    static getDataFromFen = (fen: string) => {

        const data = fen.split(' ');
        const board = data[0].split('/')
        let boardFen = '';

        for (let row of board) {
            for (let char of row) {

                if (isNaN(+char)){
                    boardFen += char;
                    continue
                }

                for (let i = 0; i < +char; i++) {
                    boardFen += '1';
                }
            }
            boardFen += '/'
        }
        return {
            board: boardFen.slice(0, -1),
            turn: data[1],
            kingsCanCastle: data[2],
            passedPawn: data[3],
            turnsWithoutCapturing: data[4],
            turnsCount: data[5],
        }
    }
}