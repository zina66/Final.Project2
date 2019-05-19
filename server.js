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
var Gishatich = require("./Modules/class.gishatich.js");
var river = require("./Modules/class-river.js");
var lightning = require("./Modules/class-lightning.js");
var LivingCreature = require("./Modules/class-lightning.js");

//haytararum em zangvacnery
var grassArr = [];
var greaterArr = [];
var GishatichArr = [];
var lightningArr = [];
var rivArr = [];

var w = 50;
var h = 60;

//matrix generacnox function
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

//stex pptvum en matrix-i mejov u stexcum en objectnery
// for (var y = 0; y < yqanak; y++) {
//     matrix[y] = [x];
//     for (var x = 0; x < xqanak; x++) {
//         if (x + y < 54) {
//             matrix[y][x] = Math.floor(Math.random() * 75);
//         }
//         else {
//             matrix[y][x] = 5;

//         }
//     }
// }
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
//stexcum en function vor kkanchi objecteri methodnery ev kuxark matrixi masin datan script.js
function drawserver() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in greaterArr) {
        greaterArr[i].move();
        greaterArr[i].mul();
        greaterArr[i].eat();
        greaterArr[i].die();
    }
    for (var i in GishatichArr) {
        GishatichArr[i].move();
        GishatichArr[i].mul();
        GishatichArr[i].eat();
        GishatichArr[i].die();
    }
    for (var i in lightningArr) {
        lightningArr[i].move();
        lightningArr[i].mul();
        lightningArr[i].eat();
        lightningArr[i].die();
    }
    for (var i in rivArr) {
        rivArr[i].move();
    rivArr[i].mul();
        rivArr[i].eat();
        rivArr[i].die();
    }
    //matrixy uxarkum en clientin
    io.sockets.emit("matrix", matrix);
}
//connectiona stexcum scriptic ekac infoi himan vra script.js i het mousePressed i jamanak
io.on('connection', function (socket) {
    socket.on("Sxmvec", function (arr) {
        //stexi code y chem grel esel duq greq))
        //sranic avel chem hushelu
        //ba
    });
});

setInterval(drawserver, 3000);
