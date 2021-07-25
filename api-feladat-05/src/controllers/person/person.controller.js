const createError = require('http-errors')
const personService = require('./person.service')

exports.getAll = (req, res, next) => {
  return personService.findAll()
    .then(people => {
      res.json(people)
    })
}

exports.getVaccinated = (req, res, next) => {
  return personService.findAll()
    .then(people => {
      res.json(people.filter(person => person.vaccine))
    })
}

exports.getVaccinatedCount = (req, res, next) => {
  return personService.findAll()
    .then(people => {
      res.json(people.filter(person => person.vaccine).length)
    })
}

exports.getIdVaccinated = (req, res, next) => {
  return personService.findOne(req.params.id)
    .then(person => {
      if (!person) {
        return next(new createError.NotFound('Person is not found'))
      }
      res.json(!!person.vaccine)
    })
}

exports.create = (req, res, next) => {
  const { firstName, lastName, vaccine = '' } = req.body
  if (!firstName || !lastName) {
    return next(new createError.BadRequest('Missing properies!'))
  }

  const newPerson = { firstName, lastName, vaccine }

  return personService.create(newPerson)
    .then(createdPerson => {
      res.status(201)
      res.json(createdPerson)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.updateVaccine = async (req, res, next) => {
  const person = await personService.findOne(req.params.id)
  if (!person) {
    return next(new createError.NotFound('Person is not found'))
  } else {
    person.vaccine = req.params.vaccine
    return personService.update(req.params.id, person)
      .then(person => {
        res.json(person)
      })
      .catch(err => {
        next(new createError.InternalServerError(err.message))
      })
  }
}

exports.deleteVaccine = (req, res, next) => {
  return personService.deleteVaccine(req.params.vaccine)
    .then(() => res.json({}))
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}
