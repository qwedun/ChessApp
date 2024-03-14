import Rook from './rook';
import Pawn from './pawn';
import Queen from './queen';
import Knight from './knight';
import King from './king';
import Bishop from './bishop';
import Cell from './cell';
import { COLORS } from "../../constants/constants";
import {IFigure, BoardType} from "../../types/types";


class Figure {
    static addFigures(x: number, y: number, color: string) : IFigure {

        if (y === 1)
            return new Pawn({x: x, y: y, color: COLORS[color], firstMove: true})

        if (y === 6)
            return new Pawn({x: x, y: y, color: color, firstMove: true})

        if ((x === 2 && y === 0) || (x === 5 && y === 0))
            return new Bishop({x: x, y: y, color: COLORS[color]})

        if ((x === 2 && y === 7) || (x === 5 && y === 7))
            return new Bishop({x: x, y: y, color: color})

        if ((x === 0 && y === 0) || (x === 7 && y === 0))
            return new Rook({x: x, y: y, color: COLORS[color], firstMove: true})

        if ((x === 7 && y === 7) || (x === 0 && y === 7))
            return new Rook({x: x, y: y, color: color, firstMove: true})

        if ((x === 1 && y === 0) || (x === 6 && y === 0))
            return new Knight({x: x, y: y, color: COLORS[color]})

        if ((x === 1 && y === 7) || (x === 6 && y === 7))
            return new Knight({x: x, y: y, color: color})

        if ((x === 3 && y === 0))
            return new Queen({x: x, y: y, color: COLORS[color]})

        if (x === 3 && y === 7)
            return new Queen({x: x, y: y, color: color})

        if (x === 4 && y === 0)
            return new King({x: x, y: y, color: COLORS[color], firstMove: true})

        if (x === 4 && y === 7)
            return new King({x: x, y: y, color: color, firstMove: true})


        return new Cell({x, y, enPassant: false})
    }

    static createFigure(figure: IFigure): IFigure {
        if (figure instanceof Cell)
            return new Cell({...figure})

        if (figure instanceof King)
            return new King({...figure})

        if (figure instanceof Queen)
            return new Queen({...figure})

        if (figure instanceof Rook)
            return new Rook({...figure})

        if (figure instanceof Pawn)
            return new Pawn({...figure})

        if (figure instanceof Knight)
            return new Knight({...figure})

        if (figure instanceof Bishop)
            return new Bishop({...figure})
        return {} as IFigure
    }

    static createFigureFromName(board: BoardType, name: string, pawnIndex: number, currentPlayer: string) : void {
        const settings = {
            x: pawnIndex,
            y: 0,
            color:currentPlayer,
            firstMove: false,
        };
        if (name === 'Queen') board[0][pawnIndex] = new Queen(settings);
        else if (name === 'Knight') board[0][pawnIndex] = new Knight(settings);
        else if (name === 'Rook') board[0][pawnIndex] = new Rook(settings);
        else board[0][pawnIndex] = new Bishop(settings);
    }

    static setProperty(cell: any, property:string, canBeProperty: string, isRender: boolean) : void {
        if (isRender)
            cell[property] = true
        cell[canBeProperty] = true;
    }

    static horizontalAndVerticalTitles (board: BoardType, x: number, y: number) {

        const {kingDirection, isDiagonal} = board[y][x];

        if (isDiagonal) return [[]]

        const directions: IFigure[][] = [[], [], [], []];

        if (kingDirection === 0 || kingDirection === 2 || !kingDirection) {

            for (let i = x - 1; i >= 0; i--)
                directions[0].push(board[y][i])

            for (let i = x + 1; i <= 7; i++)
                directions[1].push(board[y][i])

            if (kingDirection) return directions
        }

        if (kingDirection === 1 || kingDirection === 3 || !kingDirection) {

            for (let i = y - 1; i >= 0; i--)
                directions[2].push(board[i][x])

            for (let i = y + 1; i <= 7; i++)
                directions[3].push(board[i][x])

            return directions
        }
        return directions
    }
    static diagonalTitles(board: BoardType, x: number, y: number) {

        const {kingDirection, isVertical} = board[y][x];

        if (isVertical) return [[]]

        const directions: IFigure[][] = [[], [], [], []];

        if (kingDirection === 0 || kingDirection === 2 || !kingDirection) {

            for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--)
                directions[0].push(board[j][i])

            for (let i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++)
                directions[1].push(board[j][i])

            if (kingDirection) return directions
        }

