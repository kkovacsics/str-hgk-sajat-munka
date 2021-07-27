const createError = require('http-errors')
const vaccineService = require('./vaccine.service')

exports.getAll = (req, res, next) => {
  return vaccineService.findAll()
    .then(vaccines => {
      res.json(vaccines)
    })
}

exports.create = (req, res, next) => {
  const { name, efficiency = 100 } = req.body
  if (!name || !efficiency) {
    return next(new createError.BadRequest('Missing properies!'))
  }

  const newVaccine = { name, efficiency }

  return vaccineService.create(newVaccine)
    .then(createdVaccine => {
      res.status(201)
      res.json(createdVaccine)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.update = (req, res, next) => {
  const { name, efficiency = 100 } = req.body
  if (!name || !efficiency) {
    return next(new createError.BadRequest('Missing properies!'))
  }

  const update = { name, efficiency }

  return vaccineService.update(req.params.id, update)
    .then(vaccine => {
      res.json(vaccine)
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}

exports.delete = (req, res, next) => {
  return vaccineService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}
