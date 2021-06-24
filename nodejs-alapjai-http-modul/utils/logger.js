const logger = (req) => console.log(`Date1: ${new Date().toLocaleDateString('hu-HU', { year: 'numeric', month: 'numeric', day: 'numeric' })} / Date2: ${new Intl.DateTimeFormat('hu-HU').format(Date.now())} Url: ${req.url} Method: ${req.method}`)

module.exports = logger
