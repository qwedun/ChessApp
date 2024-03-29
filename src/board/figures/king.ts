import Figure from './figure'
import { FEN } from "../FEN";
import Board from "../board";
import {IFigure, BoardType, Constructor, IFirestoreData} from "../../types/types";

class King implements IFigure {

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
        this.src = '/assets/' + color + 'King.svg';
        this.name = 'king';
        this.valuation = 0;
    }


    checkMoves(board: BoardType, checkForAttack: boolean, isKingChecked: boolean, isRender: boolean, currentPlayer: string) {
        const yMin = (this.y === 0) ? 0 : this.y - 1;
        const yMax = (this.y === 7) ? 7 : this.y + 1;
        const xMin = (this.x === 0) ? 0 : this.x - 1;
        const xMax = (this.x === 7) ? 7 : this.x + 1;

        for (let i = yMin; i <= yMax; i++) {
            for (let j = xMin; j <= xMax; j++) {

                const title = board[i][j];
                if (title.name === 'king') continue

                const {name, canBeAttacked, color, underFriendlyAttack} = title;

                if (name || checkForAttack) {

                    if (!name) {
                        title.canBeAttacked = true;
                    }

                    else if (color !== this.color && !underFriendlyAttack)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    else if (color === this.color) {
                        title.underFriendlyAttack = true;
                    }
                }
                else if (!canBeAttacked)
                    Figure.setProperty(title, 'canMove', 'kingCanMove', isRender)
            }
        }

        if (board[this.y][this.x - 2]?.canCastleLeft)
            Figure.setProperty(board[this.y][this.x - 2], 'canMove', 'kingCanMove', isRender)

        if (board[this.y][this.x + 2]?.canCastleRight)
            Figure.setProperty(board[this.y][this.x + 2], 'canMove', 'kingCanMove', isRender)

        King.checkForKing(board[this.y][this.x], board, currentPlayer)
    }


    static isKingCanMove(board: BoardType, king: IFigure) {
        const yMin = (king.y === 0) ? 0 : king.y - 1;
        const yMax = (king.y === 7) ? 7 : king.y + 1;
        const xMin = (king.x === 0) ? 0 : king.x - 1;
        const xMax = (king.x === 7) ? 7 : king.x + 1;

        for (let i = yMin; i <= yMax; i++) {
            for (let j = xMin; j <= xMax; j++) {

                const {name, kingCanMove, color, underFriendlyAttack} = board[i][j];

                if (name === 'king') continue;

                if (kingCanMove) {
                    return true;
                }

                if (name && color !== king.color && !underFriendlyAttack) {
                    return true
                }
            }
        }
        return false;
    }

    static isKingCanBeDefended(board: BoardType) {
        for (let row of board) {
            for (let figure of row) {

                if (figure.canDefend && figure.canBeMoved)
                    return true;

                if (figure.isAttackingKing && figure.canBeAttacked)
                    return true;
            }
        }
        return false;
    }
    static setAttack(king: IFigure, attackingFigures: IFigure[], title: IFigure) {
        king.underCheck = true;
        attackingFigures.push(title);
        title.isAttackingKing = true;
    }
    static isPawnAttacking(king: IFigure, board: BoardType, color: string, attackingFigures: IFigure[], currentPlayer: string) {
        Figure.pawnTitles(board, king.x, king.y, color, currentPlayer).forEach(title => {
            if (title.name === 'pawn' && title.color !== color) {
                this.setAttack(king, attackingFigures, title)
            }
        })
    }
    static isKnightAttacking(king: IFigure, board: BoardType, color: string, attackingFigures: IFigure[]) {
        Figure.knightTitles(board, king.x, king.y).forEach(titles => titles.forEach(title => {
            if (title.name === 'knight')
                if (title.color !== color) {
                    this.setAttack(king, attackingFigures, title)
                }
        }))
    }

    static isKingCanCastle(king: IFigure, currentPlayer: string,
                           board: BoardType, isOnline: boolean,
                           data: IFirestoreData[]) {

        const newBoard = currentPlayer === 'white' ? board : Board.makeOpposite(board);

        const fenString = FEN.isKingsCanCastleFen(data, newBoard);

        if (fenString === '-') return;

        let canCastleRight = false, canCastleLeft = false;

        if (currentPlayer === 'white') {
            if (fenString.includes('K')) canCastleRight = true;
            if (fenString.includes('Q')) canCastleLeft = true;
        } else {
            if (fenString.includes('k')) canCastleRight = true;
            if (fenString.includes('q')) canCastleLeft = true;
        }

        const y = (isOnline) ? 7 : (currentPlayer === 'white') ? 7 : 0;

        for (let i = king.x - 1; i > 0; i--) {
            if (!canCastleLeft) break

            const figure = board[y][i];
            if (currentPlayer === 'white' && i === 1 && !figure.name) continue

            else if (figure.name || figure.canBeAttacked) {
                canCastleLeft = false;
                break
            }
        }

        for (let i = king.x + 1; i < 7; i++) {
            if (!canCastleRight) break;

            const figure = board[y][i];
            if (currentPlayer === 'black' && i === 6 && !figure.name) continue

            else if (figure.name || figure.canBeAttacked) {
                canCastleRight = false;
                break;
            }
        }

        if (canCastleRight) {
            if (currentPlayer === 'black')
                board[y][5].canCastleRight = true;
            else board[y][6].canCastleRight = true;
        }

        if (canCastleLeft) {
            if (currentPlayer === 'black')
                board[y][1].canCastleLeft = true;
            else board[y][2].canCastleLeft = true;
        }
    }

    static setTitleBehindKing(board: BoardType, y: number, x: number, color: string) {
        if (!(!board[y][x].name || !(board[y][x].color === color))) return

        board[y][x].canMove = false;
        board[y][x].kingCanMove = false;
        board[y][x].canBeAttacked = false;

        if (!board[y][x].isAttackingKing) board[y][x].underAttack = false;
    }

    static checkTitles(titles: IFigure[][], king: IFigure,
                       board: BoardType, attackingFigures: IFigure[],
                       isDiagonal: boolean) {

        const {y, x, color} = king;

        titles.forEach((direction, index) => {
            const currentTitles: IFigure[] = [];
            let currentFigure: IFigure;

            direction.every(title => {
                if (title.color === king.color && !currentFigure) {
                    currentFigure = title;
                    return true
                }

                if (!title.name)
                    currentTitles.push(title)

                else if (title.color === king.color && currentFigure)
                    return false

                else if (title.color !== king.color) {
                    if (currentFigure) {
                        if (isDiagonal) {
                            if (title.name !== 'bishop' && title.name !== 'queen') return false

                            currentFigure.kingDirection = index;
                            currentFigure.isDiagonal = true;

                            return false;
                        } else {
                            if (title.name !== 'rook' && title.name !== 'queen') return false

                            currentFigure.kingDirection = index;
                            title.canAttackKing = true;
                            currentFigure.isVertical = true;

                            return false;
                        }
                    } else {
                        if (isDiagonal) {
                            if (title.name !== 'bishop' && title.name !== 'queen') return false

                            this.setAttack(king, attackingFigures, title)

                            if (index === 0)
                                if (y + 1 <= 7 && x + 1 <= 7)
                                    this.setTitleBehindKing(board, y + 1, x + 1, color)

                            if (index === 1)
                                if (y - 1 >= 0 && x + 1 <= 7)
                                    this.setTitleBehindKing(board, y - 1, x + 1, color)

                            if (index === 2)
                                if (y - 1 >= 0 && x - 1 >= 0)
                                    this.setTitleBehindKing(board, y - 1, x - 1, color)

                            if (index === 3)
                                if (y + 1 <= 7 && x - 1 >= 0)
                                    this.setTitleBehindKing(board, y + 1, x - 1, color)

                            currentTitles.forEach(title => title.canDefend = true)
                            return false;
                        } else {
                            if (title.name !== 'rook' && title.name !== 'queen') return false

                            this.setAttack(king, attackingFigures, title)

                            if (index === 0)
                                if (x + 1 <= 7)
                                    this.setTitleBehindKing(board, y, x + 1, color)

                            if (index === 1)
                                if (y + 1 <= 7)
                                    this.setTitleBehindKing(board, y + 1, x, color)

                            if (index === 2)
                                if (x - 1 >= 0)
                                    this.setTitleBehindKing(board, y, x - 1, color)

                            if (index === 3)
                                if (y - 1 >= 0)
                                    this.setTitleBehindKing(board, y - 1, x, color  )

                            currentTitles.forEach(title => title.canDefend = true)
                            return false
                        }
                    }
                }
                return true
            })
        })
    }
    static checkForKing(king: IFigure, board: BoardType, currentPlayer: string) {
        const attackingFigures: IFigure[] = [];

        const verticalAndHorizontalTitles = Figure.horizontalAndVerticalTitles(board, king.x, king.y);
        const diagonalTitles = Figure.diagonalTitles(board, king.x, king.y)

        this.checkTitles(verticalAndHorizontalTitles, king, board, attackingFigures, false);
        this.checkTitles(diagonalTitles, king, board, attackingFigures, true);

        this.isKnightAttacking(king, board, king.color, attackingFigures)
        this.isPawnAttacking(king, board, king.color, attackingFigures, currentPlayer)

        if (attackingFigures.length > 1)
            attackingFigures.forEach(figure => figure.isAttackingKing = false)

        board.attackingFiguresCount = attackingFigures.length;
        attackingFigures.length = 0;
    }
}

export default King