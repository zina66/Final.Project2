var LivingCreature = require("./LivingCreature.js");

module.exports = class Gishatich extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
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
    eat() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            this.y = newY;
            this.x = newX;
            this.energy++;

            for (var i in greaterArr) {
                if (newX == greaterArr[i].x && newY == greaterArr[i].y) {
                    greaterArr.splice(i, 2);
                    break;
                }
            }
            if (this.energy >= 15) {
                this.mul();
            }
        }

        else {
            this.move();
        }
    }
    mul() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            this.y = newY;
            this.x = newX;
            var newGishatich = new Gishatich(newX, newY, this.index);
            GishatichArr.push(newGishatich);
            this.energy = 3;
        }
    }
    die() {
        for (var i in greaterArr) {
            if (newX == greaterArr[i].x && newY == greaterArr[i].y) {
                greaterArr.splice(i, 3);
                break;
            }
        }
        

    }
    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            this.y = newY;
            this.x = newX;


            if (this.energy <= 0) {
                this.die();
            }
        }
    }
} 