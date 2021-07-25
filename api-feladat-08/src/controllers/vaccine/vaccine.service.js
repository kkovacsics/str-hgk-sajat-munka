const Vaccine = require('../../models/vaccine.model')

exports.create = vaccineData => {
  const vaccine = new Vaccine(vaccineData)
  return vaccine.save()
}

exports.findAll = () => Vaccine.find()

exports.findOne = id => Vaccine.findById(id)

exports.update = (id, updateData) => Vaccine.findByIdAndUpdate(id, updateData, {
  new: true, // a módosítás utáni állapotot adja vissza
  useFindAndModify: false
})

exports.delete = id => Vaccine.findByIdAndRemove(id)

exports.deleteVaccine = vaccine => Vaccine.deleteMany({ name: vaccine })
