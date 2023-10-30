import Figure from './figure.js'
class Knight {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.src = './assets/' + color + 'Knight.svg';
        this.name = 'knight'
    }

    checkMoves(board, checkForAttack, isKingChecked, isRender) {
        const color = this.color
        if (this.kingDefender) return

        Figure.knightTitles(board, this.x, this.y).forEach(title => {
            if (title.name || checkForAttack) {

                if (!title.name && !isKingChecked) {
                    if (isRender)
                        title.underAttack = true
                    title.canBeAttacked = true;
                }

                else if (title.color !== color) {

                    if (title.isAttackingKing && isKingChecked) {
                        if (isRender)
                            title.underAttack = true;
                        title.canBeAttacked = true;
                    }

                    else if (!isKingChecked && !checkForAttack) {
                        if (isRender)
                            title.underAttack = true;
                        title.canBeAttacked = true;
                    }

                } else {
                    title.underFriendlyAttack = true;
                }
            }

            else if (title.canDefend && isKingChecked) {
                if (isRender)
                    title.canMove = true;
                else title.canBeMoved = true;
            }

            else if (!isKingChecked && !checkForAttack) {
                if (isRender)
                    title.canMove = true;
                title.canBeMoved = true;
            }
        })
    }
}

export default Knight