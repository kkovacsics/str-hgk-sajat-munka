const { createReadStream } = require('fs')
const { join } = require('path')

const htmlResponse = (res, file, status = 200) => {
  res.writeHead(status, {
    'Content-Type': 'text/html'
  })
  createReadStream(join(__dirname, `../views/${file}`)).pipe(res)
}

module.exports = htmlResponse
