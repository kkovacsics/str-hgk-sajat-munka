const express = require('express')
const controller = require('./person.controller')

const router = express.Router()

router.get('/', (req, res, next) => controller.getAll(req, res, next))

router.get('/vaccinated', (req, res, next) => controller.getVaccinated(req, res, next))

router.get('/count', (req, res, next) => controller.getVaccinatedCount(req, res, next))

router.get('/:id/vaccinated', (req, res, next) => controller.getIdVaccinated(req, res, next))

router.post('/', (req, res, next) => controller.create(req, res, next))

router.put('/:id/:vaccine', (req, res, next) => controller.updateVaccine(req, res, next))

router.delete('/:vaccine', (req, res, next) => controller.deleteVaccine(req, res, next))

module.exports = router
