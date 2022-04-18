let lista = [5, 2, 3, 7, 1, 4, 9];
let legkisebb = lista[0];
lista.forEach(element => {
    if(element < legkisebb) {
        legkisebb = element;
    }
});
alert("A legkisebb szam: ", legkisebb);