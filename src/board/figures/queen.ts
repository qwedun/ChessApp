import Figure from './figure'

import { IFigure, BoardType, Constructor } from "../../types/types";

class Queen implements IFigure {

    x: number;
    y: number;
    valuation: number;
    kingDirection?: number;

    name: string;
    color: string;
    src: string;
    constructor({x, y, color} : Constructor) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = '/assets/' + color + 'Queen.svg';
        this.name = 'queen';
        this.valuation = 9;
    }
    checkMoves(board: BoardType, checkForAttack: boolean, isKingChecked: boolean, isRender: boolean) {
        const diagonalTitles = Figure.diagonalTitles(board, this.x, this.y);
        const otherTitles = Figure.horizontalAndVerticalTitles(board, this.x, this.y);

        Figure.checkTitles(diagonalTitles, this.color, checkForAttack, isKingChecked, false, isRender, false);
        Figure.checkTitles(otherTitles, this.color, checkForAttack, isKingChecked, false, isRender, false);
    }
}

export default Queen