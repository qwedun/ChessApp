import Rook from './rook.js';
import Pawn from './pawn.js';
import Queen from './queen.js';
import Knight from './knight.js';
import King from './king.js';
import Bishop from './bishop.js';
import Title from './title.js';


class Figure {
    static addFigures(x, y, color) {
        const colors = {
            white: 'black',
            black: 'white'
        }

        if (y === 1)
            return new Pawn({x: x, y: y, color: colors[color], firstMove: true})

        if (y === 6)
            return new Pawn({x: x, y: y, color: color, firstMove: true})

        if ((x === 2 && y === 0) || (x === 5 && y === 0))
            return new Bishop({x: x, y: y, color: colors[color]})

        if ((x === 2 && y === 7) || (x === 5 && y === 7))
            return new Bishop({x: x, y: y, color: color})

        if ((x === 0 && y === 0) || (x === 7 && y === 0))
            return new Rook({x: x, y: y, color: colors[color], firstMove: true})

        if ((x === 7 && y === 7) || (x === 0 && y === 7))
            return new Rook({x: x, y: y, color: color, firstMove: true})

        if ((x === 1 && y === 0) || (x === 6 && y === 0))
            return new Knight({x: x, y: y, color: colors[color]})

        if ((x === 1 && y === 7) || (x === 6 && y === 7))
            return new Knight({x: x, y: y, color: color})

        if ((x === 3 && y === 0))
            return new Queen({x: x, y: y, color: colors[color]})

        if (x === 3 && y === 7)
            return new Queen({x: x, y: y, color: color})

        if (x === 4 && y === 0)
            return new King({x: x, y: y, color: colors[color], firstMove: true})

        if (x === 4 && y === 7)
            return new King({x: x, y: y, color: color, firstMove: true})


        return new Title({x, y})
    }

    static createFigure(figure) {
        if (figure instanceof Title)
            return new Title({...figure})

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
    }

    static createFigureFromName(board, name, pawnIndex, currentPlayer) {
        const settings = {
            x: pawnIndex,
            y: 0,
            color:currentPlayer,
        };
        if (name === 'Queen') board[0][pawnIndex] = new Queen(settings);
        else if (name === 'Knight') board[0][pawnIndex] = new Knight(settings);
        else if (name === 'Rook') board[0][pawnIndex] = new Rook(settings);
        else board[0][pawnIndex] = new Bishop(settings);
    }

    static setProperty(title, property, canBeProperty, isRender) {
        if (isRender)
            title[property] = true
        title[canBeProperty] = true;
    }

    static horizontalAndVerticalTitles (board, x, y) {

        let directions = [[], [], [], []];

        if (board[y][x].isDiagonal) return [[]]

        if (board[y][x].kingDefender) {
            if (board[y][x].kingDirection === 0 || board[y][x].kingDirection === 2)
                directions = [[], null, [], null]

            if (board[y][x].kingDirection === 1 || board[y][x].kingDirection === 3)
                directions = [null, [], null, []]
        }



        return directions.map((direction, index) => {
            if (index === 0 && direction) {
                for (let i = x - 1; i >= 0; i--)
                    direction.push(board[y][i])
            }

            else if (index === 1 && direction)
                for (let i = y - 1; i >= 0; i--)
                    direction.push(board[i][x])

            else if (index === 2 && direction)
                for (let i = x + 1; i <= 7; i++)
                    direction.push(board[y][i])

            else if (index === 3 && direction)
                for (let i = y + 1; i <= 7; i++)
                    direction.push(board[i][x])
            return direction
        })
    }
    static pushNewFigure(direction, board, y, x) {
        const newFigure = this.createFigure(board[y][x])
        board[y][x] = newFigure;
        direction.push(newFigure)
    }
    static diagonalTitles(board, x, y) {

        let directions = [[], [], [], []];

        if (board[y][x].isVertical) return [[]]

        if (board[y][x].kingDefender) {
            if (board[y][x].kingDirection === 0 || board[y][x].kingDirection === 2)
                directions = [[], null, [], null]

            if (board[y][x].kingDirection === 1 || board[y][x].kingDirection === 3)
                directions = [null, [], null, []]
        }
        return directions.map((direction, index) => {
            if (index === 0 && direction)
                for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
                    direction.push(board[j][i])
                }

            else if (index === 1 && direction)
                for (let i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++)
                    direction.push(board[j][i])

            else if (index === 2  && direction)
                for (let i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++)
                    direction.push(board[j][i])

            else if (index === 3 && direction)
                for (let i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--)
                    direction.push(board[j][i])

            return direction
        })
    }
    static pawnTitles(board, x, y, color, currentPlayer) {
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

    static knightTitles(board, x, y) {
        return [[x + 1, y + 2], [x + 1, y - 2], [x - 1, y + 2], [x - 1, y - 2],
            [x + 2, y + 1], [x + 2, y - 1], [x - 2, y + 1], [x - 2, y - 1]].filter(cords => {
            const [x, y] = cords;
            return !((x < 0 || x > 7) || (y < 0 || y > 7));
        }).map(cords => board[cords[1]][cords[0]])
    }

    static moveFigures(currentFigure, figure, board)  {
        if (currentFigure.firstMove)  {
            currentFigure.firstMove = false;
        }

        if (figure.canCastleRight && currentFigure.name === 'king') {
            board[figure.y][figure.x - 1] = new Rook({
                x: figure.x - 1,
                y: figure.y,
                color: currentFigure.color,
                firstMove: false
            });
            board[figure.y][7] = new Title({x: 7, y: figure.y})
        }

        if (figure.canCastleLeft && currentFigure.name === 'king') {
            board[figure.y][figure.x + 1] = new Rook({
                x: figure.x + 1,
                y: figure.y,
                color: currentFigure.color,
                firstMove: false
            });
            board[figure.y][0] = new Title({x: 0, y: figure.y})
        }

        board[figure.y][figure.x] = board[currentFigure.y][currentFigure.x];
        board[currentFigure.y][currentFigure.x] = new Title({x: currentFigure.x, y: currentFigure.y});

        currentFigure.y = figure.y;
        currentFigure.x = figure.x;
    }

    static checkTitles(titles, color, board, checkForAttack, isKingUnderCheck, isPawn, isRender) {
        titles.forEach(direction => {
            if (!direction) return false
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

                        return false
                    } else {
                        title.underFriendlyAttack = true;
                        return false
                    }
                }

                else if (title.canDefend && isKingUnderCheck)
                    this.setProperty(title, 'canMove', 'canBeMoved', isRender)

                else if (!isKingUnderCheck && !checkForAttack)
                    this.setProperty(title, 'canMove', 'canBeMoved', isRender)

                return true
            })
        })
    }
}

export default Figure