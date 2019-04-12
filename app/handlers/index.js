const handlers = [
	'logger',
	'static',
	'cors',
	'errors',
	'passport',
	'bodyParser',
]

export default app => {
	handlers.forEach(handlerName => {
		const handler = require('./' + handlerName).default
		handler(app)
	})
}