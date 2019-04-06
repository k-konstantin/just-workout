import logger from 'logger'

export const init = app => app.use(async (ctx, next) => {
	try {
		await next()

	} catch (e) {
		if (e.status) {
			// could use template methods to render error page
			ctx.body = e.message
			ctx.status = e.status

		} else if (e.name === 'ValidationError') {
			let errors = {}
			for (let field in e.errors) {
				if (e.errors.hasOwnProperty(field)) {
					errors[field] = e.errors[field].message
				}
			}

			/*let preferredType = ctx.accepts('json', 'html')
			if (preferredType !== 'json') {
				errors = 'Некорректные данные'
			}*/

			ctx.status = 400
			ctx.body = {errors}

		} else {
			ctx.body = 'Error 500'
			ctx.status = 500
			logger.error(e.message, e.stack)
		}
	}
})
