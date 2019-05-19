var LivingCreature = require("./LivingCreature.js");

module.exports = class lightning extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 2;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        this.getNewCoordinates();
        var newCell = Random(this.chooseCell(0) * 5);
        if (newCell) {
            this.energy--;
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }
    eat() {
        this.getNewCoordinates();
        var newCell = Random(this.chooseCell(1) * 5);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;
            this.y = newY;
            this.x = newX;
            this.energy++;
        }
        else {
            this.move();
        }
    }
    die() {
        for (var i in lightningArr) {
            if (this.x == lightningArr[i].x && this.y == lightningArr[i].y) {
                matrix[this.y][this.x] = 0;
                lightningArr.splice(i, 1);
                break;
            }
        }

    }
}