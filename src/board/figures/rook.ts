import Figure from './figure'
import { IFigure, BoardType } from "../../types/types";

class Rook implements IFigure {

    x: number;
    y: number;
    valuation: number;

    name: string;
    color: string;
    src: string;

    firstMove: boolean;
    kingDirection?: number;

    constructor({x, y, color, firstMove}: {x: number, y: number, color: string, firstMove: boolean}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = 'rook'
        this.src = '/assets/' + color + 'Rook.svg';
        this.firstMove = firstMove;
        this.valuation = 5;
    }

    checkMoves(board: BoardType, checkForAttack: boolean, isKingChecked: boolean, isRender: boolean) {
        const rookTitles = Figure.horizontalAndVerticalTitles(board, this.x, this.y)

        Figure.checkTitles(rookTitles, this.color, checkForAttack, isKingChecked, false, isRender, false)
    }
}

export default Rook