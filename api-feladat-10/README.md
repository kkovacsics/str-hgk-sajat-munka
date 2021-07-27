## A kész feladat feltöltésének helye:

Repo: str-hgk-sajat-munka

Almappa: **api-feladat-10**

Például: http://github.com/cherryApp/str-hgk-sajat-munka/api-feladat-10


Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1. Implementálj JWT autentikációt az alkalmazáshoz a szükséges végpontokkal (login, refresh, logout), egy access token 1 óráig legyen érvényes!
    - Készíts egy User sémát username, password és role mezőkkel, vegyél fel az adatbázisba 1-1 usert user és admin jogosultsággal!
    - A végpontok az adatbázisban szereplő felhasználókkal dolgozzanak!
2. Védd le a PersonController által definiált végpontokat, hogy csak autentikált felhasználók hívhassák meg, mindenki más kapjon hibaüzenetet 401-es hibakóddal!
3. Módosítsd a védelmet úgy, hogy az adatbázisban módosítást végző végpontokat (PUT, POST, DELETE hívások) csak admin felhasználók hívhassák meg!

**Opcionális feladat**: Jelszót sima szövegként (plain text) tárolni az adatbázisban **nagyon rossz ötlet**. 
Módosítsd a jelszó tárolását a https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt alapján, hogy biztonságosabbá váljon a tárolás!


    fetch('http://localhost:3000/person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName: 'Peter', lastName: 'Griffin', vaccination: {count:2, vaccine: '60fdb339d3852d096c6d244c'}})
    }).then( r => r.json() )
    .then( d => console.log(d) )

    fetch('http://localhost:3000/person/60fdb9f66692fb1e40f46136/60fdb328d3852d096c6d2448', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
     }).then( r => r.json() )
    .then( d => console.log(d) )

    fetch('http://localhost:3000/person/60fdb328d3852d096c6d2448', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
     }).then( r => r.json() )
    .then( d => console.log(d) )


    fetch('http://localhost:3000/vaccine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'Pfizer', efficiency: 98})
    }).then( r => r.json() )
    .then( d => console.log(d) )

