const http = require('http')
const logger = require('./utils/logger')
const router = require('./router/router')

const port = 8080

// const logger = (req) => console.log(`Date1: ${new Date().toLocaleDateString('hu-HU', { year: 'numeric', month: 'numeric', day: 'numeric' })} / Date2: ${new Intl.DateTimeFormat('hu-HU').format(Date.now())} Url: ${req.url} Method: ${req.method}`)

http.createServer((req, res) => {
  logger(req)
  if (router[req.url]) {
    router[req.url](res)
  } else {
    res.statusCode = 404
    res.end()
  }
})
  .on('error', err => console.log(`Server error: ${err}`))
  .on('listening', () => console.log(`Server is running on http://127.0.0.1:${port}`))
  .listen(port)
