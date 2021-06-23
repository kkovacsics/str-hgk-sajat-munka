const http = require('http')
const { createReadStream } = require('fs')

const port = 8080

const logger = (req) => console.log(`Date1: ${new Date().toLocaleDateString('hu-HU', { year: 'numeric', month: 'numeric', day: 'numeric' })} / Date2: ${new Intl.DateTimeFormat('hu-HU').format(Date.now())} Url: ${req.url} Method: ${req.method}`)

http.createServer((req, res) => {
  logger(req)
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    createReadStream('./views/index.html').pipe(res)
  } else if (req.url === '/about') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    createReadStream('./views/about.html').pipe(res)
  } else if (req.url === '/contact') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    createReadStream('./views/contact.html').pipe(res)
  } else {
    res.statusCode = 404
    res.end()
  }
})
  .on('error', err => console.log(`Server error: ${err}`))
  .on('listening', () => console.log(`Server is running on http://127.0.0.1:${port}`))
  .listen(port)
