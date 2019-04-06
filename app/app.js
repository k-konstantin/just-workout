import Koa from 'koa'
import initHandlers from './middlewares/initHandlers'

const app = new Koa()

initHandlers(app)

export default app