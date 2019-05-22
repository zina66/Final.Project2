var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("The port is runing");
});

//kapel em classery
var Grass = require("./Modules/class.grass.js");
var GrassEater = require("./Modules/class.grasseater.js");
var Predator = require("./Modules/class.gishatich.js");
var river = require("./Modules/class-river.js");
var lightning = require("./Modules/class-lightning.js");

//haytararum em zangvacnery
grassArr = [];
grasseaterArr = [];
predatorArr = [];
lightningArr = [];
rivArr = [];

//popoxakan exanaki hamar
Weather = "summer";

Wheaterinit = 1;
grassinit = 0;
grasseaterinit = 0;
gishatichinit = 0;
//matrix generacnox function
var w = 50;
var h = 60;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];

        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 75);
            if (r < 20) r = 0;
            else if (r < 30) r = 1;
            else if (r < 55) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

//zangvacic patahakan tiv
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
//kanchum en genMatrix functiony ev talis en matrix popoxakanin
matrix = genMatrix(w, h);

//stex pttvum en matrix-i mejov u stexcum en objectnery
for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
        }
        else if (matrix[y][x] == 3) {
            var pred = new Predator(x, y, 4);
            predatorArr.push(pred);
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
//stexcum en function vor kkanchi objecteri methodnery ev kuxark matrixi masin datan script.js
function drawserver() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].mul();
        grasseaterArr[i].eat();
        grasseaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].mul();
        predatorArr[i].eat();
        predatorArr[i].die();

    }
    for (var i in lightningArr) {
        lightningArr[i].eat();
    }
    for (var i in rivArr) {
        rivArr[i].eat();
    }
    //matrixy uxarkum en clientin
    io.sockets.emit("matrix", matrix);
}
//exanaki hamar
function draw_wheater() {
    Weatherinit++;
    if (Weatherinit == 5) {
        Weatherinit = 1;
    }
    if (Weatherinit == 4) {
        Weather = "winter";
    }
    if (Weatherinit == 3) {
        Weather = "autumn";
    }
    if (Weatherinit == 2) {
        Weather = "spring";
    }
    if (Weatherinit == 1) {
        Weather = "summer";
    }
    //exanaky uxarkum em clientin
    io.sockets.emit("exanak", Weather);

}
//connectiona stexcum scriptic ekac infoi himan vra script.js i het mousePressed i jamanak
io.on('connection', function (socket) {
    socket.on("Sxmvec", function (arr) {
        var x = arr[0];
        var y = arr[1];

        var directions = [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];

        if (matrix[y][x] == 1) {
            for (var i in grassArr) {
                if (y == grassArr[i].y && x == grassArr) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        if (matrix[y][x] == 2) {
            for (var i in grasseaterArr) {
                if (y == grasseaterArr[i].y && x == grasseaterArr) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
        }
        if (matrix[y][x] == 3) {
            for (var i in predatorArr) {
                if (y == predatorArr[i].y && x == predatorArr) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        matrix[y][x] = 0;

        for (var i in directions) {
            var harevanx = directions[i][0];
            var harevany = directions[i][1];
            if (harevanx >= 0 && harevanx < matrix[0].length && harevany >= 0 && harevany < matrix[0].length) {
                for (var i in grassArr) {
                    if (harevany == grassArr[i].y && harevanx == grassArr[i]) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[harevany][harevanx] == 2){
                for (var i in grasseaterArr) {
                    if (harevany == grasseaterArr[i].y && harevanx == grasseaterArr[i]) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[harevany][harevanx] == 3){
                for (var i in predatorArr) {
                    if (harevany == predatorArr[i].y && harevanx == predatorArr[i]) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[harevany][harevanx] = 0;
        }
        io.sockets.emit("matrix",matrix);
    });

    socket.on("armageton", function(){
        for(var y = 0; y< matrix.length; y++){
            for (x = 0;x<matrix[y].length[y];x++){
                matrix[y][x] = 6;
            }
        }
        grassArr.length = 0;
        grasseaterArr.length = 0;
        predatorArr.length = 0;
        io.sockets.emit("matrix",matrix);
    })
});

//statika
var obj = {"info"}
setInterval(drawserver, 3000);
setInterval(draw_wheater, 3000);
