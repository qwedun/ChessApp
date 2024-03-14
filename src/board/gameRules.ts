import King from "./figures/king";
import Figure from "./figures/figure";
import { IFigure, BoardType } from "../types/types";
import {MutableRefObject} from "react";

export class GameRules {
    static isCheckMate(currentKing: IFigure, board: BoardType) {

        if (board.attackingFiguresCount && board.attackingFiguresCount > 1) {
            if (!King.isKingCanMove(board, currentKing))
                return true
        } else {
            if (!King.isKingCanMove(board, currentKing) && !King.isKingCanBeDefended(board))
                return true
        }
        return false
    }
    static isStalemate(board: BoardType, color: string) {
        for (let row of board)
            for (let figure of row) {
                if (figure.canBeMoved || figure.kingCanMove) return false
                if (figure.name && figure.canBeAttacked && figure.color !== color) return false
            }
        return true
    }
    static moveFigures(board: BoardType, currentFigure: IFigure, figure: IFigure, type: MutableRefObject<string>) {
        if ((figure.canCastleLeft || figure.canCastleRight) && currentFigure.name === 'king') type.current = 'castle'
        else if (figure.underAttack) type.current = 'capture'
        else if (figure.canMove) type.current = 'move'
        Figure.moveFigures(currentFigure, figure, board);
    }
}