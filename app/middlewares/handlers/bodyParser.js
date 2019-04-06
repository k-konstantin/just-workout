import koaBody from 'koa-body'

// ctx.request.body = ..
export const init = app => app.use(koaBody())