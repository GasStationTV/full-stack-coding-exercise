import { expect, assert, should, use} from 'chai'
import ChaiHttp from 'chai-http'
import Mongoose from 'mongoose'
import Bluebird from 'bluebird'

import App      from '../app'
import Model    from '../models'
import TestData from './test-data.seed'

global.expect = expect
global.assert = assert
global.should = should
global.request = use(ChaiHttp).request(App)

const DB_NAME = 'gstv_unit_test'

before(async function() {
  try {
    const db = await Mongoose.connect(
      `mongodb://34.208.204.136:27017/${DB_NAME}`, { useMongoClient: true }
    )
    Mongoose.Promise = Bluebird

    await db.dropDatabase()

    await Model.flag.insertMany(TestData.flag)
    await Model.site.insertMany(TestData.site)
    await Model.site_flag.insertMany(TestData.site_flag)

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


