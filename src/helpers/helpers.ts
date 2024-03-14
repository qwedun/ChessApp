import { BoardType } from "../types/types";

export const checkPassword = (password: string) => {
    const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*_?&^])[A-Za-z\d@.#$!%*_?&]{8,30}$/;
    return !!password.match(regex);
}

export const validateEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!String(email).toLowerCase().match(regex)
};

export const playSound = (src: string) => {
    new Audio(src).play().catch(e => console.log(e))
}

export const chessNotationString = (y: number, x: number, color: string) => {
    let resString, resY, resX

    if (color === 'white')  {
        resString = 'abcdefgh';
        resX = resString[x];
        resY = 8 - y;
    } else {
        resString = 'hgfedcba'
        resX = resString[x]
        resY = 1 + y;
    }

    return `${resX}${resY}`
}
export const setEnPassant = (pos: string, board: BoardType) => {

    const posString = 'abcdefgh';

    const [x, y] = pos;
    let resX = 0, resY = 8 - Number(y);

    for (let i = 0; i < 8; i++) {
        if (posString[i] === x) {
            resX = i;
            break
        }
    }
    board[resY][resX].enPassant = true;
}

export function figuresEvaluation(board: BoardType, currentPlayer: string) {

    let evaluation = 0;
    const arr: string[][] = [];

    const figuresCount: Record<string, number> = {
        queen: 1,
        rook: 2,
        bishop: 2,
        knight: 2,
        pawn: 8,
    }

    for (let row of board) {
        for (let figure of row) {
            if (!figure.name) continue

            if (figure.color === currentPlayer) {
                evaluation += figure.valuation;
            } else {
                figuresCount[figure.name] -= 1;
                evaluation -= figure.valuation;
            }
        }
    }

    let j = 0;

    for (let [key, count] of Object.entries(figuresCount)) {
        if (count === 0) continue

        arr.push([])

        for (let i = 0; i < count; i++)
            arr[j].push(key[0].toUpperCase() + key.slice(1));
        j++
    }

    return {
        evaluation: evaluation,
        figures: arr,
    }
}
