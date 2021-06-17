/*
Az első neve `generateUserList` paraméterként egy user objektumokat tartalmazó tömböt vár.  
A user objektumok 
- `firstName`
- `lastName`
- `age`
tulajdonságokkal rendelkeznek.  
A függvény visszatérési értéke egy olyan új tömb, ami olyan objektumokat tartalmaz, ami a következő tulajdonságokkal rendelkezik:  - `isAdult` : a user kora alapján egy true/false érték attól függően, hogy elmúlt e 18 éves
- `fullName`: a user teljes neve
*/const generateUserList = users => 
    users.map( user => ({isAdult: user.age>18, fullName: `${user.firstName} ${user.lastName}`}))

/*
Az első neve `getUserNames` paraméterként egy user objektumokat tartalmazó tömböt vár.  
A user objektumok 
- `firstName`
- `lastName`
- `age`
A függvény visszatérési értéke egy olyan string, ami az összes felhasználó teljes nevét tartalmazza vesszővel elválasztva. 
*/
// const getUserNames = users =>
//     users.reduce((acc, curr) => `${acc}, ${curr.firstName} ${curr.lastName}`, '')
const getUserNames = users =>
    users
        .map(user => `${user.firstName} ${user.lastName}`)
        .join(',')

/*
Exportáld a két függvényt ügyelve arra, hogy a későbbiekben ne lehessen felülírni őket! 
*/
module.exports = Object.freeze({
    generateUserList,
    getUserNames
})
