const htmlResponse = require('../utils/htmlResponse')

const index = res => htmlResponse(res, 'index.html')
const about = res => htmlResponse(res, 'about.html')
const contact = res => htmlResponse(res, 'contact.html')

module.exports = {
  index,
  about,
  contact
}
