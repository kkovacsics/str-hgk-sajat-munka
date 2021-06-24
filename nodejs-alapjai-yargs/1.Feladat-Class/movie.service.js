const MovieApi = require('./movie.api')
const { dbFilePath, propName } = require('./config')

module.exports = class MovieService {
  constructor () {
    this.api = new MovieApi(dbFilePath, propName)
    this.movies = null
    this.init()
  }

  async init () {
    this.movies = await this.api.get()
  }

  async getAllMovies () {
    if (!this.movies) {
      await this.init()
    }
    return this.movies
  }

  async findMovieById (id) {
    if (!this.movies) {
      await this.init()
    }
    return this.movies.find(movie => movie.id === id)
  }

  async createMovie ({ producer, title }) {
    if (!this.movies) {
      await this.init()
    }
    const nextId = this.movies[this.movies.length - 1].id + 1
    const movie = { id: nextId, producer, title }
    this.movies.push(movie)
    await this.api.save(this.movies)
    return movie
  }

  async editMovie ({ id, producer, title }) {
    if (!this.movies) {
      await this.init()
    }
    this.movies = this.movies.map(movie => movie.id === id ? { id, producer, title } : movie)
    await this.api.save(this.movies)
    return await this.findMovieById(id)
  }

  async removeMovie (id) {
    if (!this.movies) {
      await this.init()
    }
    this.movies = this.movies.filter(movie => movie.id !== id)
    await this.api.save(this.movies)
  }
}
