import { expect, assert, should, use} from 'chai'
import ChaiHttp from 'chai-http'
import Mongoose from 'mongoose'
import Bluebird from 'bluebird'
import App from '../app'
import Model from '../models'

global.expect = expect
global.assert = assert
global.should = should
global.request = use(ChaiHttp).request(App)

const DB_NAME = 'gstv_unit_test'

before(async function() {
  try {
    await Mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, {
      useMongoClient: true
    })
    Mongoose.Promise = Bluebird

    await Model.flag.insertMany(
      [{type: 'gstv'}, {type: 'advertiser'}])
  } catch (err) {
    throw err
  }
})

after(async function() {
  const db_name = await Mongoose.connection.db.databaseName

  if (db_name === DB_NAME) {
    await Mongoose.connection.dropDatabase()
    await Mongoose.connection.close()
  }
})


