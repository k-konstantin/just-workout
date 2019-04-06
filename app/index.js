import app from './app'
import config from 'config'
import logger from 'logger'

const {port} = config

app.listen(port, () => {
	logger.info(`Server listen on port ${port}`)
})