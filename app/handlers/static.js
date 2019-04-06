import serve from 'koa-static'
import config from 'config/index'

export default app => app.use(serve(config.public))