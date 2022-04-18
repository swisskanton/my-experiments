lista = [5, 2, 7, 3, 1, 4, 9]
legnagyobb = lista[0]
for elem in lista:
    if elem > legnagyobb:
        legnagyobb = elem
print('A legnagyobb szám:', legnagyobb)
