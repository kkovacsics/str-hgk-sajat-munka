function setYearToMovies () {
  const titles = [
    'FANTASY 01', 'FANTASY 02', 'FANTASY 03',
    'ACTION 01', 'ACTION 02', 'ACTION 03',
    'ROMANTIC 01', 'ROMANTIC 02', 'ROMANTIC 03', 'ROMANTIC 04'

  ]

  titles.forEach((title, index) => {
    const year = 1980 +
      Math.floor(index / 3) * 10 +
      Math.floor(Math.random() * 10)
    // eslint-disable-next-line no-undef
    print(year)
    // eslint-disable-next-line no-undef
    db.movies.update({ title: title }, { $set: { releaseYear: year } })
  })
}

setYearToMovies()
