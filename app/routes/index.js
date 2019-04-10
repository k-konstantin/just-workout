import Router from 'koa-router'
import users from './users'

const router = new Router({ prefix: '/api' })

router
	.post('/users', users.create)
	.param('confirmToken', users.getUserByConfirmToken)
	.get('/users/confirm/:confirmToken', users.confirmUser)
	.get('/users/reject/:confirmToken', users.rejectUser)

export default app => {
	app
		.use(router.routes())
		.use(router.allowedMethods())
}