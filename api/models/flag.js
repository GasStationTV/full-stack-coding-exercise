import Mongoose, { Schema } from 'mongoose'

const flag_schema = new Schema({
  type: String
}, {
  collection: 'flag'
})

const flag_model = Mongoose.model('Flag', flag_schema)

export default flag_model
