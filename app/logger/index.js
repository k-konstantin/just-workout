import { createLogger, format, transports } from 'winston'

const logger = createLogger({
	format: format.combine(
		format.timestamp(),
		format.json(),
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize({ all: true }),
			)
		})
	]
})

export default logger