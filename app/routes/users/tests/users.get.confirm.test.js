import axios from 'axios'
import mongoose from 'mongoose'

import initConnectors from 'connectors'
import User from 'routes/users/models/user'
import app from 'app'
import config from 'config'

const {port} = config
const host = `http://localhost:${port}`

describe('confirm and reject email', () => {
	let server
	let users

	beforeAll(done => {
		axios.defaults.baseURL = host + '/api/users'
		axios.defaults.maxContentLength = 1024 * 1024 * 100

		initConnectors()
			.then(() => mongoose.connection.dropDatabase())
			// без этого unique в схеме не работает, так как не успевают создаться индексы
			.then(() => User.init())
			.then(() => {
				server = app.listen(port, () => {
					console.log(`Server is listen on port ${port}`)
					done()
				})
			})
	})

	afterAll(done => {
		server.close(() => {
			mongoose
				.disconnect()
				.then(() => {
					done()
				})
		})
	})

	beforeEach(done => {
		users = [
			{
				email: 'vasya@mail.ru',
				displayName: 'vasya',
				password: 'vasya',
			},
			{
				email: 'petya@mail.ru',
				displayName: 'petya',
				password: 'petya',
			}
		]

		User.deleteMany({}, err => {
			if (err) throw err

			done()
		})
	})

	describe('GET api/users/confirm', () => {
		it('should confirm email', async () => {
			await axios.post('/', users[0])

			let user = await User.findOne({ email: users[0].email })

			expect(user.confirmToken).not.toBe(null)
			expect(user.confirmed).toBe(false)

			const response = await axios.get(`/confirm/${user.confirmToken}`)

			expect(response.status).toBe(200)

			user = await User.findOne({ email: users[0].email})

			expect(user).toMatchObject({
				confirmToken: null,
				confirmed: true,
			})
		})

		it('should return 404 on second confirmation', async () => {
			await axios.post('/', users[0])

			let user = await User.findOne({ email: users[0].email })
			await axios.get(`/confirm/${user.confirmToken}`)

			try {
				await axios.get(`/confirm/${user.confirmToken}`)
				expect(true).toBe(false)
			} catch(err) {
				if (err.response) {
					expect(err.response.status).toBe(404)
				} else {
					throw err
				}
			}
		})
	})

	describe('GET /api/users/reject', () => {
		it('should delete user', async () => {
			await axios.post('/', users[0])

			let user = await User.findOne({ email: users[0].email })

			expect(user.confirmToken).not.toBe(null)
			expect(user.confirmed).toBe(false)

			const response = await axios.get(`/reject/${user.confirmToken}`)

			expect(response.status).toBe(200)

			user = await User.findOne({ email: users[0].email})

			expect(user).toBe(null)
		})

		it('should return 404 on second rejection', async () => {
			await axios.post('/', users[0])

			let user = await User.findOne({ email: users[0].email })
			await axios.get(`/reject/${user.confirmToken}`)

			try {
				await axios.get(`/reject/${user.confirmToken}`)
				expect(true).toBe(false)
			} catch(err) {
				if (err.response) {
					expect(err.response.status).toBe(404)
				} else {
					throw err
				}
			}
		})
	})
})