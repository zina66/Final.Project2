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
function draw_wheater(w){
    var p = document.getElementById('seasons');
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
                if(Weather == "Summer"){
                    fill("green");
                }
                else{
                    fill("#A79F20");
                }
                console.log(matrix[y][x]);
            }
            else if (matrix[y][x] == 2) {
                if(Weather == "Winter"){
                    fill("white");
                }
                else if(Weatherinit != "Winter"){
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
socket.on("exanak",draw_wheater);

function mousePressed(){
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x,y];

    console.log(arr);
    socket.emit("Sxmvec", arr);
}
function FireButton(){
    socket.emit("armageton");
}


