const { readFile, writeFile } = require('fs').promises

// const MovieApi = (path, prop) => ({
//   async get () {
//     const dataString = await readFile(path)
//     return JSON.parse(dataString)[prop]
//   },

//   async save (data) {
//     await writeFile(path, JSON.stringify({ [prop]: data }))
//   }
// })

module.exports = class MovieApi {
  constructor (path, prop) {
    this.path = path
    this.prop = prop
    this.list = null
    this.init() // a constructor nem lehet aszinkron, ezért kell ezt kiszervezni
  }

  async init () { // ez már lehet aszinkron
    const dataString = await readFile(this.path)
    this.list = JSON.parse(dataString)[this.prop]
  }

  async get () {
    if (!this.list) {
      await this.init()
    }
    return this.list
  }

  async save (newList) {
    await writeFile(this.path, JSON.stringify({ [this.prop]: newList }))
  }
}
