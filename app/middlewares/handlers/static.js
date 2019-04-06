import serve from 'koa-static'
import config from 'config/index'

export const init = app => app.use(serve(config.public))