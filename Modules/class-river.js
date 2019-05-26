module.exports = class river {
	constructor(x, y, index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.multiply = 0;
	}
	newDirections() {
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


	chooseCell() {
		this.newDirections()
        var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];

			if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == 0) {
					found.push(this.directions[i]);

				} else if (matrix[y][x] == 1) {
					found.push(this.directions[i]);
					for (var b in grassArr) {
						if (this.x == grassArr[b].x && this.y == grassArr[b].y) {
							grassArr.splice(b, 1);
							// break;
						}
					}
				} else if (matrix[y][x] == 2) {
					found.push(this.directions[i]);
					for (var b in grasseaterArr) {
						if (this.x == grasseaterArr[b].x && this.y == grasseaterArr[b].y) {
							grasseaterArr.splice(b, 1);
							// console.log('gfhbgdjkgndfkgjdfngkjdfgnkdfnkjfngdj');
							// break;
						}
					}
				} else if (matrix[y][x] == 3) {
					found.push(this.directions[i]);
					for (var b in predatorArr) {
						if (this.x == predatorArr[b].x && this.y == predatorArr[b].y) {
							predatorArr.splice(b, 1);
							// break;
						}
					}
				} else if (matrix[y][x] == 4) {

					found.push(this.directions[i]);
					for (var b in lightningArr) {

						if (this.x == lightningArr[b].x) {
							lightningArr.splice(b, 1);
							// break;
						}
					}
				}
			}



		}
		return found;
	}



	mul() {

		this.multiply++;
		var emptyCells = this.chooseCell();
		var newCell = Random(emptyCells);
		if (newCell && this.multiply >= 10) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = this.index;
			var newRiver = new river(newX, newY, this.index);
			rivArr.push(newRiver);
			this.multiply = 0;
		}
	}
}