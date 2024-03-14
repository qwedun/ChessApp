import Figure from './figure'
import { IFigure, Constructor, BoardType } from "../../types/types";

class Bishop implements IFigure {

    x: number;
    y: number;
    valuation: number;

    name: string;
    color: string;
    src: string;

    constructor({x, y, color}: Constructor) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = '/assets/' + color + 'Bishop.svg';
        this.name = 'bishop';
        this.valuation = 3;
    }

    checkMoves(board: BoardType, checkForAttack: boolean, isKingChecked: boolean, isRender: boolean) {
        const diagonalTitles = Figure.diagonalTitles(board, this.x, this.y)

        Figure.checkTitles(diagonalTitles, this.color, checkForAttack, isKingChecked, false, isRender, false)
    }
}

export default Bishop