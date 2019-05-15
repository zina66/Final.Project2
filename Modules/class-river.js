var LivingCreature = require("./LivingCreature.js");

module.exports = class river extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
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
    eat() {
        this.multiply++;
        if (this.multiply >= 3) {
            if (this.x + this.y == 54) {
                matrix[this.y - 1][this.x] = 5;
                matrix[this.y][this.x - 1] = 5;
                var newriver = new river(this.x, this.y - 1, this.index);
                rivArr.push(newriver);
                var newriver = new river(this.x - 1, this.y, this.index);
                rivArr.push(newriver);
                for (var i in GrassEaterArr) {
                    if (matrix[this.y][this.x - 1] == GrassEaterArr[i].x && matrix[this.y - 1][this.x] == GrassEaterArr[i].y) {
                        GrassEaterArr.splice(i, 1);
                        break;
                    }
                }

                for (var i in GrassEaterEaterArr) {
                    if (matrix[this.y][this.x - 1] == GrassEaterEaterArr[i].x && matrix[this.y - 1][this.x] == GrassEaterEaterArr[i].y) {
                        GrassEaterEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (this.x + this.y == 53) {
                matrix[this.y - 1][this.x] = 5;
                matrix[this.y][this.x - 1] = 5;
                var newriver = new river(this.x, this.y - 1, this.index);
                rivArr.push(newriver);
                var newriver = new river(this.x - 1, this.y, this.index);
                rivArr.push(newriver);
                for (var i in GrassEaterArr) {
                    if (matrix[this.y][this.x - 1] == GrassEaterArr[i].x && matrix[this.y - 1][this.x] == GrassEaterArr[i].y) {
                        GrassEaterArr.splice(i, 1);
                        break;
                    }
                }

                for (var i in GrassEaterEaterArr) {
                    if (matrix[this.y][this.x - 1] == GrassEaterEaterArr[i].x && matrix[this.y - 1][this.x] == GrassEaterEaterArr[i].y) {
                        GrassEaterEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (this.x + this.y == 52) {
                matrix[this.y - 1][this.x] = 5;
                matrix[this.y][this.x - 1] = 5;
                var newriver = new river(this.x, this.y - 1, this.index);
                rivArr.push(newriver);
                var newriver = new river(this.x - 1, this.y, this.index);
                rivArr.push(newriver);
                for (var i in GrassEaterArr) {
                    if (matrix[this.y][this.x - 1] == GrassEaterArr[i].x && matrix[this.y - 1][this.x] == GrassEaterArr[i].y) {
                        GrassEaterArr.splice(i, 1);
                        break;
                    }
                }

                for (var i in GrassEaterEaterArr) {
                    if (matrix[this.y][this.x - 1] == GrassEaterEaterArr[i].x && matrix[this.y - 1][this.x] == GrassEaterEaterArr[i].y) {
                        GrassEaterEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

}
