const table = require('table');
const random = require('random');
const keypress = require('keypress');
const clear = require('console-clear');
const readlineSync = require('readline-sync');
const readline = require('readline');

const makeTable = (diff) => {
    let userTable = [], line;
    for (let i = 0; i < diff; i++) {
        line = [];
        for (let j = 0; j < diff; j++) {
            line.push(' ');
        };
        userTable.push(line);
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
};

const getTable = (matrix) => {
    output = table.table(matrix);
    //console.clear();
    console.log(output);
};

const viewControlTable = (matrix) => {
    getTable(matrix);
    return readlineSync.keyInYN('Do you want to start this level?');
};

const isCorrect = (matrix, winner) => {
    for (let i = matrix.length; i--;) {
        if (matrix[i] != winner[i]) {
            return false;
        };
    };
    return true;
};

const getMove = (matrix, diff, level, winner) => {
    let posX = 0, posY = 0;
    let ki = 0;
    matrix[posX][posY] = '×', backInfo = ' ';
    let guess = [];
    for (let i = 1; i <= level; i++) {
        guess.push(i);
    };
    do {
        getTable(matrix);
        switch (keyName) {
                case 'up':
                    if (posX != 0) {
                        [matrix[posX][posY], matrix[posX - 1][posY]] = [matrix[posX - 1][posY], matrix[posX][posY]];
                        [backInfo, matrix[posX][posY]] = [matrix[posX][posY], backInfo];
                        posX--;
                        getTable(matrix);
                    };
                    break;
                case 'down':
                    if (posX != diff-1) {
                        [matrix[posX][posY], matrix[posX + 1][posY]] = [matrix[posX + 1][posY], matrix[posX][posY]];
                        [backInfo, matrix[posX][posY]] = [matrix[posX][posY], backInfo];
                        posX++;
                        getTable(matrix);
                    };
                    break;
                case 'right':
                    if (posY != diff-1) {
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
                    if (backInfo == ' ') {
                        console.log('üres mezőre lép');
                        if (guess.length != 0) {
                            console.log('Tipplista nem üres.');
                            backInfo = guess.shift();
                            console.log('i', backInfo, 'tipp : ', guess);
                            if (guess.length == 0) {
                                console.log('Tipplista üres.');
                                if (isCorrect(matrix, winner)) {
                                    console.log('Congratulation! You win!');
                                    if (readlineSync.keyInYN('Woud you like to play on the next level?')) {
                                        level++;
                                        letPlay(diff, level);
                                    } else {
                                        console.log('Thank you for a game.');
                                        process.exit(1);
                                    };
                                } else {
                                    console.log("Sorry, you lost.");
                                    if (readlineSync.keyInYN('Woud you like to play again?')) {
                                        letPlay(diff, level);
                                    } else {
                                        console.log('Thank you for watching.');
                                        process.exit(1);
                                    };
                                };
                            };
                        };
                    } else {
                        guess.unshift(backInfo);
                        guess.sort();
                        backInfo = ' ';
                    };
                    break;
                default:
                    console.log('Wrong character!', keyName);
                    console.log('Please use the navigation bottoms or space. To exit press Escape.');
                    //process.exit(1);
                    break;
            };
    } while (ki == 1);
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
            process.exit(1);
    };
    if (difficulty != -1) {
        level = readlineSync.question("With how many numbers woud you like to start? [3-12]: ");
    };
    return [difficulty, level];
};

const letPlay = (difficulty, level) => {
    let playtime = true;
    while (playtime) {
        let gameTable = makeTable(difficulty);
        let winnTable = makeTable(difficulty);
        setControlTable(winnTable, difficulty, level);
        playtime = viewControlTable(winnTable);
        if (playtime) {
            getMove(gameTable, difficulty, level, winnTable);
        } else {
            console.log('Thank you for visiting.');
        };
    };
};

[difficulty, level] = beginning();
letPlay(difficulty, level);
let keyName;
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        keyName = key.name;
        console.log(typeof key.name, key.name);
        console.log(keyName);
    };
});
process.exit(1);