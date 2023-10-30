import Rook from './rook.js';
import Pawn from './pawn.js';
import Queen from './queen.js';
import Knight from './knight.js';
import King from './king.js';
import Bishop from './bishop.js';
import Title from './title.js';


class Figure {
    static addFigures(x, y) {
        if (y === 1)
            return new Pawn(x, y, 'black')

        if (y === 6)
            return new Pawn(x, y, 'white')

        if ((x === 2 && y === 0) || (x === 5 && y === 0))
            return new Bishop(x, y, 'black')

        if ((x === 2 && y === 7) || (x === 5 && y === 7))
            return new Bishop(x, y, 'white')

        if ((x === 0 && y === 0) || (x === 7 && y === 0))
            return new Rook(x, y, 'black')

        if ((x === 7 && y === 7) || (x === 0 && y === 7))
            return new Rook(x, y, 'white')

        if ((x === 1 && y === 0) || (x === 6 && y === 0))
            return new Knight(x, y, 'black')

        if ((x === 1 && y === 7) || (x === 6 && y === 7))
            return new Knight(x, y, 'white')

        if ((x === 3 && y === 0))
            return new Queen(x, y, 'black')

        if (x === 3 && y === 7)
            return new Queen(x, y, 'white')

        if (x === 4 && y === 0)
            return new King(x, y, 'black')

        if (x === 4 && y === 7)
            return new King(x, y, 'white')


        return new Title(x, y)
    }

    static horizontalAndVerticalTitles (board, x, y) {

        let directions = [[], [], [], []];

        if (board[y][x].isDiagonal) return [[]]


        if (board[y][x].kingDefender) {
            if (board[y][x].kingDirection === 0 || board[y][x].kingDirection === 2)
                directions = [[], , [],]

            if (board[y][x].kingDirection === 1 || board[y][x].kingDirection === 3)
                directions = [, [], , []]
        }


        return directions.map((direction, index) => {
            if (index === 0)
                for (let i = x - 1; i >= 0; i--)
                    direction.push(board[y][i])

            else if (index === 1)
                for (let i = y - 1; i >= 0; i--)
                    direction.push(board[i][x])

            else if (index === 2)
                for (let i = x + 1; i <= 7; i++)
                    direction.push(board[y][i])

            else
                for (let i = y + 1; i <= 7; i++)
                    direction.push(board[i][x])

            return direction
        })
    }
    static diagonalTitles(board, x, y) {

        let directions = [[], [], [], []];

        if (board[y][x].isVertical) return [[]]

        if (board[y][x].kingDefender) {
            if (board[y][x].kingDirection === 0 || board[y][x].kingDirection === 2)
                directions = [[], , [],  ]

            if (board[y][x].kingDirection === 1 || board[y][x].kingDirection === 3)
                directions = [  ,[], , []]
        }

        return directions.map((direction, index) => {
            if (index === 0)
                for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--)
                    direction.push(board[j][i])

            else if (index === 1)
                for (let i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++)
                    direction.push(board[j][i])


            else if (index === 2)
                for (let i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++)
                    direction.push(board[j][i])

            else
                for (let i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--)
                    direction.push(board[j][i])

            return direction
        })
    }
    static pawnTitles(board, x, y, color) {
        if (color === 'white')
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
        if (currentFigure.name === 'pawn') currentFigure.firstMove = false;

        board[figure.y][figure.x] = board[currentFigure.y][currentFigure.x];
        board[currentFigure.y][currentFigure.x] = new Title(currentFigure.x, currentFigure.y);

        currentFigure.y = figure.y;
        currentFigure.x = figure.x;
    }

    static checkTitles(titles, color, board, checkForAttack, isKingUnderCheck, isPawn, isRender) {
        titles.forEach(direction => {
            direction.every(title => {
                if (title.name || checkForAttack) {
                    if (isPawn) return false

                    if (!title.name && !isKingUnderCheck) {
                        if (isRender)
                            title.underAttack = true
                        title.canBeAttacked = true;
                    }

                    else if (title.color !== color) {

                        if (title.isAttackingKing && isKingUnderCheck) {
                            if (isRender)
                                title.underAttack = true;
                            title.canBeAttacked = true;
                        }

                        else if (!isKingUnderCheck) {
                            if (isRender)
                                title.underAttack = true;
                            title.canBeAttacked = true;
                        }

                        return false
                    } else {
                        title.underFriendlyAttack = true;
                        return false
                    }
                }

                else if (title.canDefend && isKingUnderCheck) {
                    if (isRender)
                        title.canMove = true;
                    else title.canBeMoved = true;
                }

                else if (!isKingUnderCheck && !checkForAttack) {
                    if (isRender)
                        title.canMove = true;
                    title.canBeMoved = true;
                }
                return true
            })
        })
    }
}

export default Figure