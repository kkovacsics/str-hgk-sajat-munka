const yargs = require('yargs')
const { id, producer, title } = require('./option')
const MoviesApi = require('./movies.api')
const MoviesService = require('./movies.service')
const { dbFilePath, propName } = require('./config')

const moviesApi = MoviesApi(dbFilePath, propName)
const {
  getAllMovies,
  findMovieById,
  createMovie,
  editMovie,
  removeMovie
} = MoviesService(moviesApi)

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'get',
    describe: 'Get all movies',
    handler: async () => console.log(await getAllMovies())
  })
  .command({
    command: 'find',
    describe: 'Find a movie by id',
    builder: { id },
    handler: async (args) => console.log(await findMovieById(args.id))
  })
  .command({
    command: 'create',
    describe: 'Create a new movie',
    builder: { producer, title },
    handler: async (args) => console.log(await createMovie(args))
  })
  .command({
    command: 'edit',
    describe: 'Edit a movie',
    builder: { id, producer, title },
    handler: async (args) => console.log(await editMovie(args))
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by ID',
    builder: { id },
    handler: async (args) => {
      await removeMovie(args.id)
      console.log('deleted')
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv
