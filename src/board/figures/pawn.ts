import Figure from './figure'
import { IFigure, BoardType, Constructor } from "../../types/types";

class Pawn implements IFigure {

    x: number;
    y: number;
    valuation: number;

    name: string;
    color: string;
    src: string;
    kingDirection?: number;
    firstMove?: boolean;
    isDiagonal?: boolean;

    constructor({x, y, color, firstMove}: Constructor) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = '/assets/' + color + 'Pawn.svg'
        this.firstMove = firstMove
        this.name = 'pawn'
        this.valuation = 1;
    }

     static setAttack(y: number, x: number, board: BoardType, color: string,
                      checkForAttack: boolean, isKingChecked: boolean,
                      isRender: boolean, currentPlayer: string) {
         const pawn = board[y][x];

         Figure.pawnTitles(board, x, y, color, currentPlayer).forEach(title => {
             
             if (title.enPassant && !(pawn.kingDirection || pawn.kingDirection === 0) && !isKingChecked)
                 Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

            else if (title.name || checkForAttack) {

                if (!title.name && !isKingChecked)
                    Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                else if (title.color !== color) {
                    if (pawn.kingDirection && title.canAttackKing && !checkForAttack)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    if (title.isAttackingKing && isKingChecked && (!(pawn.kingDirection || pawn.kingDirection === 0) || checkForAttack))
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    else if (!isKingChecked && (!(pawn.kingDirection || pawn.kingDirection === 0) || checkForAttack))
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)
                } else {
                    title.underFriendlyAttack = true;
                }
            }
        })
    }
    checkMoves(board: BoardType, checkForAttack: boolean, isKingChecked: boolean, isRender: boolean, currentPlayer: string) {

        const {x, y, color, firstMove, isDiagonal, kingDirection} = this;

        if (y === 0 || y === 7) return

        if (color === currentPlayer) {
            const titles = (firstMove) ? [[board[y - 1][x], board[y - 2][x]]] : [[board[y - 1][x]]];

            Pawn.setAttack(y, x, board, color, checkForAttack, isKingChecked, isRender, currentPlayer);
            if (isDiagonal || kingDirection === 2 || kingDirection === 0) return;
            Figure.checkTitles(titles, color, checkForAttack, isKingChecked, true, isRender, false);
        } else {
            const titles = (firstMove) ? [[board[y + 1][x], board[y + 2][x]]] : [[board[y + 1][x]]];

            Pawn.setAttack(y, x, board, color, checkForAttack, isKingChecked, isRender, currentPlayer);
            if (isDiagonal || kingDirection === 2 || kingDirection === 0) return;
            Figure.checkTitles(titles, color, checkForAttack, isKingChecked, true, isRender, false);
        }
    }
}

export default Pawn