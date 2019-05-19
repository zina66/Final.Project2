var side = 20;
var socket = io();

//popoxakan exanaki hamr
var weatherclient = "Summer";
//serveri exanaky talisa clientin
socket.on("exanak", function(w){
    weatherclient = w;
});
function setup() {
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}
//function exanak stanalu hamar
function drawwheater(w){
    var p = document.getElementById('season');
    var weather = w;
    console.log(weather);

    if(weather == "Summer"){
        p.innerText = "Summer"
    }
    else if(weather == "Winter"){
        p.innerText = "Winter"
    }
    else if(weather == "Autumn"){
        p.innerText = "Autumn"
    }
    else if(weather == "Spring"){
        p.innerText = "Spring"
    }
}
//nuyn draw functiony uxaki serveric ekac matrixi hashvin 
function drawMatrix(matrix) {
    background('grey');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 0) {
                fill("grey");
            }
            else if (matrix[y][x] == 1) {
                if(weatherclient == "Summer"){
                    fill("green");
                }
                else if(weatherclient != "Summer"){
                    fill("#A79F20");
                }
            }
            else if (matrix[y][x] == 2) {
                if(weatherclient == "Winter"){
                    fill("white");
                }
                else if(weatherclient != "Winter"){
                    fill("yellow");
                }
            }
            else if (matrix[y][x] == 3) {
                fill("black");
            }
            else if (matrix[y][x] == 4) {
                fill("red");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);

        }
    }

}
//yndunum e matrixy u kanchum drawMatrix functiony
socket.on("matrix", drawMatrix);

// function mousePressed() {
//             var x = Math.floor(mouseX / side);
//             var y = Math.floor(mouseY / side);
//             arr = [x, y];
//             console.log(arr);
//             socket.emit("Sxmvec", arr)

//          }

