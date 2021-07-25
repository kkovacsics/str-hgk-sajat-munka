const fsp = require('fs/promises')

const readData = async (file) => {
  const data = await fsp.readFile(file, 'utf8')
  return JSON.parse(data)
}

const writeData = async (file, data) => {
  await fsp.writeFile(file, JSON.stringify(data, null, 2))
}

module.exports = {
  readData,
  writeData
}
