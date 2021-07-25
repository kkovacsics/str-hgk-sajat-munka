const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    vaccine: String
  }, {
    timestamps: true
  }

)

module.exports = mongoose.model('Person', PersonSchema)
