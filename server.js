var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("public"));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("The port is runing");
});

//kapel em classery
var Grass = require("./Modules/class.grass");
var GrassEater = require("./Modules/class.grasseater");
var Gishatich = require("./Modules/class.gishatich");
var river = require("./Modules/class-river");
var lightning = require("./Modules/class-lightning");
var LivingCreature = require("./Modules/class-lightning");

var xqanak = 40;
var yqanak = 40;
matrix = [];
var grassArr = [];
var greaterArr = [];
var GishatichArr = [];
var lightningArr = [];
var rivArr = [];

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];

        for (var y = 0; y < h; y++) {
            var r = Math.floor(Math.random() * 75);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r < 42) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}
genMatrix(w, h);

//zangvacic patahakan tiv
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
for (var y = 0; y < yqanak; y++) {
    matrix[y] = [x];
    for (var x = 0; x < xqanak; x++) {
        if (x + y < 54) {
            matrix[y][x] = Math.floor(Math.random() * 75);
        }
        else {
            matrix[y][x] = 5;

        }
    }
}
for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var greater = new GrassEater(x, y, 2);
            greaterArr.push(greater);
        }
        else if (matrix[y][x] == 3) {
            var gish = new Gishatich(x, y, 3);
            GishatichArr.push(gish);
        }
        else if (matrix[y][x] == 4) {
            var light = new lightning(x, y, 4);
            lightningArr.push(light);
        }
        else if (matrix[y][x] == 5) {
            var riv = new river(x, y, 5);
            rivArr.push(riv);
        }
    }
}
//kanchum em objectneri mthodnry

function drawserver() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in greaterArr) {
        greaterArr[i].move();
    }
    for (var i in GishatichArr) {
        GishatichArr[i].move();
    }
    for (var i in lightningArr) {
        lightningArr[i].move();
    }
    for (var i in rivArr) {
        rivArr[i].move();
    }
    //matrixy uxarkum em clientin
    io.sockets.emit("matrix", matrix);
}

setInterval(drawserver, 3000);