        if (kingDirection === 1 || kingDirection === 3 || !kingDirection) {

            for (let i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++)
                directions[2].push(board[j][i])

            for (let i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--)
                directions[3].push(board[j][i])

            return directions
        }
        return directions
    }
    static pawnTitles(board: BoardType, x: number, y: number, color: string, currentPlayer: string) {
        if (color === currentPlayer)
             return [[y - 1, x + 1], [y - 1, x - 1]].filter(cords => {
                const [y, x] = cords;
                return !(y < 0 || x < 0 || x > 7)
            }).map(cords => board[cords[0]][cords[1]])
        else
            return [[y + 1, x + 1], [y + 1, x - 1]].filter(cords => {
                const [y, x] = cords;
                return !(y > 7 || x < 0 || x > 7)
            }).map(cords => board[cords[0]][cords[1]])
    }

    static knightTitles(board: BoardType, x: number, y: number) {
        const knightTitles = [[x + 1, y + 2], [x + 1, y - 2], [x - 1, y + 2], [x - 1, y - 2],
            [x + 2, y + 1], [x + 2, y - 1], [x - 2, y + 1], [x - 2, y - 1]].filter(cords => {
            const [x, y] = cords;
            return !((x < 0 || x > 7) || (y < 0 || y > 7));
        }).map(cords => board[cords[1]][cords[0]])
        return [knightTitles];
    }

    static moveFigures(currentFigure: IFigure, figure: IFigure, board: BoardType)  {

        if (figure.canCastleRight && currentFigure.name === 'king') {
            board[figure.y][figure.x - 1] = new Rook({
                x: figure.x - 1,
                y: figure.y,
                color: currentFigure.color,
                firstMove: false,
            });
            board[figure.y][7] = new Cell({x: 7, y: figure.y, enPassant: false})
        }

        if (figure.canCastleLeft && currentFigure.name === 'king') {
            board[figure.y][figure.x + 1] = new Rook({
                x: figure.x + 1,
                y: figure.y,
                color: currentFigure.color,
                firstMove: false,
            });
            board[figure.y][0] = new Cell({x: 0, y: figure.y, enPassant: false})
        }

        board[figure.y][figure.x] = board[currentFigure.y][currentFigure.x];
        board[currentFigure.y][currentFigure.x] = new Cell({x: currentFigure.x, y: currentFigure.y, enPassant: false});

        currentFigure.y = figure.y;
        currentFigure.x = figure.x;
    }

    static checkTitles(titles: IFigure[][], color: string, checkForAttack: boolean, isKingUnderCheck: boolean, isPawn: boolean, isRender: boolean, isKnight: boolean) {
        titles.forEach(direction =>
            direction.every(title => {
                if (title.name || checkForAttack) {
                    if (isPawn) return false

                    if (!title.name && !isKingUnderCheck)
                        this.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    else if (title.color !== color) {

                        if (title.isAttackingKing && isKingUnderCheck)
                            this.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                        else if (!isKingUnderCheck)
                            this.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                        if (!isKnight) return false
                    } else {
                        title.underFriendlyAttack = true;
                        if (!isKnight) return false
                    }
                }
                else if (title.canDefend && isKingUnderCheck)
                    this.setProperty(title, 'canMove', 'canBeMoved', isRender)

                else if (!isKingUnderCheck && !checkForAttack)
                    this.setProperty(title, 'canMove', 'canBeMoved', isRender)

                return true
            })
        )
    }
}

export default Figure