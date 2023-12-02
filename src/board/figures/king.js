import Figure from './figure.js'
class King {
    constructor({x, y, color, firstMove}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = './assets/' + color + 'King.svg';
        this.name = 'king';
        this.firstMove = firstMove;
    }


    checkMoves(board, checkForAttack, isKingChecked, isRender, currentPlayer) {
        const yMin = (this.y === 0) ? 0 : this.y - 1;
        const yMax = (this.y === 7) ? 7 : this.y + 1;
        const xMin = (this.x === 0) ? 0 : this.x - 1;
        const xMax = (this.x === 7) ? 7 : this.x + 1;

        for (let i = yMin; i <= yMax; i++) {
            for (let j = xMin; j <= xMax; j++) {
                if (this === board[i][j]) continue;
                const title = board[i][j]

                if (title.name || checkForAttack) {

                    if (!title.name) {
                        title.canBeAttacked = true;
                    }

                    else if (title.color !== this.color && !title.underFriendlyAttack)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    else if (title.color === this.color) {
                        title.underFriendlyAttack = true;
                    }
                }
                else if (!title.canBeAttacked)
                    Figure.setProperty(title, 'canMove', 'kingCanMove', isRender)
            }
        }

        if (board[this.y][this.x - 2]?.canCastleLeft)
            Figure.setProperty(board[this.y][this.x - 2], 'canMove', 'kingCanMove', isRender)

        if (board[this.y][this.x + 2]?.canCastleRight)
            Figure.setProperty(board[this.y][this.x + 2], 'canMove', 'kingCanMove', isRender)

        //King.checkForKing(board[this.y][this.x], board, currentPlayer)
    }


    static isKingCanMove(board, king) {
        const yMin = (king.y === 0) ? 0 : king.y - 1;
        const yMax = (king.y === 7) ? 7 : king.y + 1;
        const xMin = (king.x === 0) ? 0 : king.x - 1;
        const xMax = (king.x === 7) ? 7 : king.x + 1;

        for (let i = yMin; i <= yMax; i++) {
            for (let j = xMin; j <= xMax; j++) {
                const title = board[i][j]
                if (king === title) continue;

                if (title.kingCanMove) {
                    return true;
                }

                if (title.name && title.color !== king.color && !title.underFriendlyAttack) {
                    return true
                }
            }
        }
        return false;
    }

    static isKingCanBeDefended(board) {
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
    static setAttack(king, attackingFigures, title) {
        king.underCheck = true;
        attackingFigures.push(title);
        title.isAttackingKing = true;
    }
    static isPawnAttacking(king, board, color, attackingFigures, currentPlayer) {
        Figure.pawnTitles(board, king.x, king.y, color, currentPlayer).forEach(title => {
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

    static isKingCanCastle(king, currentPlayer, board, isOnline) {
        if (!king.firstMove || king.underCheck) return;

        const y = (isOnline) ? 7 : (currentPlayer === 'white') ? 7 : 0;

        if (board[y][0].name && !board[y][0].firstMove) return
        if (board[y][7].name && !board[y][7].firstMove) return

        let canCastleLeft = true, canCastleRight = true;

        for (let i = 3; i > 0; i--) {
            const figure = board[y][i];
            if (figure.name || figure.canBeAttacked) canCastleLeft = false;
        }

        for (let i = 5; i < 7; i++) {
            const figure = board[y][i];
            if (figure.name || figure.canBeAttacked) canCastleRight = false;
        }

        if (canCastleRight)
            board[y][6].canCastleRight = true;

        if (canCastleLeft)
            board[y][2].canCastleLeft = true;
    }

    static setTitleBehindKing(board, y, x, color) {
        if (!(!board[y][x].name || !(board[y][x].color === color))) return

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

                else if (title.color === king.color && currentFigure)
                    return false

                else if (title.color !== king.color) {
                    if (currentFigure) {
                        if (isDiagonal) {
                            if (title.name !== 'bishop' && title.name !== 'queen') return false

                            currentFigure.kingDefender = true;
                            currentFigure.kingDirection = index;
                            currentFigure.isDiagonal = true;
                            title.canAttackKing = true;
                            return false;
                        } else {
                            if (title.name !== 'rook' && title.name !== 'queen') return false

                            currentFigure.kingDefender = true;
                            currentFigure.kingDirection = index;
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
    static checkForKing(king, board, currentPlayer) {
        const attackingFigures = [];
        const  x = king.x;
        const y = king.y;

        const verticalAndHorizontalTitles = Figure.horizontalAndVerticalTitles(board, x, y);
        const diagonalTitles = Figure.diagonalTitles(board, x, y)

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