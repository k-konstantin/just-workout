import Router from 'koa-router'
import users from './users'

const router = new Router({ prefix: '/api' })

router
	.post('/users/create', users.create)

export default app => {
	app
		.use(router.routes())
		.use(router.allowedMethods())
}