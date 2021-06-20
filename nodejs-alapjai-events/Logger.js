const EventEmitter = require('events')

class Logger extends EventEmitter {
  error (message) {
    console.log('\x1b[31m' + message + '\x1b[0m')
  }

  success (message) {
    console.log('\x1b[32m' + message + '\x1b[0m')
  }
}

module.exports = Logger
