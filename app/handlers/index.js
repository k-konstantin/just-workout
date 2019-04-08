const handlers = [
	'static',
	'cors',
	'errors',
	'bodyParser',
]

export default app => {
	handlers.forEach(handlerName => {
		const handler = require('./' + handlerName).default
		handler(app)
	})
}