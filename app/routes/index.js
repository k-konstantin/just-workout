import Router from 'koa-router'
import users from './users'
import { localAuthenticate } from 'libs/passport'

const router = new Router({ prefix: '/api' })

router
    .post('/users', users.create)
    .param('confirmToken', users.getUserByConfirmToken)
    .get('/users/confirm/:confirmToken', users.confirmUser)
    .get('/users/reject/:confirmToken', users.rejectUser)
    .post('/users/login', localAuthenticate, users.login)

export default app => {
    app
        .use(router.routes())
        .use(router.allowedMethods())
}