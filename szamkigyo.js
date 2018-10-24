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
        };
        userTable.push(line);
        //controlTable.push(line);
    };
    return userTable;
};

const setControlTable = (controlTable, diff, level) => {
    let x, y, i = 0;
    while (i < level) {
        x = random.int(0, diff - 1);
        y = random.int(0, diff - 1);
        if (controlTable[x][y] == ' ') {
            i++;
            controlTable[x][y] = i;
        };
    };
    //getTable(controlTable);
};

const getTable = (matrix) => {
    output = table.table(matrix);
    clear(true);
    console.log(output);
};

const viewControlTable = (matrix) => {
    getTable(matrix);
    let go = readlineSync.question('Do you want to start this level? [y/n]: ');
    if (go == ('y' || 'Y')) {
        console.log('igaz');
        return true;
    } else {
        console.log('hamis');
        return false;
    };
};

const getMove = (matrix, diff, level, winner) => {
    let posX = 0, posY = 0;
    let ki = 0, step = 0;
    diff--;
    matrix[posX][posY] = '×', backInfo = ' ';
    let guess = [];
    for (let i = 1; i <= level; i++) {
        guess.push(i);
    };
    do {
        getTable(matrix);
        keypress(process.stdin);
        process.stdin.setRawMode(false);
        process.stdin.resume();
        process.stdin.on('keypress', function (ch, key) {
            if (key && key.ctrl && key.name == 'c') {
                process.stdin.pause();
            };
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
                    };

                    if (guess.length == 0) {
                        //process.stdin.setRawMode(false);
                        if (isCorrect(matrix, winner)) {
                            process.stdin.setRawMode(false);
                            return true;
                        } else {
                            return false;
                        };
                    };

                    break;
                default:
                    console.log('wrong character');
                    break;
            };
        });

    } while (ki == 1);
    process.stdin.resume();
};
const isCorrect = (matrix, winner) => {
    for (var i = matrix.length; i--;) {
        if (matrix[i] !== winner[i]) {
            return false;
        };
    };
    return true;
};

const beginning = () => {
    let difficulty = 7;
    let level = 3;
    let options = ['beginner', 'advanced', 'master'];
    difficulty = readlineSync.keyInSelect(options, "Please, select the difficulty level?");
    switch (difficulty) {
        case 0:
            difficulty = 3;
            break;
        case 1:
            difficulty = 5;
            break;
        case 2:
            difficulty = 7;
            break;
        case -1:
            console.log('Thank you for visiting.');
    };
    if (difficulty != -1) {
        level = readlineSync.question("With how many numbers woud you like to start? [3-12]: ");
    };
};

beginning;
let playtime = true;
while (playtime) {
    let gameTable = makeTable(difficulty, level);
    let winnTable = makeTable(difficulty, level);
    setControlTable(winnTable, difficulty, level);
    let toPlay = viewControlTable(winnTable);
    console.log('toPlay: ', toPlay);
    if (toPlay == true) {
        if (getMove(gameTable, difficulty, level, winnTable)) {
            console.log('Congratulation! You win!');
            if (readlineSync.keyInYN('Woud you like to play on the next level?')) {
                level++;
            } else {
                playtime = false;
                console.log('Thank you for a game.');
            };
        } else {
            console.log("Sorry, you lost.");
        };
    } else {
        console.log('Thank you for watching.');
    };
};