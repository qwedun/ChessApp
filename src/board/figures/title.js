
class Title {
    constructor({x, y, enPassant, secondMove}) {
        this.x = x;
        this.y = y;
        this.underAttack = false;
        this.canMove = false;
        this.enPassant = enPassant;
        this.secondMove = secondMove;
    }
}

export default Title