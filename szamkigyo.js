const table = require('table');
const random = require('random');
const keypress = require('keypress');
const clear = require('console-clear');
const readlineSync = require('readline-sync');

const makeTable = (diff, level) => {
    //{userTable, controlTable}
    let userTable = [], line; //controlTable = [];
    for (let i = 0; i < diff; i++) {
        line = [];
        for (let j = 0; j < diff; j++) {
            line.push(' ');
        }
        userTable.push(line);
        //controlTable.push(line);
    }
    return userTable;
}

const setControlTable = (controlTable, diff, level) => {
    let x, y, i = 0;
    while (i < level) {
        x = random.int(0, diff - 1);
        y = random.int(0, diff - 1);
        if (controlTable[x][y] == ' ') {
            i++;
            controlTable[x][y] = i;
        }
    }
    //getTable(controlTable);
}

const getTable = (matrix) => {
    output = table.table(matrix);
    //clear(true);
    console.log(output);
}

const getMove = (matrix, diff, level) => {
    let posX = 0, posY = 0;
    let ki = 0, step = 0;
    diff --;
    matrix[posX][posY] = '×';
    gues = [];
    for (let i=1; i <= level; i++) {
        gues.push(i);
    }
    do {
        getTable(matrix);
        keypress(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('keypress', function (ch, key) {
            if (key && key.ctrl && key.name == 'c') {
                process.stdin.pause();
            }
            console.log(key.name);
            switch (key.name) {
                case 'up':
                    if (posX != 0) {
                        [matrix[posX][posY], matrix[posX - 1][posY]] = [matrix[posX - 1][posY], matrix[posX][posY]];
                        posX--;
                        getTable(matrix);
                    };
                    break;
                case 'down':
                    if (posX != diff) {
                        [matrix[posX][posY], matrix[posX + 1][posY]] = [matrix[posX + 1][posY], matrix[posX][posY]];
                        posX++;
                        getTable(matrix);
                    };
                    break;
                case 'right':
                    if (posY != diff) {
                        [matrix[posX][posY], matrix[posX][posY + 1]] = [matrix[posX][posY + 1], matrix[posX][posY]];
                        posY++;
                        getTable(matrix);
                    };
                    break;
                case 'left':
                    if (posY != 0) {
                        [matrix[posX][posY], matrix[posX][posY - 1]] = [matrix[posX][posY - 1], matrix[posX][posY]];
                        posY--;
                        getTable(matrix);
                    };
                    break;
                case 'space':
                //matrix[posX][posY] == readlineSync.questionInt('Kérek egy számot: ');
                    if (matrix[posX][posY] == ' ') {
                        if (step < level) {
                            gues.sort();
                            matrix[posX][posY] = gues.splice(0, 1);
                            step ++;
                        } else {
                            ki = 1;
                        }
                    } else {
                        if (step < level) {
                            gues.sort();
                            [matrix[posX][posY], gues[0]] = [gues[0], matrix[posX][posY]];
                        } else {
                            ki = 1;
                        }
                    };
                    break;
                default:
                    console.log('téves karakter');
                    break;
            };
        });

    } while (ki == 1);
    process.stdin.resume();
}
let difficulty = 7;
let level = 3;
let gameTable = makeTable(difficulty, level);
let winnTable = makeTable(difficulty, level);
setControlTable(winnTable, difficulty, level);
getMove(gameTable, difficulty, level);
//getTable(viewTable);
//getMove(gameTable);