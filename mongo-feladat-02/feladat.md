A videoStore feladat folytatása (update, find, projection)

**Normalization elve**: Csak a közvetlen összetartozó elemeket tároljuk egy táblázatban (listában). Minél összetettebb egy adat (több tulajdonsággal rendelkezhet, pl.: rendezőnek lehet neve, díjai, filmjei, születési adatai), annál inkább külön listába kell kiszervezni a tárolását.

1. Készíts el egy „directors” listát, amelyben filmrendezőket fogunk tárolni!  
`db.createCollection("directors")`
2. Ments el benne 3 „rendező” dokumentumot az insertOne() parancs segítségével:
  - "_id": egész szám 1-estől indulva
  - "name": Steven Spielberg, Clint Eastwood, James Cameron
  - "birthYear": születési év (tetszőlegesen megadott egész szám)
  - "movies": kezdetben egy üres lista  
`db.directors.insertOne({_id:1, name: "Steven Spielberg", birthYear: 1930, movies: []})`  
`db.directors.insertOne({_id:2, name: "Clint Eastwood", birthYear: 1935, movies: []})`  
`db.directors.insertOne({_id:3, name: "James Cameron", birthYear: 1958, movies: []})`  

4. Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait (ha ObjectId-t használsz, akkor figyelj arra, hogy ObjectId-ként mentsd el őket). Tipp: kérdezd le a rendezőket, és alájuk listázd a filmeket úgy, hogy csak az id-jük és a rendező nevét adja vissza a lekérdezés:  
`db.directors.update({name:"Steven Spielberg"},{$push:{movies: {$each: [ObjectId("60dc66c79db2e529f065f9d4"),ObjectId("60dc66c79db2e529f065f9d7"),ObjectId("60dc66c79db2e529f065f9da")]}}})`  
`db.directors.update({name:"Clint Eastwood"},{$push:{movies: {$each: [ObjectId("60dc66c79db2e529f065f9d5"),ObjectId("60dc66c79db2e529f065f9d8"),ObjectId("60dc66c79db2e529f065f9db")]}}})`  
`db.directors.update({name:"James Cameron"},{$push:{movies: {$each: [ObjectId("60dc66c79db2e529f065f9d6"),ObjectId("60dc66c79db2e529f065f9d9"),ObjectId("60dc66c79db2e529f065f9dc")]}}})`  

5. Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)! Ehhez hasonló eredményt kell látnod:
`db.directors.find().pretty()`

6. Ha elkészültél a rendezői listával, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.
`db.movies.updateMany({}, {$unset: {director: ""}})`

7. Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)  
`db.movies.find({releaseYear: {$lt: 2000}})`
`db.movies.find({releaseYear: {$gt: 2000}})`

8. Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)  
`db.movies.find({releaseYear: {$gt: 2000, $lt: 2010}})`  
`db.movies.find({$and: [{releaseYear: {$gt: 2000}}, {releaseYear: {$lt: 2010}}]})`  

9. Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!  
`db.movies.find({releaseYear: {$gt: 1990, $lt: 2010}, category: "action"})`

10. Kérdezd le a filmeket, amelyeknek a kategóriája NEM fantasy ($ne)!  
`db.movies.find({category: {$ne: "fantasy"}})`


**Projection**: egy lekérdezés során van, hogy érzékeny adatainkat nem akarjuk elküldeni, vagy csak nincs okunk minden tulajdonságot lekérni egy dokumentumról. A szerveroldalról megjelenített adatok kezelése ezt a célt szolgálja.

11. Írj egy lekérdezést, amely visszaadja az egy konkrét időpont előtt készült filmek címét és kategóriáját (más mező ne jelenjen meg), amelyeknek a kategóriája „ROMANTIC” vagy „ACTION” ($in operátor vagy $or operátor is).  
`db.movies.find({releaseYear: {$lt: 2005}, category: {$in: ["romantic","action"]}},{title:1, category:1, _id:0})`  

12. Írj egy lekérdezést a directors listára, amelyben elkéred a rendezők nevét és a filmek _id-ját (más mező ne jelenjen meg).  
`db.directors.find({},{_id_:0, director:1, movies:1})`

