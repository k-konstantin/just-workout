import app from './app'
import config from 'config'
import logger from 'logger'
import initConnectors from 'connectors'

const {port} = config

initConnectors()
	.then(() => {
		app.listen(port, () => {
			logger.info(`Server listen on port ${port}`)
		})
	})
	.catch(err => {
		logger.error(err)
	})
