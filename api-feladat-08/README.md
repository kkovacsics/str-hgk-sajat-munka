## A kész feladat feltöltésének helye:

Repo: str-hgk-sajat-munka

Almappa: **api-feladat-08**

Például: http://github.com/cherryApp/str-hgk-sajat-munka/api-feladat-08


Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1. Készítsd el a Vaccine sémát, rendelkezzen a következő mezőkkel:
    - id: egyedi azonosító (ObjectId)
    - name: oltás neve (string)
    - efficiency: oltás hatékonysága, 1-100 közötti szám (number)

2. Módosítsd a Person sémát: a vaccine mező egy nested objektum legyen egy vaccine és count property-vel:
    - count: egy szám, hogy az adott személy hány dózist kapott meg
    - vaccine: referencia (id) egy Vaccine típusú dokumentumra

3. Módosítsd a PersonService (és szükség esetén a PersonController) osztályt, hogy továbbra is megfelelően működjön!

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

