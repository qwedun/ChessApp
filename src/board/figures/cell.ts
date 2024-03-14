import { IFigure } from "../../types/types";

class Cell implements IFigure{

    x: number;
    y: number;
    valuation: number;
    color: string;
    underAttack: boolean;
    canBeMoved: boolean;
    canMove: boolean;
    enPassant: boolean;

    constructor({x, y, enPassant}: {x: number, y: number, enPassant: boolean}) {
        this.x = x;
        this.y = y;
        this.underAttack = false;
        this.canBeMoved = false;
        this.canMove = false;
        this.enPassant = enPassant;
        this.color = '';
        this.valuation = 0;
    }
}

export default Cell