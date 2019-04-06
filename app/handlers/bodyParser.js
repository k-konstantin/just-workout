import koaBody from 'koa-body'

// ctx.request.body = ..
export default app => app.use(koaBody())