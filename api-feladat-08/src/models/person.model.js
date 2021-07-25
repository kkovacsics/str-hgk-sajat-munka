const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const PersonSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    vaccination: {
      count: Number,
      vaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaccine'
      }
    }
  }, {
    timestamps: true
  }
)

PersonSchema.plugin(idValidator)

module.exports = mongoose.model('Person', PersonSchema)
