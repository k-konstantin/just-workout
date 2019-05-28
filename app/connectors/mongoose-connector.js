import mongoose from 'mongoose'

import config from 'config'
import logger from 'logger'

const {mongoURI, mongooseDebug} = config

mongoose.set('debug', mongooseDebug)

export default () => mongoose
    .connect(mongoURI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        keepAlive: true,
        poolSize: 5,
    })
    .then(() => {
        logger.info(`Mongoose successfully connect do DB: ${mongoURI}`)
    })
    .catch(err => {
        logger.error(err)
    })