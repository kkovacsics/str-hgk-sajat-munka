## A kész feladat feltöltésének helye:

Repo: str-hgk-sajat-munka

Almappa: **api-feladat-05**

Például: http://github.com/cherryApp/str-hgk-sajat-munka/api-feladat-05


Módosítsuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást úgy, hogy MongoDB-t használjon az adatok tárolására.

1. Hozz létre egy új MongoDB adatbázist! (használhatsz Atlas-t vagy akár lokális MongoDB példányt is)
2. Telepítsd a szükséges csomagokat, készítsd el a Person sémát!
3. Módosítsd a tanult módon az alkalmazást, hogy az a MongoDB-hez csatlakozzon, töröld a JSON adatbázist!
4. Módosítsd a végpontokat, hogy az adatbázissal dolgozzanak!

- Tipp 1: countDocuments() elemek számolásához
- Tipp 2: $exists operátor


    fetch('http://localhost:3000/person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName: 'Peter', lastName: 'Griffin', vaccine: 'Sputnik'})
    }).then( r => r.json() )
    .then( d => console.log(d) )

    fetch('http://localhost:3000/person/101/Sputnik V.', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
     }).then( r => r.json() )
    .then( d => console.log(d) )

    fetch('http://localhost:3000/person/Sputnik V.', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
     }).then( r => r.json() )
    .then( d => console.log(d) )
