import Mongoose, { Schema } from 'mongoose'

const MODEL_NAME = 'Site'

const site_schema = new Schema({
  address: String,
  city: String,
  state: String,
  zip_code: String,
  site_flags: [{type: Schema.Types.ObjectId, ref: 'Site_Flag'}],
  created_at: Date,
  updated_at: Date,
  deleted_at: { type: Date, default: null }
}, {
  collection: 'site',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

site_schema.index({site_flags: 1})

const site_model = Mongoose.model(MODEL_NAME, site_schema)

export default site_model
