function rand(n, e) {
	// Variable 
	var i,
		rand = 0;
	// function for random number
	function randInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	// return float number
	if (arguments.length == 0) {
		rand = Math.random();
	}
	// if arguments length = 1 then random number 0 to n number
	if (arguments.length == 1) {
		rand = randInt(0, n);
	}
	// else if arguments length = 2 then random number n to e
	else if (arguments.length == 2) {
		rand = randInt(n, e);
	}
	// else arguments length 3 <= number  then so choose random value from argument
	else {
		for (i = 0; i < arguments.length; i++) {
			rand = arguments[randInt(0, i)];
		}
	}
	// return random number
	return rand;
}



var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("The port is runing");
});

//kapel em classery
Grass = require("./Modules/class.grass.js");
GrassEater = require("./Modules/class.grasseater.js");
Predator = require("./Modules/class.gishatich.js");
river = require("./Modules/class-river.js");
lightning = require("./Modules/class-lightning.js");

//haytararum em zangvacnery
var ashxari_verj = true;
grassArr = [];

grasseaterArr = [];
predatorArr = [];
lightningArr = [];
rivArr = [];

//popoxakan exanaki hamar
Weather = "summer";

Weatherinit = 1;
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
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r < 55) r = 2;
            else if (r < 60) r = 3;
            else if (r < 70) r = 4;
            // else if (r < 100) r = 5;
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



for (var y = 0; y < w; y++) {
    for (var x = 0; x < h; x++) {
        if (x + y >= (x * y) / 2) {
            matrix[y][x] = 5;
        }
    }
}




// matrix[0][Math.floor(rand(matrix.length))] = 5;

// matrix[Math.floor(rand(matrix.length))][0] = 5;

// matrix[Math.floor(rand(matrix.length))][matrix.length - 1] = 5;
	
// matrix[matrix.length - 1][Math.floor(rand(matrix.length))] = 5;








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
            var pred = new Predator(x, y, 3);
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
// //stexcum en function vor kkanchi objecteri methodnery ev kuxark matrixi masin datan script.js
function drawserver() {
    if (ashxari_verj == true) {


        for (var i in grassArr) {
            grassArr[i].mul();
            grassinit++;
        }
        for (var i in grasseaterArr) {
            grasseaterArr[i].move();
            grasseaterinit++;

        }
        for (var i in predatorArr) {
            predatorArr[i].move();
            gishatichinit++;
        }
        for (var i in lightningArr) {
            lightningArr[i].eat();
        }
        for (var i in rivArr) {
            rivArr[i].mul();
        }
        //matrixy uxarkum en clientin
        io.sockets.emit("matrix", matrix);
    }
}

//exanaki hamar
function draw_Wheater() {
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
        // if(x >= 0 && x < matrix.length && y >= 0 && y < matrix.length){
        if (matrix[y][x] == 1) {
            for (var i in grassArr) {
                if (y == grassArr[i].y && x == grassArr) {
                    grassArr.splice(i, 1);
                    // break;
                }
            }
        }
        else if (matrix[y][x] == 2) {
            for (var i in grasseaterArr) {
                if (y == grasseaterArr[i].y && x == grasseaterArr) {
                    grasseaterArr.splice(i, 1);
                    // break;
                }
            }
        }
        else if (matrix[y][x] == 3) {
            for (var i in predatorArr) {
                if (y == predatorArr[i].y && x == predatorArr) {
                    predatorArr.splice(i, 1);
                    // break;
                }
            }
        }
        else if (matrix[y][x] == 4) {
            for (var i in lightningArr) {
                if (y == lightningArr[i].y && x == lightningArr) {
                    lightningArr.splice(i, 1);
                    // break;
                }
            }
        }
        else if (matrix[y][x] == 5) {
            for (var i in rivArr) {
                if (y == rivArr[i].y && x == rivArr) {
                    rivArr.splice(i, 1);
                    // break;
                }
            }
        }

        // }
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
            else if (matrix[harevany][harevanx] == 2) {
                for (var i in grasseaterArr) {
                    if (harevany == grasseaterArr[i].y && harevanx == grasseaterArr[i]) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[harevany][harevanx] == 3) {
                for (var i in predatorArr) {
                    if (harevany == predatorArr[i].y && harevanx == predatorArr[i]) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[harevany][harevanx] == 4) {
                for (var i in lightningArr) {
                    if (harevany == lightningArr[i].y && harevanx == lightningArr[i]) {
                        lightningArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[harevany][harevanx] == 5) {
                for (var i in rivArr) {
                    if (harevany == rivArr[i].y && harevanx == rivArr[i]) {
                        rivArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[harevany][harevanx] = 0;
        }
        io.sockets.emit("matrix", matrix);
    });

    socket.on("armageton", function () {
        for (var y = 0; y < matrix.length; y++) {
            for (x = 0; x < matrix[y].length[y]; x++) {
                matrix[y][x] = 6;
            }
        }
        grassArr.length = 0;
        grasseaterArr.length = 0;
        predatorArr.length = 0;
        io.sockets.emit("matrix", matrix);
    })
});

// //statika
var obj = { "info": [] };

function main() {
    var file = "statics.json";
    obj.info.push({ "cnvac xoteri qanaky": grassinit, "cnvac xotakerneri qanaky": grasseaterinit, "cnvac gishaticheri qanaky": gishatichinit });
    fs.writeFileSync(file, JSON.stringify(obj, null, 3));
}


io.on('connection', function (socket) {
    socket.on("boom", function (event) {
        if (event == 32) {
            ashxari_verj = false;
        }
    });
});


setInterval(drawserver, 3000);
setInterval(draw_Wheater, 3000);
setInterval(main, 3000); 
