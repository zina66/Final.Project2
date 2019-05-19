var xqanak = 40;
var yqanak = 40;
var matrix = [];
var side = 20;
var socket = io();
function setup() {
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}

// var gr = new Grass(1, 2);
// var emptyCells = gr.chooseCell(0);

// var greater = new GrassEater(1, 2, 2);
// var emptyCells = greater.chooseCell(1);

// var gish = new Gishatich(1, 2, 3);
// var emptyCells = gish.chooseCell(2);

// var light = new lightning(1, 2, 4);
// var emptyCells = light.chooseCell(3);

// var riv = new river(1, 2, 3);
// var emptyCells = riv.chooseCell(5);


//nuyn draw functiony uxaki serveric ekac matrixi hashvin 
function drawMatrix(matrix) {
    background('grey');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("grey");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
        }
    }

}
//yndunum e matrixy u kanchum drawMatrix functiony
socket.on("matrix", drawMatrix);

function mousePressed() {
            var x = Math.floor(mouseX / side);
            var y = Math.floor(mouseY / side);
            arr = [x, y];
            console.log(arr);
            socket.emit("Sxmvec", arr)

         }

