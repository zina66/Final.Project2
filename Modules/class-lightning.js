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
         var emptyCells = this.chooseCell(0);
        var index = Math.floor(Math.random() * emptyCells.length);
        var newCell = emptyCells[index];
        if (newCell) {
            this.die();
        }
        lightningcount++;
    }
    eat() {
        this.getNewCoordinates();
        this.multiply++;
        var emptyCells = this.chooseCell(1);
        var index = Math.floor(Math.random() * emptyCells.length);
        var newCell = emptyCells[index];
        if (newCell) {
            if (this.multiply >= 4) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 4;
                this.y = newY;
                this.x = newX;
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
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