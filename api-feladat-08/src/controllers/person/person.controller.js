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
      res.json(people.filter(person => person.vaccination.count))
    })
}

exports.getVaccinatedCount = (req, res, next) => {
  return personService.findAll()
    .then(people => {
      res.json(people.filter(person => person.vaccination.count).length)
    })
}

exports.getIdVaccinated = (req, res, next) => {
  return personService.findOne(req.params.id)
    .then(person => {
      if (!person) {
        return next(new createError.NotFound('Person is not found'))
      }
      res.json(!!person.vaccination.count)
    })
}

exports.create = (req, res, next) => {
  const { firstName, lastName, vaccination } = req.body
  if (!firstName || !lastName) {
    return next(new createError.BadRequest('Missing properies!'))
  }
  if (vaccination) {
    const { count, vaccine } = vaccination
    if (!count || !vaccine) {
      return next(new createError.BadRequest('Missing properies!'))
    }
  }

  const newPerson = { firstName, lastName, vaccination }

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
    person.vaccination.vaccine = req.params.vaccine
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
