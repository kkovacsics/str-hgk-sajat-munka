const Person = require('../../models/person.model')

exports.create = personData => {
  const person = new Person(personData)
  return person.save()
}

exports.findAll = () => Person.find().populate('vaccination.vaccine')

exports.findOne = id => Person.findById(id).populate('vaccination.vaccine')

exports.update = (id, updateData) => Person.findByIdAndUpdate(id, updateData, {
  new: true, // a módosítás utáni állapotot adja vissza
  useFindAndModify: false
})

exports.delete = id => Person.findByIdAndRemove(id)

exports.deleteVaccine = vaccine => Person.deleteMany({ 'vaccination.vaccine': vaccine })
