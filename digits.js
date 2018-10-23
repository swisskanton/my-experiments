const readlineSync = require('readline-sync')
let digPow = (n, p) => {
    let summ = 0, num;
    
    for (let i=0; i < n.toString().length; i++) {
        num = parseInt(n.toString()[i]);
        summ += Math.pow(num, p);
        p++;
        console.log(summ);
    }
    console.log('A számított hattvány: ', summ);

    if ( summ % n == 0 ){
        return summ / n;
    } else {
        return -1;
    }
}
let twoDigits = [];
twoDigits[0] = readlineSync.question('Kérem az első számot: ');
twoDigits[1] = readlineSync.question('Kérem az második számot: ');
answer = digPow(twoDigits[0], twoDigits[1]);
console.log('A válasz: ', answer);