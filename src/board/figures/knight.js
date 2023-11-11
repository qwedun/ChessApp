import Figure from './figure.js'
class Knight {
    constructor({x, y, color}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = './assets/' + color + 'Knight.svg';
        this.name = 'knight'
    }

    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const color = this.color

        if (this.kingDefender && !checkForAttack) return

        Figure.knightTitles(board, this.x, this.y).forEach(title => {
            if (title.name || checkForAttack) {

                if (!title.name && !isKingChecked)
                    Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                else if (title.color !== color) {

                    if (title.isAttackingKing && isKingChecked)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                    else if (!isKingChecked && !checkForAttack)
                        Figure.setProperty(title, 'underAttack', 'canBeAttacked', isRender)

                } else {
                    title.underFriendlyAttack = true;
                }
            }

            else if (title.canDefend && isKingChecked)
                Figure.setProperty(title, 'canMove', 'canBeMoved', isRender)

            else if (!isKingChecked && !checkForAttack) {
                Figure.setProperty(title, 'canMove', 'canBeMoved', isRender)
            }
        })
    }
}

export default Knight