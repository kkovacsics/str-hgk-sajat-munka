const express = require('express')
const data = require('./service')

const router = express.Router()

const vaccinated = data.filter(person => person.vaccine !== '')

router.get('/vaccinated', (req, res) => {
  res.json(vaccinated)
})

router.get('/count', (req, res) => {
  res.json(vaccinated.length)
})

module.exports = router
