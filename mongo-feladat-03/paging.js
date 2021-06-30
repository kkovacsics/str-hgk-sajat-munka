/* eslint-disable no-undef */
function paging () {
  const movies = db.movies.find({}, { _id: 0, title: 1, category: 1 })

  movies.toArray().forEach((movie, index) => {
    if (index && index % 3 === 0) {
      print('--page over--')
    }
    print(`${index} - ${movie.title}: ${movie.category} movie`)
  })
}

paging()
