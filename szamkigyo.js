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
    clear(true);
    console.log(output);
}

const getMove = (matrix, diff, level, winner) => {
    let posX = 0, posY = 0;
    let ki = 0, step = 0;
    diff --;
        matrix[posX][posY] = '×', backInfo = ' ';
    let guess = [];
    for (let i=1; i <= level; i++) {
        guess.push(i);
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
                        [backInfo, matrix[posX][posY]] = [matrix[posX][posY], backInfo];
                        posX--;
                        getTable(matrix);
                    };
                    break;
                case 'down':
                    if (posX != diff) {
                        [matrix[posX][posY], matrix[posX + 1][posY]] = [matrix[posX + 1][posY], matrix[posX][posY]];
                        [backInfo, matrix[posX][posY]] = [matrix[posX][posY], backInfo];
                        posX++;
                        getTable(matrix);
                    };
                    break;
                case 'right':
                    if (posY != diff) {
                        [matrix[posX][posY], matrix[posX][posY + 1]] = [matrix[posX][posY + 1], matrix[posX][posY]];
                        [backInfo, matrix[posX][posY]] = [matrix[posX][posY], backInfo];
                        posY++;
                        getTable(matrix);
                    };
                    break;
                case 'left':
                    if (posY != 0) {
                        [matrix[posX][posY], matrix[posX][posY - 1]] = [matrix[posX][posY - 1], matrix[posX][posY]];
                        [backInfo, matrix[posX][posY]] = [matrix[posX][posY], backInfo];
                        posY--;
                        getTable(matrix);
                    };
                    break;
                case 'space':
                    //backInfo = matrix[posX][posY];
                    if (backInfo == ' ') {
                        //backInfo = matrix[posX][posY];
                        backInfo = guess.shift();
                        console.log('i', backInfo, guess);
                    } else {
                        guess.unshift(backInfo);
                        guess.sort();
                        backInfo = ' ';
                        console.log('n', backInfo, guess);
                    }
                    
                    if (guess.length == 0) {
                        process.stdin.setRawMode(false);
                        return isEnd(matrix, winner);
                    }
                    
                    break;
                default:
                    console.log('téves karakter');
                    break;
            };
        });

    } while (ki == 1);
    process.stdin.resume();
}
const isEnd = (matrix, winner) => {
        for(var i = matrix.length; i--;) {
            if(matrix[i] !== winner[i]) {
                return 'Sajnálom, nem nyertél.';
            }
        }
    
        return 'Gratulálok nyertél!';
}
let difficulty = 5;
let level = 3;
difficulty = readlineSync.question("Milyen nehézségi szinten játszol (3, 5, 7)?");
level = readlineSync.question("Hány számmal szeretnél kezdeni (3-12)?");
let gameTable = makeTable(difficulty, level);
let winnTable = makeTable(difficulty, level);
setControlTable(winnTable, difficulty, level);
end = getMove(gameTable, difficulty, level, winnTable);
console.log(end);
//getTable(viewTable);
//getMove(gameTable);