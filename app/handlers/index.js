const handlers = [
	'static',
	'errors',
	'bodyParser',
]

export default app => {
	handlers.forEach(handlerName => {
		const handler = require('./' + handlerName).default
		handler(app)
	})
}