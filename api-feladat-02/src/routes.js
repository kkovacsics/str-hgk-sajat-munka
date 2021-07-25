const express = require('express')
const service = require('./service')

const path = require('path')
const dataFile = path.join(__dirname, '../database/person.json')

let dataPromise = service.readData(dataFile)

const router = express.Router()

router.get('/vaccinated', async (req, res) => {
  const data = await dataPromise
  const vaccinated = data.filter(person => person.vaccine !== '')
  res.json(vaccinated)
})

router.get('/count', async (req, res) => {
  const data = await dataPromise
  const vaccinated = data.filter(person => person.vaccine !== '')
  res.json(vaccinated.length)
})

router.get('/:id/vaccinated', async (req, res) => {
  const data = await dataPromise
  const person = data.find(person => person.id === Number(req.params.id))
  res.json(person.vaccine !== '')
})

router.post('/', async (req, res) => {
  const newData = req.body
  const data = await dataPromise
  newData.id = data[data.length - 1].id + 1
  await service.writeData(dataFile, [...data, newData])
  dataPromise = service.readData(dataFile)

  res.status(201)
  res.json(newData)
})

router.put('/:id/:vaccine', async (req, res) => {
  const data = await dataPromise
  const index = data.findIndex(person => person.id === Number(req.params.id))
  data[index].vaccine = req.params.vaccine
  await service.writeData(dataFile, data)
  dataPromise = service.readData(dataFile)

  res.status(200)
  res.json(data[index])
})

router.delete('/:vaccine', async (req, res) => {
  const data = await dataPromise
  await service.writeData(dataFile, data.filter(person => person.vaccine !== req.params.vaccine))
  dataPromise = service.readData(dataFile)

  res.status(200)
  res.json({})
})

module.exports = router
