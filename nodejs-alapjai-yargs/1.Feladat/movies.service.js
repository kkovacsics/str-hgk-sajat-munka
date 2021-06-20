const MoviesService = (moviesApi) => {
  const moviesPromise = moviesApi.get()

  const getAllMovies = async () => await moviesPromise

  const findMovieById = async (id) => {
    const movies = await moviesPromise
    return movies.find(movie => movie.id === id)
  }

  const generateNewMovieId = (movies) => {
    const sortedMovies = [...movies].sort((a, b) => a.id > b.id)
    return sortedMovies[sortedMovies.length - 1].id + 1
  }
  const createMovie = async ({ producer, title }) => {
    let movies = await moviesPromise
    const movie = { id: generateNewMovieId(movies), producer, title }
    movies = [...movies, movie]
    await moviesApi.save(movies)
    return movie
  }

  const editMovie = async ({ id, producer, title }) => {
    let movies = await moviesPromise
    movies = movies.map(movie => movie.id === id ? { id, producer, title } : movie)
    await moviesApi.save(movies)
    return findMovieById(id)
  }

  const removeMovie = async (id) => {
    let movies = await moviesPromise
    movies = movies.filter(movie => movie.id !== id)
    await moviesApi.save(movies)
  }

  return {
    getAllMovies,
    findMovieById,
    createMovie,
    editMovie,
    removeMovie
  }
}

module.exports = MoviesService
