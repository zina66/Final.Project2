var side = 20;
var socket = io();

//popoxakan exanaki hamr
var weatherclient = "Summer";
//serveri exanaky talisa clientin
socket.on("exanak", function (w) {
    weatherclient = w;
});
function setup() {
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}
//function exanak stanalu hamar
function draw_wheater(w) {
    var p = document.getElementById('seasons');
    var weather = w;
    console.log(weather);

    if (weather == "summer") {
        p.innerText = "Summer"
    }
    else if (weather == "winter") {
        p.innerText = "Winter"
    }
    else if (weather == "autumn") {
        p.innerText = "Autumn"
    }
    else if (weather == "spring") {
        p.innerText = "Spring"
    }
}
//nuyn draw functiony uxaki serveric ekac matrixi hashvin 
function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                if(weatherclient == 'Summer'){
                    fill("pink");
                }
                else if(weatherclient == 'Spring'){
                    fill("#8bc34a");
                }
                else if(weatherclient == 'Winter'){
                    fill("#1266a9");
                }
                else if(weatherclient == 'autumn'){
                    fill("#cca328");
                }
            }
            else if(matrix[y][x] == 1){
                fill("green");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }

            else if (matrix[y][x] == 2) {
                    fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("black");
            }
            else if (matrix[y][x] == 4) {
                fill("red");
            }
            rect(x * side, y * side, side, side);

        }
    }

}
//yndunum e matrixy u kanchum drawMatrix functiony
socket.on("matrix", drawMatrix);
socket.on("exanak", draw_wheater);

function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x, y];

    console.log(arr);
    socket.emit("Sxmvec", arr);
}

function FireButton() {
    socket.emit("armageton");
}


document.addEventListener('keydown', event);

function event(e) {
    socket.emit("boom", e.keyCode);
    console.log(e.keyCode);
    if(e.keyCode == 32){
        $('.boom').fadeIn();
    }
}