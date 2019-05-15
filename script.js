var xqanak = 40;
var yqanak = 40;
var matrix = [];
var side = 20;
var socket = io();
function setup() {
    
  

    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

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
}

function drawMatrix(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }
    socket.on("matrix", drawMatrix);
}

