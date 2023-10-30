import Knight from './knight.js'
import Figure from './figure.js'
class King {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = './assets/' + color + 'King.svg';
        this.name = 'king';
        this.firstMove = true;
    }


    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const yMin = (this.y === 0) ? 0 : this.y - 1;
        const yMax = (this.y === 7) ? 7 : this.y + 1;
        const xMin = (this.x === 0) ? 0 : this.x - 1;
        const xMax = (this.x === 7) ? 7 : this.x + 1;

        for (let i = yMin; i <= yMax; i++) {
            for (let j = xMin; j <= xMax; j++) {
                if (board[this.y][this.x] === board[i][j]) continue;

                if (board[i][j].name || checkForAttack) {

                    if (!board[i][j].name) {
                        board[i][j].canBeAttacked = true;
                    }

                    else if (board[i][j].color !== this.color &&
                        !board[i][j].underFriendlyAttack) {
                        if (isRender)
                            board[i][j].underAttack = true;
                        board[i][j].canBeAttacked = true;
                    }

                    else if (board[i][j].color === this.color) {
                        board[i][j].underFriendlyAttack = true;
                    }
                }
                else if (!board[i][j].canBeAttacked) {
                    if (isRender)
                        board[i][j].canMove = true;
                    board[i][j].kingCanMove = true;
                }
            }
        }
        King.checkForKing(board[this.y][this.x], board)
    }


    static isKingCantMove(board, king) {
        const yMin = (king.y === 0) ? 0 : king.y - 1;
        const yMax = (king.y === 7) ? 7 : king.y + 1;
        const xMin = (king.x === 0) ? 0 : king.x - 1;
        const xMax = (king.x === 7) ? 7 : king.x + 1;


        for (let i = yMin; i <= yMax; i++) {
            for (let j = xMin; j <= xMax; j++) {
                if (board[king.y][king.x] === board[i][j]) continue;
                if (board[i][j].kingCanMove)
                    return false;
                if (board[i][j].name && board[i][j].color !== king.color && !board[i][j].underFriendlyAttack)
                    return false
            }
        }
        return true;
    }

    static isKingCantBeDefended(board) {
        let canAttackFigure, canDefend;

        for (let row of board) {
            for (let figure of row) {
                if (figure.canDefend && figure.canBeMoved)
                    canDefend = true;
                if (figure.isAttackingKing && figure.canBeAttacked)
                    canAttackFigure = true;
            }
        }
        return !(canAttackFigure || canDefend);

    }
    static setAttack(king, attackingFigures, title) {
        king.underCheck = true;
        attackingFigures.push(title);
        title.isAttackingKing = true;
    }
    static isPawnAttacking(king, board, color, attackingFigures) { 
        Figure.pawnTitles(board, king.x, king.y, color).forEach(title => {
            if (title.name === 'pawn' && title.color !== color) {
                this.setAttack(king, attackingFigures, title)
            }
        })
    }
    static isKnightAttacking(king, board, color, attackingFigures) {
        Figure.knightTitles(board, king.x, king.y).forEach(title => {
            if (title.name === 'knight')
                if (title.color !== color) {
                    this.setAttack(king, attackingFigures, title)
                }
        })
    }

    static setFigure(board, y, x) {
        board[y][x].canMove = false;
        board[y][x].kingCanMove = false;
        board[y][x].canBeAttacked = false;
        if (!board[y][x].isAttackingKing) board[y][x].underAttack = false;
    }

    static checkTitles(titles, king, board, attackingFigures, isDiagonal) {
        const y = king.y;
        const x = king.x;
        const color = king.color

        titles.forEach((direction, index) => {
            const currentTitles = [];
            let currentFigure;

            direction.every(title => {
                if (title.color === king.color && !currentFigure) {
                    currentFigure = title;
                    return true
                }

                if (!title.name)
                    currentTitles.push(title)

                else if (title.color === king.color && currentFigure) {
                    return false
                } else if (title.color !== king.color) {
                    if (currentFigure) {
                        if (isDiagonal)
                            if (title.name === 'bishop' ||
                                title.name === 'queen') {

                                currentFigure.kingDefender = true;
                                currentFigure.kingDirection = index;


                                currentFigure.isDiagonal = true;

                                return false;
                            } else return false;
                        else
                            if (title.name === 'rook' ||
                                title.name === 'queen') {

                                currentFigure.kingDefender = true;
                                currentFigure.kingDirection = index;

                                currentFigure.isVertical = true;

                                return false;
                            } else return false;
                    } else {
                        if (isDiagonal)
                            if (title.name === 'bishop' ||
                                title.name === 'queen') {

                                this.setAttack(king, attackingFigures, title)

                                if (index === 0) {
                                    if (y + 1 <= 7 && x + 1 <= 7)
                                        if (!board[y + 1][x + 1].name || !(board[y + 1][x + 1].color === color))
                                            this.setFigure(board, y + 1, x + 1)
                                } else if (index === 1) {
                                    if (y - 1 >= 0 && x + 1 <= 7)
                                        if (!board[y - 1][x + 1].name || !(board[y - 1][x + 1].color === color))
                                            this.setFigure(board, y - 1, x + 1)

                                } else if (index === 2) {
                                    if (y - 1 >= 0 && x - 1 >= 0)
                                        if (!board[y - 1][x - 1].name || !(board[y - 1][x - 1].color === color))
                                            this.setFigure(board, y - 1, x - 1)
                                } else {
                                    if (y + 1 <= 7 && x - 1 >= 0)
                                        if (!board[y + 1][x + 1].name || !(board[y + 1][x - 1].color === color))
                                            this.setFigure(board, y + 1, x - 1)
                                }

                                currentTitles.forEach(title => title.canDefend = true)
                                return false;
                            } else return false
                        else {
                            if (title.name === 'rook' ||
                                title.name === 'queen') {

                                this.setAttack(king, attackingFigures, title)

                                if (index === 0) {
                                    if (x + 1 <= 7)
                                        if (!board[y][x + 1].name || !(board[y][x + 1].color === color))
                                            this.setFigure(board, y, x + 1)
                                } else if (index === 1) {
                                    if (y + 1 <= 7)
                                        if (!board[y + 1][x].name || !(board[y + 1][x].color === color))
                                            this.setFigure(board, y + 1, x)
                                } else if (index === 2) {
                                    if (x - 1 >= 0)
                                        if (!board[y][x - 1].name || !(board[y][x - 1].color === color))
                                            this.setFigure(board, y, x - 1)
                                } else {
                                    if (y - 1 >= 0)
                                        if (!board[y - 1][x].name || !(board[y - 1][x].color === color))
                                            this.setFigure(board, y - 1, x)
                                }

                                currentTitles.forEach(title => title.canDefend = true)
                                return false
                            } else return false
                        }
                    }
                }
                return true
            })
        })
    }
    static checkForKing(king, board) {
        const attackingFigures = [];
        const  x = king.x;
        const y = king.y;

        const verticalAndHorizontalTitles = Figure.horizontalAndVerticalTitles(board, x, y);
        const diagonalTitles = Figure.diagonalTitles(board, x, y)

        this.checkTitles(verticalAndHorizontalTitles, king, board, attackingFigures, false);
        this.checkTitles(diagonalTitles, king, board, attackingFigures, true);

        this.isKnightAttacking(king, board, king.color, attackingFigures)
        this.isPawnAttacking(king, board, king.color, attackingFigures)

        if (attackingFigures.length > 1)
            attackingFigures.forEach(figure => figure.isAttackingKing = false)

        board.attackingFiguresCount = attackingFigures.length;
        attackingFigures.length = 0;
    }
}

export default King