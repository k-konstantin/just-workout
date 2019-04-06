import handlersConfig from './handlersConfig'

export default app => {
	handlersConfig.forEach(handlerName => {
		require('./handlers/' + handlerName).init(app)
	})
}