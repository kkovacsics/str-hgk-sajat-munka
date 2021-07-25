const express = require('express')
const controller = require('./vaccine.controller')

const router = express.Router()

router.get('/', (req, res, next) => controller.getAll(req, res, next))

router.post('/', (req, res, next) => controller.create(req, res, next))

router.delete('/:id', (req, res, next) => controller.deleteVaccine(req, res, next))

module.exports = router
