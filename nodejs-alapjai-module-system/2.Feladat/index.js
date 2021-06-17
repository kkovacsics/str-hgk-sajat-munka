/*
Hozz létre egy index.js fájlt, az `utils.js` fájlból importálj mindent `utils` névvel! (Ne használj object destructuring-et!)     
Hívd meg a `generateUserList` és a `getUserNames` függvényeket a megfelelő paramétereket megadva nekik, és a konzolra írasd ki a visszatérési értéküket!  
Ellenőrizd, hogy valóban nem lehetséges e felülírni őket! 
*/
const utils = require('./utils')

utils.generateUserList = 'generateUserList'
utils.getUserNames = 'getUserNames'

const users = [
    {
        firstName: 'Peter',
        lastName: 'Griffin',
        age: 43
    },
    {
        firstName: 'Brian',
        lastName: 'Griffin',
        age: 7
    },
    {
        firstName: 'Stewie',
        lastName: 'Griffin',
        age: 1
    }
]

console.log(utils.generateUserList(users))
console.log(utils.getUserNames(users))
