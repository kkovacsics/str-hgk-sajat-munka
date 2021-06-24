const yargs = require('yargs')
const { id, producer, title } = require('./option')
const MovieService = require('./movie.service')

const movieService = new MovieService()

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'get',
    describe: 'Get all movies',
    handler: async () => console.log(await movieService.getAllMovies())
  })
  .command({
    command: 'find',
    describe: 'Find a movie by id',
    builder: { id },
    handler: async (args) => console.log(await movieService.findMovieById(args.id))
  })
  .command({
    command: 'create',
    describe: 'Create a new movie',
    builder: { producer, title },
    handler: async (args) => console.log(await movieService.createMovie(args))
  })
  .command({
    command: 'edit',
    describe: 'Edit a movie',
    builder: { id, producer, title },
    handler: async (args) => console.log(await movieService.editMovie(args))
  })
  .command({
    command: 'remove',
    describe: 'Remove a movie by ID',
    builder: { id },
    handler: async (args) => {
      await movieService.removeMovie(args.id)
      console.log('deleted')
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv
