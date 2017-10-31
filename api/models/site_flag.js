import Mongoose, { Schema } from 'mongoose'

const site_flag_schema = new Schema({
  flag: {type: Schema.Types.ObjectId, ref: 'Flag', required: true},
  start_date: {type: Date, default: null},
  end_date: {type: Date, default: null},
  deleted_at: {type: Date, default: null}
}, {
  collection: 'site_flag',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const site_flag_model = Mongoose.model('Site_Flag', site_flag_schema)

export default site_flag_model
