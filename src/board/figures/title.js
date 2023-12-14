
class Title {
    constructor({x, y, enPassant}) {
        this.x = x;
        this.y = y;
        this.underAttack = false;
        this.canBeMoved = false;
        this.canMove = false;
        this.enPassant = enPassant;
    }
}

export default Title