13. Írj egy lekérdezést, amely visszaadja a Steven Spielberg filmrendező által rendezett filmek adatait, kivéve a ratings-et. (Most elég, ha lekérdezed először a rendező film id-jait, majd a fő lekérdezésben megadott paraméterként az id-kat).  
`db.directors.aggregate([ `  
`{$match: {name: "Steven Spielberg"}},`
`{$lookup: { from: "movies", localField: "movies", foreignField: "_id", as: "movies" } },`  
`{$project: {_id:0, "movies._id":0, "movies.ratings":0}}`  
`]).pretty()`

**Adatbázis importálása .json fájlból**

Adatbázisokkal történő munkák során gyakran előfordulhat, hogy biztonsági mentéseket kell végezni vagy különböző fájlokból kell importálni adatbázisba adatokat. Ehhez az egyik fő eszköz a „MongoDB DataBase Tool”, azon belül most a mongoimport segítségével fogunk gyakorolni.

DataBase Tool: külön package-ben kell telepíteni a MongoDB egy újabb verziója óta. (Windows esetén érdemes lehet a MongoDB könyvtára „közelébe vagy mellé” telepíteni.)

Windows: https://docs.mongodb.com/database-tools/installation/installation-windows/

Ubuntu: https://docs.mongodb.com/database-tools/installation/installation-linux/

Mac: https://docs.mongodb.com/database-tools/installation/installation-macos/

Ellenőrizzük, hogy sikeresen települt:

Ubuntu, Mac => parancs a terminálban (nem a Mongo shell-ben): mongoimport --version

Windows => meg kell keresnünk a terminálban a telepítés helyét, lépjünk be a bin könyvtárba, hogy lássuk a települt fájlokat. (Itt is futtatható már a mongoimport --version parancs.)

A képen szöveg látható  Automatikusan generált leírás

mongoimport parancs segítségével tudunk CSV, JSON fájlból importálni adatbázist.

Ubuntun a terminálban (nem Mongo shell-ben!). Keressünk egy könyvtárat, ahová el akarjuk menteni az adatbázist, majd a terminálban írjuk be az alábbi parancsot:
wget https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json

WINDOWS estén keressük fel az oldalt: majd az oldalon jobb egér klikk, mentés másként, hogy lementsük a tartalmat.

Utána mehet a parancs a terminálokban:
Ubuntu: sudo mongoimport --db newdb --collection restaurants --file primer-dataset.json

Windows: meg kell keresni a DataBase Tool forrás könyvtárát, és ott mehet a parancs:



Parancsok:

mongoimport: importálj adatokat a MongoDB szerverre
--db "newdb": a newdb nevű adatbázisba (ha nincs ilyen a gépen, létrehozza)
--collections restaurant: a „restaurants” listába mentse az adatokat
--file primer-dataset.json: a primer-dataset.json fájlból
Megjegyzés: a parancs végére a relatív vagy teljes elérési utat kell írni, ha más könyvtárban lenne a .json fájl.

Ellenőrizzük parancsokkal, hogy sikerült-e az import:
use newdb
db.restaurants.count() (számolja meg, hány elemünk van)
A képen szöveg látható  Automatikusan generált leírás

Gyakorlás nagyobb tömegű adatokon

Kérdezzük le a restaurants listánkból a Brooklyn kerületben („borough”) lévő éttermek neveit, címét és kerületét. Az egyedi azonosító ne jelenjen meg! Használjuk a pretty() parancsot az olvashatóbb megjelenítéshez!
Kérdezd le a Queens kerületben lévő olyan éttermek neveit, kerületét és a kapott osztályzatait („grades”), amelyeknek a nevében benne van a „Kitchen” szó (tipp: használd a $regex operátort)!
Ellenőrzés gyanánt számold meg, hány darab van belőlük! Ismételd meg a fenti parancsot, a pretty() parancs helyet használd a count() parancsot! 144 étteremnek kell lennie.
Kérdezd le azokat az éttermeket, amelyeknek a konyhája („cuisine”) NEM amerikai és az Astoria Boulevard utcában vannak. A szerver csak a cuisine és az address mezőket adja vissza.
Kérdezd le azokat az éttermeket, amelyek pizzát („pizza”) árulnak és NEM a következő kerületekben vannak: Brooklyn, Queens, Manhattan!
Kérdezd le azoknak az éttermeknek a címét és nevét, amelyeknek a nevében benne van a „Pizza” szó és az irányítószámuk: 11369!
Számold meg, hány „Tony”-val kezdődő névvel rendelkező étterem van az adatbázisban! (40 db a helyes válasz)
Játssz tovább az adatbázissal tetszőlegesen! Találj ki további lekérdezéseket!


