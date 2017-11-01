import Bluebird from 'bluebird'
import Mongoose from 'mongoose'

const init = env => async (ctx, next) => {
  if (env !== 'testing') {
    Mongoose.connect('mongodb://34.208.204.136:27017/gstv', { useMongoClient: true })
    Mongoose.Promise = Bluebird

    const db = Mongoose.connection
    db.on('error', console.log.bind(console, 'connection error: '))
  }

  await next()
}

export default { init }
