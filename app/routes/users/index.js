import _ from 'lodash'
import uuidv4 from 'uuid/v4'

import User from './models/user'

export default {
	create: async (ctx, next) => {
		const fields = _.pick(ctx.request.body, User.requiredFields)

		User.requiredVirtuals.forEach(virtual => {
			fields[virtual] = fields[virtual] ? fields[virtual] : ''
		})

		const user = new User(fields)

		user.confirmToken = uuidv4()

		await user.save()

		ctx.body = _.pick(user, User.publicFields)
	}
}