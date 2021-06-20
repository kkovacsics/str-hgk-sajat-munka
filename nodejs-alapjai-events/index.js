const { createReadStream, createWriteStream } = require('fs')
const { Transform } = require('stream')
const path = require('path')
const Logger = require('./Logger')

const logger = new Logger()
/*
*/
const file = './szamarmese.txt'
const outFile = `${path.basename(file, path.extname(file))}Copy${path.extname(file)}`

const readStream = createReadStream(file, { encoding: 'utf8', highWaterMark: 16 })
readStream.on('error', (err) => logger.error(`readStream error, ${err.message}`))
readStream.on('end', () => logger.success('readStream success'))

class TitleCaseStream extends Transform {
  constructor() {
    super()
    this.buffer = ''
  }

  encoding(line) {
    const encodedLine = line.toString('utf8').split(' ')
      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(' ')
    // logger.success(line)
    // logger.error(encodedLine)
    return encodedLine
  }

  _transform(chunk, enc, done) {
    this.buffer += chunk
    const lines = this.buffer.toString('utf8').split('\n')
    lines.forEach((line, index, lines) => {
      if (index < lines.length - 1) { // a legutolsó lehet, hogy nem teljes sor
        this.push(this.encoding(line) + '\n')
      } else {
        this.buffer = lines[lines.length - 1]
      }
    })
    done()
  }

  _flush(done) {
    if (this.buffer.length) {
      this.push(this.encoding(this.buffer))
    }
    done()
  }
}
const trasformStream = new TitleCaseStream()
trasformStream.on('error', (err) => logger.error(`trasformStream error, ${err.message}`))
trasformStream.on('end', () => logger.success('trasformStream success'))

const writeStream = createWriteStream(outFile, 'utf8')
writeStream.on('error', (err) => logger.error(`writeStream error, ${err.message}`))
writeStream.on('finish', () => logger.success('writeStream success'))

readStream.pipe(trasformStream).pipe(writeStream)
