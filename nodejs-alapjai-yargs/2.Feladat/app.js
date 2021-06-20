const yargs = require('yargs')
const { readFile } = require('fs').promises

const config = {
  dbFilePath: './database/products.json',
  propName: 'products'
}
const productsPromise = (async () => {
  const dataString = await readFile(config.dbFilePath)
  return JSON.parse(dataString)[config.propName]
})()

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'sum',
    describe: 'Sum of all products price',
    handler: async () => {
      const products = await productsPromise
      const sum = products.reduce((acc, curr) => acc + curr.count * curr.price, 0)
      console.log(`Sum of all products price: ${sum.toFixed(2)}`)
    }
  })
  .command({
    command: 'avg',
    describe: 'Average price of all products',
    handler: async () => {
      const products = await productsPromise
      const avg = products.reduce((acc, curr) => acc + curr.price, 0) / products.length
      console.log(`Average price of all products: ${avg.toFixed(2)}`)
    }
  })
  .command({
    command: 'lessthan',
    describe: 'List products where count < parameter',
    builder: {
      count: {
        alias: 'c',
        describe: 'Maximum limit',
        type: 'number',
        demandOption: true
      }
    },
    handler: async ({ count }) => {
      const products = await productsPromise
      console.log(products.filter(product => product.count < count))
    }
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv
