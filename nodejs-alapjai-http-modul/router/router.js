const { index, about, contact } = require('../controller/controller')

const router = {
  '/': (res) => index(res),
  '/about': (res) => about(res),
  '/contact': (res) => contact(res)
}

module.exports = router
