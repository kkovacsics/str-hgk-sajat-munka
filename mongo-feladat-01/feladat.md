Elsőként olvasd végig az összes pontot!

1. Készíts egy videoStore nevű MongoDB adatbázist!  
`use videoStore`  

2. Hozz létre benne egy movies listát!  
`db.createCollection("movies")`

3. Ments el benne 10 új filmet (save()) a következő mezőkkel:
- _id: legyen generált, ObjectId
- title: egy-egy kedvenc film címe, szöveges tartalom
- category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
- director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron  
`db.movies.save([`  
`  {title: "Fantasy 01", category: "fantasy", director: "Steven Spielberg"},`  
`	title: "Fantasy 02", category: "fantasy", director: "Clint Eastwood"},`  
`	{title: "Fantasy 03", category: "fantasy", director: "James Cameron"},`  
`	{title: "Action 01", category: "action", director: "Steven Spielberg"},`  
`	{title: "Action 02", category: "action", director: "Clint Eastwood"},`  
`	{title: "Action 03", category: "action", director: "James Cameron"},`  
`	{title: "Romantic 01", category: "romantic", director: "Steven Spielberg"},`  
`	{title: "Romantic 02", category: "romantic", director: "Clint Eastwood"},`  
`	{title: "Romantic 03", category: "romantic", director: "James Cameron"},`  
`	  {title: "Romantic 04", category: "romantic", director: "Steven Eastwood"}`  
`])`

4. Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!  
`db.movies.updateMany({}, {$set: {ratings: []}})`

5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!  
`db.movies.update({_id:ObjectId("60dc66c79db2e529f065f9d4")},{$push: {ratings: { $each: [2,3] }}})`
`db.movies.update({_id:ObjectId("60dc66c79db2e529f065f9d7")},{$push: {ratings: { $each: [3,4] }}})`
`db.movies.update({_id:ObjectId("60dc66c79db2e529f065f9da")},{$push: {ratings: { $each: [4,5] }}})`

6. Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!  
`db.movies.updateMany({}, {$set: {releaseYear: 2000}})`

7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!
Tipp: db.courses.updateMany( {}, [{$set: {title: {$toUpper: "$title"} }}] )
`db.movies.updateMany({}, [{$set: {category: {$toUpper: "$category"}}}])`

8. Kérdezd le az adatokat, hogy ellenőrizd, sikeresek lettek-e a frissítések! Most így kellene kinéznie a listának:
`db.movies.find()`

9. Kicsit algoritmizáljunk! Nézd meg, hogy melyik könyvtárban állsz a pwd() parancs segítségével. Hozz létre egy .js kiterjesztésű szöveges fájlt az adott könyvtárban! (Használhatsz majd abszolút elérési utat is később.) Bármilyen szerkesztő, IDEA megfelelő a szerkesztésre. Készíts el benne egy függvényt (ne felejtsd el meghívni a fájl végén), amely tartalmazzon egy listát benne a te filmjeid címeivel (figyelj a pontos címek megadására). Kiindulásként egy kis „segédkép”:

10. Folytasd a script írását! Cél, hogy mindegyik film különböző éveket kapjon az adatbázisban, de a filmek hármasával egy évtizedben legyenek. Törekedj a funkcionális egyszerű kódra. Futtasd le a Mongo shell-ben a scriptet a load() parancs segítségével. Utána kérdezd le az adatbázisodat ellenőrizni az eredményt. Íme egy lehetséges elvárt eredmény:
`load("C:\Training360\2_FullStackAPI\str-hgk-sajat-munka\mongo-feladat-01\setMoviesYear.js")`
