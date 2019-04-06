import Koa from 'koa'
import initHandlers from './handlers'
import redirectToIndex from './handlers/redirectToIndex'
import initRoutes from './routes'

const app = new Koa()

initHandlers(app)
initRoutes(app)

redirectToIndex(app)

export default app