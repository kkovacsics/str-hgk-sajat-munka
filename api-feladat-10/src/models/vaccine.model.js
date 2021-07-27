const mongoose = require('mongoose')

const VaccineSchema = mongoose.Schema(
  {
    name: String,
    efficiency: Number
  }, {
    timestamps: true
  }

)

module.exports = mongoose.model('Vaccine', VaccineSchema)
