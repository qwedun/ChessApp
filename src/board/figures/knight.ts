import Figure from './figure';
import { IFigure, BoardType, Constructor } from "../../types/types";

class Knight implements IFigure {

    x: number;
    y: number;
    valuation: number;

    name: string;
    color: string;
    src: string;
    kingDirection?: number;

    constructor({x, y, color}: Constructor) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = '/assets/' + color + 'Knight.svg';
        this.name = 'knight';
        this.valuation = 3;
    }

    checkMoves(board: BoardType, checkForAttack: boolean, isKingChecked: boolean, isRender: boolean) {
        const knightTitles = Figure.knightTitles(board, this.x, this.y);
        if (Number(this.kingDirection) && !checkForAttack) return

        Figure.checkTitles(knightTitles, this.color, checkForAttack, isKingChecked, false, isRender, true);
    }
}

export default Knight