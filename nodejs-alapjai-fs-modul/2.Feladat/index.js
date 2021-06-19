const { createReadStream, createWriteStream, unlink } = require('fs')
const { createGzip } = require('zlib')

const file = 'teszt.txt'

const readStream = createReadStream(file, { encoding: 'utf8', highWaterMark: 8 })

const writeStream = createWriteStream(`${file}.bak`)
const writeStreamGZip = createWriteStream(`${file}.gz`)

readStream.pipe(writeStream)
readStream
  .on('error', () => console.log('error'))
  .on('end', () => {
    console.log('end')
    unlink(file, () => console.log(`${file} deleted`))
    unlink(`${file}.bak`, () => console.log(`${file}.bak deleted`))
  })
  .pipe(createGzip())
  .pipe(writeStreamGZip)
